'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _Interpreter = require('./Interpreter');

var _Interpreter2 = _interopRequireDefault(_Interpreter);

var readline = require('readline');
var errorParser = require('springbokjs-errors');

process.on('uncaughtException', function (err) {
    console.error(errorParser.parse(err).toString());
    process.exit(1);
});

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('calc> ');
rl.prompt();

rl.on('line', /** @function 
              * @param line */function (line) {
    if (line) {
        var interpreter = new _Interpreter2['default'](line);
        var result = interpreter.expr();
        console.log(result);
    }
    rl.prompt();
}).on('close', /** @function */function () {
    console.log('bye');
    process.exit(0);
});
//# sourceMappingURL=index.js.map