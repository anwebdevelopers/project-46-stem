$(function() {

    'use strict';

    //-------------------------------
    //Меню
    //-------------------------------

    var $headerMenuButton = $('.header__menu-button'),
        $headerMenu = $('.header__menu');
    $headerMenuButton.click(function() {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
            $headerMenu.css({
                '-webkit-transform': 'translateY(0)',
                '-moz-transform': 'translateY(0)',
                '-ms-transform': 'translateY(0)',
                '-o-transform': 'translateY(0)',
                'transform': 'translateY(0)',
            });
        } else {
            $this.removeClass('active');
            $headerMenu.css({
                '-webkit-transform': 'translateY(-120%)',
                '-moz-transform': 'translateY(-120%)',
                '-ms-transform': 'translateY(-120%)',
                '-o-transform': 'translateY(-120%)',
                'transform': 'translateY(-120%)',
            });
        }
    });
    //Выключение при клике по ссылке
    $headerMenu.on('click', '.header__menu-nav a', function() {
        $headerMenuButton.removeClass('active');
        $headerMenu.css({
            '-webkit-transform': 'translateY(-100%)',
            '-moz-transform': 'translateY(-100%)',
            '-ms-transform': 'translateY(-100%)',
            '-o-transform': 'translateY(-100%)',
            'transform': 'translateY(-100%)',
        });
    });

    //----------------------------------------------------
    //Табы
    //----------------------------------------------------
    var $productionTabsItem = $('.production__tabs-item'),
        $productionTabsButtons = $('.production__tabs-buttons');

    $productionTabsItem.not(':first').hide();
    $productionTabsButtons.find('button:first').addClass('active');

    $productionTabsButtons.on('click', 'button:not(.active)', function() {
        $(this).addClass('active').siblings().removeClass('active').end().closest('.production__tabs').find($productionTabsItem).slideUp(300).eq($(this).index()).slideDown(300);
    });

    //------------------------------------
    //popup
    //------------------------------------

    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });


    //------------------------------------
    //Галереея в каталоге
    //------------------------------------

    var $catalog = $('.catalog'),
        $catalogItem = $('.catalog__item'),
        $catalogImg = $('.catalog__img'),
        $catalogGallery = $('.catalog__gallery');

    $catalog.append('<div class="catalog__nav"><button class="prev"></button><button class="next"></button></div>');


    $('.catalog__nav').on('click', 'button', function() {
        var $this = $(this),
            $slider = $this.closest($catalog),
            $item = $slider.find($catalogItem),
            itemActive = $slider.find('.catalog__item.active').index(),
            itemLength = $item.length,
            w = $(window).width();

        if ($this.hasClass('prev')) {
            $this.siblings('.next').removeClass('disabled');
            if(itemActive !== 0) {
                $item.slideUp(300).eq(itemActive - 1).addClass('active').slideDown(300).siblings().removeClass('active');
                itemActive--;
            }
            if(itemActive === 0) {
                $this.addClass('disabled');
            }
        } else {
            $this.siblings('.prev').removeClass('disabled');
            if(itemActive < itemLength - 1) {
                $item.slideUp(300).eq(itemActive + 1).addClass('active').slideDown(300).siblings().removeClass('active');
                itemActive++;
            }
            if(itemActive === itemLength - 1) {
                $this.addClass('disabled');
            }
        }
        if (w <= 480) {
            var thisSlide = $('.mfp-container').offset().top;
            $('html, body').animate({scrollTop: thisSlide}, 300, 'linear');
        }
    });

    $catalogImg.each(function() {
        var $this = $(this);
        $this.css({
            'background-image' : 'url(' +  $this.data('path') +')',
        });
    });

    $catalogGallery.each(function() {
        var $this = $(this),
            catalogImgLenght = $this.find($catalogImg).length;
        $this.append('<div class="catalog__dots"></div>');
        for (var i = 0; i < catalogImgLenght; i++ ) {
            $this.find('.catalog__dots').append($('<div class="catalog__dot"></div>'));
        }
        $this.find($catalogImg).not(':first').hide();
    });


    $('.catalog__dots').on('click', '.catalog__dot:not(.active)', function() {
        var $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
        $this.closest($catalogGallery).find($catalogImg).fadeOut(300).eq($this.index()).fadeIn(300);
    });

    $catalog.each(function() {
        var $this = $(this);
        $this.find($catalogItem).not(':first').hide();
        $this.find('.catalog__item:first').addClass('active');
        $('.prev').addClass('disabled');
        $this.find($catalogItem).find('.catalog__dot:first').addClass('active');
    });


    //------------------------------------------------
    // Плавный скролл
    //------------------------------------------------

    $(".scroll").click(function(e) {
        e.preventDefault();
        var thisSect = $($(this).attr('href')).offset().top;
        $('html, body').animate({scrollTop: thisSect }, ((Math.abs(thisSect - $(window).scrollTop()) * 0.1) * 5), 'swing');
    });

    //---------------------------------------------
    //Аккордеон technologi
    //---------------------------------------------
    var $questionsItem = $('.questions__item'),
        $questionsPoint = $('.questions__point'),
        $questionsWrapper = $('.questions__wrapper');

    $questionsPoint.addClass('hide');
    $questionsWrapper.hide();

    $questionsPoint.on('click', function() {
        var $this = $(this);
        if($this.hasClass('hide')) {
            $this.removeClass('hide').closest($questionsItem).find($questionsWrapper).slideDown(300);
        } else {
            $this.addClass('hide').closest($questionsItem).find($questionsWrapper).slideUp(300);
        }
    });

    //------------------------------------------------
    // Анимация появления элементов
    //------------------------------------------------
    var $about = $('.about'),
        $aboutItem = $('.about__item');

    $aboutItem.removeClass('animated');
    $about.waypoint(function(direction) {
        $aboutItem.each(function() {
            $(this).addClass('animated');
        });
    }, {
        offset: '50%'
    });

    $('.title, .undertitle, .about__text, .about__network-pretitle, .about__network-title, .advantages__text, .advantages__item, .selection__item, .contacts__box').animated("fadeInUp");
    $('.production__tabs-buttons, .vantages__item:nth-child(odd)').animated("fadeInLeft");
    $('.production__tabs-box, .vantages__item:nth-child(even)').animated("fadeInRight");
    $('.about__network-img').animated("zoomIn");
    $('.scheme__item').animated("fadeIn");

    //---------------------------------------------------
    //Яндекс карта
    //---------------------------------------------------

    ymaps.ready(function() {
        var myMap;
        myMap = new ymaps.Map('map', {
                center: [59.521582, 34.435892],
                zoom: 6,
                controls: [],
                behaviors: ['drag', 'dblClickZoom', 'rightMouseButtonMagnifier', 'multiTouch']
            }, {
                searchControlProvider: 'yandex#search'
            }),
        myMap.controls.add('zoomControl', {
            size: 'small',
            position: {
                top: 'auto',
                left: 10,
                bottom: 50
            }
        }),
        myMap.geoObjects.add(new ymaps.Placemark([60.056800, 30.378768], {
            hintContent: '',
            balloonContent: ''
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/icon-map1.png',
            iconImageSize: [34, 48],
            iconImageOffset: [-17, -48]
        })).add(new ymaps.Placemark([57.673891, 39.821041], {
            hintContent: '',
            balloonContent: ''
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/icon-map2.png',
            iconImageSize: [34, 48],
            iconImageOffset: [-17, -48]
        })).add(new ymaps.Placemark([55.717153, 37.726233], {
            hintContent: '',
            balloonContent: ''
        }, {
            iconLayout: 'default#image',
            iconImageHref: 'img/icon-map3.png',
            iconImageSize: [34, 48],
            iconImageOffset: [-17, -48]
        }));
        function disableDrag() {
            var w = $(window).width();
            if (w <= 992) {
                myMap.setZoom(5);
                myMap.behaviors.disable('drag');
            } else {
                myMap.setZoom(6);
                myMap.behaviors.enable('drag');
            }
        }
        disableDrag();
        $(window).resize(function() {
            disableDrag();
        });
    });

    //------------------------------------------------------
    //Chrome Smooth Scroll
    //------------------------------------------------------
    try {
        $.browserSelector();
        if ($('html').hasClass('chrome')) {
            $.smoothScroll();
        }
    } catch (err) {

    };

    $('img, a').on('dragstart', function(event) {
        event.preventDefault();
    });
});
