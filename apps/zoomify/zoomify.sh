#!/usr/bin/env bash

OUTROOT="../../frontend/assets/img/books/viewer"

if [[ ! -d "$OUTROOT" ]]; then
    echo "TARGET PATH not found: $OUTROOT"
    exit 1
fi

OUTROOT="$OUTROOT/zoomify"
rm -rf $OUTROOT
mkdir -p $OUTROOT

XMLPATH="$OUTROOT/images.xml"

echo "<root>" > $XMLPATH

export VIPS_WARNING=1

for FILE in in/*tif; do
    FILENAME="${FILE##*/}"
    FILENAMENOEXT="${FILENAME%.*}"
    OUTPATH="$OUTROOT/$FILENAMENOEXT"
    echo "$OUTPATH"
    vips dzsave $FILE "$OUTPATH" --layout zoomify

    sed "s/IMAGE_PROPERTIES/IMAGE_PROPERTIES FILE=\"$FILENAME\"/g" "$OUTPATH/ImageProperties.xml" >> $XMLPATH
done

echo "</root>" >> $XMLPATH
