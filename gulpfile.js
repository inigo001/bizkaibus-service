const gulp = require('gulp');
const ts = require('gulp-typescript');
const ts_import = require('gulp-typescript-path-resolver');
const sourcemaps = require('gulp-sourcemaps');
 
const tsProject = ts.createProject('./tsconfig.json');
 
gulp.task('build', () => {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(ts_import.tsPathResolver(tsProject.config.compilerOptions))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
});
