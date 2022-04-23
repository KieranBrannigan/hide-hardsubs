const resizableDivHtml = `
<div id="resizable-opaque-div" class='resizable'>
  <div class='resizers'>
    <div class='resizer top-left'></div>
    <div class='resizer top-right'></div>
    <div class='resizer bottom-left'></div>
    <div class='resizer bottom-right'></div>
  </div>
</div>
`;

const addDivToBody = (resizableDivHtmlString) => {
  document.body.insertAdjacentHTML("beforeend", resizableDivHtmlString);
};

/*Make resizable div by Hung Nguyen*/
function makeResizableDiv(divSelector) {
  const element = document.querySelector(divSelector);
  const resizers = document.querySelectorAll(divSelector + " .resizer");
  const minimum_size = 20;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0; i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener("mousedown", function (e) {
      e.preventDefault();
      e.stopPropagation();
      original_width = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue("width")
          .replace("px", "")
      );
      original_height = parseFloat(
        getComputedStyle(element, null)
          .getPropertyValue("height")
          .replace("px", "")
      );
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResize);
    });

    function resize(e) {
      if (currentResizer.classList.contains("bottom-right")) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + "px";
        }
        if (height > minimum_size) {
          element.style.height = height + "px";
        }
      } else if (currentResizer.classList.contains("bottom-left")) {
        const height = original_height + (e.pageY - original_mouse_y);
        const width = original_width - (e.pageX - original_mouse_x);
        if (height > minimum_size) {
          element.style.height = height + "px";
        }
        if (width > minimum_size) {
          element.style.width = width + "px";
          element.style.left = original_x + (e.pageX - original_mouse_x) + "px";
        }
      } else if (currentResizer.classList.contains("top-right")) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + "px";
        }
        if (height > minimum_size) {
          element.style.height = height + "px";
          element.style.top = original_y + (e.pageY - original_mouse_y) + "px";
        }
      } else {
        const width = original_width - (e.pageX - original_mouse_x);
        const height = original_height - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + "px";
          element.style.left = original_x + (e.pageX - original_mouse_x) + "px";
        }
        if (height > minimum_size) {
          element.style.height = height + "px";
          element.style.top = original_y + (e.pageY - original_mouse_y) + "px";
        }
      }
    }

    function stopResize() {
      window.removeEventListener("mousemove", resize);
    }
  }
}

const hideResizers = (el) => {
  // when element is double clicked, hide the resizers
  el.addEventListener("click", (e) => {
    console.log("clicked!");
    if (e.detail === 2) {
      console.log("double clicked!");
      e.preventDefault();
      e.stopPropagation();
      const resizers = el.querySelectorAll(".resizer");
      resizers.forEach((resizer) => {
        if (resizer.style.display === "none") {
          resizer.style.display = "block";
        } else {
          resizer.style.display = "none";
        }
      });
    }
  });
};

// Make the DIV element draggable:
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  // otherwise, move the DIV from anywhere inside the DIV:
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
const main = () => {
  addDivToBody(resizableDivHtml);

  const divSelector = "#resizable-opaque-div";
  const resizableDiv = document.querySelector(divSelector);
  console.log("resizableDiv", resizableDiv);

  makeResizableDiv(divSelector);
  dragElement(resizableDiv);
  hideResizers(resizableDiv);
};

const makeBlurUntilHovered = (divSelector) => {
  const div = document.querySelector(divSelector);
  div.addEventListener("mouseover", (e) => {
    div.classList.remove("blur");
  });
  div.addEventListener("mouseout", (e) => {
    div.classList.add("blur");
  });
};

const makeOpaque = (divSelector) => {
  const div = document.querySelector(divSelector);
  div.style.backgroundColor = "pink";
};

const setupBlurUntilHovered = (blurUntilHovered) => {
  const divSelector = "#resizable-opaque-div";
  const resizableDiv = document.querySelector(divSelector);
  console.log("resizableDiv", resizableDiv);

  blurUntilHovered
    ? makeBlurUntilHovered(divSelector)
    : makeOpaque(divSelector);
};

const requestShowDiv = () => {
  chrome.runtime.sendMessage({ message: "showDiv" }, ({ showDiv }) => {
    console.log("showDiv", showDiv);
    if (showDiv) {
      main();
    }
  });
  chrome.runtime.sendMessage(
    { message: "blurUntilHovered" },
    ({ blurUntilHovered }) => {
      console.log("blurUntilHovered", blurUntilHovered);
      setupBlurUntilHovered(blurUntilHovered);
    }
  );
};

requestShowDiv();
