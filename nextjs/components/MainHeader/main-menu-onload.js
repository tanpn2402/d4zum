export default function onLoad() {
  var location = window.location.href,
    $ttDesctopMenu = $('#tt-header .tt-desktop-menu');

  if (!$ttDesctopMenu) return;

  $ttDesctopMenu.find('li').each(function () {
    var link = $(this).find('a').attr('href');

    if (location.indexOf(link) !== -1) {
      $(this).addClass('active');
    }
  });

  $ttDesctopMenu.find('ul li').on("mouseenter", function () {
    var $ul = $(this).find('ul:first');
    $(this).find('a:first').addClass('is-hover');
    if ($ul.length) {
      var windW = window.innerWidth,
        ulW = parseInt($ul.css('width'), 10) + 20,
        thisR = this.getBoundingClientRect().right,
        thisL = this.getBoundingClientRect().left;

      if (windW - thisR < ulW) {
        $ul.addClass('right-popup');
      } else if (thisL < ulW) {
        $ul.removeClass('right-popup');
      };

    }
  }).on('mouseleave', function () {
    $(this).find('a:first').removeClass('is-hover');
  });
}
