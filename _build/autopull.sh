#!/usr/bin/env bash
# git pull from the folder this script belongs.
# If there is a change, clear traffice server cache.
# This script is supposed to be executed by a root cron job.

# the user who owns the git repo
GITUSER="gnoel"

# cd where this script is
cd $(dirname "$0")

echo "$(date --iso-8601=seconds) GH fetch"

su $GITUSER -c 'git fetch'
echo "$?"
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
  su - $GITUSER -c 'cd `pwd` && npm run rebuild'
  if [[ $? -ne 0 ]]; then
    echo "failed: npm run rebuild"
    exit 2
  fi
  
  service trafficserver stop && traffic_server -Cclear && service trafficserver start
  if [[ $? -ne 0 ]]; then
    echo "failed: trafficserver clear & restart"
    exit 3
  fi
fi

echo "done"
