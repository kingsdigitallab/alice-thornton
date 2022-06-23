const path = require("node:path");
const sass = require("sass");
const debug = require("debug")("Eleventy:KDL");

function lookup(anarray, path_to_property, accepted_values) {
  // returns array with elements of anarray st <element>.<path_to_property belongs> to <accepted_values>
  // accepted values can be an array or a literal
  // If accepted_values is 'ALL', returns anarray
  if (accepted_values === "ALL") {
    return anarray;
  }

  path_to_property = path_to_property
    .replace(/(^\.)|(\.$)/g, "")
    .split(".")
    .filter((v) => v.length);

  if (accepted_values.constructor !== Array) {
    accepted_values = [accepted_values];
  }

  return anarray.filter(function (item) {
    //console.log(path_to_property);
    let values = [item];
    if (path_to_property.length) {
      values = path_to_property.reduce((o, i) => o[i], item);
      if (values.constructor !== Array) {
        values = [values];
      }
    }
    return values.filter((v) => accepted_values.includes(v)).length > 0;
  });
}

function configureSass(config) {
  /* Convert *.scss -> *.css 
  Ignores _*.scss files.
  (see https://www.11ty.dev/docs/languages/custom/#using-inputpath)
  (alternative https://www.npmjs.com/package/eleventy-sass?activeTab=readme)
  */

  // refresh the browser when your CSS changes,
  // without triggering a rebuild of all your pages by Eleventy.
  // config.setBrowserSyncConfig({
  // 	files: './_site/**/*.css'
  // });
  config.addTemplateFormats("scss");

  // Creates the extension for use
  config.addExtension("scss", {
    outputFileExtension: "css",
    read: false,

    // `compile` is called once per .scss file in the input directory
    compile: async function (content, inputPath) {
      let parsed = path.parse(inputPath);
      debug(inputPath);
      if (parsed.name.startsWith("_")) {
        debug("return");
        return;
      }
      debug(parsed.name);
      // let res = sass.compileString(content);
      let res = sass.compile(inputPath);

      // debug(res.css)

      // This is the render function, `data` is the full data cascade
      return async () => {
        return res.css;
      };
    },
  });
}

module.exports = { lookup, configureSass };
