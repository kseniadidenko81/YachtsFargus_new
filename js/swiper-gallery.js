// SWIPER GALLERY SLIDER
var swiper = new Swiper(".mySwiper", {
  loop: true,
  spaceBetween: 10,
  slidesPerView: 4,
  watchSlidesProgress: true,
  freeMode: false,
  watchSlidesProgress: true,
  centeredSlides: false,
});

var swiper2 = new Swiper(".mySwiper2", {
  loop: true,
  spaceBetween: 10,
  loopedSlides: 10,
  centeredSlides: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
  on: {
    init: function () {
      updateCounter(this);
    },
    slideChange: function () {
      updateCounter(this);
    },
  },
});

function updateCounter(swiperInstance) {
  let realIndex = swiperInstance.realIndex + 1;
  let totalSlides = document.querySelectorAll(
    ".mySwiper2 .swiper-slide:not(.swiper-slide-duplicate)"
  ).length;

  document.querySelector(
    ".swiper-counter"
  ).innerText = `${realIndex} / ${totalSlides}`;
}

var fullscreenSwiper = new Swiper(".fullscreen-slider", {
  loop: true,
  loopedSlides: 10,
  centeredSlides: true,
  navigation: {
    nextEl: ".fullscreen-overlay .swiper-button-next",
    prevEl: ".fullscreen-overlay .swiper-button-prev",
  },
});

document.querySelectorAll(".zoom-container").forEach((container) => {
  const img = container.querySelector("img");
  const zoomLens = document.createElement("div");
  const zoomResult = document.createElement("div");

  zoomLens.classList.add("zoom-lens");
  zoomResult.classList.add("zoom-result");
  container.appendChild(zoomLens);
  container.appendChild(zoomResult);

  zoomResult.style.display = "none";
  zoomLens.style.display = "none";

  container.addEventListener("mouseenter", () => {
    zoomResult.style.backgroundImage = `url(${img.src})`;
    zoomResult.style.display = "block";
  });

  container.addEventListener("mousemove", (e) => {
    let rect = container.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let offsetY = e.clientY - rect.top;

    let lensSize = 100;
    let lensX = Math.max(
      0,
      Math.min(offsetX - lensSize / 2, rect.width - lensSize)
    );
    let lensY = Math.max(
      0,
      Math.min(offsetY - lensSize / 2, rect.height - lensSize)
    );

    zoomLens.style.left = `${lensX}px`;
    zoomLens.style.top = `${lensY}px`;
    zoomLens.style.display = "block";
    zoomResult.style.display = "block";

    let zoomX = (offsetX / rect.width) * 100;
    let zoomY = (offsetY / rect.height) * 100;

    zoomResult.style.backgroundPosition = `${zoomX}% ${zoomY}%`;
  });

  container.addEventListener("mouseleave", () => {
    zoomLens.style.display = "none";
    zoomResult.style.display = "none";
  });

  zoomResult.style.pointerEvents = "none";
});

document
  .querySelectorAll(".mySwiper2 .swiper-slide .icon-fullscreen")
  .forEach((img, index) => {
    img.addEventListener("click", () => {
      document.getElementById("fullscreen").style.display = "flex";
      fullscreenSwiper.slideToLoop(index, 0);
    });
  });

function closeFullscreen() {
  document.getElementById("fullscreen").style.display = "none";
}
