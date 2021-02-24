var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("gulp-tsconfig.json");
gulp.task("scripts", function () {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("functions"));
});

gulp.task("watch", function () {
  gulp.watch("ts/**/*.ts", function () {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("functions"));
  });
});
