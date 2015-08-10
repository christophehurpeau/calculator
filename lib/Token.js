"use strict";

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

Object.defineProperty(exports, "__esModule", {
    value: true
});
/** @class Token 
* @param type 
* @param value */
var Token = (function () {
    /**
     * @param {Symbol} type
     * @param {*} value
     */

    function Token(type, value) {
        _classCallCheck(this, Token);

        // token type: INTEGER, PLUS, or EOF
        this.type = type;

        // token value: 0, 1, 2. 3, 4, 5, 6, 7, 8, 9, '+', or None
        this.value = value;
    }

    /**
     * @return {String}
     
    * @memberof Token 
    * @instance 
    * @method toString */

    _createClass(Token, [{
        key: "toString",
        value: function toString() {
            return "Token(" + this.type + ", " + this.value;
        }
    }]);

    return Token;
})();

exports["default"] = Token;
module.exports = exports["default"];
//# sourceMappingURL=Token.js.map