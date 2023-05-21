module.exports = function () {
  // lcl|dev|stg|liv
  let environment = process.env.SITE_ENV || "lcl";
  let ret = {
    // TODO: harmonise the key notations, currently mixing camelCase & _
    comment:
      "This file contains global site settings. Use metadata.X to access them from templates.",
    live_domain: "https://thornton.kdl.kcl.ac.uk",
    siteTitle: "Alice Thornton's Books",
    date_format: "%e %B %Y",
    postsCategories: [
      {
        tag: "blog",
        label: "Blog",
      },
      {
        tag: "news",
        label: "News",
      },
      {
        tag: "posts",
        label: "Post",
      },
    ],
    people_teams: {
      sdt: "Solution Development Team",
      research: "Research Team",
      editorial: "Editorial Team",
    },
    authors: ["cbeattie", "strill", "showard", "jedge"],
    text_viewer: {
      source: {
        "https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/dts/dts.json":
          "AT SDTS (github)",
      },
      visible_documents: {},
      can_clone_panel: true,
    },
    environment: environment,
    // which of the above metadata to pass to front-end javascript
    // as window.metadata.X
    front_end_vars: ["text_viewer", "environment"],
  };

  if (environment != "liv") {
    ret["siteTitle"] += ` [${environment}]`;
  }

  if (environment == "lcl") {
    ret["text_viewer"]["source"] = {
      // "http://localhost:3000": "AT DTS (local:3000)",
      "http://192.168.0.48:3000": "AT DTS (local:3000)",
    };
  }
  if (environment == "stg") {
    ret["text_viewer"]["source"] = {
      "https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/e2023.05.21/dts.json":
        "AT DTS (stg)",
    };
  }
  if (environment == "liv") {
    ret["text_viewer"]["source"] = {
      "https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/e2023.05.21/dts.json":
        "AT DTS (liv)",
    };
  }

  if (["stg", "liv"].includes(environment)) {
    ret["text_viewer"]["visible_documents"] = {
      book_of_remembrances: [1, 20],
      book_one: [],
      book_two: [],
      book_three: [],
    };
    ret["text_viewer"]["can_clone_panel"] = false;
  }

  ret["front_end"] = {};
  for (let k of ret["front_end_vars"]) {
    ret["front_end"][k] = ret[k];
  }

  return ret;
};
