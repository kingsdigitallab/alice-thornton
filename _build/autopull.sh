#!/usr/bin/env bash
# git pull from the folder this script belongs.
# If there is a change, clear traffice server cache.
# This script is supposed to be executed by a root cron job.

# the user who owns the git repo
GITUSER="gnoel"
# GITUSER="jeff"

# environment
SITE_ENV=${SITE_ENV:-'liv'}

# cd where this script is
cd $(dirname "$0")/..
PROJECT_DIR=$(pwd)

echo "AUTOPULL $PROJECT_DIR as $GITUSER, env = $SITE_ENV"

echo "$(date --iso-8601=seconds) GH fetch"

su $GITUSER -c 'git fetch'
if [[ $? -ne 0 ]]; then
  echo "failed: git fetch"
  exit
fi

h1=$(su $GITUSER -c 'git rev-parse HEAD')
h2=$(su $GITUSER -c 'git rev-parse @{u}')

if [[ $h1 != $h2 ]]; then
  echo "$(date --iso-8601=seconds) GH merge + TF clear"
  su $GITUSER -c 'git merge'
  # su $GITUSER -c 'git merge' && service cron stop && service cron start
  if [[ $? -ne 0 ]]; then
    echo "failed: git merge"
    exit 1
  fi
  su - $GITUSER -c "export SITE_ENV=$SITE_ENV; cd $PROJECT_DIR && npm run rebuild"
  if [[ $? -ne 0 ]]; then
    echo "failed: npm run rebuild"
    exit 2
  fi

  # Commented out as caching shouldn't be an issue with static sites (and disabled anyway)
  # service trafficserver stop && traffic_server -Cclear && service trafficserver start
  # if [[ $? -ne 0 ]]; then
  #   echo "failed: trafficserver clear & restart"
  #   exit 3
  # fi
fi

# TODO: make it conditional. Wasteful to run indexing regularly without any change in index.
su - $GITUSER -c "export SITE_ENV=$SITE_ENV; cd $PROJECT_DIR/apps/textsearch/ && npm ci && npm run index"

# update tweets
# su - $GITUSER -c "cd $PROJECT_DIR && npm run tweets -w frontend"

echo "done"
