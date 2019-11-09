(function($) {
    'use strict';

    /* Tooltip
    ----------------------------------------------*/
    $('[data-toggle="tooltip"]').tooltip();

    /* Lightbox
    ----------------------------------------------*/
    $('.image-link').magnificPopup({
        type: 'image'
    });


})(jQuery);

"use strict";

// Vanilla JavaScript Scroll to Anchor
document.addEventListener('click', function (e) {
  if (e.target.tagName !== 'A') return;

  if (e.target.href && e.target.href.indexOf('#') != -1 && (e.target.pathname == location.pathname || '/' + e.target.pathname == location.pathname) && e.target.search == location.search) {
    scrollAnchors(e, e.target);
  }
});

function scrollAnchors(e) {
  var respond = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  // const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
  function distanceToTop(el) {
    return Math.floor(el.getBoundingClientRect().top);
  }

  e.preventDefault();
  var targetID = respond ? respond.getAttribute('href') : this.getAttribute('href');
  var targetAnchor = document.querySelector(targetID);
  if (!targetAnchor) return;
  var originalTop = distanceToTop(targetAnchor);
  window.scrollBy({
    top: originalTop,
    left: 0,
    behavior: 'smooth'
  });
  var checkIfDone = setInterval(function () {
    var atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;

    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = '-1';
      targetAnchor.focus(); // Let's make sure the History API even exists first..

      if ('history' in window) {
        window.history.pushState('', '', targetID);
      } else {
        // Do it the old-fashioned way!
        window.location = targetID;
      }

      clearInterval(checkIfDone);
    }
  }, 100);
}