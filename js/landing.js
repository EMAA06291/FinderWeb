let activeButton = document.querySelector(".acButt[data-group='home']");
var sideBar = document.getElementsByClassName("nav-links-container")[0];
var menuIcon = document.getElementById("menuIcon");
var xIcon = document.getElementById("xICON");
const buttons = document.querySelectorAll(".acButt");
let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");
var sidebar = document.querySelector(".sidebar");
var customizeBtn = document.querySelector(".customize-btn");
var overlay = document.querySelector(".overlay");
//  nav nist active link handling
if (activeButton) {
  activeButton.classList.add("active");
}
buttons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    if (button !== activeButton && activeButton) {
      activeButton.classList.remove("active");
    }
  });
  button.addEventListener("mouseleave", () => {
    if (button !== activeButton && activeButton) {
      activeButton.classList.add("active");
    }
  });
});
// dark mode
const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") {
  enableDarkmode();
}

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

// swiper code js
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".home-projects-slider", {
    enabled: false,
    slidesPerView: 3,
    spaceBetween: 30,

    breakpoints: {
      991: {
        enabled: true,
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        enabled: true,
        slidesPerView: 2,
        spaceBetween: 20,
      },
      575: {
        enabled: true,
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    grabCursor: true,
  });
});

// side bar habdling close and open
menuIcon.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    sideBar.classList.remove("active");
  }
});

document.addEventListener("click", function (event) {
  if (!sideBar.contains(event.target) && event.target !== menuIcon) {
    sideBar.classList.remove("active");
  }
});

xIcon.addEventListener("click", function () {
  sideBar.classList.remove("active");
});
customizeBtn.addEventListener("click", function () {
  const isActive = sidebar.classList.toggle("active");

  if (isActive) {
    overlay.classList.add("show");
  } else {
    overlay.classList.remove("show");
  }
});

overlay.addEventListener("click", function () {
  sidebar.classList.remove("active");
  overlay.classList.remove("show");
});

document.addEventListener("click", function (event) {
  if (!sidebar.contains(event.target) && event.target !== customizeBtn) {
    sidebar.classList.remove("active");
  }
});
// custmizer color sidebarconst
const root = document.documentElement;

const defaultColors = {
  primary: "#d85151",
  success: "#33b36c",
  warning: "#fc9231",
  danger: "#f03d3d",
  info: "#3d7a81",
};

function loadSavedColors() {
  Object.keys(defaultColors).forEach((key) => {
    const savedColor = localStorage.getItem(`color-${key}`);
    const colorToUse = savedColor || defaultColors[key];
    root.style.setProperty(`--${key}`, colorToUse);
    document.getElementById(key + "Display").style.backgroundColor = colorToUse;
    document.getElementById(key + "Code").textContent = colorToUse;
    document.getElementById(key + "Color").value = colorToUse;
  });
}

function initColor(id) {
  const display = document.getElementById(id + "Display");
  const picker = document.getElementById(id + "Color");
  const code = document.getElementById(id + "Code");
  let initialColor =
    getComputedStyle(root).getPropertyValue(`--${id}`).trim() ||
    defaultColors[id];
  display.style.backgroundColor = initialColor;
  code.textContent = initialColor;
  picker.value = initialColor;
  root.style.setProperty(`--${id}`, initialColor);
  display.addEventListener("click", () => picker.click());
  picker.addEventListener("input", () => {
    const color = picker.value;
    display.style.backgroundColor = color;
    code.textContent = color;
    root.style.setProperty(`--${id}`, color);
    localStorage.setItem(`color-${id}`, color);
    applyTheme();
  });
}

function applyTheme() {
  const primaryColor = getComputedStyle(root).getPropertyValue("--primary").trim();
  document.querySelectorAll("button").forEach((btn) => {
    const originalColor = btn.getAttribute("data-original-color");
    if (originalColor === defaultColors.primary) {
      btn.style.backgroundColor = primaryColor;
    }
  });
}

function storeOriginalButtonColors() {
  document.querySelectorAll("button").forEach((btn) => {
    const bg = getComputedStyle(btn).backgroundColor;
    btn.setAttribute("data-original-color", rgbToHex(bg));
  });
}

function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g).map(Number);
  return (
    "#" +
    result
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toLowerCase()
  );
}

document.getElementById("resetBtn").addEventListener("click", () => {
  for (let key in defaultColors) {
    root.style.setProperty(`--${key}`, defaultColors[key]);
    document.getElementById(key + "Display").style.backgroundColor =
      defaultColors[key];
    document.getElementById(key + "Code").textContent = defaultColors[key];
    document.getElementById(key + "Color").value = defaultColors[key];
    localStorage.removeItem(`color-${key}`);
  }
  document.body.dir = "ltr";
  document.getElementById("rtlSwitch").checked = false;
  applyTheme();
});

document.getElementById("rtlSwitch").addEventListener("change", (e) => {
  document.body.dir = e.target.checked ? "rtl" : "ltr";
});

storeOriginalButtonColors();
loadSavedColors();
Object.keys(defaultColors).forEach((c) => initColor(c));
applyTheme();
