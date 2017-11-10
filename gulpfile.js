var gulp = require('gulp'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass')
gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    handlebars = require('gulp-compile-handlebars'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify');


var config = {

    header: '/*!\n* <%= pkg.name %> - v <%= pkg.version %> \n* <%= pkg.description %> \n* Author :<%= pkg.author %>\n*/\n',
    sassOptions: {
        outputStyle: 'compressed'
    },
    css: {
        src: ['./src/scss/**/*.scss'],
        dist: "./dist/assets/css",
        map: "./maps",
        prefixerOptions: {
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
        }
    },
    js: {
        src: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
            './src/lib/wow/dist/wow.min.js',
            './src/lib/owl.carousel/dist/owl.carousel.min.js',
            './src/lib/jquery.nicescroll/dist/jquery.nicescroll.min.js',
            './src/js/scripts.js'
        ], 
        watch: './src/js/*.js',
        dist: "./dist/assets/js",
        file: "script.js"
    },

    html: {
        src: './src/templates/*.hbs',
        watch: ['./src/templates/**/*.hbs', './src/json/*.json'],
        ltrData: './src/json/en.json',
        rtlData: require('./src/json/ar.json'),
        options: { 
            ignorePartials: true,
            batch: ['./src/templates/partials'],
            helpers: {
                capitals: function (str) {
                    return str.toUpperCase();
                },
                reverse : function(arr){
                    return arr.reverse();
                },
                delay : function(num,del){
                    return  num / 2 * del;
                }
            }
        }
    },
    slider:{
        src: [
            
            './src/js/jquery.themepunch.tools.min.js',
            './src/js/jquery.themepunch.revolution.min.js',
            './src/js/slider.js'
        ],
        
        dist: "./dist/assets/js",
        file: "slider.js"
    }
}
// ----------------------------------------------------
// -------------   handlebars/html  -------------------
// ----------------------------------------------------
gulp.task('hbs:ltr', function () {
    var jsonData = require(config.html.ltrData);
    return gulp.src(config.html.src)
        .pipe(handlebars(jsonData, config.html.options))
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('hbs:rtl', function () {
    return gulp.src(config.html.src)
        .pipe(handlebars(config.html.rtlData, config.html.options))
         
        .pipe(rename({
            suffix: '-rtl',
            extname: '.html'
        }))
        .pipe(gulp.dest('dist'));
});


// ----------------------------------------------------
// -----------------   sass/css  ----------------------
// ----------------------------------------------------

gulp.task('style', function () {
    return gulp.src(config.css.src)
        // .pipe(sourcemaps.init())
        .pipe(sass(config.sassOptions).on('error', sass.logError))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(config.header, {
            pkg: pkg
        }))
        .pipe(autoprefixer(config.css.prefixerOptions))
        //  .pipe(sourcemaps.write(config.css.map))
        .pipe(gulp.dest(config.css.dist));
})


// ----------------------------------------------------
// -----------------   javascript/js  -----------------
// ----------------------------------------------------
gulp.task('script', function () {
    return gulp.src(config.js.src)
        .pipe(concat(config.js.file))
        .pipe(uglify({
            mangle: true
        }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(config.header, {
            pkg: pkg
        }))
        .pipe(gulp.dest(config.js.dist));
})

gulp.task('slider', function () {
    return gulp.src(config.slider.src)
        .pipe(concat(config.slider.file))
        .pipe(uglify({
            mangle: false
        }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(header(config.header, {
            pkg: pkg
        }))
        .pipe(gulp.dest(config.slider.dist));
})

// ----------------------------------------------------
// -----------------   watch/files  -----------------
// ----------------------------------------------------
gulp.task('watch', function () {
    gulp.watch(config.js.watch, ['script','slider']);
    gulp.watch(config.css.src, ['style']);
    gulp.watch(config.html.watch, ['hbs']);
})


gulp.task('hbs', ['hbs:ltr', 'hbs:rtl']);

gulp.task('default', ['script', 'style', 'hbs', 'watch']);


handlebars.Handlebars.registerHelper('isequal', function (v1, v2, options) {
    
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this)
})

 