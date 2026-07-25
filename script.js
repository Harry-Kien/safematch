/* ==========================================================================
   SafeMatch — overview page behaviour
   Mobile navigation, FAQ disclosure, scroll reveal.
   ========================================================================== */

(function () {
    "use strict";

    /* ---------------------------------------------------------------------
       Mobile navigation
       --------------------------------------------------------------------- */

    var navToggle = document.getElementById("navToggle");
    var nav = document.getElementById("nav");

    if (navToggle && nav) {
        navToggle.addEventListener("click", function () {
            var open = nav.classList.toggle("is-open");

            navToggle.setAttribute("aria-expanded", String(open));
            navToggle.textContent = open ? "Close" : "Menu";
        });

        nav.addEventListener("click", function (event) {
            if (event.target.closest("a")) {
                nav.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
                navToggle.textContent = "Menu";
            }
        });
    }

    /* ---------------------------------------------------------------------
       FAQ disclosure — one open at a time
       --------------------------------------------------------------------- */

    var faq = document.getElementById("faq");

    if (faq) {
        faq.addEventListener("click", function (event) {
            var button = event.target.closest(".faq__question");

            if (!button) {
                return;
            }

            var item = button.parentElement;
            var isOpen = item.classList.contains("is-open");

            faq.querySelectorAll(".faq__item").forEach(function (other) {
                other.classList.remove("is-open");
                other.querySelector(".faq__question")
                    .setAttribute("aria-expanded", "false");
            });

            if (!isOpen) {
                item.classList.add("is-open");
                button.setAttribute("aria-expanded", "true");
            }
        });
    }

    /* ---------------------------------------------------------------------
       Scroll reveal
       --------------------------------------------------------------------- */

    var revealables = document.querySelectorAll(".reveal");

    var reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealables.forEach(function (element) {
            element.classList.add("is-visible");
        });
        return;
    }

    var observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    revealables.forEach(function (element) {
        observer.observe(element);
    });
}());
