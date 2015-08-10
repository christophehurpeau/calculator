import Token from './Token';

const INTEGER = Symbol('INTEGER');
const PLUS = Symbol('PLUS');
const EOF = Symbol('EOF');

const isNumber = /^[0-9]$/;

export default class Interpreter {
    constructor(text) {
        this.text = text;
        this.position = 0;
        this.currentToken = undefined;
    }

    /**
     * Lexical analyzer (also known as scanner or tokenizer)
     * This method is responsible for breaking a sentence
     * apart into tokens. One token at a time.
     */
    getNextToken() {
        // is this.position index past the end of the this.text ?
        // if so, then return EOF token because there is no more
        if (this.position > this.text.length - 1) {
            return new Token(EOF);
        }

        // get a character at the position this.position and decide
        // what token to create based on the single character
        const currentChar = this.text.charAt(this.position);

        // if the character is a digit then convert it to
        // integer, create an INTEGER token, increment this.position
        // index to point to the next character after the digit,
        // and return the INTEGER token
        if (isNumber.test(currentChar)) {
            const token = new Token(INTEGER, Number.parseInt(currentChar, 10));
            this.position++;
            return token;
        }

        if (currentChar === '+') {
            const token = new Token(PLUS, currentChar);
            this.position++;
            return token;
        }

        throw new Error('Error parsing input at position ' + this.position);
    }

    /**
     * @param {Symbol} tokenType
     */
    eat(tokenType) {
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
     */
    expr() {
        // set current token to the first token taken from the input
        this.currentToken = this.getNextToken();

        // we expect the current token to be a single-digit integer
        const left = this.currentToken;
        this.eat(INTEGER);

        // we expect the current token to be a '+' token
        const operation = this.currentToken;
        this.eat(PLUS);

        // we expect the current token to be a single-digit integer
        const right = this.currentToken;
        this.eat(INTEGER);

        // after the above call the this.currentToken is set to EOF

        // at this point INTEGER PLUS INTEGER sequence of tokens
        // has been successfully found and the method can just
        // return the result of adding two integers, thus
        // effectively interpreting client input
        return left.value + right.value;
    }

}
