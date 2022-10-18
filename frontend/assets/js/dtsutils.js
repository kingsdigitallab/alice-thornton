"use strict";

(function (exports) {
  exports.fetchDTS = async function (panel, service, id, ref, format) {
    let url = getDTSUrl(panel, service, id, ref, format);
    return await _fetch(url, getFormatFromRequest(service, format));
  };

  function getFormatFromRequest(service, format) {
    let ret = "json";
    if (service == "documents") {
      ret = format || "tei";
    }
    return ret;
  }
  exports.getFormatFromRequest = getFormatFromRequest;

  function slugify(s) {
    return s.replace(new RegExp("[^\\w.]+", "g"), "-");
  }

  function getDTSUrl(panel, service, id, ref, format) {
    // The absolute path (URL or filesystem) to a DTS entry point
    let ret = panel.selections.source;
    if (!service) return ret;
    let isStatic = ret.endsWith(".json");
    ret = ret.replace(".json", "");

    ret = getServiceRootFromSource(ret);
    ret = `${ret}${panel.responses.entryPoint[service]}`;

    if (isStatic) {
      ret = ret.replace(/\/$/, "");
      if (service) {
        if (id) {
          ret += `/${slugify(id)}`;
        }
        if (ref) {
          ret += `/${slugify(ref)}`;
        }
      }

      ret += `.${getFormatFromRequest(service, format)}`;
    } else {
      ret += `?`;
      if (id) {
        ret += `&id=${id}`;
      }
      if (ref) {
        ret += `&ref=${ref}`;
      }
      if (service == "documents" && format && format != "tei") {
        ret += `&format=${format}`;
      }
    }
    return ret;
  }
  exports.getDTSUrl = getDTSUrl;

  function getServiceRootFromSource(str) {
    // The address to which service paths are relative.
    // returns the hostname if URL
    // returns str otherwise
    let ret = str;
    let url;
    try {
      url = new URL(str);
    } catch (_) {
      //
    }
    if (url && (url.protocol === "http:" || url.protocol === "https:")) {
      ret = url.origin;
    }
    return ret;
  }

  async function _fetch(url, format) {
    let ret = null;

    let gfetch = null;
    if (typeof fetch == "undefined") {
      gfetch = require("node-fetch");
    } else {
      gfetch = fetch;
    }

    console.log(`  FETCH ${url}`);

    let res = await gfetch(url);
    if (res && res.status == 200) {
      if (!format || format == "json") {
        ret = await res.json();
      } else {
        ret = await res.text();
      }
    }
    return ret;
  }
})(typeof exports === "undefined" ? (this["dtsutils"] = {}) : exports);
