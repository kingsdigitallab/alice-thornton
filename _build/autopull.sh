#!/usr/bin/env bash
# git pull from the folder this script belongs.
# If there is a change, clear traffice server cache.
# This script is supposed to be executed by a root cron job.

# the user who owns the git repo
GITUSER="gnoel"

# cd where this script is
cd $(dirname "$0")

echo "$(date --iso-8601=seconds) GH fetch"

su $GITUSER -c 'id && git fetch'
echo "$?"
if [[ $? -ne 0 ]]; then
  echo "failed: git fetch"
  exit
fi

h1=$(su $GITUSER -c 'git rev-parse HEAD')
h2=$(su $GITUSER -c 'git rev-parse @{u}')

if [[ $h1 == $h2 ]]; then
  echo "$(date --iso-8601=seconds) GH merge + TF clear"
  su $GITUSER -c 'git merge' && service trafficserver stop && traffic_server -Cclear && service trafficserver start
  # su $GITUSER -c 'git merge' && service cron stop && service cron start
  if [[ $? -eq 0 ]]; then
    echo "done"
  else
    echo "failed: git merge OR TS restart"
  fi
fi
