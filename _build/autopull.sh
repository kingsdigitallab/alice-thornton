#!/usr/bin/env bash
# git pull from the folder this script belongs.
# If there is a change, clear traffice server cache.
# This script is supposed to be executed by a root cron job.

# cd where this script is
cd $(dirname "$0")

echo "$(date --iso-8601=seconds) GH fetch"

su gnoel -c 'git fetch'
h1=$(git rev-parse HEAD)
h2=$(git rev-parse @{u})

if [[ $h1 != $h2 ]]; then
  echo "$(date --iso-8601=seconds) GH merge + TF clear"
  su gnoel -c 'git merge' && service trafficserver stop && traffic_server -Cclear && service trafficserver start
  if [[ $? -eq 0 ]]; then
    echo "done"
  else
    echo "failed"
  fi
fi
