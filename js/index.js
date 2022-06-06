//#region lib
function copyToClipboard(element) {
  var clipboardStorage = document.createElement("input");
  document.querySelector("body").appendChild(clipboardStorage);
  clipboardStorage.setAttribute("value", element.innerText);
  clipboardStorage.select();
  document.execCommand("copy");
  clipboardStorage.remove();
}
// Get os class for body. It used to fix macos scrollbar issue
let os = "Unknown";
if (navigator.appVersion.indexOf("Win") != -1) os = "windows";
if (navigator.appVersion.indexOf("Mac") != -1) os = "macos";
if (navigator.appVersion.indexOf("X11") != -1) os = "unix";
if (navigator.appVersion.indexOf("Linux") != -1) os = "linux";
document.body.classList.add("os-" + os);

const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const blockID = anchor.getAttribute("href").substr(1);
    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function bodyLock(con) {
  const scrollFix = window.innerWidth - document.body.clientWidth + "px";
  if (con === true) {
    document.body.classList.add("_lock");
    document.body.style.paddingRight = scrollFix;
  } else if (con === false) {
    document.body.classList.remove("_lock");
    document.body.style.paddingRight = 0;
  } else if (con === undefined) {
    if (!body.classList.contains("_lock")) {
      document.body.classList.add("_lock");
      document.body.style.paddingRight = scrollFix;
    } else {
      document.body.classList.remove("_lock");
      document.body.style.paddingRight = 0;
    }
  } else {
    console.error("Неопределенный аргумент у функции bodyLock()");
  }
}
//#endregion lib

// #region reviewsSlider
let reviewsSlider = new Splide(".splide", {
  classes: {
    arrows: "splide__arrows reviews-slider-arrows",
    arrow: "splide__arrow reviews-slider-arrow",
    prev: "splide__arrow--prev reviews-slider-prev",
    next: "splide__arrow--next reviews-slider-next",
    pagination: "splide__pagination reviews-slider-pagination", // container
    page: "splide__pagination__page reviews-slider-page", // each button
  },
  type: "loop",
  snap: true,
  perPage: 2,
  gap: "2rem",
  pagination: false,
  breakpoints: {
    767: {
      perPage: 1,
    },
  },
});

reviewsSlider.mount();

const reviewsProgressBar = document.querySelector(
  ".reviews-slider-progress-bar"
);
function updateSliderProgressBar(slider, bar) {
  let end = reviewsSlider.Components.Controller.getEnd() + 1;
  reviewsProgressBar.style.width =
    String((100 * (reviewsSlider.index + 1)) / end) + "%";
}
reviewsSlider.on("mounted move", function () {
  updateSliderProgressBar(reviewsSlider, reviewsProgressBar);
});
updateSliderProgressBar(reviewsSlider, reviewsProgressBar);
// #endregion reviewsSlider

const programmCard = document.querySelector(".programm-card__top");
programmCard.click();

poppa({
  pop: ".pop__callback",
  clickTrigger: [".header__button-callback"],
  // openedByDefault: true,
});

// #region validators
function validateInputText(input) {
  if (input.value == "") {
    return changeInutState(input, "invalid");
  } else {
    return changeInutState(input, "valid");
  }
}
const textInputs = document.querySelectorAll('.input[type="text"]');
textInputs.forEach((input) => {
  input.addEventListener("input", () => {
    validateInputText(input);
  });
});

function validateCheckbox(checkbox) {
  if (checkbox.checked) {
    checkbox.parentElement.classList.remove("input--invalid");
    return true;
  } else {
    checkbox.parentElement.classList.add("input--invalid");
    return false;
  }
}
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    validateCheckbox(checkbox);
  });
});

const telephoneInputs = document.querySelectorAll('input[type="tel"]');
telephoneInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.value != "+") {
      input.value = "+" + input.value.replace(/[^\d]/g, "");
      if (input.value.length > 8) {
        validatePhone(input);
      }
    } else if (input.value == "+") {
      input.value = "";
    }
  });
});

function changeInutState(input, state) {
  if (state == "invalid") {
    input.classList.add("input--invalid");
    if (input.parentElement.querySelector(".error-text")) {
      input.parentElement
        .querySelector(".error-text")
        .classList.add("error-text--visible");
    }
    return false;
  } else if (state == "valid") {
    input.classList.remove("input--invalid");
    if (input.parentElement.querySelector(".error-text")) {
      input.parentElement
        .querySelector(".error-text")
        .classList.remove("error-text--visible");
    }
    return true;
  }
}
function validatePhone(input) {
  if (input.value == "" || input.value.length < 8 || input.value.length > 18) {
    return changeInutState(input, "invalid");
  } else {
    return changeInutState(input, "valid");
  }
}

const phones = document.querySelectorAll(".phone");
phones.forEach((phone) => {
  phone.addEventListener("click", (event) => {
    if (window.innerWidth < 1024) return;
    event.preventDefault();
    copyToClipboard(phone);
    let phoneNumber = phone.innerText;
    let copiedText = phone.dataset.clickedText;
    phone.innerText = copiedText;
    setTimeout(() => {
      phone.innerText = phoneNumber;
    }, 5000);
  });
});

// #endregion validators

// #region form
const forms = document.querySelectorAll(".form");
forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    form.querySelectorAll("input").forEach((input) => {
      if (input.type === "tel") {
        validatePhone(input);
      }
      if (input.type === "text" && !input.disabled) {
        validateInputText(input);
      }
    });

    let invalidInputs = [...form.querySelectorAll(".input--invalid")];
    if (invalidInputs.length === 0) {
      console.log("valid");
    } else {
      console.log("invalid");
    }
  });
});
// #endregion form
