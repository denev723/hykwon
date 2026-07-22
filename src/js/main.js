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
  var desktopNavQuery = window.matchMedia("(min-width: 769px)");

  function isDesktopHover() {
    return desktopHoverQuery.matches;
  }

  function isDesktopNav() {
    return desktopNavQuery.matches;
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
    if (isDesktopNav()) {
      openFixedNav();
    }
  });

  $siteNav.on("mouseleave", function () {
    if (isDesktopNav()) {
      closeFixedNav();
    }
  });

  $menuItems.on("mouseenter", function () {
    if (isDesktopNav()) {
      activateMenuItem($(this));
    }
  });

  $menuItems.on("mouseleave", function () {
    if (isDesktopNav()) {
      deactivateMenuItem($(this));
    }
  });

  $(window).on("resize", function () {
    updateNavCoverHeight();

    if (!isDesktopNav()) {
      closeFixedNav();
    }
  });

  updateNavCoverHeight();

  var $todaySection = $(".main-section--today");

  if ($todaySection.length) {
    $todaySection.on("click", ".main-section__tabs-link", function (e) {
      e.preventDefault();

      var $link = $(this);
      var panelId = $link.attr("href");

      if ($link.hasClass("is-active") || !panelId) {
        return;
      }

      $todaySection
        .find(".main-section__tabs-link")
        .removeClass("is-active")
        .attr("aria-selected", "false");
      $link.addClass("is-active").attr("aria-selected", "true");

      $todaySection.find(".main-section__panel").each(function () {
        var $panel = $(this);
        var isMatch = "#" + $panel.attr("id") === panelId;

        $panel.toggleClass("is-active", isMatch);
        $panel.prop("hidden", !isMatch);
      });
    });
  }

  var $faq = $(".board-faq");

  $faq.on("click", ".board-faq__item-button", function () {
    var $item = $(this).closest(".board-faq__item");
    var $content = $item.find(".board-faq__item-content");

    if ($item.hasClass("is-active")) {
      $item.removeClass("is-active");
      $content.stop(true, true).slideUp(300);
    } else {
      var $openSiblings = $item.siblings(".board-faq__item.is-active");
      $openSiblings.removeClass("is-active");
      $openSiblings.find(".board-faq__item-content").stop(true, true).slideUp(300);

      $item.addClass("is-active");
      $content.stop(true, true).slideDown(300);
    }
  });

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

    if ($(".project-summary-swiper").length) {
      new Swiper(".project-summary-swiper", {
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        watchOverflow: true,
        spaceBetween: 40,
        watchOverflow: true,
      });
    }

    var $newsSection = $(".main-section--news");

    function createNewsSwiper(el) {
      var $panel = $(el).closest(".main-section__panel");

      return new Swiper(el, {
        slidesPerView: "auto",
        watchOverflow: true,
        navigation: {
          prevEl: $panel.find(".news-swiper__prev")[0],
          nextEl: $panel.find(".news-swiper__next")[0],
        },
        pagination: {
          el: $panel.find(".news-swiper__pagination")[0],
          type: "fraction",
          formatFractionCurrent: function (number) {
            return String(number).padStart(2, "0");
          },
          formatFractionTotal: function (number) {
            return String(number).padStart(2, "0");
          },
        },
      });
    }

    function ensureNewsSwiper($panel) {
      var el = $panel.find(".news-swiper")[0];

      if (!el) {
        return;
      }

      if (el.swiper) {
        el.swiper.update();
        return;
      }

      createNewsSwiper(el);
    }

    if ($newsSection.length) {
      ensureNewsSwiper($newsSection.find(".main-section__panel.is-active"));

      $newsSection.on("click", ".main-section__tabs-link", function (e) {
        e.preventDefault();

        var $link = $(this);
        var panelId = $link.attr("href");

        if ($link.hasClass("is-active") || !panelId) {
          return;
        }

        $newsSection
          .find(".main-section__tabs-link")
          .removeClass("is-active")
          .attr("aria-selected", "false");
        $link.addClass("is-active").attr("aria-selected", "true");

        $newsSection.find(".main-section__panel").each(function () {
          var $panel = $(this);
          var isMatch = "#" + $panel.attr("id") === panelId;

          $panel.toggleClass("is-active", isMatch);
          $panel.prop("hidden", !isMatch);
        });

        ensureNewsSwiper($newsSection.find(panelId));
      });
    }
  }

  var $donorList = $(".donor-list");
  var $donorModal = $("#donorListModal");

  if ($donorList.length && $donorModal.length) {
    var $donorModalImage = $("#donorListModalImage");
    var $donorModalTitle = $("#donorListModalTitle");
    var $donorModalInfo = $("#donorListModalInfo");
    var $donorModalMessage = $("#donorListModalMessage");
    var $donorModalTrigger = null;

    function openDonorModal($card) {
      var name = $card.data("name") || "";
      var info = $card.data("info") || "";
      var image = $card.data("image") || "";
      var message = $card.data("message") || "";

      $donorModalTitle.text(name);
      $donorModalInfo.text(info);
      $donorModalMessage.text(message);
      $donorModalImage.attr("src", image).attr("alt", name);

      $donorModalTrigger = $card;
      $donorModal.addClass("is-active").attr("aria-hidden", "false");
      $donorModal.find(".donor-list-modal__close").trigger("focus");
    }

    function closeDonorModal() {
      if (!$donorModal.hasClass("is-active")) {
        return;
      }

      $donorModal.removeClass("is-active").attr("aria-hidden", "true");

      if ($donorModalTrigger && $donorModalTrigger.length) {
        $donorModalTrigger.trigger("focus");
      }

      $donorModalTrigger = null;
    }

    $donorList.on("click", ".donor-list-card", function (e) {
      e.preventDefault();
      openDonorModal($(this));
    });

    $donorModal.on("click", "[data-modal-close]", function (e) {
      e.preventDefault();
      closeDonorModal();
    });

    $(document).on("keydown", function (e) {
      if (e.key === "Escape" && $donorModal.hasClass("is-active")) {
        closeDonorModal();
      }
    });
  }

  var $donorMessageList = $(".donor-message__list");

  if ($donorMessageList.length && typeof Masonry !== "undefined") {
    var donorMessageMasonry = null;
    var donorMessageDesktopQuery = window.matchMedia("(min-width: 769px)");

    function initDonorMessageMasonry() {
      if (donorMessageMasonry) {
        return;
      }

      donorMessageMasonry = new Masonry($donorMessageList[0], {
        itemSelector: ".donor-message__item",
        columnWidth: ".donor-message__item",
        percentPosition: true,
        gutter: 20,
      });
    }

    function destroyDonorMessageMasonry() {
      if (!donorMessageMasonry) {
        return;
      }

      donorMessageMasonry.destroy();
      donorMessageMasonry = null;
      $donorMessageList.find(".donor-message__item").removeAttr("style");
    }

    function syncDonorMessageMasonry() {
      if (donorMessageDesktopQuery.matches) {
        initDonorMessageMasonry();
      } else {
        destroyDonorMessageMasonry();
      }
    }

    syncDonorMessageMasonry();

    if (typeof donorMessageDesktopQuery.addEventListener === "function") {
      donorMessageDesktopQuery.addEventListener("change", syncDonorMessageMasonry);
    } else if (typeof donorMessageDesktopQuery.addListener === "function") {
      donorMessageDesktopQuery.addListener(syncDonorMessageMasonry);
    }

    $donorMessageList.find("img").on("load", function () {
      if (donorMessageMasonry) {
        donorMessageMasonry.layout();
      }
    });
  }
});
