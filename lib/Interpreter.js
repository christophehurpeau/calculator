'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Symbol = require('babel-runtime/core-js/symbol')['default'];

var _Number$parseInt = require('babel-runtime/core-js/number/parse-int')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

var INTEGER = _Symbol('INTEGER');
var PLUS = _Symbol('PLUS');
var EOF = _Symbol('EOF');

var isNumber = /^[0-9]$/;
var isWhitespace = /^\s$/;

/** @class Interpreter 
* @param text */
var Interpreter = (function () {
    function Interpreter(text) {
        _classCallCheck(this, Interpreter);

        this.text = text;
        this.position = 0;
        this.currentToken = undefined;
    }

    _createClass(Interpreter, [{
        key: 'getCurrentChar',
        /** @memberof Interpreter 
        * @instance 
        * @method getCurrentChar */value: function getCurrentChar() {
            return this.text.charAt(this.position);
        }
    }, {
        key: 'hasNextChar',
        /** @memberof Interpreter 
        * @instance 
        * @method hasNextChar */value: function hasNextChar() {
            return this.position < this.text.length;
        }
    }, {
        key: 'getNextChar',
        /** @memberof Interpreter 
        * @instance 
        * @method getNextChar */value: function getNextChar() {
            this.position++;
            return this.getCurrentChar();
        }

        /**
         * Lexical analyzer (also known as scanner or tokenizer)
         * This method is responsible for breaking a sentence
         * apart into tokens. One token at a time.
         
        * @memberof Interpreter 
        * @instance 
        * @method getNextToken */
    }, {
        key: 'getNextToken',
        value: function getNextToken() {
            // is this.position index past the end of the this.text ?
            // if so, then return EOF token because there is no more
            if (!this.hasNextChar()) {
                return new _Token2['default'](EOF);
            }

            var currentChar = this.getCurrentChar();

            if (isWhitespace.test(currentChar)) {
                this.position++;
                return this.getNextToken();
            }

            // if the character is a digit then convert it to
            // integer, create an INTEGER token, increment this.position
            // index to point to the next character after the digit,
            // and return the INTEGER token
            if (isNumber.test(currentChar)) {
                var buffer = '';
                do {
                    buffer += currentChar;
                    currentChar = this.getNextChar();
                } while (isNumber.test(currentChar));
                return new _Token2['default'](INTEGER, _Number$parseInt(buffer, 10));
            }

            if (currentChar === '+') {
                var token = new _Token2['default'](PLUS, currentChar);
                this.position++;
                return token;
            }

            throw new Error('Error parsing input at position ' + this.position);
        }

        /**
         * @param {Symbol} tokenType
         
        * @memberof Interpreter 
        * @instance 
        * @method eat 
        * @param tokenType */
    }, {
        key: 'eat',
        value: function eat(tokenType) {
            // compare the current token type with the passed token
            // type and if they match then "eat" the current token
            // and assign the next token to the this.currentToken,
            // otherwise raise an exception.

            if (this.currentToken.type !== tokenType) {
                throw new Error('Expecting ' + tokenType.toString() + ', got ' + this.currentToken.type.toString());
            }

            this.currentToken = this.getNextToken();
        }

        /**
         * expr -> INTEGER PLUS INTEGER
         
        * @memberof Interpreter 
        * @instance 
        * @method expr */
    }, {
        key: 'expr',
        value: function expr() {
            // set current token to the first token taken from the input
            this.currentToken = this.getNextToken();

            if (this.currentToken.type === EOF) {
                return undefined;
            }

            // we expect the current token to be a single-digit integer
            var left = this.currentToken;
            this.eat(INTEGER);

            // we expect the current token to be a '+' token
            var operation = this.currentToken;
            this.eat(PLUS);

            // we expect the current token to be a single-digit integer
            var right = this.currentToken;
            this.eat(INTEGER);

            // after the above call the this.currentToken is set to EOF

            // at this point INTEGER PLUS INTEGER sequence of tokens
            // has been successfully found and the method can just
            // return the result of adding two integers, thus
            // effectively interpreting client input
            return left.value + right.value;
        }
    }]);

    return Interpreter;
})();

exports['default'] = Interpreter;
module.exports = exports['default'];
//# sourceMappingURL=Interpreter.js.map