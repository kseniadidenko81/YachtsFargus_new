$(function () {
  // AOS ANIMATION
  AOS.init({
    disable: "mobile",
    duration: 800,
    anchorPlacement: "center-bottom",
  });

  // SCROLLED MENU

  document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
      if (window.scrollY > 5) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  });

  // SLIDER
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((sliderElement) => {
    const prevBtn = sliderElement
      .closest(".slider-container")
      .querySelector(".prev-btn");
    const nextBtn = sliderElement
      .closest(".slider-container")
      .querySelector(".next-btn");
    const slides = sliderElement.querySelectorAll(".slide");

    let currentIndex = 0;

    function updateSlider() {
      const slideWidth = slides[0].offsetWidth + 20;
      sliderElement.style.transform = `translateX(-${
        currentIndex * slideWidth
      }px)`;
      updateArrowColors();
    }

    function updateArrowColors() {
      if (currentIndex === 0) {
        prevBtn.style.backgroundColor = "rgba(204, 204, 204, 0)";
        prevBtn.style.cursor = "not-allowed";
      } else {
        prevBtn.style.backgroundColor = "rgba(0, 0, 0, 0.03)";
        prevBtn.style.cursor = "pointer";
      }

      if (currentIndex >= slides.length - visibleSlides()) {
        nextBtn.style.backgroundColor = "rgba(204, 204, 204, 0)";
        nextBtn.style.cursor = "not-allowed";
      } else {
        nextBtn.style.backgroundColor = "rgba(0, 0, 0, 0.03)";
        nextBtn.style.cursor = "pointer";
      }
    }

    nextBtn.addEventListener("click", () => {
      if (currentIndex < slides.length - visibleSlides()) {
        currentIndex++;
        updateSlider();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    function visibleSlides() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1280) return 5;
      if (screenWidth >= 1024) return 4;
      if (screenWidth >= 768) return 3;
      if (screenWidth >= 480) return 2;
      return 1;
    }

    window.addEventListener("resize", () => {
      updateSlider();
    });

    window.addEventListener("load", () => {
      updateSlider();
    });
  });

  // FORM (INPUT + BTN)
  $(function () {
    $("input").on("input", function () {
      var $input = $(this);
      var $label = $input.siblings("label");

      if ($input.val()) {
        $label.addClass("hidden-label");
      } else {
        $label.removeClass("hidden-label");
      }
    });
  });

  $(function () {
    $("#contact-form").on("submit", function (event) {
      event.preventDefault();

      $("#response-message")
        .fadeIn(500)
        .text("Thank you! We will contact you soon.");

      $("#submit-btn").html(
        '<span class="check-icon"></span> <span class="text-button">Sent</span>'
      );

      setTimeout(function () {
        $("#response-message").fadeOut(500);

        $("#submit-btn").html("Send");
      }, 15000);

      $(this).trigger("reset");
    });
  });

  // BACK TO TOP
  $(function () {
    $(window).on("scroll", function () {
      toggleBackToTopBtn();
    });

    function toggleBackToTopBtn() {
      const $backToTopBtn = $("#backToTopBtn");
      if ($(window).scrollTop() > 200) {
        $backToTopBtn.fadeIn();
      } else {
        $backToTopBtn.fadeOut();
      }
    }

    $("#backToTopBtn").on("click", function () {
      $("html, body").animate({ scrollTop: 0 }, "smooth");
    });
  });
});

//  Go to page
$(function () {
  $(".navbar-nav .nav-link").on("click", function (event) {
    event.preventDefault();

    var targetPage = $(this).attr("href");

    if (targetPage !== "#") {
      window.location.href = targetPage;
    }
  });
});

// ANCHOR
document
  .querySelector("#scroll-to-footer .smoothScroll")
  .addEventListener("click", function (event) {
    event.preventDefault();

    let targetId = this.getAttribute("data-target");

    if (!targetId || targetId === "#") return;

    let targetSection = document.querySelector(targetId);

    if (targetSection) {
      let navbarHeight = 49;
      let targetPosition =
        targetSection.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    } else {
      console.error("Target section not found:", targetId);
    }
  });
