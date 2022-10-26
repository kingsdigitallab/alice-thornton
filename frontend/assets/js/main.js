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
  });
}

setupCitationButton();
