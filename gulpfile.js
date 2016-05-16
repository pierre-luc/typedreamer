var gulp                = require( 'gulp' ),
    rename              = require( 'gulp-rename' ),     // Renommage des fichiers
    sass                = require( 'gulp-sass' ),       // Conversion des SCSS en CSS
    minifyCss           = require( 'gulp-minify-css' ), // Minification des CSS
    uglify              = require( 'gulp-uglify' ),     // Minification/Obfuscation des JS
    jshint              = require( 'gulp-jshint' ),
    concat              = require( 'gulp-concat' ),
    include             = require( "gulp-include" ),
    fileinclude         = require( 'gulp-file-include' ),
    insert              = require( 'gulp-insert' ),
    resolveDependencies = require( 'gulp-resolve-dependencies' ),
    replace             = require( 'gulp-replace' ),
    yargs               = require( 'yargs' ),
    git                 = require( 'gulp-git' ),
    plumber             = require( 'gulp-plumber' );    // Ne pas arrêter gulp en cas d'erreur

var nameOfProject = "typedreamer";

gulp.task('js-jquery', function(){
  return gulp.src('./src/js/jquery/**/*.js') // read all of the files that are in script/lib with a .js extension
    .pipe(resolveDependencies({
      pattern: /\* @requires [\s-]*(.*\.js)/g
    }))
        .on('error', function(err) {
            console.log(err.message);
        })
    .pipe(jshint()) // run their contents through jshint
    .pipe(jshint.reporter('default')) // report any findings from jshint
    .pipe(concat( nameOfProject + '.js')) // concatenate all of the file contents into a file titled 'all.js'
    .pipe(fileinclude({
      prefix: '//@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/js')) // write that file to the dist/js directory
    .pipe(rename( nameOfProject + '-jquery.min.js')) // now rename the file in memory to 'all.min.js'
    .pipe(uglify({  // run uglify (for minification) on 'all.min.js'
        output: {
            comments: /^!|\b(copyright|license)\b|@(preserve|license|cc_on)\b/i
        }
    }))
    .pipe(gulp.dest('./dist/js')); // write all.min.js to the dist/js file
});

gulp.task('js-pure', function(){
  return gulp.src('./src/js/purejs/*.js') // read all of the files that are in script/lib with a .js extension
    .pipe(resolveDependencies({
      pattern: /\* @requires [\s-]*(.*\.js)/g
    }))
        .on('error', function(err) {
            console.log(err.message);
        })
    .pipe(jshint()) // run their contents through jshint
    .pipe(jshint.reporter('default')) // report any findings from jshint
    .pipe(concat( nameOfProject + '.js')) // concatenate all of the file contents into a file titled 'all.js'
    .pipe(fileinclude({
      prefix: '//@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./dist/js')) // write that file to the dist/js directory
    .pipe(rename( nameOfProject + '.min.js')) // now rename the file in memory to 'all.min.js'
    .pipe(uglify({  // run uglify (for minification) on 'all.min.js'
        output: {
            comments: /^!|\b(copyright|license)\b|@(preserve|license|cc_on)\b/i
        }
    }))
    .pipe(gulp.dest('./dist/js')); // write all.min.js to the dist/js file
});

// JAVASCRIPT TASK
gulp.task( 'js-uglify', function() {
  return gulp.src( './src/js/**/*.src.js' )    // Prend en entrée les fichiers *.src.js
    .pipe( rename( function( path ){
        // Il y a différentes méthodes pour renommer les fichiers
        // Voir ici pour plus d'infos : https://www.npmjs.org/package/gulp-rename
        path.basename = path.basename.replace( ".src" , ".min" );
    }))
    .pipe( uglify() )
    .pipe( gulp.dest( './dist/js/' ) );
});


// WATCH TASK
gulp.task( 'watch', function() {
  //gulp.watch( './src/js/*.src.js', [ 'js-uglify' ] );
  gulp.watch( './src/js/**/*.js', [ 'js-pure', 'js-jquery' ] );
});

gulp.task( 'dist', [ 'js-pure', 'js-jquery' ] );
gulp.task( 'default', [ 'watch', 'dist' ] );


gulp.task( 'build', function(){
    var argv = yargs.argv;

    git.exec({args : 'describe --abbrev=0 --tags'}, function (err, stdout) {
        if (err) throw err;

        var tag = stdout;
        var version = tag.split( '.' );
        var major = version[ 0 ],
           minor = version[ 1 ],
           patch = version[ 2 ];

        var action;
        if ( typeof argv.patch !== "undefined" ) {
            ++patch;
            action = "Build patch";
        } else if ( typeof argv.feature !== "undefined" ){
            ++minor;
            patch = 0;
            action = "Build feature";
        } else if ( typeof argv.release !== "undefined" ){
            ++major;
            patch = 0;
            minor = 0;
            action = "Build release";
        } else {
            ++patch;
            action = "Build patch";
        }

        version = major + "." + minor + "." + patch;

        git.tag( version, action + " " + version, function (err) {
            if (err) throw err;

            git.exec({args : 'push --tags'}, function (err, stdout) {
                if (err) throw err;
            });
        });

    });

});
