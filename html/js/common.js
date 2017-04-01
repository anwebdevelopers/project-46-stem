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

    //-----------------------------------------------------------------
    //Табы
    //-----------------------------------------------------------------
    var $productionTabsItem = $(".production__tabs-item"),
        $productionTabsButtons = $('.production__tabs-buttons');

    $productionTabsItem.not(":first").hide();
    $productionTabsButtons.find('button:first').addClass('active');

    $productionTabsButtons.on('click', 'button:not(.active)', function() {
        $(this).addClass('active').siblings().removeClass('active').end().closest('.production__tabs').find($productionTabsItem).slideUp(300).eq($(this).index()).slideDown(300);
    });

    //------------------------------------------------------
    //Chrome Smooth Scroll
    //------------------------------------------------------
    try {
        $.browserSelector();
        if ($("html").hasClass("chrome")) {
            $.smoothScroll();
        }
    } catch (err) {

    };

    $("img, a").on("dragstart", function(event) {
        event.preventDefault();
    });
});
