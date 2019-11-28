const gulp = require('gulp');
const { src, dest, series, parallel } = require('gulp');
const uncss = require('gulp-uncss');
const rename = require('gulp-rename');
const size = require('gulp-size');
const imagemin = require('gulp-imagemin');
const replace = require('gulp-replace');
const webp = require('gulp-webp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const critical = require('critical');

gulp.task('critical', (done) => {
  critical.generate({
    inline: true,
    base: '../_site',
    src: './index.html',
    target: {
      css: '../_includes/critical.css',
      html: '../_critical/index-critical.html',
      uncritical: '../css/uncritical.css'
    },
    css: ['../_site/css/main.css'],
    dimensions: [
      { height: 480, width: 320 },
      { height: 1024, width: 768 },
      { height: 960, width: 1280 }
    ],
    extract: true,
    minify: true,
    ignore: {
      rule: [
        '.carousel', '.carousel.pointer-event', '.carousel-inner', '.carousel-item',
        '.carousel-item.active', '.carousel-item-next', '.carousel-item-prev',
        '.carousel-item-next:not(.carousel-item-left)', '.active.carousel-item-right',
        '.carousel-item-prev:not(.carousel-item-right)',
        '.active.carousel-item-left', '.carousel-fade',
        '.carousel-item', '.carousel-item.active',
        '.carousel-item-next.carousel-item-left',
        '.carousel-item-prev.carousel-item-right',
        '.active.carousel-item-left', '.active.carousel-item-right',
        '.carousel-control-prev', '.carousel-control-next',
        '.carousel-control-prev-icon', '.carousel-control-next-icon',
        '.carousel-indicators', '.carousel-caption', /carousel/
      ]
    }
  }, (err, output) => {
    if (err) {
      console.error(err);
    } else if (output) {
      console.log('Generated critical CSS');
    }
  });
  done();
});

gulp.task('uncss', (done) => {
  gulp.src('../_site/css/main.css')
    .pipe(size({ showFiles: true, pretty: true }))
    .pipe(uncss({
      html: ['../_site/**/*.html'],
      ignore: ['.fade', '.show', '.hide', '.dropdown-menu.show', '.dropdown-card .dropdown-toggle:after',
        '.dropdown-toggle:after', '.visible', '.collapse', '.dropdown-card .dropdown-toggle:after',
        '.dropdown-card.show .dropdown-toggle:after', '.dropdown-card .dropdown-toggle:after',
        '.dropdown-card.show .dropdown-toggle', '.active', '.lazyload', 'lazyloaded', '.lazy', 'clearfix', '/active/',
        '/hover/',
        '/after/',
        '/before/',
        '.popover',
        '.popover .arrow',
        '.popover-content',
        '.popover-title',
        '.alert-dismissible',
        '.open',
        '.fade.in',
        '.collapse',
        '.collapse.in',
        '.collapsing',
        /\.open/,
        '.section-local-stories .grid-container',
        'carousel-fade',
        'slide',
        '.carousel-item.active',
        '.carousel-fade .carousel-item.active',
        '.carousel-fade .carousel-item',
        '.carousel-item-prev.carousel-item-right',
        '.carousel-item-next.carousel-item-left',
        '.carousel-item.active',
        '.active.carousel-item-left',
        '.active.carousel-item-right',
        '.carousel-fade .active.carousel-item-left',
        '.carousel-fade .active.carousel-item-right',
        '.tooltip-inner', '.tooltip', '.arrow', '.tooltip.show',
        '.bs-tooltip-left', '.tooltip .arrow', '.tooltip .arrow::before',
        /(bs-tooltip.*)/,
        /(carousel.*)/,
        'img.mfp-img',
        /(mfp.*)/, /(owl-theme.*)/,
        '.owl-theme .owl-controls .owl-page span'
      ]
    }))
    .pipe(rename({ suffix: '-uncss' }))
    .pipe(size({ showFiles: true, pretty: true }))
    .pipe(gulp.dest('../css/'));
  done();
});

const png = () => src('../_src_img/**/*.png')
  .pipe(size({ showFiles: true, pretty: true }))
  .pipe(imagemin())
  .pipe(size({ showFiles: true, pretty: true }))
  .pipe(dest('../img'));

const jpg = () => src('../_src_img/**/*.{jpg,jpeg}')
  .pipe(size({ showFiles: true, pretty: true }))
  .pipe(imagemin())
  .pipe(size({ showFiles: true, pretty: true }))
  .pipe(dest('../img'));

const convertWebp = () => src('../_src_img/**/*.{png,jpg,jpeg}')
  .pipe(size({ showFiles: true, pretty: true }))
  .pipe(webp())
  .pipe(size({ showFiles: true, pretty: true }))
  .pipe(dest('../img'));


var cbString = new Date().getTime();

function cacheBustTask1(done) {
  return src(['../_includes/doctype-head.html'])
    .pipe(replace(/cb=\d+/, 'cb=' + cbString))
    .pipe(dest('../_includes/'));
  done();
}
var cbString = new Date().getTime();

function cacheBustTask2(done) {
  return src(['../_layouts/default.html'])
    .pipe(replace(/cb=\d+/, 'cb=' + cbString))
    .pipe(dest('../_layouts/'));
  done();
}

function jsTask() {
  return src([
    '../js/bootstrap.bundle.js', '../js/jquery.magnific-popup.js', '../js/custom.js', '../js/main.min.js', '../js/smooth-scroll.js'
    // ,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
  ])
    .pipe(concat('../js/all.js'))
    .pipe(size({ showFiles: true, pretty: true }))
    .pipe(dest('../js/'))
    .pipe(terser({ keep_fnames: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(size({ showFiles: true, pretty: true }))
    .pipe(dest('../js/'));
}

function cssConcat() {
  return src([
    '../_includes/carousel.css', '../_includes/critical.css'
  ])
    .pipe(concat('../_includes/criticalplus.css'))
    .pipe(size({ showFiles: true, pretty: true }))
    .pipe(dest('../_includes/'));
}


const img = parallel(png, jpg);
const towebp = series(parallel(png, jpg), convertWebp);
const js = series(jsTask, parallel(cacheBustTask1, cacheBustTask2));
const cache = parallel(cacheBustTask1, cacheBustTask2);
const include = series('critical', cssConcat, parallel(cacheBustTask1, cacheBustTask2));
const join = series(cssConcat);
const tojpg = series(jpg);

module.exports = { img, towebp, js, cache, include, join, tojpg };