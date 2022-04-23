/* 
get showDiv from chrome storage.
if showDiv is true, send message to show div.
else dont send message.
*/
console.log("background_script started");
let showDiv;
chrome.storage.sync.get("showDiv", (result) => {
  console.log("result", result);
  showDiv = result.showDiv;
});

console.log("showDiv", showDiv);

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.message) {
    case "showDiv":
      chrome.storage.sync.get("showDiv", ({ showDiv }) => {
        sendResponse({ showDiv: showDiv });
      });
      break;
    case "blurUntilHovered":
      chrome.storage.sync.get("blurUntilHovered", ({ blurUntilHovered }) => {
        sendResponse({ blurUntilHovered });
      });
    default:
      break;
  }

  return true;
});
