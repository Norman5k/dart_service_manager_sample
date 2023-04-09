window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".tabs__item"),
        playBtn = document.querySelector("#playVideo"),
        video = document.querySelector("#video");
    playBtn.addEventListener("click", function() {
        video.play();
        video.setAttribute('controls', 'controls');
        playBtn.style.display = 'none';
    });
    video.addEventListener('ended', function(){
        this.src = this.src;
        playBtn.style.display = 'block';
        video.removeAttribute('controls');
    });
    tabs.forEach(elem => {
        elem.addEventListener("click", () => {
            tabs.forEach(otherItem => {
                if (otherItem.classList.contains("tabs__item_active")) {
                    otherItem.classList.remove("tabs__item_active");
                }
            });
            elem.classList.add("tabs__item_active")
        });
    });
    $('.carousel').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<div class="carousel__arrow carousel__prev"><i class="fa-solid fa-chevron-left"></i></div>',
        nextArrow: '<div class="carousel__arrow carousel__next"><i class="fa-solid fa-chevron-right"></i></div>',
    });
    $('#buyNowBtn').on('click', popupOpen);
    $('#tryFreeBtn').on('click', popupOpen);
    function popupOpen(){
        $('.popup').addClass('popup__active');
        $('.popup__done').hide();
        $('.popup__wrap').show();
        $('body').css('overflow', 'hidden');
    }
    $('.popup__close').on('click', closeForm);
    function closeForm(){
        $('.popup').removeClass('popup__active');
        $('body').css('overflow', 'visible');
    }
    $("a[href*='#']").on("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: $(anchor.attr('href')).offset().top
        }, 999);
        e.preventDefault();
        return false;
    });
    $('.form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "form.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('form').trigger('reset');
            $('.popup').addClass('popup__active');
            $('.popup__wrap').hide();
            $('.popup__done').show();
        });
    });
});