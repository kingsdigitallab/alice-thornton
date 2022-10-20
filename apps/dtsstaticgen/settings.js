module.exports = {
  // The URL of the dyanmic DTS entry point to download the responses from.
  source: "http://localhost:3000",
  // Path on your local filesystem where the responses will be downloaded.
  // Must have a .json extension.
  local: `${__dirname}/../../dts.json`,
  // Absolute URL of the Static DTS entry point where the responses will be uploaded.
  // Must end with a .json exension.
  target: `https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/develop/dts.json`,
  // target: `http://localhost:5500/alice-thornton/dts.json`,
  // array of Document output formats (see DTS spec.)
  formats: ["html"],
  // if true the local folder will be emptied before generating content
  clear: true,
};
