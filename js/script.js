/*подгрузка только видимых изображений, юзает blurryload*/


/**
 Вариант проверки, считающий элемент видимым,
 если он не более чем -1 страница назад или +1 страница вперед
 **/
function isVisible(elem) {

    var coords = elem.getBoundingClientRect();

    var windowHeight = document.documentElement.clientHeight;

    var extendedTop = -windowHeight;
    var extendedBottom = 2 * windowHeight;

    // top visible || bottom visible
    var topVisible = coords.top > extendedTop && coords.top < extendedBottom;
    var bottomVisible = coords.bottom < extendedBottom && coords.bottom > extendedTop;

    return topVisible || bottomVisible;
}

function showVisible() {
    var imgs = $('img[data-large]');
    for (var i = 0; i < imgs.length; i++) {
        var img = imgs[i];

        var realsrc = img.getAttribute('data-large');
        if (!realsrc) continue;

        /*if (isVisible(img)) {
         $(img).blurryLoad();

         }*/
        $(img).blurryLoad(); // убрать потом

    }

}

function equalHeight(groupArr) {
    var tallest = 0;
    groupArr.forEach(function (item) {
        thisHeight = $(item).outerHeight();
        if (thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    groupArr.forEach(function (item) {
      $(item).outerHeight(tallest);
    });
}

function imgIE(){
    var userAgent, ieReg, ie;
    userAgent = window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);

    if(ie) {
        $(".img-wrapper").each(function () {
            var $container = $(this),
                imgUrl = $container.find("img").prop("src");
            if (imgUrl) {
                $container.css("backgroundImage", 'url(' + imgUrl + ')').addClass("custom-object-fit");
            }
        });
    }
}

$(function () {
    /*window.onscroll = showVisible;*/
    showVisible();

    //одинаковая высота
    equalHeight([$('#posts1'), $('#posts2'), $('.block2 .top-line .block-right .popular-main .posts')]);
    equalHeight([$('#posts3'), $('#posts4')]);
    imgIE();
});
