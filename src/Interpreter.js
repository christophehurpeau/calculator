import Token from './Token';

const INTEGER = Symbol('INTEGER');
const PLUS = Symbol('PLUS');
const MINUS = Symbol('MINUS');
const ASTERISK = Symbol('ASTERISK');
const SLASH = Symbol('SLASH');
const EOF = Symbol('EOF');

const isNumber = /^[0-9]$/;
const isWhitespace = /^\s$/;

export default class Interpreter {
    constructor(text) {
        this.text = text;
        this.position = 0;
        this.currentToken = undefined;
        this.currentChar = this.text.charAt(this.position);
    }

    hasNextChar() {
        return this.position < this.text.length;
    }

    advance() {
        this.position++;
        this.currentChar = this.text.charAt(this.position);
        return this.currentChar;
    }

    skipWhiteSpaces() {
        while (this.currentChar !== '' && isWhitespace.test(this.currentChar)) {
            this.advance();
        }
    }

    integer() {
        let buffer = '';
        let currentChar = this.currentChar;
        do {
            buffer += currentChar;
            currentChar = this.advance();
        } while (isNumber.test(currentChar));
        return Number.parseInt(buffer, 10);
    }

    /**
     * Lexical analyzer (also known as scanner or tokenizer)
     * This method is responsible for breaking a sentence
     * apart into tokens. One token at a time.
     */
    getNextToken() {
        this.skipWhiteSpaces();

        if (this.currentChar === '') {
            return new Token(EOF);
        }

        if (isNumber.test(this.currentChar)) {
            return new Token(INTEGER, this.integer());
        }

        if (this.currentChar === '+') {
            this.advance();
            return new Token(PLUS, this.currentChar);
        }

        if (this.currentChar === '-') {
            this.advance();
            return new Token(MINUS, this.currentChar);
        }

        if (this.currentChar === '*') {
            this.advance();
            return new Token(ASTERISK, this.currentChar);
        }

        if (this.currentChar === '/') {
            this.advance();
            return new Token(SLASH, this.currentChar);
        }

        throw new Error('Error parsing input at position ' + this.position);
    }

    /**
     * @param {Symbol|Symbol[]} tokenTypes
     */
    eat(tokenTypes) {
        // compare the current token type with the passed token
        // type and if they match then "eat" the current token
        // and assign the next token to the this.currentToken,
        // otherwise raise an exception.

        if (!Array.isArray(tokenTypes)) {
            tokenTypes = [tokenTypes];
        }

        if (tokenTypes.indexOf(this.currentToken.type) === -1) {
            throw new Error('Expecting ' + tokenTypes.map(s => s.toString()).join(' or ')
                            + ', got ' + this.currentToken.type.toString());
        }

        this.currentToken = this.getNextToken();
    }

    /**
     * expr -> INTEGER PLUS INTEGER
     */
    expr() {
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

}
