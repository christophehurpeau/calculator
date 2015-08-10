export default class Token {
    /**
     * @param {Symbol} type
     * @param {*} value
     */
    constructor(type, value) {
        // token type: INTEGER, PLUS, or EOF
        this.type = type;

        // token value: 0, 1, 2. 3, 4, 5, 6, 7, 8, 9, '+', or None
        this.value = value;
    }

    /**
     * @return {String}
     */
    toString() {
        return `Token(${this.type}, ${this.value}`;
    }
}
