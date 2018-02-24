'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cities = require('./cities');

Object.defineProperty(exports, 'cities', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_cities).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }