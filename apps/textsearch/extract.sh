#!/usr/bin/env bash
DTS_BRANCH="dts"
if [[ "$SITE_ENV" == "liv" ]]; then
    DTS_BRANCH="dts-liv"
fi
rm -rf clone && git clone https://github.com/kingsdigitallab/alice-thornton.git -b $DTS_BRANCH --single-branch clone
