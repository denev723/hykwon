$(document).ready(function () {
  var $panel = $("#allMenuPanel");
  var $inner = $panel.find(".sitemap__inner");

  var $toggle = $("#allMenuToggle");
  var $close = $("#allMenuClose");

  function openAllMenu() {
    $panel.addClass("is-active");
    $toggle.attr("aria-expanded", "true");
  }

  function closeAllMenu() {
    $panel.removeClass("is-active");
    $toggle.attr("aria-expanded", "false");
  }

  $toggle.on("click", function (e) {
    e.preventDefault();
    if ($panel.hasClass("is-active")) {
      closeAllMenu();
    } else {
      openAllMenu();
    }
  });

  $close.on("click", function (e) {
    e.preventDefault();
    closeAllMenu();
  });

  $panel.on("click", function (e) {
    if ($(e.target).closest($inner).length === 0) {
      closeAllMenu();
    }
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $panel.hasClass("is-active")) {
      closeAllMenu();
    }
  });

  var $userMenu = $("#userMenuToggle");
  var $userMenuButton = $userMenu.find(".site-header__profile-btn");
  var desktopHoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

  function isDesktopHover() {
    return desktopHoverQuery.matches;
  }

  function openUserMenu() {
    $userMenu.addClass("is-active");
    $userMenuButton.attr("aria-expanded", "true");
  }

  function closeUserMenu() {
    $userMenu.removeClass("is-active");
    $userMenuButton.attr("aria-expanded", "false");
  }

  function toggleUserMenu() {
    if ($userMenu.hasClass("is-active")) {
      closeUserMenu();
    } else {
      openUserMenu();
    }
  }

  $userMenu.on("mouseenter", function () {
    if (isDesktopHover()) {
      openUserMenu();
    }
  });

  $userMenu.on("mouseleave", function () {
    if (isDesktopHover()) {
      closeUserMenu();
    }
  });

  $userMenuButton.on("click", function (e) {
    if (!isDesktopHover()) {
      e.preventDefault();
      toggleUserMenu();
    }
  });

  $(document).on("click", function (e) {
    if (
      !isDesktopHover() &&
      $userMenu.hasClass("is-active") &&
      $(e.target).closest($userMenu).length === 0
    ) {
      closeUserMenu();
    }
  });

  var $siteNav = $(".site-header__nav");
  var $navCover = $siteNav.find(".site-header__nav-cover");
  var $submenus = $(".site-header__submenu");
  var $menuItems = $(".site-header__menu-item");

  function updateNavCoverHeight() {
    var maxHeight = 0;

    $submenus.each(function () {
      var height = $(this).outerHeight();

      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    $navCover.height(maxHeight);
  }

  function openFixedNav() {
    updateNavCoverHeight();
    $("body").addClass("is-fixed-nav");
  }

  function closeFixedNav() {
    $("body").removeClass("is-fixed-nav");
    $menuItems.removeClass("is-active");
  }

  function activateMenuItem($item) {
    $menuItems.removeClass("is-active");
    $item.addClass("is-active");
  }

  function deactivateMenuItem($item) {
    $item.removeClass("is-active");
  }

  $siteNav.on("mouseenter", function () {
    if (isDesktopHover()) {
      openFixedNav();
    }
  });

  $siteNav.on("mouseleave", function () {
    if (isDesktopHover()) {
      closeFixedNav();
    }
  });

  $menuItems.on("mouseenter", function () {
    if (isDesktopHover()) {
      activateMenuItem($(this));
    }
  });

  $menuItems.on("mouseleave", function () {
    if (isDesktopHover()) {
      deactivateMenuItem($(this));
    }
  });

  $(window).on("resize", function () {
    updateNavCoverHeight();
  });

  updateNavCoverHeight();

  if (typeof Swiper !== "undefined") {
    if ($(".review-swiper").length) {
      new Swiper(".review-swiper", {
        slidesPerView: "auto",
        watchOverflow: true,
        navigation: {
          prevEl: ".review-swiper__prev",
          nextEl: ".review-swiper__next",
        },
      });
    }

    if ($(".donor-swiper").length) {
      new Swiper(".donor-swiper", {
        slidesPerView: "auto",
        watchOverflow: true,
        navigation: {
          prevEl: ".donor-swiper__prev",
          nextEl: ".donor-swiper__next",
        },
        pagination: {
          el: ".donor-swiper__pagination",
          clickable: true,
        },
      });
    }

    if ($(".usage-swiper").length) {
      new Swiper(".usage-swiper", {
        slidesPerView: "auto",
        watchOverflow: true,
        navigation: {
          prevEl: ".usage-swiper__prev",
          nextEl: ".usage-swiper__next",
        },
        pagination: {
          el: ".usage-swiper__pagination",
          clickable: true,
        },
      });
    }

    if ($(".news-swiper").length) {
      new Swiper(".news-swiper", {
        slidesPerView: "auto",
        watchOverflow: true,
        navigation: {
          prevEl: ".news-swiper__prev",
          nextEl: ".news-swiper__next",
        },
        pagination: {
          el: ".news-swiper__pagination",
          clickable: true,
        },
      });
    }
  }
});
