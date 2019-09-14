"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useNodeSize = function useNodeSize() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$dependancies = _ref.dependancies,
      dependancies = _ref$dependancies === void 0 ? [] : _ref$dependancies,
      _ref$measureOnResize = _ref.measureOnResize,
      measureOnResize = _ref$measureOnResize === void 0 ? true : _ref$measureOnResize,
      _ref$measureOnScroll = _ref.measureOnScroll,
      measureOnScroll = _ref$measureOnScroll === void 0 ? false : _ref$measureOnScroll;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      rectValues = _useState2[0],
      setRectValues = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      node = _useState4[0],
      setNode = _useState4[1];

  var setRef = (0, _react.useCallback)(function (node) {
    return setNode(node);
  }, []);
  (0, _react.useLayoutEffect)(function () {
    if (node) {
      var getValues = function getValues() {
        return setRectValues(node.getBoundingClientRect());
      };

      getValues();

      if (measureOnResize && measureOnScroll) {
        window.addEventListener("resize", getValues);
        window.addEventListener("scroll", getValues);
        return function () {
          window.removeEventListener("resize", getValues);
          window.removeEventListener("scroll", getValues);
        };
      } else if (measureOnResize) {
        window.addEventListener("resize", getValues);
        return function () {
          return window.removeEventListener("resize", getValues);
        };
      } else if (measureOnScroll) {
        window.addEventListener("scroll", getValues);
        return function () {
          return window.removeEventListener("scroll", getValues);
        };
      }
    }
  }, [node].concat(_toConsumableArray(dependancies || [])));
  return {
    setRef: setRef,
    rectValues: rectValues
  };
};

var _default = useNodeSize;
exports["default"] = _default;