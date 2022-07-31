# gosper-curve-cli
Print the Gosper Curve to the console!

## Usage
### Via `npx`:
```
$ npx gosper-curve-cli <n>
```

### Via Global Install
```
$ npm install --global gosper-curve-cli
$ gosper-curve-cli <n>
```

### Via Import
```
$ npm install gosper-curve-cli
```
then:
```
const gosper_curve = require('gosper-curve-cli');
console.log(gosper_curve.create(<n>));
```