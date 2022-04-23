const setupShowHideButton = () => {
  const showHideDiv = document.getElementById("show-hide-button");
  let showDiv;
  chrome.storage.sync.get("showDiv", ({ showDiv: bool }) => {
    showDiv = bool;
    showHideDiv.checked = showDiv;
  });

  showHideDiv.addEventListener("click", () => {
    showDiv = !showDiv;
    showHideDiv.innerHTML = showDiv ? "Hide Div" : "Show Div";
    chrome.storage.sync.set({ showDiv });
  });
};

const setupBlurUntilHoveredButton = () => {
  const blurCheckbox = document.getElementById("blur-until-hover-checkbox");
  let blurUntilHovered;
  chrome.storage.sync.get("blurUntilHovered", ({ blurUntilHovered: bool }) => {
    blurUntilHovered = bool;
    blurCheckbox.checked = blurUntilHovered;
  });

  blurCheckbox.addEventListener("click", () => {
    blurUntilHovered = !blurUntilHovered;
    chrome.storage.sync.set({ blurUntilHovered });
  });
};

const main = () => {
  setupShowHideButton();
  setupBlurUntilHoveredButton();
};

document.addEventListener("DOMContentLoaded", main);
