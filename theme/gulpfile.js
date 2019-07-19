const { src, dest, series } = require('gulp');

const fs = require('fs');

const zip = require('gulp-zip');
const ftp = require('vinyl-ftp');
const rename = require('gulp-rename');
const gutil = require('gulp-util');
const copy = require('gulp-copy');
const semver = require('semver');
const gclean = require('gulp-clean');

const pkg = require('./package.json');

/**
 * DEPLOY
 */
async function patch() {
  pkg.version = semver.inc(pkg.version, 'patch');

  await fs.writeFile('./package.json', JSON.stringify(pkg, null, 4), err => {
    console.log(err);
  });

  src(['public/*.html'])
    .pipe(rename({ extname: '.php' }))
    .pipe(dest('public'));

  return src(['public/**/*'])
    .pipe(zip(`${pkg.name}-${pkg.version}.zip`))
    .pipe(dest('release'));
}

function cleanAll() {
  return src(['release/', 'build/'], { read: false }).pipe(gclean());
}

const release = series(patch);
const deploy = series(release, trasnferFtp);
const clean = series(cleanAll);

exports.release = release;
exports.deploy = deploy;
exports.clean = clean;
