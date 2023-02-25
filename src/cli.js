#!/usr/bin/env node
const gosper_curve = require('./index.js');

const printUsage = function(showIntro) {
    if (showIntro) {
        console.log(gosper_curve.create(2));
        console.log(' Print the Gosper Curve to the console!');
    }
    console.log('\n' + 
                ' Usage:\n' + 
                '   $ gosper-curve-cli <n>\n' + 
                '   $ gosper-curve-cli <n> [options]\n' + 
                '\n' + 
                '   <n> is the recursive step, a number greater than or equal to 0\n' + 
                '\n' +
                ' Options:\n' + 
                '   --inverse, -i      Draw the inverse Gosper Curve\n' + 
                '   --line=<line>      Draw using a specific line type: [bold|standard]\n' + 
                '   --rotate=<rotate>  Rotate the Gosper Curve: [left|right|standard]\n' +
                '   --slash, -s        Draw using standard slash characters\n');
}

const getFlags = function(params) {
    let flags = [];
    if (params) {
        for (let i = 0; i < params.length; i++) {
            if (params[i].startsWith('-')) {
                flags.push(params[i]);
            }
        }
    }
    return flags;
}

const getValues = function(params) {
    let values = [];
    if (params) {
        for (let i = 0; i < params.length; i++) {
            if (!params[i].startsWith('-')) {
                values.push(params[i]);
            }
        }
    }
    return values;
}

const getLine = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase().startsWith('--line=')) {
            const line = flags[i].substring(7);
            if (line) {
                if (line.toLowerCase() === 'bold' || line.toLowerCase() === 'standard') {
                    return line.toLowerCase();
                } else {
                    console.log('\n Warning: Please provide a supported line type: [bold|standard]');
                }
            } else {
                console.log('\n Warning: Please provide a supported line type: [bold|standard]');
            }
        }
    }
    return undefined;
}

const drawInverse = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && (flags[i].toLowerCase() === '-i' || flags[i].toLowerCase() === '--inverse')) {
            return true;
        }
    }
    return false;
}

const getRotation = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && flags[i].toLowerCase().startsWith('--rotate=')) {
            const line = flags[i].substring(9);
            if (line) {
                if (line.toLowerCase() === 'left' || line.toLowerCase() === 'right' || line.toLowerCase() === 'standard') {
                    return line.toLowerCase();
                } else {
                    console.log('\n Warning: Please provide a supported rotation type: [left|right|standard]');
                }
            } else {
                console.log('\n Warning: Please provide a supported rotation type: [left|right|standard]');
            }
        }
    }
    return undefined;
}

const drawSlash = function(flags) {
    for (let i = 0; i < flags.length; i++) {
        if (flags[i] && (flags[i].toLowerCase() === '-s' || flags[i].toLowerCase() === '--slash')) {
            return true;
        }
    }
    return false;
}

if (process.argv.length > 2) {
    const params = process.argv.slice(2);
    const values = getValues(params);
    const flags = getFlags(params);
    if (values[0] && !isNaN(values[0]) && parseInt(values[0]) >= 0) {
        var n = parseInt(values[0]);
        if (n !== undefined) {
            console.log(gosper_curve.create(n, { rotate: getRotation(flags), inverse: drawInverse(flags), line: getLine(flags), slash: drawSlash(flags) }));
        }
    } else {
        console.log('\n <n> should be a number greater than or equal to 0');
        printUsage(false);
    }
} else {
    printUsage(true);
}