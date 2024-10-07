#!/usr/bin/env bash
# Update the code from github
# then rebuild the site & search index.
# To be called from root cron job.

# the user who owns the git repo
GITUSER="gnoel"

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

LAST_COMMIT_LOCAL=$(su $GITUSER -c 'git rev-parse HEAD')
LAST_COMMIT_UPSTREAM=$(su $GITUSER -c 'git rev-parse @{u}')

if [[ $LAST_COMMIT_LOCAL != $LAST_COMMIT_UPSTREAM ]]; then
  echo "$(date --iso-8601=seconds) GH merge + TF clear"
  su $GITUSER -c 'git merge'
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
fi

# TODO: make it conditional. Wasteful to run indexing regularly without any change in index.
su - $GITUSER -c "export SITE_ENV=$SITE_ENV; cd $PROJECT_DIR/apps/textsearch/ && npm ci && npm run index"

echo "done"
