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

module.exports = { lookup };
