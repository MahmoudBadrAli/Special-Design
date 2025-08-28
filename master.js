// DOM Elements
const landingPage = document.querySelector(".landing-page");
const bg1 = document.querySelector(".bg1");
const bg2 = document.querySelector(".bg2");
const toToBtn = document.querySelector(".scroll-to-top");
const bulletsSpan = document.querySelectorAll(".bullets-option span");
const toTopSpan = document.querySelectorAll(".to-top-option span");
const bulletscontainer = document.querySelector(".nav-bullets");
const colorsLi = Array.from(document.querySelectorAll(".colors-list li"));
const randomBaclEl = Array.from(
  document.querySelectorAll(".random-backgrounds span")
);
const colorsList = Array.from(document.querySelectorAll(".colors-list li"));
const ourSkills = document.querySelector(".skills");
const ourGallery = document.querySelectorAll(".gallery img");
const timelineItems = document.querySelectorAll(".timeline .content");
const allLinks = document.querySelectorAll(".links a");
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const toggleBtn = document.querySelector(".toggle-menu");
const tlinks = document.querySelector(".links");
const logos = Array.from(document.querySelectorAll(".header-area .logo"));

// Configuration Variables
let backgroundOption = true;
let backgroundInterval;
let showingBg1 = true;
const imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// LocalStorage Items
const bulletLocalItem = localStorage.getItem("bullets_option");
const backgroundLocalItem = localStorage.getItem("background_option");
const mainColor = localStorage.getItem("color_option");
const savedImage = localStorage.getItem("background_image");
const toTopItem = localStorage.getItem("toTop_option");

// Color Theme Setup
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  colorsLi.forEach((li) => li.classList.remove("active"));
  document.querySelector(`[data-color="${mainColor}"]`).classList.add("active");
}

colorsList.forEach((li) => (li.style.backgroundColor = li.dataset.color));

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

// Background Settings
if (backgroundLocalItem !== null) {
  randomBaclEl.forEach((span) => span.classList.remove("active"));

  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    randomBaclEl[0].classList.add("active");
  } else {
    backgroundOption = false;
    randomBaclEl[1].classList.add("active");
  }
}

randomBaclEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

if (savedImage !== null) {
  bg1.style.backgroundImage = savedImage;
  bg1.style.opacity = "1";
  bg2.style.opacity = "0";
}

function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * imagesArray.length);
      const nextImage = `url(images/${imagesArray[randomNumber]})`;
      localStorage.setItem("background_image", nextImage);

      if (showingBg1) {
        bg2.style.backgroundImage = nextImage;
        bg2.style.opacity = "1";
        bg1.style.opacity = "0";
      } else {
        bg1.style.backgroundImage = nextImage;
        bg1.style.opacity = "1";
        bg2.style.opacity = "0";
      }
      showingBg1 = !showingBg1;
    }, 10000);
  }
}

// Logo Management
logos.forEach((logo) => (logo.style.display = "none"));
logos[0].style.display = "block";

setInterval(() => {
  const randomLogo = logos[Math.floor(Math.random() * logos.length)];
  logos.forEach((logo) => (logo.style.display = "none"));
  randomLogo.style.display = "block";
}, 10000);

// Bullets Settings
if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => span.classList.remove("active"));

  if (bulletLocalItem === "block") {
    bulletscontainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletscontainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletscontainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletscontainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// Scroll to Top Settings
if (toTopItem !== null) {
  toTopSpan.forEach((span) => span.classList.remove("active"));

  if (toTopItem === "block") {
    toToBtn.style.display = "block";
    document.querySelector(".to-top-option .yes").classList.add("active");
  } else {
    toToBtn.style.display = "none";
    document.querySelector(".to-top-option .no").classList.add("active");
  }
}

toTopSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      toToBtn.style.display = "block";
      localStorage.setItem("toTop_option", "block");
    } else {
      toToBtn.style.display = "none";
      localStorage.setItem("toTop_option", "none");
    }
    handleActive(e);
  });
});

// Event Handlers
document
  .querySelector(".toggle-settings .set")
  .addEventListener("click", function () {
    this.classList.toggle("fa-spin");
    this.parentElement.parentElement.classList.toggle("open");
  });

window.onscroll = function () {
  const skillsOffsetTop = ourSkills.offsetTop;
  const skillsOuterHeight = ourSkills.offsetHeight;
  const windowHeight = this.innerHeight;
  const windowScrollTop = this.pageYOffset;

  if (
    windowScrollTop >
    skillsOffsetTop + skillsOuterHeight - windowHeight - 55
  ) {
    const allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }

  if (window.scrollY >= 600) {
    toToBtn.style.opacity = "1";
    toToBtn.style.visibility = "visible";
    bulletscontainer.style.visibility = "visible";
    bulletscontainer.style.opacity = "1";
  } else {
    toToBtn.style.opacity = "0";
    toToBtn.style.visibility = "hidden";
    bulletscontainer.style.visibility = "hidden";
    bulletscontainer.style.opacity = "0";
  }
};

toToBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Gallery Popup
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    const overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    const popupBox = document.createElement("div");
    popupBox.className = "popup-box hide";

    if (img.alt !== null) {
      const imgHeading = document.createElement("h3");
      const imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }

    const popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    const closeButton = document.createElement("span");
    const closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);

    document.body.classList.add("noscroll");
    setTimeout(() => {
      popupBox.classList.remove("hide");
      popupBox.classList.add("show");
    }, 10);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    const popup = e.target.parentNode;
    const overlay = document.querySelector(".popup-overlay");

    popup.classList.remove("show");
    popup.classList.add("hide");

    popup.addEventListener("transitionend", () => {
      popup.remove();
      overlay.remove();
      document.body.classList.remove("noscroll");
    });
  }
});

// Navigation
function goTo(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

goTo(allLinks);
goTo(allBullets);

toggleBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tlinks.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tlinks) {
    if (tlinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tlinks.classList.toggle("open");
    }
  }
});

tlinks.addEventListener("click", (e) => e.stopPropagation());

// Timeline Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

timelineItems.forEach((item) => observer.observe(item));

// Helper Functions
function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  event.target.classList.add("active");
}

document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("background_image");
  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("toTop_option");
  window.location.reload();
};

// Initialize
randomizeImgs();
