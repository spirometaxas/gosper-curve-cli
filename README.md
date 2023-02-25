# gosper-curve-cli
Print the [Gosper Curve](https://en.wikipedia.org/wiki/Gosper_curve) to the console!

![What gosper-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/gosper-curve-cli/main/img/gosper-curve-banner.png)

[![npm version](https://img.shields.io/npm/v/gosper-curve-cli)](https://www.npmjs.com/package/gosper-curve-cli)
[![bundle size](https://img.shields.io/bundlephobia/min/gosper-curve-cli)](https://bundlephobia.com/package/gosper-curve-cli)
[![downloads](https://img.shields.io/npm/dy/gosper-curve-cli)](https://www.npmjs.com/package/gosper-curve-cli)
[![license](https://img.shields.io/npm/l/gosper-curve-cli)](https://github.com/spirometaxas/gosper-curve-cli/blob/main/LICENSE)

Why the console?  Because it's the *cool* way.  

[See All Fractals](https://spirometaxas.com/projects/fractals-cli) in the [fractals-cli](https://www.npmjs.com/package/fractals-cli) project.

## Usage
### Via `npx`:
```
$ npx gosper-curve-cli <n>
$ npx gosper-curve-cli <n> [options]
```
where `n >= 0`.

### Via Global Install
```
$ npm install --global gosper-curve-cli
$ gosper-curve-cli <n>
$ gosper-curve-cli <n> [options]
```
where `n >= 0`.

### Via Import
```
$ npm install gosper-curve-cli
```
then:
```
const gosper_curve = require('gosper-curve-cli');
console.log(gosper_curve.create(<n>);
console.log(gosper_curve.create(<n>, { 
    inverse: <boolean>,
    rotation: <left|right|standard>,
    line: <bold|standard> 
});
```
The config params are optional. 

## Options
### Recursive Step  
```
$ gosper-curve-cli <n>
```
The first param `<n>` is the recursive step.  `<n>` should be an integer greater than or equal to 0.

#### Examples:
```
$ gosper-curve-cli 2
```
![What gosper-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/gosper-curve-cli/main/img/gosper-curve-2.png)

```
$ gosper-curve-cli 3
```
![What gosper-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/gosper-curve-cli/main/img/gosper-curve-3.png)

### Inverse
```
$ gosper-curve-cli <n> --inverse
```
The optional `--inverse` param (or shorthand `-i`) will draw the inverse Gosper Curve.  

#### Example:
```
$ gosper-curve-cli 3 --inverse
```
![What gosper-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/gosper-curve-cli/main/img/gosper-curve-3-inverse.png)

### Rotation
```
$ gosper-curve-cli <n> --rotate=<left|right|standard>
```
The optional `--rotate` param rotates the Gosper Curve.  Supported values:

- `left`: Rotate left 120 degrees
- `right`: Rotate right 120 degrees
- `standard`: No rotation (default)

#### Example:
```
$ gosper-curve-cli 3 --rotate=right
```
![What gosper-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/gosper-curve-cli/main/img/gosper-curve-3-rotate_right.png)

```
$ gosper-curve-cli 3 --rotate=left
```
![What gosper-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/gosper-curve-cli/main/img/gosper-curve-3-rotate_left.png)

### Line Type
```
$ gosper-curve-cli <n> --line=<bold|standard>
```
The optional `--line` param draws the Gosper Curve using different line types.  Supported values:

- `bold`: Draw using bold lines
- `standard`: Draw using standard lines (default)

#### Examples:
```
$ gosper-curve-cli 3 --line=bold
```
![What gosper-curve-cli prints to the console](https://raw.githubusercontent.com/spirometaxas/gosper-curve-cli/main/img/gosper-curve-3-line_bold.png)

By default, lines are drawn using long unicode slash characters (`╱`, `╲`).  To instead draw using standard slash characters (`/`, `\ `), add the `--slash` param (or shorthand `-s`).
```
$ gosper-curve-cli <n> --slash
```
(May look better/worse on certain terminals)

## Related

#### Main Project
- [fractals-cli](https://www.npmjs.com/package/fractals-cli) - Print 22 Fractals to the console

#### Fractal Shapes
- [sierpinski-triangle-cli](https://www.npmjs.com/package/sierpinski-triangle-cli) - Print the Sierpinski Triangle to the console
- [sierpinski-carpet-cli](https://www.npmjs.com/package/sierpinski-carpet-cli) - Print the Sierpinski Carpet to the console
- [sierpinski-hexagon-cli](https://www.npmjs.com/package/sierpinski-hexagon-cli) - Print the Sierpinski Hexagon to the console
- [hexaflake-cli](https://www.npmjs.com/package/hexaflake-cli) - Print the Hexaflake Fractal to the console
- [koch-snowflake-cli](https://www.npmjs.com/package/koch-snowflake-cli) - Print the Koch Snowflake to the console
- [koch-antisnowflake-cli](https://www.npmjs.com/package/koch-antisnowflake-cli) - Print the Koch Anti-Snowflake to the console
- [triflake-cli](https://www.npmjs.com/package/triflake-cli) - Print the Triflake Fractal to the console

#### Fractal Patterns
- [cantor-set-cli](https://www.npmjs.com/package/cantor-set-cli) - Print the Cantor Set to the console
- [cantor-dust-cli](https://www.npmjs.com/package/cantor-dust-cli) - Print the Cantor Dust Fractal to the console
- [h-tree-cli](https://www.npmjs.com/package/h-tree-cli) - Print the H-Tree Fractal to the console
- [minkowski-sausage-cli](https://www.npmjs.com/package/minkowski-sausage-cli) - Print the Minkowski Sausage to the console
- [t-square-cli](https://www.npmjs.com/package/t-square-cli) - Print the T-Square Fractal to the console
- [vicsek-fractal-cli](https://www.npmjs.com/package/vicsek-fractal-cli) - Print the Vicsek Fractal to the console
- [v-tree-cli](https://www.npmjs.com/package/v-tree-cli) - Print the V-Tree Fractal to the console

#### Space Filling Curves
- [dragon-curve-cli](https://www.npmjs.com/package/dragon-curve-cli) - Print the Dragon Curve to the console
- [hilbert-curve-cli](https://www.npmjs.com/package/hilbert-curve-cli) - Print the Hilbert Curve to the console
- [moore-curve-cli](https://www.npmjs.com/package/moore-curve-cli) - Print the Moore Curve to the console
- [peano-curve-cli](https://www.npmjs.com/package/peano-curve-cli) - Print the Peano Curve to the console
- [greek-cross-cli](https://www.npmjs.com/package/greek-cross-cli) - Print the Greek Cross Fractal to the console
- [sierpinski-arrowhead-cli](https://www.npmjs.com/package/sierpinski-arrowhead-cli) - Print the Sierpinski Arrowhead Curve to the console
- [sierpinski-curve-cli](https://www.npmjs.com/package/sierpinski-curve-cli) - Print the Sierpinski "Square" Curve to the console

## License
- [MIT](https://github.com/spirometaxas/gosper-curve-cli/blob/main/LICENSE) &copy; [Spiro Metaxas](https://spirometaxas.com)