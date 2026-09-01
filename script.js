/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {
        document.getElementById("loader").classList.add("hide");
    }, 700);

});


/* =====================================================
   NAVBAR
===================================================== */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =====================================================
   SCROLL PROGRESS
===================================================== */

const scrollProgress =
    document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    scrollProgress.style.width = `${progress}%`;

});


/* =====================================================
   MOBILE MENU
===================================================== */

const mobileButton =
    document.getElementById("mobileButton");

const mobileNav =
    document.getElementById("mobileNav");

mobileButton.addEventListener("click", () => {

    mobileNav.classList.toggle("show");

});

document.querySelectorAll(".mobile-nav a").forEach(link => {

    link.addEventListener("click", () => {
        mobileNav.classList.remove("show");
    });

});


/* =====================================================
   THEME SYSTEM
===================================================== */

const themeToggle =
    document.getElementById("themeToggle");

const themeMenu =
    document.getElementById("themeMenu");

const themeIcon =
    document.getElementById("themeIcon");


themeToggle.addEventListener("click", (e) => {

    e.stopPropagation();

    themeMenu.classList.toggle("show");

});


document.addEventListener("click", (e) => {

    if (!themeMenu.contains(e.target) &&
        !themeToggle.contains(e.target)) {

        themeMenu.classList.remove("show");

    }

});


const themeOptions =
    document.querySelectorAll(".theme-option");


function applyTheme(theme) {

    if (theme === "dark") {

        document.body.removeAttribute("data-theme");

        themeIcon.textContent = "☼";

    } else {

        document.body.setAttribute(
            "data-theme",
            theme
        );

        themeIcon.textContent = "☀";

    }

    localStorage.setItem(
        "insan-theme",
        theme
    );

}


themeOptions.forEach(option => {

    option.addEventListener("click", () => {

        const theme =
            option.dataset.theme;

        applyTheme(theme);

        themeMenu.classList.remove("show");

    });

});


const savedTheme =
    localStorage.getItem("insan-theme");

if (savedTheme) {
    applyTheme(savedTheme);
} else {
    applyTheme("dark");
}


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".desktop-nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            current = section.id;
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {
            link.classList.add("active");
        }

    });

});


/* =====================================================
   REVEAL ANIMATIONS
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   COUNTERS
===================================================== */

const counters =
    document.querySelectorAll(".counter");

const counterObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const counter =
                    entry.target;

                const target =
                    Number(counter.dataset.target);

                let current = 0;

                const duration = 1600;

                const startTime =
                    performance.now();


                function updateCounter(time) {

                    const progress =
                        Math.min(
                            (time - startTime) /
                            duration,
                            1
                        );

                    const eased =
                        1 -
                        Math.pow(
                            1 - progress,
                            3
                        );

                    current =
                        Math.floor(
                            target * eased
                        );

                    counter.textContent =
                        current.toLocaleString("en-US");

                    if (progress < 1) {
                        requestAnimationFrame(
                            updateCounter
                        );
                    } else {
                        counter.textContent =
                            target.toLocaleString("en-US");
                    }

                }

                requestAnimationFrame(
                    updateCounter
                );

                counterObserver.unobserve(counter);

            });

        },
        {
            threshold: .5
        }
    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


/* =====================================================
   PROGRAM FILTERS
===================================================== */

const filters =
    document.querySelectorAll(".filter");

const programs =
    document.querySelectorAll(".program-card");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(btn =>
            btn.classList.remove("active")
        );

        filter.classList.add("active");

        const category =
            filter.dataset.filter;

        programs.forEach(program => {

            const matches =
                category === "all" ||
                program.dataset.category === category;

            if (matches) {

                program.style.display = "";

                requestAnimationFrame(() => {
                    program.style.opacity = "1";
                });

            } else {

                program.style.opacity = "0";

                setTimeout(() => {
                    program.style.display = "none";
                }, 250);

            }

        });

    });

});


/* =====================================================
   FIND YOUR PATH
===================================================== */

const pathButtons =
    document.querySelectorAll(".path-options button");

const pathResult =
    document.getElementById("pathResult");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");


const pathData = {

    leadership: {
        title: "صناعة القائد",
        text:
            "مسار يساعدك على تطوير القيادة والتأثير واتخاذ القرار."
    },

    confidence: {
        title: "بناء الإنسان",
        text:
            "رحلة متكاملة لفهم الذات وبناء الثقة والرؤية."
    },

    communication: {
        title: "مهارات المستقبل",
        text:
            "تجربة عملية لتطوير التواصل والحوار والتأثير."
    },

    career: {
        title: "بناء الإنسان",
        text:
            "ابدأ من الداخل لبناء رؤية أوضح لمسارك القادم."
    },

    growth: {
        title: "بناء الإنسان",
        text:
            "رحلة عميقة للنمو الشخصي واكتشاف إمكاناتك."
    }

};


pathButtons.forEach(button => {

    button.addEventListener("click", () => {

        const result =
            pathData[button.dataset.result];

        resultTitle.textContent =
            result.title;

        resultText.textContent =
            result.text;

        pathResult.classList.add("show");

        pathResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});


/* =====================================================
   FAQ
===================================================== */

const faqItems =
    document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button =
        item.querySelector("button");

    const answer =
        item.querySelector(".faq-answer");


    button.addEventListener("click", () => {

        const isOpen =
            item.classList.contains("open");


        faqItems.forEach(other => {

            other.classList.remove("open");

            other.querySelector(
                ".faq-answer"
            ).style.maxHeight = null;

        });


        if (!isOpen) {

            item.classList.add("open");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


const imageModal =
    document.getElementById("imageModal");

const modalImage =
    document.getElementById("modalImage");

const closeImage =
    document.getElementById("closeImage");


document.querySelectorAll(".gallery-open")
.forEach(button => {

    button.addEventListener("click", () => {

        const image =
            button.parentElement.querySelector("img");

        modalImage.src =
            image.src;

        imageModal.classList.add("show");

    });

});


closeImage.addEventListener("click", () => {

    imageModal.classList.remove("show");

});


imageModal.addEventListener("click", e => {

    if (e.target === imageModal) {
        imageModal.classList.remove("show");
    }

});


/* =====================================================
   VIDEO
===================================================== */

const videoButton =
    document.getElementById("videoButton");

const videoModal =
    document.getElementById("videoModal");

const closeVideo =
    document.getElementById("closeVideo");


videoButton.addEventListener("click", () => {

    videoModal.classList.add("show");

});


closeVideo.addEventListener("click", () => {

    videoModal.classList.remove("show");

});


videoModal.addEventListener("click", e => {

    if (e.target === videoModal) {
        videoModal.classList.remove("show");
    }

});


/* =====================================================
   TESTIMONIAL SLIDER
===================================================== */

const testimonials = [

    {
        text:
            "إنسان لم يكن مجرد برنامج شاركت فيه، بل تجربة جعلتني أنظر لنفسي وحياتي بطريقة مختلفة.",
        name:
            "سلمى محمد",
        image:
            "https://i.pravatar.cc/150?img=47"
    },

    {
        text:
            "أكثر شيء أعجبني في إنسان هو المجتمع. دخلت لأتعلم وخرجت بعلاقات وتجارب ستبقى معي.",
        name:
            "عبدالله خالد",
        image:
            "https://i.pravatar.cc/150?img=12"
    },

    {
        text:
            "كنت أبحث عن تطوير مهاراتي، لكن التجربة أعطتني أكثر بكثير مما توقعت.",
        name:
            "ريم أحمد",
        image:
            "https://i.pravatar.cc/150?img=32"
    }

];


let testimonialIndex = 0;


const testimonialText =
    document.getElementById("testimonialText");

const testimonialName =
    document.getElementById("testimonialName");

const testimonialImage =
    document.getElementById("testimonialImage");


function showTestimonial(index) {

    const item =
        testimonials[index];

    testimonialText.textContent =
        `"${item.text}"`;

    testimonialName.textContent =
        item.name;

    testimonialImage.src =
        item.image;

}


document
    .getElementById("testimonialNext")
    .addEventListener("click", () => {

        testimonialIndex++;

        if (
            testimonialIndex >=
            testimonials.length
        ) {
            testimonialIndex = 0;
        }

        showTestimonial(testimonialIndex);

    });


document
    .getElementById("testimonialPrev")
    .addEventListener("click", () => {

        testimonialIndex--;

        if (testimonialIndex < 0) {
            testimonialIndex =
                testimonials.length - 1;
        }

        showTestimonial(testimonialIndex);

    });


/* =====================================================
   EVENTS SLIDER
===================================================== */

const eventsSlider =
    document.getElementById("eventsSlider");


document
    .getElementById("eventNext")
    .addEventListener("click", () => {

        eventsSlider.scrollBy({
            left: -350,
            behavior: "smooth"
        });

    });


document
    .getElementById("eventPrev")
    .addEventListener("click", () => {

        eventsSlider.scrollBy({
            left: 350,
            behavior: "smooth"
        });

    });


/* =====================================================
   SEARCH
===================================================== */

const searchButton =
    document.getElementById("searchButton");

const searchOverlay =
    document.getElementById("searchOverlay");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");


searchButton.addEventListener("click", () => {

    searchOverlay.classList.add("show");

    setTimeout(() => {
        searchInput.focus();
    }, 200);

});


closeSearch.addEventListener("click", () => {

    searchOverlay.classList.remove("show");

});


document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        searchOverlay.classList.remove("show");

        imageModal.classList.remove("show");

        videoModal.classList.remove("show");

        themeMenu.classList.remove("show");

    }

});


/* =====================================================
   NEWSLETTER
===================================================== */

const newsletterForm =
    document.getElementById("newsletterForm");

const formMessage =
    document.getElementById("formMessage");


newsletterForm.addEventListener("submit", e => {

    e.preventDefault();

    formMessage.textContent =
        "تم الاشتراك بنجاح — أهلاً بك في مجتمع إنسان ✦";

    newsletterForm.reset();

});


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const contactMessage =
    document.getElementById("contactMessage");


contactForm.addEventListener("submit", e => {

    e.preventDefault();

    contactMessage.textContent =
        "تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.";

    contactForm.reset();

});


/* =====================================================
   SMOOTH LINKS
===================================================== */

document.querySelectorAll('a[href^="#"]')
.forEach(link => {

    link.addEventListener("click", e => {

        const targetId =
            link.getAttribute("href");

        if (
            targetId === "#" ||
            !document.querySelector(targetId)
        ) {
            return;
        }

        e.preventDefault();

        document
            .querySelector(targetId)
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});