"use strict";

const controller = require("../controllers/controller");
const settings = require("../settings.js");

module.exports = (app) => {
  for (let key of Object.keys(settings.services)) {
    app.route(settings.services[key]).get(controller[key]);
  }
};
