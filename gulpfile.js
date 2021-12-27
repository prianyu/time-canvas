const gulp = require("gulp")
const uglify = require("gulp-uglify")
const rename = require("gulp-rename")
const rollup = require("rollup")
const resolve = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const jscc = require("rollup-plugin-jscc")

const isMiniprogram = process.argv.slice(2).indexOf('--miniprogram') > -1
console.log(process.argv)


async function build(src, file) {
  const dist = `./dist${isMiniprogram ? '/miniprogram': ''}`
  const bundle =  await rollup.rollup({
    input: src,
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**"
      }),
      jscc({
        values: { _MINIPROGRAM: isMiniprogram}
      })
    ]
  })
  await bundle.write({
    format: "umd",
    name: "TimeCanvas",
    file: `${dist}/${file}.js`
  })
  // min
  await gulp.src(`${dist}/${file}.js`)
  .pipe(uglify())
  .pipe(rename(`${file}.min.js`))
  .pipe(gulp.dest(dist))
}


gulp.task("build", async function() {
  build("./src/time.js", 'time')
  build("./src/all.js", 'time.all')
})