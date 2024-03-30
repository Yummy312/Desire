const {src, dest, watch, parallel, series} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('autoprefixer');
const postcss = require("gulp-postcss")
const uglify = require('gulp-uglify-es').default;
const clean = require('gulp-clean');
const plumber = require('gulp-plumber');

// browser-sync - этот плагин нужно обязательно установить
// если вы будете верстать в Gulp. 
// Он лучше лучше подходит  чем плагин  "Live Server" 
// редактора VsCode. То есть данный плагин видит изменения в коде 
// и синхронизирует с веб-страницей.
const browserSync = require('browser-sync').create();



function browsersync() {
    browserSync.init({
      server : {
        baseDir: 'src/'
      }
    });
  }


function styles(){
    const plugins = [
        autoprefixer({
          overrideBrowserslist: ['last 10 versions'] 
        })
        // Другие плагины postcss, если необходимо
      ];
        return src("src/scss/style.scss")
        
        .pipe(plumber())
        .pipe(scss({outputStyle:'compressed'}).on('error', scss.logError))
        .pipe(postcss(plugins))
        .pipe(concat('style.min.css'))
        .pipe(dest('src/css/'))
        .pipe(browserSync.stream())
}

function scripts(){
    return src([
        "node_modules/jquery/dist/jquery.js",
        "node_modules/slick-carousel/slick/slick.js",
        "node_modules/mixitup/dist/mixitup.js",
        "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
        "src/js/components/*.js"
    ])

        .pipe(concat('main.min.js'))
        .pipe(uglify())

        // Лучше не держать объединенный и минифицированный файл в той папке 
        // где лежат собираемые файлы js так как возникнет конфликт имен. 
        // Поэтому я указал папку app/
        .pipe(dest('src/js'))
        .pipe(browserSync.stream())

}


function cleanDist(){
    return src('dist')
        .pipe(clean())
    
}


function building(){
    return src([
        "src/css/style.min.css",
        "src/js/main.min.js",
        "src/**/*.html",
        "src/images/**/*.*"
        

    ], {base:'src'})
        .pipe(dest('dist'))
}


function watching(){
    watch(['src/scss/**.scss'], styles)
    watch(['src/js/components/*.js'], scripts)
    watch(['src/*.html']).on('change', browserSync.reload);

}

exports.build = building;  // Сборка
exports.clean = cleanDist; // Удаление сборки
exports.refresh = series(cleanDist, building); // Если у вас уже есть папка dist
exports.default = parallel(styles, scripts, browsersync, watching);