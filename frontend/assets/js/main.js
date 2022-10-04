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
