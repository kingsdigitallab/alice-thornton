"use strict";

const controller = require("../controllers/controller");

module.exports = (app) => {
  app.route("/").get(controller.root);
  app.route("/collections/").get(controller.collections);
  app.route("/navigation/").get(controller.navigation);
  app.route("/documents/").get(controller.documents);
};
