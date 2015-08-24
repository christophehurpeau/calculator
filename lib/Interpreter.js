'use strict';

var _createClass = require('babel-runtime/helpers/create-class').default;

var _classCallCheck = require('babel-runtime/helpers/class-call-check').default;

var _Symbol = require('babel-runtime/core-js/symbol').default;

var _Number$parseInt = require('babel-runtime/core-js/number/parse-int').default;

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default').default;

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Token = require('./Token');

var _Token2 = _interopRequireDefault(_Token);

const INTEGER = _Symbol('INTEGER');
const PLUS = _Symbol('PLUS');
const MINUS = _Symbol('MINUS');
const ASTERISK = _Symbol('ASTERISK');
const SLASH = _Symbol('SLASH');
const EOF = _Symbol('EOF');

const isNumber = /^[0-9]$/;
const isWhitespace = /^\s$/;

/** @class Interpreter 
* @param text */
let Interpreter = (function () {
    function Interpreter(text) {
        _classCallCheck(this, Interpreter);

        this.text = text;
        this.position = 0;
        this.currentToken = undefined;
        this.currentChar = this.text.charAt(this.position);
    }

    _createClass(Interpreter, [{
        key: 'hasNextChar',
        /** @memberof Interpreter 
        * @instance 
        * @method hasNextChar */value: function hasNextChar() {
            return this.position < this.text.length;
        }
    }, {
        key: 'advance',
        /** @memberof Interpreter 
        * @instance 
        * @method advance */value: function advance() {
            this.position++;
            this.currentChar = this.text.charAt(this.position);
            return this.currentChar;
        }
    }, {
        key: 'skipWhiteSpaces',
        /** @memberof Interpreter 
        * @instance 
        * @method skipWhiteSpaces */value: function skipWhiteSpaces() {
            while (this.currentChar !== '' && isWhitespace.test(this.currentChar)) {
                this.advance();
            }
        }
    }, {
        key: 'integer',
        /** @memberof Interpreter 
        * @instance 
        * @method integer */value: function integer() {
            let buffer = '';
            let currentChar = this.currentChar;
            do {
                buffer += currentChar;
                currentChar = this.advance();
            } while (isNumber.test(currentChar));
            return _Number$parseInt(buffer, 10);
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
            this.skipWhiteSpaces();

            if (this.currentChar === '') {
                return new _Token2.default(EOF);
            }

            if (isNumber.test(this.currentChar)) {
                return new _Token2.default(INTEGER, this.integer());
            }

            if (this.currentChar === '+') {
                this.advance();
                return new _Token2.default(PLUS, this.currentChar);
            }

            if (this.currentChar === '-') {
                this.advance();
                return new _Token2.default(MINUS, this.currentChar);
            }

            if (this.currentChar === '*') {
                this.advance();
                return new _Token2.default(ASTERISK, this.currentChar);
            }

            if (this.currentChar === '/') {
                this.advance();
                return new _Token2.default(SLASH, this.currentChar);
            }

            throw new Error('Error parsing input at position ' + this.position);
        }

        /**
         * @param {Symbol|Symbol[]} tokenTypes
         
        * @memberof Interpreter 
        * @instance 
        * @method eat 
        * @param tokenTypes */
    }, {
        key: 'eat',
        value: function eat(tokenTypes) {
            // compare the current token type with the passed token
            // type and if they match then "eat" the current token
            // and assign the next token to the this.currentToken,
            // otherwise raise an exception.

            if (!Array.isArray(tokenTypes)) {
                tokenTypes = [tokenTypes];
            }

            if (tokenTypes.indexOf(this.currentToken.type) === -1) {
                throw new Error('Expecting ' + tokenTypes.map(function (s) {
                    return s.toString();
                }).join(' or ') + ', got ' + this.currentToken.type.toString());
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
            const left = this.currentToken;
            this.eat(INTEGER);

            // we expect the current token to be a '+' token
            const operation = this.currentToken;
            this.eat([PLUS, MINUS, ASTERISK, SLASH]);

            // we expect the current token to be a single-digit integer
            const right = this.currentToken;
            this.eat(INTEGER);

            // after the above call the this.currentToken is set to EOF

            // at this point INTEGER PLUS INTEGER sequence of tokens
            // has been successfully found and the method can just
            // return the result of adding two integers, thus
            // effectively interpreting client input
            switch (operation.type) {
                case PLUS:
                    return left.value + right.value;
                case MINUS:
                    return left.value - right.value;
                case ASTERISK:
                    return left.value * right.value;
                case SLASH:
                    return left.value / right.value;
            }
        }
    }]);

    return Interpreter;
})();

exports.default = Interpreter;
module.exports = exports.default;
//# sourceMappingURL=Interpreter.js.map