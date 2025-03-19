module.exports = function () {
  // lcl|dev|stg|pre|liv
  // stg: stg code and and dev data (used any other time)
  // pre: uses stg code and data    (used before a new live release)
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
      sdt: "KDL Solution Development Team",
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
      max_panels: 4,
      hide_print_link: false,
    },
    environment: environment,
    // hideEventsFromSearchPage: ["pre", "liv"].includes(environment),
    // hideEventsFromViewer: !["lcl", "dev"].includes(environment),
    hideEventsFromSearchPage: false,
    hideEventsFromViewer: false,
    // which of the above metadata to pass to front-end javascript
    // as window.metadata.X
    front_end_vars: [
      "text_viewer",
      "environment",
      "siteTitle",
      "hideEventsFromSearchPage",
    ],
  };

  if (environment != "liv") {
    ret["siteTitle"] += ` [${environment}]`;
  }

  if (environment == "lcl") {
    ret["text_viewer"]["source"] = {
      // "https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/dts-stg/dts.json":
      // "AT DTS (stg)",
      "http://localhost:3000": "AT DTS (local:3000)",
      // This is for debugging from a virtual machine (e.g. Mac with Safari) where the DTS is on the host
      // "http://10.0.2.2:3000": "AT DTS (local:3000)",
    };
  }
  if (environment == "pre") {
    ret["text_viewer"]["source"] = {
      "https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/dts-stg/dts.json":
        "AT DTS (stg)",
    };
  }
  if (environment == "liv") {
    ret["text_viewer"]["source"] = {
      "https://raw.githubusercontent.com/kingsdigitallab/alice-thornton/dts-liv/dts.json":
        "AT DTS (liv)",
    };
  }

  if (["pre", "liv"].includes(environment)) {
    // commented out as we now publish EVERYTHING!
    // ret["text_viewer"]["visible_documents"] = {
    //   book_of_remembrances: [1, 103],
    //   book_one: [1, 96],
    //   book_two: [1, 101],
    //   book_three: [1, 103],
    // };
    // ret["hideEventsFromSearchPage"] = true;
    // ret["text_viewer"]["hide_print_link"] = true;
    // ret["text_viewer"]["can_clone_panel"] = false;
  }

  ret["front_end"] = {};
  for (let k of ret["front_end_vars"]) {
    ret["front_end"][k] = ret[k];
  }

  return ret;
};
