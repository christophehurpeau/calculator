const readline = require('readline');
const errorParser = require('springbokjs-errors');
import Interpreter from './Interpreter';

process.on('uncaughtException', (err) => {
    console.error(errorParser.parse(err).toString());
    process.exit(1);
})

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.setPrompt('calc> ');
rl.prompt();

rl.on('line', function(line) {
    if (line) {
        const interpreter = new Interpreter(line);
        const result = interpreter.expr();
        console.log(result);
    }
    rl.prompt();
}).on('close', function() {
    console.log('bye');
    process.exit(0);
});
