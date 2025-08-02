let activeButton = document.querySelector(".acButt[data-group='home']"); 
if (activeButton) {
  activeButton.classList.add("active");
}
const buttons = document.querySelectorAll(".acButt");

let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

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

// --- End of Your Provided JS ---
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
        slidesPerView: 1,
        spaceBetween: 15,
      },
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    grabCursor: true,
  });
});
