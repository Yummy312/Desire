$('.header__btn-menu').on('click', function(){
    $('.menu').toggleClass('menu--open');
});



$(document).ready(function() {
    if ($(window).width() < 650) {
        $('.works-path__item--measuring').appendTo($('.works-path__items-box'));
    }
});
