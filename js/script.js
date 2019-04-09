//Parallax for mobile
$(window).ready(function() {
    var windowWidth = $(window).width();
    //Disable Parallax on mobile if loading
    if(windowWidth <= 900) {
        $('.parallax').each(function () {
            $(this).removeClass('bg').addClass('background-picture');
        });
    }

    // Disable Parallax on mobile if reloading
    $(window).on('resize', function () {
        var windowWidth = $(window).width();
        if(windowWidth <= 900) {
            $('.parallax').each(function () {
                $(this).removeClass('bg').addClass('background-picture');
            });
        } else {
            $('.parallax').each(function () {
                $(this).addClass('bg').removeClass('background-picture');
            });
        }
    });
});

//Slider settings
$(function () {
    $('.jcarousel')
        .jcarousel({
            animation: {
                duration: 1000,
                speed: 1000,
                easing: 'linear',
                complete: function () {
                }
            }
        })
        .jcarouselAutoscroll({
            interval: 5000,
            target: '+=1',
            autostart: true,
        })
        .on('mouseover', function (e) {
            $(this).jcarouselAutoscroll('stop');
        })
        .on('mouseout', function (e) {
            $(this).jcarouselAutoscroll('start');
        });
});

//Smooth scrolling of the page when you click on the menu
$(function(){
    $(".smooth-scroll").on("click", function (event) {
        var menu = $(this).attr('href');
        if (menu !== 'https://members.marketaro.com/') {

            event.preventDefault();
            var id  = $(this).attr('href'),
                top = $(id).offset().top;
            $('body,html').animate({scrollTop: top}, 1500);
        }

    });
});

//Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
        $('#back-to-top').fadeIn();
    } else {
        $('#back-to-top').fadeOut();
    }
});
// scroll body to 0px on click
$('#back-to-top').click(function () {
    $('#back-to-top').tooltip('hide');
    $('body,html').animate({
        scrollTop: 0
    }, 800);
    return false;
});

//Navbar toggle
$(function () {
    $('.navbar-toggle').click(function () {
        $('.navbar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
        $('#search').removeClass('in').addClass('collapse').slideUp(200);

        /// uncomment code for absolute positioning tweek see top comment in css
        //$('.absolute-wrapper').toggleClass('slide-in');

    });

    // Remove menu for searching
    $('#search-trigger').click(function () {
        $('.navbar-nav').removeClass('slide-in');
        $('.side-body').removeClass('body-slide-in');

        /// uncomment code for absolute positioning tweek see top comment in css
        //$('.absolute-wrapper').removeClass('slide-in');

    });
});

//Toggle
$('.btn-toggle').click(function() {
    $(this).find('.btn').toggleClass('active');

    $(this).find('.btn').toggleClass('btn-default');
});

$('form').submit(function(){
    alert($(this["options"]).val());
    return false;
});

// FAQ modul
$(function () {
// Question handler
    $('li.question').on('click', function () {

        // gets next element
        // opens answer of selected question
        $(this).next().slideToggle(500)

        // selects all other answers and slides up any open answer
            .siblings('li.answer').slideUp();

        //Grab img from clicked question
        var caret = $(this).find('.caret');
        //Remove Rotate class from all images except the active
        $('.caret').not(caret).removeClass('rotate');
        //toggle rotate class
        caret.toggleClass('rotate');
    });
});

// Homepage Animated Headline
$(function($){
    //set animation timing
    var initialDelay = 250,
        animationDelay = 3800,
        barWaiting = animationDelay - 3000; //3000 is the duration of the transition on the loading bar - set in the scss/css file

    setTimeout(function(){ animateHeadline($('.animated-headline')) }, initialDelay);

    function animateHeadline($headlines) {
        var duration = animationDelay;

        $headlines.each(function(){
            var headline = $(this),
                firstWordWidth = headline.find('.is-showing').outerWidth(),
                setWidthDelay = initialDelay - 100;

            setTimeout(function(){ headline.find('.js-animated-headline').css('width', firstWordWidth) }, setWidthDelay);

            // Trigger Animation
            setTimeout(function(){ headline.find('.js-animated-headline').addClass('is-loading') }, barWaiting);
            setTimeout(function(){ hideWord( headline.find('.is-showing').eq(0) ) }, duration);
        });
    }

    function hideWord($word) {
        var nextWord = takeNext($word),
            nextWordWidth = takeNext($word).outerWidth();

        $word.parents('.js-animated-headline').removeClass('is-loading');
        switchWord($word, nextWord);
        setTimeout(function(){ hideWord(nextWord) }, animationDelay);
        setTimeout(function(){ $word.parents('.js-animated-headline').addClass('is-loading') }, barWaiting);
        $word.parents('.js-animated-headline').css('width', nextWordWidth);
    }

    function takeNext($word) {
        return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }

    function takePrev($word) {
        return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }

    function switchWord($oldWord, $newWord) {
        if ( $oldWord.hasClass('show-on-load') ) { $oldWord.removeClass('show-on-load'); }
        if ( $newWord.hasClass('hide-on-load') ) { $newWord.removeClass('hide-on-load'); }
        $oldWord.removeClass('is-showing').addClass('is-hiding');
        $newWord.removeClass('is-hiding').addClass('is-showing');
    }
});