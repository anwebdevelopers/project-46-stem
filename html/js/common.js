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
                '-webkit-transform': 'translateY(-100%)',
                '-moz-transform': 'translateY(-100%)',
                '-ms-transform': 'translateY(-100%)',
                '-o-transform': 'translateY(-100%)',
                'transform': 'translateY(-100%)',
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
    //Адаптивный слайдер
    //------------------------------------
    $('.owl-carousel').owlCarousel({
        items: 1,
        nav: true,
        navText: '',
        smartSpeed: 600,
        mouseDrag: false
    });

    //------------------------------------
    //Галереея в каталоге
    //------------------------------------
    var catalogImgLenght
    $('.catalog__gallery').each(function() {
        var catalogImgLenght = $(this).find('.catalog__img').length;
        $(this).append('<div class="catalog__gallery-dots"></div>');
        for (var i = 0; i < catalogImgLenght; i++ ) {
            $(this).find('.catalog__gallery-dots').append($('<div class="catalog__gallery-dot"></div>'));
        }
        $(this).find('.catalog__img').not(':first').hide();
    });


    $('.catalog__gallery-dots').on('click', '.catalog__gallery-dot:not(.active)', function() {
        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest('.catalog__gallery').find('.catalog__img').fadeOut(300).eq($(this).index()).fadeIn(300);
    });

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
