// text of #citation-accessed = Current date
function setCurrentDate() {
  let element = document.getElementById("citation-accessed");
  if (element) {
    let format = { year: "numeric", month: "long", day: "numeric" };
    // TODO: localisestring
    element.textContent = new Date().toLocaleDateString("en-GB", format);
  }
}

setCurrentDate();

// toggle aria-expanded attribute value for collapsed menu

let hamburgerMenu = document.querySelector(".navbar-burger");

function toggleMenuAttr() {
  let iconState = document
    .querySelector(".navbar-burger")
    .getAttribute("aria-expanded");
  if (iconState === "false") {
    hamburgerMenu.setAttribute("aria-expanded", "true");
  } else {
    hamburgerMenu.setAttribute("aria-expanded", "false");
  }
}

hamburgerMenu.addEventListener("click", toggleMenuAttr);

// citation copy button
function setupCitationButton() {
  let button = document.querySelector(".box-citation button");
  if (!button) return;
  let citationBox = button.closest(".box-citation");
  if (!citationBox) return;
  let cite = citationBox.querySelector("cite");
  if (!cite) return;
  button.addEventListener("click", () => {
    navigator.clipboard.writeText(cite.innerText);
    let span = button.querySelector("span.button-text");
    if (span) span.innerHTML = "Copied";
  });
}

setupCitationButton();

function isLocusVisible(documentId, locus) {
  let ret = true;
  let rules = window.metadata.text_viewer.visible_documents[documentId];
  if (typeof rules !== "undefined") {
    let locusNumber = `${locus}`.match(/\d+/);
    if (locusNumber) {
      locusNumber = parseInt(locusNumber[0]);
      ret = locusNumber >= rules[0] && locusNumber <= rules[1];
    }
  }
  return ret;
}

window.isLocusVisible = isLocusVisible;
