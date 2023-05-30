This app allows the display of high resolution images in the text viewer.

# Usage

- drop source tif images into the /in folder
- run the conversion script: `bash zoomify.sh`

# Input

- copy private high resolution tif images in the in folder (but do NOT share them or add them to github repo)

# Output

- /frontend/assets/img/books/viewer/zoomify/IMAGE/\*: zoomify tiles for each input IMAGE into
- /frontend/assets/img/books/viewer/zoomify/images.xml: single XML file with all image dimensions

# Methods

- vips is used to generate zoomify images & raw metadata

# Requirements

- vips: `sudo apt install libvips-tools`
