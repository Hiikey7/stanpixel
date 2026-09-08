(function ($) {
    "use strict";

    var updateSiteContactDetails = function () {
        var textReplacements = {
            '27 Division St, New York,': 'Nairobi, Kenya',
            'NY 10002, USA': '',
            '+1 800 123 654 987 ': '+254 722 465 983',
            '+1 800 123 654 987': '+254 722 465 983',
            'frisk.agency@mail.com': 'hello@stanpixels.co.ke'
        };
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        var textNode;

        while ((textNode = walker.nextNode())) {
            Object.keys(textReplacements).forEach(function (oldText) {
                if (textNode.nodeValue.indexOf(oldText) !== -1) {
                    textNode.nodeValue = textNode.nodeValue.replace(new RegExp(oldText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), textReplacements[oldText]);
                }
            });
        }

        $('a[href="tel:1800123654987"]').attr({
            href: 'tel:+254722465983'
        }).text('+254 722 465 983');
        $('a[href="tel:+254722465983"]').text('+254 722 465 983');
        $('a[href="tel:1800123654987"]').each(function () {
            $(this).attr('href', 'tel:+254722465983').text('+254 722 465 983');
        });
        $('a[href="mailto:frisk.agency@mail.com"]').attr({
            href: 'mailto:hello@stanpixels.co.ke'
        }).text('hello@stanpixels.co.ke');
        $('a[href="mailto:hello@stanpixels.co.ke"]').text('hello@stanpixels.co.ke');
        $('.sidebar-wrap a[href^="tel:"]').each(function () {
            $(this).attr('href', 'tel:+254722465983').text('+254 722 465 983');
        });
        $('.sidebar-wrap a[href^="mailto:"]').each(function () {
            $(this).attr('href', 'mailto:hello@stanpixels.co.ke').text('hello@stanpixels.co.ke');
        });
        $('.copyright-text').contents().filter(function () {
            return this.nodeType === 3;
        }).each(function () {
            this.nodeValue = this.nodeValue.replace(/2025/g, '2026');
        });
        $('.copyright-text a').attr('href', 'https://www.stanpixels.co.ke/').text('Stanpixels');
        $('.sidemenu-content .footer-logo .site-logo').attr('src', 'assets/img/hero/white main.png');
        $('a[href="home-4"]').attr('href', '/');

        var socialLinks = [
            ['https://www.facebook.com/', 'https://www.tiktok.com/@stanpixelscreatives0?_t=ZM-90dENGcqTXQ&_r=1', 'fab fa-tiktok'],
            ['https://instagram.com/', 'https://www.instagram.com/stanpixels.0?stkn=MWVuampqYnBsZ2xrdg==', 'fab fa-instagram'],
            ['https://twitter.com/', 'https://x.com/stanpixels?t=x2fNgJXGrEH8dw1uA0dFWQ&s=09', 'fab fa-twitter'],
            ['https://dribbble.com/', 'https://www.behance.net/hikyqunke', 'fab fa-behance']
        ];

        socialLinks.forEach(function (socialLink) {
            $('a[href="' + socialLink[0] + '"]').attr('href', socialLink[1]).find('i').attr('class', socialLink[2]);
        });
        $('a[href="https://linkedin.com/"]').attr('href', 'https://www.linkedin.com/in/stanley-ndegwa-a49a96377?utm_source=share_via&utm_content=profile&utm_medium=member_android');
        $('.social-btn a[href="https://instagram.com/"]').find('i').attr('class', 'fab fa-instagram');

        $('.social-btn').each(function () {
            var $socialGroup = $(this);
            if (!$socialGroup.find('a[href^="https://pin.it/"]').length) {
                $socialGroup.append('<a href="https://pin.it/4RyigEXre"><i class="fab fa-pinterest-p"></i></a>');
            }
            if (!$socialGroup.find('a[href^="https://www.linkedin.com/"]').length) {
                $socialGroup.append('<a href="https://www.linkedin.com/in/stanley-ndegwa-a49a96377?utm_source=share_via&utm_content=profile&utm_medium=member_android"><i class="fab fa-linkedin-in"></i></a>');
            }
            if (!$socialGroup.find('a[href="https://g.page/r/Cf24_Y6fK0u2EAI/review"]').length) {
                $socialGroup.append('<a href="https://g.page/r/Cf24_Y6fK0u2EAI/review"><i class="fab fa-google"></i></a>');
            }
            if (!$socialGroup.find('a[href="https://wa.me/message/5MJVAG2CZN25M1"]').length) {
                $socialGroup.append('<a href="https://wa.me/message/5MJVAG2CZN25M1" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>');
            }
        });
    };

    var addSlugTitlesToPageLinks = function () {
        $('a[href]').each(function () {
            var href = $(this).attr('href');
            if (!href || /^(?:[a-z]+:|\/\/|#)/i.test(href)) {
                return;
            }

            var path = href.split(/[?#]/)[0];
            var slug = path.split('/').pop().replace(/\.html?$/i, '');
            if (!slug) {
                return;
            }
            $(this).attr('title', slug);
        });
    };

    var standardizeMobileMenu = function () {
        var mobileMenuMarkup =
            '<button type="button" class="menu-toggle" aria-label="Close menu"><i class="fas fa-times"></i></button>' +
            '<div class="mobile-logo"><a href="home-4"><img class="site-logo" src="assets/img/icon/white.png" alt="Stanpixels" width="180" height="31"></a></div>' +
            '<nav class="mobile-menu" aria-label="Mobile navigation"><ul>' +
            '<li class="menu-item-has-children"><a href="service-2">OUR SERVICES</a><ul class="sub-menu"><li><a href="service-details?service=branding">BRANDING DESIGN</a></li><li><a href="service-details?service=web">WEB DEVELOPMENT</a></li><li><a href="service-details?service=marketing">DIGITAL MARKETING</a></li><li><a href="service-details?service=software">SOFTWARE DEVELOPMENT</a></li><li><a href="service-details?service=seo">SEO SERVICES</a></li><li><a href="service-details?service=content">CONTENT MARKETING</a></li></ul></li>' +
            '<li class="menu-item-has-children"><a href="project-3">OUR WORKS</a><ul class="sub-menu"><li><a href="project-3?filter=branding">GRAPHICS DESIGN &amp; BRANDING</a></li><li><a href="project-3?filter=marketing">DIGITAL MARKETING</a></li><li><a href="project-3?filter=websites-design">WEBSITE DESIGN &amp; DEVELOPMENT</a></li><li><a href="project-3?filter=systems">SOFTWARE &amp; SYSTEMS DEVELOPMENT</a></li></ul></li>' +
            '<li><a href="blog-2">RESOURCES</a></li><li><a href="shop">MERCHANDISE</a></li><li><a href="about">ABOUT US</a></li><li><a href="about#contact-form">WORK WITH US</a></li>' +
            '</ul></nav>' +
            '<div class="sidebar-wrap"><h6>Nairobi, Kenya</h6></div>' +
            '<div class="sidebar-wrap"><h6><a href="tel:+254722465983">+254 722 465 983</a></h6><h6><a href="mailto:hello@stanpixels.co.ke">hello@stanpixels.co.ke</a></h6></div>' +
            '<div class="social-btn style3"><a href="https://www.tiktok.com/@stanpixelscreatives0?_t=ZM-90dENGcqTXQ&_r=1" aria-label="TikTok"><i class="fab fa-tiktok"></i></a><a href="https://www.instagram.com/stanpixels.0?stkn=MWVuampqYnBsZ2xrdg==" aria-label="Instagram"><i class="fab fa-instagram"></i></a><a href="https://x.com/stanpixels?t=x2fNgJXGrEH8dw1uA0dFWQ&s=09" aria-label="X"><i class="fab fa-twitter"></i></a><a href="https://www.behance.net/hikyqunke" aria-label="Behance"><i class="fab fa-behance"></i></a></div>';

        $('.mobile-menu-wrapper').each(function () {
            $(this).attr('aria-hidden', 'true').find('.mobile-menu-area').html(mobileMenuMarkup);
        });
    };

    var enhanceProjectDetails = function () {
        $('.project-details-info').each(function () {
            var $details = $(this);
            var $list = $details.find('.list-wrap').first();
            var $website = $list.find('li').filter(function () {
                return $(this).find('span').first().text().trim().toLowerCase() === 'website:';
            }).find('a').first();

            if (!$list.length || $details.find('.project-details-toggle').length) {
                return;
            }

            $details.append('<button type="button" class="project-details-toggle" aria-expanded="false">See details <i class="fas fa-plus" aria-hidden="true"></i></button>');
            if ($website.length && $details.data('live-demo') === true) {
                $details.prepend($('<a class="project-live-demo btn" target="_blank" rel="noopener noreferrer">View live demo <i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i></a>').attr('href', $website.attr('href')));
            }
        });

        $(document).on('click', '.project-details-toggle', function () {
            var $button = $(this);
            var expanded = $button.attr('aria-expanded') === 'true';
            $button.attr('aria-expanded', String(!expanded)).html((expanded ? 'See details' : 'Hide details') + ' <i class="fas fa-' + (expanded ? 'plus' : 'minus') + '" aria-hidden="true"></i>');
            $button.closest('.project-details-info').toggleClass('details-expanded', !expanded);
        });
    };

    updateSiteContactDetails();
    standardizeMobileMenu();
    enhanceProjectDetails();
    addSlugTitlesToPageLinks();

    // Give every footer social icon the same layout and hover effect as TikTok.
    $('footer .social-btn a').each(function () {
        var $link = $(this);
        var $icon = $link.find('i').first();
        if (!$icon.length || $link.find('.link-effect').length) {
            return;
        }

        var $effect = $('<span class="link-effect"></span>');
        $effect.append($('<span class="effect-1"></span>').append($icon));
        $effect.append($('<span class="effect-1" aria-hidden="true"></span>').append($icon.clone()));
        $link.append($effect);
    });

    var addResourceSubmenu = function ($resourceLink) {
        $resourceLink.attr('href', '#');
        if ($resourceLink.siblings('.sub-menu').length) {
            return;
        }

        var submenu = '<ul class="sub-menu resource-submenu">' +
            '<li><a href="blog-2?resource=prompts">AI PROMPTS</a></li>' +
            '<li><a href="blog-2?resource=assets">DESIGN ASSETS</a></li>' +
            '<li><a href="blog-2?resource=blogs">BLOGS &amp; ARTICLES</a></li>' +
            '</ul>';
        $resourceLink.after(submenu);
        $resourceLink.closest('li').addClass('menu-item-has-children');
    };

    $('.main-menu a[href="blog-2"], .mobile-menu a[href="blog-2"]').each(function () {
        var $resourceLink = $(this);
        var label = $resourceLink.find('.effect-1').first().text() || $resourceLink.text();
        if (label.trim().toUpperCase() !== 'RESOURCES') {
            return;
        }
        addResourceSubmenu($resourceLink);
    });

    var serviceSubmenu = '<li><a href="service-details?service=branding">BRANDING DESIGN</a></li>' +
        '<li><a href="service-details?service=web">WEB DEVELOPMENT</a></li>' +
        '<li><a href="service-details?service=marketing">DIGITAL MARKETING</a></li>' +
        '<li><a href="service-details?service=software">SOFTWARE DEVELOPMENT</a></li>' +
        '<li><a href="service-details?service=seo">SEO SERVICES</a></li>' +
        '<li><a href="service-details?service=content">CONTENT MARKETING</a></li>';
    $('.main-menu a[href="service-2"], .mobile-menu a[href="service-2"]').each(function () {
        $(this).attr('href', '#').siblings('.sub-menu').html(serviceSubmenu);
    });

    $('.main-menu a[href="project-3"], .mobile-menu a[href="project-3"]').each(function () {
        $(this).attr('href', '#');
    });

    var brandFaqs = [
        ['What services does Stanpixels offer?', 'Stanpixels provides branding design, website development, digital marketing, software development, SEO and content marketing for businesses and organisations.'],
        ['How long does a website project take?', 'Most standard website projects can be completed within 24 to 48 hours after we receive the required content, assets, project brief and initial deposit. More complex projects may take longer.'],
        ['What is included in a project?', 'Each project follows the agreed quotation or package. Deliverables may include design, development, responsive layouts, integrations, testing and launch support. The included revisions depend on the selected plan.'],
        ['Do you provide hosting, domains and ongoing support?', 'Yes. We can guide you through domain registration, hosting, SSL, business email and deployment. Ongoing maintenance, security updates, backups and additional support can also be arranged.']
    ];
    $('#faqAccordion').each(function () {
        var $accordion = $(this);
        $accordion.find('.accordion-card').each(function (index) {
            var faq = brandFaqs[index];
            if (!faq) return;
            $(this).find('.accordion-button').text(faq[0]);
            $(this).find('.faq-text').text(faq[1]);
        });
    });

    var $mobileMenu = $('.mobile-menu ul').first();
    if ($mobileMenu.length && !$mobileMenu.find('a').filter(function () {
        return $(this).text().trim().toUpperCase() === 'RESOURCES';
    }).length) {
        var $mobileResource = $('<li class="menu-item-has-children"><a href="#">RESOURCES</a></li>');
        $mobileMenu.find('li').eq(2).before($mobileResource);
        addResourceSubmenu($mobileResource.find('a'));
    }

    /*===========================================
        =    On Load Function      =
    =============================================*/
    $(window).on("load", function () {
        preloader();
        wowAnimation();
    });


    /*===========================================
        =    Preloader      =
    =============================================*/
    function preloader() {
        $('.preloader').delay(0).fadeOut();
    };


    /*===========================================
	=         Mobile Menu Active         =
    =============================================*/
    $.fn.mobilemenu = function (options) {
        var opt = $.extend(
            {
                menuToggleBtn: ".menu-toggle",
                bodyToggleClass: "body-visible",
                subMenuClass: "submenu-class",
                subMenuParent: "submenu-item-has-children",
                subMenuParentToggle: "active-class",
                meanExpandClass: "mean-expand-class",
                appendElement: '<span class="mean-expand-class"></span>',
                subMenuToggleClass: "menu-open",
                toggleSpeed: 400,
            },
            options
        );

        return this.each(function () {
            var menu = $(this);

            function menuToggle() {
                menu.toggleClass(opt.bodyToggleClass);

                var subMenu = "." + opt.subMenuClass;
                $(subMenu).each(function () {
                    if ($(this).hasClass(opt.subMenuToggleClass)) {
                        $(this).removeClass(opt.subMenuToggleClass);
                        $(this).css("display", "none");
                        $(this).parent().removeClass(opt.subMenuParentToggle);
                    }
                });
            }

            menu.find("li").each(function () {
                var submenu = $(this).find("ul");
                submenu.addClass(opt.subMenuClass);
                submenu.css("display", "none");
                submenu.parent().addClass(opt.subMenuParent);
                submenu.prev("a").append(opt.appendElement);
                submenu.next("a").append(opt.appendElement);
            });

            function toggleDropDown($element) {
                var $parent = $($element).parent();
                var $siblings = $parent.siblings();

                $siblings.removeClass(opt.subMenuParentToggle);
                $siblings.find("ul").slideUp(opt.toggleSpeed).removeClass(opt.subMenuToggleClass);

                $parent.toggleClass(opt.subMenuParentToggle);
                $($element).next("ul").slideToggle(opt.toggleSpeed).toggleClass(opt.subMenuToggleClass);
            }

            var expandToggler = "." + opt.meanExpandClass;
            $(expandToggler).each(function () {
                $(this).on("click", function (e) {
                    e.preventDefault();
                    toggleDropDown($(this).parent());
                });
            });

            $(opt.menuToggleBtn).each(function () {
                $(this).on("click", function () {
                    menuToggle();
                });
            });

            menu.on("click", function (e) {
                e.stopPropagation();
                menuToggle();
            });

            menu.find("div").on("click", function (e) {
                e.stopPropagation();
            });
        });
    };
    $(".mobile-menu-wrapper").mobilemenu();


    /*===========================================
	=         Desk Menu Active         =
    =============================================*/
    $.fn.deskmenu = function (options) {
        var opt = $.extend(
            {
                menuToggleBtn: ".menu-toggle2",
                bodyToggleClass: "body-visible",
                subMenuClass: "submenu-class2",
                subMenuParent: "submenu-item-has-children2",
                subMenuParentToggle: "active-class2",
                meanExpandClass: "mean-expand-class2",
                appendElement: '<span class="mean-expand-class2"></span>',
                subMenuToggleClass: "menu-open2",
                toggleSpeed: 400,
            },
            options
        );

        return this.each(function () {
            var menu = $(this);

            function menuToggle() {
                menu.toggleClass(opt.bodyToggleClass);

                var subMenu = "." + opt.subMenuClass;
                $(subMenu).each(function () {
                    if ($(this).hasClass(opt.subMenuToggleClass)) {
                        $(this).removeClass(opt.subMenuToggleClass);
                        $(this).css("display", "none");
                        $(this).parent().removeClass(opt.subMenuParentToggle);
                    }
                });
            }

            menu.find("li").each(function () {
                var submenu = $(this).find("ul");
                submenu.addClass(opt.subMenuClass);
                submenu.css("display", "none");
                submenu.parent().addClass(opt.subMenuParent);
                submenu.prev("a").append(opt.appendElement);
                submenu.next("a").append(opt.appendElement);
            });

            function toggleDropDown($element) {
                var $parent = $($element).parent();
                var $siblings = $parent.siblings();

                $siblings.removeClass(opt.subMenuParentToggle);
                $siblings.find("ul").slideUp(opt.toggleSpeed).removeClass(opt.subMenuToggleClass);

                $parent.toggleClass(opt.subMenuParentToggle);
                $($element).next("ul").slideToggle(opt.toggleSpeed).toggleClass(opt.subMenuToggleClass);
            }

            var expandToggler = "." + opt.meanExpandClass;
            $(expandToggler).each(function () {
                $(this).on("click", function (e) {
                    e.preventDefault();
                    toggleDropDown($(this).parent());
                });
            });

            $(opt.menuToggleBtn).each(function () {
                $(this).on("click", function () {
                    menuToggle();
                });
            });

            menu.on("click", function (e) {
                e.stopPropagation();
                menuToggle();
            });

            menu.find("div").on("click", function (e) {
                e.stopPropagation();
            });
        });
    };

    $(".desk-menu-wrapper").deskmenu();



    /*===========================================
	=         Sticky Fix         =
    =============================================*/
    $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 500) {
            $('.sticky-wrapper').addClass('header-sticky');
        } else {
            $('.sticky-wrapper').removeClass('header-sticky')
        }
    })


    /*===========================================
	=         Scroll To Top         =
    =============================================*/
    if($('.scroll-top')) {
        var scrollTopbtn = document.querySelector('.scroll-top');
        var progressPath = document.querySelector('.scroll-top path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 750;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(scrollTopbtn).addClass('show');
            } else {
                jQuery(scrollTopbtn).removeClass('show');
            }
        });
        jQuery(scrollTopbtn).on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, 1);
            return false;
        })
    }


    /*===========================================
	=         Set Background Image         =
    =============================================*/
    if ($("[data-bg-src]").length > 0) {
        $("[data-bg-src]").each(function () {
            var src = $(this).attr("data-bg-src");
            $(this).css("background-image", "url(" + src + ")");
            $(this).removeAttr("data-bg-src").addClass("background-image");
        });
    }

    /*===========================================
	=         Set Background Mask         =
    =============================================*/
    if ($('[data-mask-src]').length > 0) {
        $('[data-mask-src]').each(function () {
          var mask = $(this).attr('data-mask-src');
          $(this).css({
            'mask-image': 'url(' + mask + ')',
            '-webkit-mask-image': 'url(' + mask + ')'
          });
          $(this).addClass('bg-mask');
          $(this).removeAttr('data-mask-src');
        });
    };

    /*===========================================
	=         Slick Global Slider         =
    =============================================*/
    $(".global-carousel").each(function () {
        var carouselSlide = $(this);

        // Collect Data
        function d(data) {
            return carouselSlide.data(data);
        }

        // Custom Arrow Button
        var prevButton =
                '<button type="button" class="slick-prev"><i class="' +
                d("prev-arrow") +
                '"></i></button>',
            nextButton =
                '<button type="button" class="slick-next"><i class="' +
                d("next-arrow") +
                '"></i></button>';

        // Function For Custom Arrow Btn
        $("[data-slick-next]").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $($(this).data("slick-next")).slick("slickNext");
            });
        });

        $("[data-slick-prev]").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $($(this).data("slick-prev")).slick("slickPrev");
            });
        });

        // Check for arrow wrapper
        if (d("arrows") == true) {
            if (!carouselSlide.closest(".arrow-wrap").length) {
                carouselSlide.closest(".container").parent().addClass("arrow-wrap");
            }
        }

        carouselSlide.slick({
            dots: d("dots") ? true : false,
            fade: d("fade") ? true : false,
            arrows: d("arrows") ? true : false,
            speed: d("speed") ? d("speed") : 1000,
            asNavFor: d("asnavfor") ? d("asnavfor") : false,
            autoplay: d("autoplay") == false ? false : true,
            infinite: d("infinite") == false ? false : true,
            slidesToShow: d("slide-show") ? d("slide-show") : 1,
            adaptiveHeight: d("adaptive-height") ? true : false,
            centerMode: d("center-mode") ? true : false,
            autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
            centerPadding: d("center-padding") ? d("center-padding") : "0",
            focusOnSelect: d("focuson-select") == false ? false : true,
            pauseOnFocus: d("pauseon-focus") ? true : false,
            pauseOnHover: d("pauseon-hover") ? true : false,
            variableWidth: d("variable-width") ? true : false,
            vertical: d("vertical") ? true : false,
            verticalSwiping: d("vertical") ? true : false,
            prevArrow: d("prev-arrow")
                ? prevButton
                : '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
            nextArrow: d("next-arrow")
                ? nextButton
                : '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
            rtl: $("html").attr("dir") == "rtl" ? true : false,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        arrows: d("xl-arrows") ? true : false,
                        dots: d("xl-dots") ? true : false,
                        slidesToShow: d("xl-slide-show")
                            ? d("xl-slide-show")
                            : d("slide-show"),
                        centerMode: d("xl-center-mode") ? true : false,
                        centerPadding: d("xl-center-padding") ? d("xl-center-padding") : "0",
                    },
                },
                {
                    breakpoint: 1400,
                    settings: {
                        arrows: d("ml-arrows") ? true : false,
                        dots: d("ml-dots") ? true : false,
                        slidesToShow: d("ml-slide-show")
                            ? d("ml-slide-show")
                            : d("slide-show"),
                        centerMode: d("ml-center-mode") ? true : false,
                        centerPadding: d("ml-center-padding") ? d("ml-center-padding") : "0",
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        arrows: d("lg-arrows") ? true : false,
                        dots: d("lg-dots") ? true : false,
                        slidesToShow: d("lg-slide-show")
                            ? d("lg-slide-show")
                            : d("slide-show"),
                        centerMode: d("lg-center-mode")
                            ? d("lg-center-mode")
                            : false,
                        centerPadding: d("lg-center-padding") ? d("lg-center-padding") : "0",
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        arrows: d("md-arrows") ? true : false,
                        dots: d("md-dots") ? true : false,
                        slidesToShow: d("md-slide-show")
                            ? d("md-slide-show")
                            : 1,
                        centerMode: d("md-center-mode")
                            ? d("md-center-mode")
                            : false,
                        centerPadding: 0,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        arrows: d("sm-arrows") ? true : false,
                        dots: d("sm-dots") ? true : false,
                        slidesToShow: d("sm-slide-show")
                            ? d("sm-slide-show")
                            : 1,
                        centerMode: d("sm-center-mode")
                            ? d("sm-center-mode")
                            : false,
                        centerPadding: 0,
                    },
                },
                {
                    breakpoint: 576,
                    settings: {
                        arrows: d("xs-arrows") ? true : false,
                        dots: d("xs-dots") ? true : false,
                        slidesToShow: d("xs-slide-show")
                            ? d("xs-slide-show")
                            : 1,
                        centerMode: d("xs-center-mode")
                            ? d("xs-center-mode")
                            : false,
                        centerPadding: 0,
                    },
                },
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ],
        });
    });


    /*===========================================
	=         Custom Animation For Slider     =
    =============================================*/
    $('[data-ani-duration]').each(function () {
        var durationTime = $(this).data('ani-duration');
        $(this).css('animation-duration', durationTime);
    });

    $('[data-ani-delay]').each(function () {
        var delayTime = $(this).data('ani-delay');
        $(this).css('animation-delay', delayTime);
    });

    $('[data-ani]').each(function () {
        var animaionName = $(this).data('ani');
        $(this).addClass(animaionName);
        $('.slick-current [data-ani]').addClass('slider-animated');
    });

    // Center the second pricing package on mobile; restore the grid on desktop.
    var pricingMobile = window.matchMedia('(max-width: 767px)');
    function updatePricingCarousels() {
        $('.pricing-carousel').each(function () {
            var carousel = $(this);
            var isHomePricing = carousel.closest('.home-page').length > 0;
            if (pricingMobile.matches && !carousel.hasClass('slick-initialized')) {
                carousel.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    centerMode: true,
                    centerPadding: '9%',
                    infinite: isHomePricing,
                    autoplay: isHomePricing,
                    autoplaySpeed: 5000,
                    pauseOnHover: true,
                    pauseOnFocus: true,
                    arrows: false,
                    dots: false,
                    swipeToSlide: true,
                    speed: 350,
                    adaptiveHeight: true
                });
                if (carousel.closest('.home-page').length && !carousel.next('.pricing-swipe-hint').length) {
                    carousel.after('<p class="pricing-swipe-hint" aria-hidden="true"><i class="fas fa-arrow-left"></i><span>Swipe to compare packages</span><i class="fas fa-arrow-right"></i></p>');
                }
            } else if (!pricingMobile.matches && carousel.hasClass('slick-initialized')) {
                carousel.slick('unslick');
                carousel.next('.pricing-swipe-hint').remove();
            }
        });
    }
    updatePricingCarousels();
    pricingMobile.addEventListener('change', updatePricingCarousels);

    // Repeat complete logo sets so every loop advances a full group of three.
    $('.partner-carousel').each(function () {
        var carousel = $(this);
        if (carousel.hasClass('slick-initialized')) return;
        var logos = carousel.children();
        if (!logos.length) return;
        while (carousel.children().length <= 6 || carousel.children().length % 3 !== 0) {
            carousel.append(logos.clone());
        }
        carousel.slick({
            slidesToShow: 6,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 600,
            cssEase: 'ease-in-out',
            infinite: true,
            arrows: false,
            dots: false,
            rtl: false,
            pauseOnHover: false,
            pauseOnFocus: true,
            responsive: [{
                breakpoint: 1200,
                settings: { slidesToShow: 3, slidesToScroll: 3 }
            }]
        });
    });

    $('.global-carousel').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $(slick.$slides).find('[data-ani]').removeClass('slider-animated');
        $(slick.$slides[currentSlide]).find('[data-ani]').addClass('slider-animated');
    })


    /*===========================================
	=         Ajax Contact Form         =
    =============================================*/
    var form = ".ajax-contact";
    var invalidCls = "is-invalid";
    var $email = '[name="email"]';
    var $validation =
        '[name="name"],[name="email"],[name="message"]'; // Must be use (,) without any space
    var formMessages = $(".form-messages");

    function sendContact() {
        var formData = $(form).serialize();
        var valid;
        valid = validateContact();
        if (valid) {
            formMessages.removeClass("success error").addClass("sending").text("Sending your message...");
            $(form).find('button[type="submit"]').prop("disabled", true);
            jQuery
            .ajax({
                url: $(form).attr("action"),
                data: formData,
                type: "POST",
                timeout: 15000,
            })
            .done(function (response) {
                // Make sure that the formMessages div has the 'success' class.
                formMessages.removeClass("error sending");
                formMessages.addClass("success");
                // Set the message text.
                formMessages.text("Thank you! Your message has been sent. We will get back to you in a few.");
                // Clear the form.
                $(
                    form +
                        ' input:not([type="submit"]),' +
                        form +
                        " textarea"
                ).val("");
                $(form).find('select[name="service"]').prop("selectedIndex", 0);
            })
            .fail(function (data) {
                // Make sure that the formMessages div has the 'error' class.
                formMessages.removeClass("success sending");
                formMessages.addClass("error");
                // Set the message text.
                if (data.status === 0 || data.status === 408) {
                    if (window.location.protocol === "file:") {
                        formMessages.text("The form needs to be opened through a PHP server before it can send messages.");
                    } else {
                        formMessages.text("We could not send your message right now. Please try again in a few minutes.");
                    }
                } else if (data.responseText !== "") {
                    formMessages.text(data.responseText);
                } else {
                    formMessages.html(
                        "Oops! Your message could not be sent. Please try again in a few minutes."
                    );
                }
            })
            .always(function () {
                $(form).find('button[type="submit"]').prop("disabled", false);
            });
        } else {
            formMessages.removeClass("success sending").addClass("error").text("Please complete all required fields and try again.");
        }
    }

    function validateContact() {
        var valid = true;
        var formInput;

        function unvalid($validation) {
            $validation = $validation.split(",");
            for (var i = 0; i < $validation.length; i++) {
                formInput = form + " " + $validation[i];
                if (!$(formInput).val()) {
                    $(formInput).addClass(invalidCls);
                    valid = false;
                } else {
                    $(formInput).removeClass(invalidCls);
                }
            }
        }
        unvalid($validation);

        if ($(form + ' [name="service"]').length && !$(form + ' [name="service"]').val()) {
            $(form + ' [name="service"]').addClass(invalidCls);
            valid = false;
        } else {
            $(form + ' [name="service"]').removeClass(invalidCls);
        }

        if (
            !$($email).val() ||
            !$($email)
                .val()
                .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
        ) {
            $($email).addClass(invalidCls);
            valid = false;
        } else {
            $($email).removeClass(invalidCls);
        }
        return valid;
    }

    $(form).on("submit", function (element) {
        element.preventDefault();
        sendContact();
    });



    /*===========================================
	=         Search Box Popup         =
    =============================================*/
    function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
        $($searchOpen).on("click", function (e) {
            e.preventDefault();
            $($searchBox).addClass($toggleCls);
        });
        $($searchBox).on("click", function (e) {
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
        $($searchBox)
            .find("form")
            .on("click", function (e) {
                e.stopPropagation();
                $($searchBox).addClass($toggleCls);
            });
        $($searchCls).on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
    }
    popupSarchBox(
        ".popup-search-box",
        ".searchBoxToggler",
        ".searchClose",
        "show"
    );



    /*===========================================
	=         Popup Sidemenu         =
    =============================================*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
        // Sidebar Popup
        $($sideMunuOpen).on('click', function (e) {
            e.preventDefault();
            $($sideMenu).addClass($toggleCls);
        });
        $($sideMenu).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu).removeClass($toggleCls)
        });

        var sideMenuChild = $sideMenu + ' > div';
        $(sideMenuChild).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu).addClass($toggleCls)
        });
        $($sideMenuCls).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($sideMenu).removeClass($toggleCls);
        });
    };
    popupSideMenu('.sidemenu-wrapper', '.sideMenuToggler', '.sideMenuCls', 'show');



    /*===========================================
	=         Magnific Popup         =
    =============================================*/
    /* magnificPopup img view */
    $(".popup-image").magnificPopup({
        type: "image",
        mainClass: 'mfp-zoom-in',
        removalDelay: 260,
        gallery: {
            enabled: true,
        },
    });

    /* magnificPopup video view */
    $(".popup-video").magnificPopup({
        type: "iframe",
        mainClass: 'mfp-zoom-in',
        removalDelay: 260,
    });



    /*===========================================
	=        Masonary Active         =
    =============================================*/
    $(".masonary-active").imagesLoaded(function () {
        var $filter = ".masonary-active",
            $filterItem = ".filter-item";

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                },
            });

            var requestedFilter = new URLSearchParams(window.location.search).get('filter');
            if (requestedFilter) {
                var requestedButton = $('.portfolio-filter-btn[data-filter=".' + requestedFilter + '"]');
                if (requestedButton.length) {
                    $grid.isotope({ filter: '.' + requestedFilter });
                    $('.portfolio-filter-btn').removeClass('active').attr('aria-selected', 'false');
                    requestedButton.addClass('active').attr('aria-selected', 'true');
                }
            }

            $('.portfolio-filter-btn').on('click', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });
                $('.portfolio-filter-btn').removeClass('active').attr('aria-selected', 'false');
                $(this).addClass('active').attr('aria-selected', 'true');
            });
        }
    });


    /*===========================================
	=         Shape Mockup         =
    =============================================*/
    $.fn.shapeMockup = function () {
        var $shape = $(this);
        $shape.each(function () {
            var $currentShape = $(this),
                shapeTop = $currentShape.data("top"),
                shapeRight = $currentShape.data("right"),
                shapeBottom = $currentShape.data("bottom"),
                shapeLeft = $currentShape.data("left");
            $currentShape
                .css({
                    top: shapeTop,
                    right: shapeRight,
                    bottom: shapeBottom,
                    left: shapeLeft,
                })
                .removeAttr("data-top")
                .removeAttr("data-right")
                .removeAttr("data-bottom")
                .removeAttr("data-left")
                .parent()
                .addClass("shape-mockup-wrap");
        });
    };

    if ($(".shape-mockup")) {
        $(".shape-mockup").shapeMockup();
    }



    /*===========================================
	=         Progress Bar Animation         =
    =============================================*/
    $('.progress-bar').waypoint(function() {
        $('.progress-bar').css({
        animation: "animate-positive 1.8s",
        opacity: "1"
        });
    }, { offset: '90%' });

    

    /*===========================================
	=         Counter Up         =
    =============================================*/
    $(".counter-number").counterUp({
        delay: 10,
        time: 1000,
    });



    /*===========================================
	=         Marquee Active         =
    =============================================*/
    if ($(".marquee_mode").length) {
        $('.marquee_mode').marquee({
            speed: 50,
            gap: 0,
            delayBeforeStart: 0,
            direction: 'left',
            duplicated: true,
            pauseOnHover: true,
            startVisible:true,
        });
    }

    /*===========================================
	=         GSAP Register         =
    =============================================*/
    window.gsap.registerPlugin(
        window.TweenMax
    );
    gsap.registerPlugin(ScrollTrigger);

    /////////////////////////////////////////////////////
    // Magnate Animation
    var magnets = document.querySelectorAll('.gsap-magnetic')
    var strength = 50

    magnets.forEach( (magnet) => {
        magnet.addEventListener('mousemove', moveMagnet );
        magnet.addEventListener('mouseout', function(event) {
            TweenMax.to( event.currentTarget, 1, {x: 0, y: 0, ease: Power4.easeOut})
        } );
    });

    function moveMagnet(event) {
        var magnetButton = event.currentTarget
        var bounding = magnetButton.getBoundingClientRect()

        TweenMax.to( magnetButton, 1, {
            x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * strength,
            y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * strength,
            ease: Power4.easeOut
        })
    }

    document.querySelectorAll(".scroll-text-ani").forEach((line) => {
        gsap.to(line, {
        backgroundImage: "linear-gradient(to right, #0B1422 100%, #D5D7DA 100%)",
        ease: "none",
        scrollTrigger: {
            trigger: line,
            start: "top bottom",
            end: "top center",
            scrub: 1
        }
        });
    });
    /*===========================================
	=         Jarallax Active         =
    =============================================*/
    $('.jarallax').jarallax();


    /*===========================================
        =        Wow Active         =
    =============================================*/
    function wowAnimation() {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: false,
            live: true
        });
        wow.init();
    }

    /*===========================================
        =        Price Slider         =
    =============================================*/
    $(".price_slider").slider({
        range: true,
        min: 0,
                max: 30000,
                values: [0, 30000],
        slide: function (event, ui) {
                    $(".from").text("KES " + ui.values[0].toLocaleString('en-KE'));
                    $(".to").text("KES " + ui.values[1].toLocaleString('en-KE'));
                    $(".shop__inner-wrap .product-card").each(function () {
                            var $card = $(this);
                            var priceText = $card.find('.price').clone().children('del').remove().end().text();
                            var price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
                            var $column = $card.closest('.col-sm-6');
                            $column.toggle(price >= ui.values[0] && price <= ui.values[1]);
                    });
        }
      });
        $(".from").text("KES " + $(".price_slider").slider("values", 0).toLocaleString('en-KE'));
        $(".to").text("KES " + $(".price_slider").slider("values", 1).toLocaleString('en-KE'));
        $('.pricing-category-toggle button').on('click', function () {
            var $button = $(this);
            var category = $button.data('pricing-category');
            $('.pricing-category-toggle button').removeClass('is-active').attr('aria-pressed', 'false');
            $button.addClass('is-active').attr('aria-pressed', 'true');
            $('.pricing-category-label').text(category + ' packages');
            $('[data-pricing-panel]').each(function () {
                var $panel = $(this);
                var isActive = $panel.data('pricing-panel') === category;
                $panel.prop('hidden', !isActive);
                if (isActive) {
                    $panel.find('.pricing-carousel.slick-initialized').slick('setPosition');
                }
            });
        });

    /*===========================================
        =        Quantity         =
    =============================================*/
    $(".quantity-plus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val(), 10);
            if (!isNaN(currentVal)) {
                $qty.val(currentVal + 1);
            }
        });
    });

    $(".quantity-minus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val(), 10);
            if (!isNaN(currentVal) && currentVal > 1) {
                $qty.val(currentVal - 1);
            }
        });
    });

    /*===========================================
        =        Woocommerce Payment Toggle         =
    =============================================*/
    $('.wc_payment_methods input[type="radio"]:checked')
        .siblings(".payment_box")
        .show();
    $('.wc_payment_methods input[type="radio"]').each(function () {
        $(this).on("change", function () {
            $(".payment_box").slideUp();
            $(this).siblings(".payment_box").slideDown();
        });
    });


    /*=============================================
        =    		project Active  	       =
    =============================================*/
    $(function () {
        var width = $(window).width();
        if (width > 991) {

            "use strict";

            var wind = $(window);

            wind.on('scroll', function () {
                $(".project-static-wrap13 .project-content").each(function () {
                    var bottom_of_object =
                        $(this).offset().top + $(this).outerHeight();
                    var bottom_of_window =
                        $(window).scrollTop() + $(window).height();
                    var tab_id = $(this).attr('data-tab');
                    if (bottom_of_window > bottom_of_object) {
                        $("#" + tab_id).addClass('current');
                        $(this).addClass('current');
                    } else {
                        $("#" + tab_id).removeClass('current');
                        $(this).removeClass('current');
                    }
                });
            });
        }
    });

    /*=============================================
        =          sticky           =
    =============================================*/
    $("#sticky_item").stick_in_parent();
    
    /*===========================================
        =        Project-slider-showcase         =
    =============================================*/
    jQuery(function () {
        const slider = jQuery(".project-slider-showcase");
        slider;
      
        slider.on("wheel", function (e) {
          e.preventDefault();
      
          if (e.originalEvent.deltaY < 0) {
            jQuery(this).slick("slickPrev");
          } else {
            jQuery(this).slick("slickNext");
          }
        });
    });
    $('.copy-prompt-btn[data-prompt]').each(function () {
        var $copyButton = $(this);
        var promptText = $copyButton.attr('data-prompt');

        var copyPrompt = function () {
            var copyComplete = function () {
                $copyButton.addClass('copied').text('Copied!');
                window.setTimeout(function () {
                    $copyButton.removeClass('copied').text('Copy Prompt');
                }, 1800);
            };

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(promptText).then(copyComplete);
                return;
            }

            var textArea = document.createElement('textarea');
            textArea.value = promptText;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
            copyComplete();
        };

        $copyButton.on('click', copyPrompt);
    });
    $('.prompt-share-btn[data-prompt]').on('click', function () {
        var $shareButton = $(this);
        var promptText = $shareButton.attr('data-prompt');
        var $card = $shareButton.closest('.blog-post-item-two');
        var title = $card.find('.title').first().text().trim();
        var tool = $card.find('.prompt-tool').first().text().trim();
        var promptLink = $card.find('.blog-post-thumb a, .title a').first().attr('href') || window.location.href;
        var promptUrl = new URL(promptLink, window.location.href).href;
        var shareText = 'Title: ' + title + '\nTool: ' + tool + '\n\nPrompt:\n' + promptText + '\n\nURL: ' + promptUrl;
        var shareComplete = function () {
            $shareButton.addClass('shared');
            window.setTimeout(function () {
                $shareButton.removeClass('shared');
            }, 1800);
        };

        if (navigator.share) {
            navigator.share({ title: title, text: shareText, url: promptUrl }).then(shareComplete);
            return;
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(shareText).then(shareComplete);
        }
    });
    $('.product-color-swatch, .product-size-option').on('click', function () {
        var $option = $(this);
        $option.siblings().removeClass('is-selected');
        $option.addClass('is-selected');
    });
    $(document).on('click', '.product-option-trigger', function (event) {
        var $modal = $($(this).attr('href'));
        if (!$modal.length) {
            return;
        }
        event.preventDefault();
        $modal.removeAttr('hidden');
        $('body').addClass('product-options-modal-open');
        $modal.find('.product-options-modal__close').trigger('focus');
    });
    $(document).on('click', '[data-modal-close]', function () {
        var $modal = $(this).closest('.product-options-modal');
        $modal.attr('hidden', true);
        $('body').removeClass('product-options-modal-open');
    });
    $(document).on('keydown', function (event) {
        if (event.key === 'Escape') {
            $('[data-modal-close]').first().trigger('click');
        }
    });
    $(document).on('click', '.product-options-modal__buy', function (event) {
        var $modal = $(this).closest('.product-options-modal');
        var color = $modal.find('.product-color-swatch.is-selected').attr('aria-label') || 'Not selected';
        var size = $modal.find('.product-size-option.is-selected').text().trim() || 'Not selected';
        var message = [
            'New order request',
            'Product: Printed T-Shirt',
            'Price: KES 3,075',
            'Color: ' + color,
            'Size: ' + size
        ].join('\n');
        event.preventDefault();
        window.open('https://wa.me/254722465983?text=' + encodeURIComponent(message), '_blank', 'noopener');
    });
    (function () {
        var cartKey = 'friskCart';
        var formatKes = function (amount) {
            return 'KES ' + Math.round(amount).toLocaleString('en-KE');
        };
        var updateHeaderCount = function (cart) {
            var count = cart.reduce(function (total, item) {
                return total + Number(item.quantity || 0);
            }, 0);
            $('.header-cart .effect-1 > span').text('(' + String(count).padStart(2, '0') + ')');
        };
        var escapeHtml = function (value) {
            return $('<div>').text(value || '').html();
        };
        var getCart = function () {
            try {
                return JSON.parse(localStorage.getItem(cartKey)) || [];
            } catch (error) {
                return [];
            }
        };
        var saveCart = function (cart) {
            localStorage.setItem(cartKey, JSON.stringify(cart));
            updateHeaderCount(cart);
        };
        var cartTotal = function (cart) {
            return cart.reduce(function (total, item) {
                return total + (item.price * item.quantity);
            }, 0);
        };
        var addToCart = function (item) {
            var cart = getCart();
            var existing = cart.find(function (cartItem) {
                return cartItem.name === item.name && cartItem.color === item.color && cartItem.size === item.size;
            });
            if (existing) {
                existing.quantity += 1;
            } else {
                item.quantity = 1;
                cart.push(item);
            }
            saveCart(cart);
        };
        var priceFromCard = function ($card) {
            var priceText = $card.find('.price').clone().children('del').remove().end().text();
            var price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
            return priceText.indexOf('€') !== -1 ? price * 150 : price;
        };
        var renderCart = function () {
            var cart = getCart();
            var $table = $('.cart-wrapper .woocommerce-cart-form .cart_table').first();
            if (!$table.length) {
                return;
            }
            if (!cart.length) {
                $table.find('tbody').html('<tr><td colspan="6">Your cart is empty.</td></tr>');
                $('.cart_totals .amount').text(formatKes(0));
                return;
            }
            if (!cart.length) {
                return;
            }
            $table.find('tbody').html(cart.map(function (item, index) {
                var subtotal = item.price * item.quantity;
                return '<tr class="cart_item" data-cart-index="' + index + '">' +
                    '<td data-title="Remove"><button type="button" class="remove cart-remove" aria-label="Remove ' + escapeHtml(item.name) + '"><i class="fas fa-times"></i></button></td>' +
                    '<td data-title="Product"><a class="cart-productimage" href="shop-details"><img width="100" height="108" src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.name) + '"></a></td>' +
                    '<td data-title="Name"><a class="cart-productname" href="shop-details">' + escapeHtml(item.name) + (item.color ? ' <small>(' + escapeHtml(item.color) + ', ' + escapeHtml(item.size) + ')</small>' : '') + '</a></td>' +
                    '<td data-title="Price"><span class="amount">' + formatKes(item.price) + '</span></td>' +
                    '<td data-title="Quantity"><div class="quantity"><span class="title">Quantity</span><button type="button" class="quantity-minus qty-btn">-</button><input type="number" class="qty-input" min="1" max="100" value="' + item.quantity + '" title="Qty"><button type="button" class="quantity-plus qty-btn">+</button></div></td>' +
                    '<td data-title="Total"><span class="amount">' + formatKes(subtotal) + '</span></td>' +
                    '</tr>';
            }).join(''));
            $('.cart_totals .amount').text(formatKes(cartTotal(cart)));
        };
        var orderMessage = function () {
            var cart = getCart();
            var lines = ['Hello Stanpixels! I would like to place an order:', ''];
            cart.forEach(function (item) {
                lines.push(item.name + (item.color ? ' | Color: ' + item.color : '') + (item.size ? ' | Size: ' + item.size : '') + '\nQuantity: ' + item.quantity + '\nUnit price: ' + formatKes(item.price) + '\nSubtotal: ' + formatKes(item.price * item.quantity) + '\n');
            });
            lines.push('Order total: ' + formatKes(cartTotal(cart)), '', 'Name: [your name]', 'Delivery location: [your address or pickup preference]', '', 'Please confirm availability, delivery charges, estimated delivery date, and payment instructions. Thank you!');
            return lines.join('\n');
        };
        $(document).on('click', '.product-card .actions a:not(.product-option-trigger)', function (event) {
            var $card = $(this).closest('.product-card');
            if (!$card.length) {
                return;
            }
            addToCart({
                name: $card.find('.product-title').text().trim(),
                price: priceFromCard($card),
                image: $card.find('.product-img img').attr('src'),
                color: '',
                size: ''
            });
            event.preventDefault();
            window.location.href = 'cart';
        });
        $(document).on('click', '.product-options-modal__cart', function (event) {
            var $modal = $(this).closest('.product-options-modal');
            addToCart({
                name: 'Printed T-Shirt',
                price: 3075,
                image: 'assets/img/product/product_1_1.jpg',
                color: $modal.find('.product-color-swatch.is-selected').attr('aria-label') || 'Not selected',
                size: $modal.find('.product-size-option.is-selected').text().trim() || 'Not selected'
            });
            event.preventDefault();
            window.location.href = 'cart';
        });
        $(document).on('click', '.cart-wrapper .remove', function (event) {
            event.preventDefault();
            var $row = $(this).closest('tr.cart_item');
            var cart = getCart();
            var cartIndex = $row.data('cart-index');
            if (cartIndex !== undefined) {
                cart.splice(Number(cartIndex), 1);
            } else {
                $row.remove();
                cart = [];
            }
            saveCart(cart);
            renderCart();
        });
        $(document).on('click', '.cart-wrapper .quantity-plus, .cart-wrapper .quantity-minus', function () {
            var $row = $(this).closest('[data-cart-index]');
            var cart = getCart();
            var index = Number($row.data('cart-index'));
            cart[index].quantity = Math.max(1, Math.min(100, cart[index].quantity + ($(this).hasClass('quantity-plus') ? 1 : -1)));
            saveCart(cart);
            renderCart();
        });
        $(document).on('change', '.cart-wrapper .qty-input', function () {
            var cart = getCart();
            var index = Number($(this).closest('[data-cart-index]').data('cart-index'));
            cart[index].quantity = Math.max(1, Math.min(100, Number($(this).val()) || 1));
            saveCart(cart);
            renderCart();
        });
        $(document).on('click', '[data-whatsapp-checkout]', function (event) {
            event.preventDefault();
            var cart = getCart();
            if (!cart.length) {
                window.alert('Your cart is empty. Add items before placing an order.');
                return;
            }
            window.open('https://wa.me/254722465983?text=' + encodeURIComponent(orderMessage()), '_blank', 'noopener');
        });
        renderCart();
        updateHeaderCount(getCart());
    }());
    (function () {
        var $page = $('.blog-prompts-page');
        var $grid = $page.find('.blog-post-wrap > .row').first();
        var $cards = $grid.find('.col-md-6');
        var $pagination = $page.find('.pagination-wrap .pagination');
        var $recentPromptList = $page.find('.recent-prompt-list');
        var $searchForm = $page.find('.sidebar__search form');
        var $searchInput = $searchForm.find('input');
        var $categoryFilters = $page.find('.prompt-category-filter');
        var resourceFilter = new URLSearchParams(window.location.search).get('resource');
        var resourceTitles = {
            prompts: 'AI Prompts',
            blogs: 'Blogs & Articles',
            assets: 'Design Assets'
        };
        var resourceBackgrounds = {
            prompts: 'assets/img/blog/ai.png',
            blogs: 'assets/img/portfolio/a.png',
            assets: 'assets/img/portfolio/a.png'
        };
        var resourceCards = $cards.filter(function () {
            var $card = $(this);
            var category = $card.data('category');
            if (resourceFilter === 'blogs') {
                return $card.find('.article-card').length > 0 || $card.hasClass('article-card');
            }
            if (resourceFilter === 'assets') {
                return ['Mockups', 'Photography', 'Enhancement', 'Photo Editing', 'Design', 'Social Media'].indexOf(category) !== -1;
            }
            if (resourceFilter === 'prompts') {
                return !$card.find('.article-card').length && !$card.hasClass('article-card');
            }
            return true;
        });
        var filteredCards = resourceCards;

        if (resourceTitles[resourceFilter]) {
            $page.find('.breadcumb-title').text(resourceTitles[resourceFilter]);
        }
        if (resourceBackgrounds[resourceFilter]) {
            $page.find('.breadcumb-wrapper').attr('data-bg-src', resourceBackgrounds[resourceFilter]);
            $page.find('.breadcumb-wrapper').css('background-image', 'url("' + resourceBackgrounds[resourceFilter] + '")');
        }

        if (!$grid.length || !$pagination.length || !$cards.length) {
            return;
        }

        $cards.each(function (index) {
            $(this).attr('id', 'prompt-card-' + (index + 1));
        });

        if ($recentPromptList.length) {
            $cards.slice(-3).get().reverse().forEach(function (card) {
                var $card = $(card);
                var title = $card.find('.title').first().text().trim();
                var $image = $card.find('.blog-post-thumb img').first();
                var $recentItem = $('<div class="sidebar__post-item"></div>');
                var $thumbLink = $('<a></a>').attr('href', '#' + $card.attr('id'));
                var $thumb = $('<div class="sidebar__post-thumb"></div>');
                var $content = $('<div class="sidebar__post-content"></div>');
                var $titleLink = $('<a></a>').attr('href', '#' + $card.attr('id')).text(title);

                $thumbLink.append($('<img>').attr({ src: $image.attr('src'), alt: title }));
                $thumb.append($thumbLink);
                $content.append($('<h5 class="title"></h5>').append($titleLink));
                $content.append('<span class="date"><i class="flaticon-time"></i>Recent prompt</span>');
                $recentItem.append($thumb, $content);
                $recentPromptList.append($recentItem);
            });
        }

        var updateCategoryCounts = function () {
            $categoryFilters.each(function () {
                var category = $(this).data('category');
                var count = $cards.filter('[data-category="' + category + '"]').length;
                $(this).find('.category-count').text(count);
            });
        };

        var renderPagination = function (page) {
            var cardsPerPage = window.matchMedia('(max-width: 767px)').matches ? 8 : 12;
            var pageCount = Math.max(1, Math.ceil(filteredCards.length / cardsPerPage));
            var currentPage = Math.min(page, pageCount);

            $cards.hide();
            filteredCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).show();
            $pagination.empty();

            for (var pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
                var $pageItem = $('<li class="page-item"></li>');
                var $pageLink = $('<button type="button" class="page-link"></button>');
                $pageLink.text(pageNumber);
                $pageLink.attr('aria-label', 'Go to page ' + pageNumber);

                if (pageNumber === currentPage) {
                    $pageItem.addClass('active');
                    $pageLink.attr('aria-current', 'page');
                }

                $pageLink.on('click', function () {
                    renderPagination(Number($(this).text()));
                });
                $pageItem.append($pageLink);
                $pagination.append($pageItem);
            }

            if (currentPage < pageCount) {
                var $nextItem = $('<li class="page-item next-page"></li>');
                var $nextLink = $('<button type="button" class="page-link" aria-label="Next page"><i class="fas fa-arrow-right"></i></button>');
                $nextLink.on('click', function () {
                    renderPagination(currentPage + 1);
                });
                $nextItem.append($nextLink);
                $pagination.append($nextItem);
            }
        };

        var filterCards = function (query, category) {
            var normalizedQuery = query.toLowerCase().trim();
            filteredCards = resourceCards.filter(function () {
                var $card = $(this);
                var searchableText = [
                    $card.find('.title').text(),
                    $card.find('.prompt-tool').text(),
                    $card.find('.copy-prompt-btn').data('prompt'),
                    $card.data('category')
                ].join(' ').toLowerCase();
                var matchesQuery = !normalizedQuery || searchableText.indexOf(normalizedQuery) !== -1;
                var matchesCategory = !category || $card.data('category') === category;
                return matchesQuery && matchesCategory;
            });
            renderPagination(1);
        };

        $searchForm.on('submit', function (event) {
            event.preventDefault();
            filterCards($searchInput.val(), $searchForm.data('category') || '');
        });
        $searchInput.on('input', function () {
            filterCards($(this).val(), $searchForm.data('category') || '');
        });
        $categoryFilters.on('click', function (event) {
            event.preventDefault();
            var category = $(this).data('category');
            $searchForm.data('category', category);
            $categoryFilters.removeClass('active');
            $(this).addClass('active');
            filterCards($searchInput.val(), category);
        });

        updateCategoryCounts();
        renderPagination(1);
        $(window).on('resize', function () {
            renderPagination(1);
        });
    }());
})(jQuery);
