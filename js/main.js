const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}

$.fn.videosSliderScript = function () {

    const jqAllAffectedContainers = this;

    jqAllAffectedContainers.each(function () {
        const container = $(this);
        const nextSlide = container.find('.swiper-button-next');
        const prevSlide = container.find('.swiper-button-prev');
        const slider = container.find('.main-video-slider-container');

        const swiperObj = new Swiper(slider.get(0), {
            slidesPerView: 1,
            spaceBetween: 0,
            navigation: {
                nextEl: nextSlide.get(0),
                prevEl: prevSlide.get(0),
            },
            breakpoints: {
                1224: {

                },
                767: {
                    navigation: {
                        enabled: true
                    }
                },
                320: {
                    navigation: {
                        enabled: false
                    }
                }
            }
        });

    });

    return this;
}

$.fn.videoCustomControls = function () {

    const supportsVideo = !!document.createElement("video").canPlayType;

    if (!supportsVideo) {
        console.warn('Browser does not support video elements');
        return this;
    }

    const jqAllAffectedContainers = this;

    const setVideoProgress = function (barContainer, video, event) {
        const rect = barContainer.getBoundingClientRect();
        const pos = (event.pageX - rect.left) / barContainer.offsetWidth;
        video.currentTime = pos * video.duration;
    }

    jqAllAffectedContainers.each(function () {
        const container = $(this);
        const video = container.find('video');
        const controls = container.find('.custom-controls');
        const progressBarBkg = controls.find('.progress .bar');
        const progressBar = controls.find('.progress .inner-bar');

        video.controls = false;
        video.on("timeupdate", () => {
            const duration = video.get(0).duration;
            const currentTime = video.get(0).currentTime;
            const currentProgress = Math.ceil((currentTime / duration) * 100);
            progressBar.css({ 'width': `${currentProgress}%` });
        });
        progressBarBkg.on("click", (e) => {
            setVideoProgress(progressBarBkg.get(0), video.get(0), e)
        });

    });

    return this;
}

$.fn.coctailSliderScript = function () {

    const jqAllAffectedContainers = this;

    jqAllAffectedContainers.each(function () {
        const container = $(this);
        const nextSlide = container.find('.swiper-button-next');
        const prevSlide = container.find('.swiper-button-prev');
        const slider = container.find('.coctails-items-slider-container');

        const swiperObj = new Swiper(slider.get(0), {
            slidesPerView: 'auto',
            spaceBetween: 24,
            preventClicks: true,
            a11y: false,
            navigation: {
                nextEl: nextSlide.get(0),
                prevEl: prevSlide.get(0),
            },
            breakpoints: {
                1800: {
                    spaceBetween: 24,
                },
                1599: {
                },
                1279: {
                    spaceBetween: 15,
                },
                767: {
                    navigation: {
                        enabled: true
                    }
                },
                320: {
                    navigation: {
                        enabled: false
                    }
                }
            }
        });

    });

    return this;
}

$.fn.techSliderScript = function () {

    const jqAllAffectedContainers = this;

    jqAllAffectedContainers.each(function () {
        const container = $(this);
        const nextSlide = container.find('.swiper-button-next');
        const prevSlide = container.find('.swiper-button-prev');
        const slider = container.find('.tech-slider-container');

        const swiperObj = new Swiper(slider.get(0), {
            slidesPerView: 4,
            spaceBetween: 19,
            navigation: {
                nextEl: nextSlide.get(0),
                prevEl: prevSlide.get(0),
            },
            breakpoints: {
                1800: {
                    slidesPerView: 4,
                },
                1599: {
                    slidesPerView: 3,
                },
                1279: {
                    slidesPerView: 2,
                },
                767: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                320: {

                }
            }
        });

    });

    return this;
}

$.fn.scrollSections = function () {
    const jqAllAffectedContainers = this;

    let currentScrollYValue = 0;

    const sections = {};
    const documentHeight = Math.ceil($(document).height());
    const footerHeight = Math.ceil($('footer').height());
    const footerOffsetPosition = documentHeight - footerHeight - window.innerHeight;
    let isAniamting = false;

    const scrollUpdater = function () {
        currentScrollYValue = Math.ceil(window.scrollY);
        setTimeout(scrollToClosestSection, 1000, currentScrollYValue);
    }

    const scrollToClosestSection = function (currentScrollY) {
        let scrollTo = 0;
        let closestSection = null;
        if (currentScrollY != currentScrollYValue) return; // if passed Y position is not equal to global scroll position then we move during timeout
        if (isAniamting) return; // do nothing if we animating scroll position
        if (currentScrollY > footerOffsetPosition) return; // if we scrolled to footer do nothing
        for (const [sectionID, sectionParams] of Object.entries(sections)) {
            if (currentScrollY > sectionParams.topWithOffet) {
                closestSection = sectionID;
                scrollTo = sectionParams.top;
            }
        }
        isAniamting = true;
        $("html, body").animate(
            { scrollTop: scrollTo },
            600,
            "linear",
            function () {
                isAniamting = false;
            }
        );
    }

    jqAllAffectedContainers.each(function () {
        const container = $(this);
        const offset = container.offset();
        const id = container.attr('id');
        if (!id) {
            console.error('Section have no valid id:', this);
            return;
        }

        const top = Math.ceil(offset.top);
        const containerHalfHeight = Math.ceil(((container.height()) / 2));
        const topWithOffset = top - containerHalfHeight;
        sections[id] = {
            topWithOffet: topWithOffset,
            top: top //adjust for heading
        }
    });

    /*Events*/
    window.onresize = scrollUpdater;
    window.onscroll = scrollUpdater;
    // window.onscrollend = scrollendUpdater;

    return this;
}

document.addEventListener("DOMContentLoaded", function () {
    // app height setup
    window.addEventListener('resize', appHeight)
    appHeight();

    gsap.registerPlugin(ScrollTrigger);
    // Переключение и анимирование табов
    // Табы "about"
    const mainTabsAbout = document.querySelectorAll(".tabs-item.about");
    const separatorLineAbout = document.querySelector(".separator-line");
    const contentItemsAbout = document.querySelectorAll(".main-tabs-content-wrapper");

    // Табы "video"
    const mainTabsVideo = document.querySelectorAll(".tabs-item.video");
    const separatorLineVideo = document.querySelector(".separator-line.video");
    const contentItemsVideo = document.querySelectorAll(".main-video");

    // Функция для переключения табов
    function switchTabs(tabs, separator, contentItems) {
        tabs.forEach(function (tab, index) {
            tab.addEventListener("click", function (e) {
                e.preventDefault();

                separator.classList.remove("w-25", "w-50", "w-75");
                separator.classList.add(`w-${(index + 1) * 25}`);

                tabs.forEach(t => {
                    t.classList.remove('active');
                });

                tab.classList.add('active');

                contentItems.forEach(item => {
                    item.classList.remove('active');
                });

                contentItems[index].classList.add('active');
                $(contentItems).fadeOut(0, function () {
                    $(contentItems).eq(index).fadeIn(600);
                });

            });
        });
    }

    switchTabs(mainTabsAbout, separatorLineAbout, contentItemsAbout);
    switchTabs(mainTabsVideo, separatorLineVideo, contentItemsVideo);

    const $elementHover = $(".pop-up-inside ul li button");
    const $imgVisiable = $(".pop-up-inside .img-pop-up");

    $elementHover.hover(
        function () {
            const index = $elementHover.index(this);
            $imgVisiable.each(function (i) {
                $(this).removeClass("left right");
                if (i === index) {
                    if (i % 2 === 0) {
                        $(this).addClass("left");
                    } else {
                        $(this).addClass("right");
                    }
                    $(this).stop(true, true).fadeIn();
                } else {
                    $(this).stop(true, true).fadeOut();
                }
            });
        },
        function () {
            $imgVisiable.stop(true, true).fadeOut();
        }
    );
    const swiperLifestyle = new Swiper(".lifestyle-swiper-container", {
        slidesPerView: 'auto',
        effect: 'coverflow',
        centeredSlides: true,
        loop: true,
        centerInsufficientSlides: true,
        coverflowEffect: {
            rotate: 35,
            stretch: 380,
            depth: 210,
            modifier: 1,
            scale: 0.9,
            slideShadows: false,
        },
        autoplay: {
            delay: 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: true
        },
        breakpoints: {
            1800: {
                coverflowEffect: {
                    stretch: 380,
                    depth: 210,
                }
            },
            1599: {
            },
            1279: {
                coverflowEffect: {
                    stretch: 300,
                    depth: 110,
                }
            },
            767: {
                coverflowEffect: {
                    stretch: 300,
                    depth: 280,
                }
            },
            320: {

            }
        }
    });

    const swiperCard = new Swiper(".card-container-swiper", {
        slidesPerView: 1,
        effect: "cards",
        grabCursor: true,
        cardsEffect: {
            slideShadows: true,
            rotate: 60,
        }
    });

    // GSAP: Настраиваем триггер прокрутки для перелистывания слайдов
    gsap.from(".card-container-swiper", {
        scrollTrigger: {
            trigger: '.card-container',
            start: 'top center',
            end: 'bottom center',
            scrub: true, // Добавляем scrub для плавного взаимодействия
            onUpdate: (self) => {
                const progress = self.progress; // Получаем текущее значение прогресса
                const totalSlides = swiperCard.slides.length; // Общее количество слайдов

                // Вычисляем индекс слайда на основе прогресса
                const index = Math.floor(progress * totalSlides);

                // Переключаемся на соответствующий слайд только если индекс изменился
                if (index !== swiperCard.activeIndex) {
                    swiperCard.slideTo(index);
                }
            }
        },
        duration: 0 // Продолжительность анимации 0, так как нет анимации
    });


    const swiperWork = new Swiper(".about-us-slider-containers", {
        slidesPerView: "auto",
        spaceBetween: 40,
        freeMode: true,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        breakpoints: {
            1800: {

            },
            1599: {
                spaceBetween: 40,
            },
            1279: {
                spaceBetween: 20,
            },
            767: {

            },
            320: {

            }
        }
    })


    let slowDownInterval;

    var swiper = new Swiper('.liner-container', {
        slidesPerView: 'auto',
        speed: 2000,
        loop: true,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        freeMode: {
            enabled: true,
            delay: 1
        },
        mousewheel: {
            invert: true,
        },
    });

    const linerWrapper = document.querySelector('.liner-wrapper');
    const originalItems = linerWrapper.querySelectorAll('.liner-item');

    originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        linerWrapper.appendChild(clone);
    });

    const magnetic = new Magnetic(); // Используем стандартные настройки Magnetic

    const elements = document.querySelectorAll('.bc-element-container .bc-element'); //  Предположим, у вас есть элементы с классом "magnetic-element"

    if (elements.length > 0) {
        elements.forEach(element => {
            magnetic.add({
                element: element,
                powerDistance: 50,
                updateOnScroll: true,
            });
        });
    }

    document.querySelectorAll('.nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    function initializeSlider(sliderSelector, contentSelector) {
        const sliderItems = $(sliderSelector).find('li');
        let selectedItem = 0;
        let intervalTime = 6000;
        let interval;
        let xDown = null;
        let yDown = null;

        if ($(window).width() <= 1279) intervalTime = 10000;

        function setItemSlider(index) {
            if (index === selectedItem) {
                return;
            }

            selectedItem = index;

            sliderItems.each(function (idx) {
                let offset = idx - selectedItem;
                if (offset < 0) offset += sliderItems.length;

                $(this)
                    .removeClass(function (index, className) {
                        return (className.match(/(^|\s)item-\d+/g) || []).join(' ');
                    })
                    .addClass(`item-${offset + 1}`);
            });

            const itemData = sliderItems.eq(selectedItem).data('item');
            const contentBlocks = $(contentSelector);

            const activeBlock = contentBlocks.filter('.active');
            const newBlock = contentBlocks.filter(function () {
                return $(this).data('content') === itemData;
            });

            activeBlock.hide();
            if (newBlock.length > 0) {
                newBlock.fadeIn(500).addClass('active');
                activeBlock.removeClass('active');
            } else {
                activeBlock.removeClass('active');
            }
        }

        function nextSlide() {
            const nextIndex = (selectedItem + 1) % sliderItems.length; // Получаем следующий индекс
            setItemSlider(nextIndex);
        }

        function prevSlide() {
            let prevIndex = (selectedItem - 1) % sliderItems.length; // Получаем следующий индекс
            if (prevIndex == -1) prevIndex = sliderItems.length - 1;
            setItemSlider(prevIndex);
        }

        function getTouches(evt) {
            return evt.touches ||             // browser API
                evt.originalEvent.touches; // jQuery
        }

        function handleTouchStart(evt) {
            const firstTouch = getTouches(evt)[0];
            xDown = firstTouch.clientX;
            yDown = firstTouch.clientY;
        };

        function handleTouchMove(evt) {
            if (!xDown || !yDown) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
                if (xDiff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            } else {
                if (yDiff > 30) {
                    /* down swipe */
                } else {
                    /* up swipe */
                }
            }
            /* reset values */
            xDown = null;
            yDown = null;
        };

        // Запускаем автоматическую прокрутку

        interval = setInterval(nextSlide, intervalTime);

        // Остановка автоматической прокрутки при наведении на слайдер
        $(sliderSelector).hover(function () {
            clearInterval(interval);
        }, function () {
            interval = setInterval(nextSlide, intervalTime);
        });

        sliderItems.click(function () {
            clearInterval(interval);
            setItemSlider($(this).index());
        });

        if ($(window).width() <= 1279) { //touch events for mobile only
            $('.slider-container').on('touchstart', handleTouchStart);
            $('.slider-container').on('touchmove', handleTouchMove);
        }
    }

    initializeSlider('.slider-items.one', '.main-tabs-content-left-block.one');
    initializeSlider('.slider-items.two', '.main-tabs-content-left-block.two');
    initializeSlider('.slider-items.three', '.main-tabs-content-left-block.three');

    $('.video-slider-js').videosSliderScript();
    $('.video-container').videoCustomControls();
    $('.coctail-slider-js').coctailSliderScript();
    $('.tech-slider-js').techSliderScript();
    if ($(window).width() > 1279) {
        $('.section-block').scrollSections();
    }
});
