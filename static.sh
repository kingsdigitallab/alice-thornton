#!/bin/bash 

# 1. Kill any lingering DTS server
source .dts.pid
if [ $? -eq 0 ]; then
  echo "existing pid=${DTSPID}"
  kill -9 "${DTSPID}" 2> /dev/null
  if [ $? -eq 0 ]; then
    echo "WARNING: Killed pre-existing DTS server ${DTSPID}"
  else
    ps -p ${DTSPID} > /dev/null
    PSSTATUS=$?
    if [ $PSSTATUS -eq 0 ]; then
      echo "ERROR: failed to kill pre-existing DTS server ${DTSPID}"
      exit 3
    elif [ $PSSTATUS -eq 1 ]; then
      echo "WARNING: Previous DTS server no longer running ${DTSPID}"
    else
      echo "ERROR: ps returns wrong status for previous DTS server ${DTSPID}"
      exit 4
    fi
  fi
fi

# 2. Start a new DTS server
mkdir -p .corpus
npx kdl-dts-server settings-server.json &
DTSPID=$!
if [ $? -ne 0 ]; then
  echo "ERROR: failed to start DTS server"
  exit 1
fi

# 3. Static DTS generation
ps -p ${DTSPID} > /dev/null
if [ $? -eq 0 ]; then
  echo "DTSPID=${DTSPID}" > .dts.pid
  echo "new pid=${DTSPID}"

  
  sleep 4
  npx kdl-dts-static settings-static.json

  kill $DTSPID
  if [ $? -ne 0 ]; then
    echo "ERROR: could not kill DTS server"
  fi
else
   echo "ERROR: server failed to start ($DTSPID)"
   exit 2
fi

# rm .dts.pid
