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

    header: '/*!\n* <%= pkg.name %> - v <%= pkg.version %> \n* <%= pkg.description %> \n* Author :<%= pkg.author %>\n*/\n\n',
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
            './src/lib/jquery-ui-1.12.1.custom/jquery-ui.js',
            './node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
            './src/lib/wow/dist/wow.min.js',
            './src/lib/owl.carousel/dist/owl.carousel.min.js',
            './src/lib/jquery.nicescroll/dist/jquery.nicescroll.min.js',
            './src/lib/bootstrap-select/dist/js/bootstrap-select.min.js',
            './src/lib/parallax.js/parallax.min.js',
            './src/lib/fancybox/dist/jquery.fancybox.min.js',
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
                         arr.reverse();
                },
                delay : function(num,del){
                    return  num / 2 * del;
                }
            }
        }
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

 

// ----------------------------------------------------
// -----------------   watch/files  -----------------
// ----------------------------------------------------
gulp.task('watch', function () {
    gulp.watch(config.js.watch, ['script']);
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

handlebars.Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});
handlebars.Handlebars.registerHelper('for', function(from, to, incr, block) {
    var accum = '';
    for(var i = from; i < to; i += incr)
        accum += block.fn(i);
    return accum;
});

handlebars.Handlebars.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

handlebars.Handlebars.registerHelper('each_fromto', function(ary,from, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = from; i < max + from && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});