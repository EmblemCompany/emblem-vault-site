webpackHotUpdate_N_E(7,{

/***/ "./components/OfferModal.tsx":
/*!***********************************!*\
  !*** ./components/OfferModal.tsx ***!
  \***********************************/
/*! exports provided: EMBLEM_API, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EMBLEM_API\", function() { return EMBLEM_API; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return OfferModal; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/core */ \"./node_modules/@chakra-ui/core/dist/es/index.js\");\n/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! copy-to-clipboard */ \"./node_modules/copy-to-clipboard/index.js\");\n/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(copy_to_clipboard__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants */ \"./constants.ts\");\n/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @web3-react/core */ \"./node_modules/@web3-react/core/dist/core.esm.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ \"./utils.ts\");\n\n\n\nvar _jsxFileName = \"/Users/shannoncode/repo/Emblem.Currentwork/emblem-vault-site/components/OfferModal.tsx\",\n    _s = $RefreshSig$();\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;\n\n\n\n\n\n\nvar EMBLEM_API = 'https://api.emblemvault.io';\nfunction OfferModal(_ref) {\n  _s();\n\n  var _this = this;\n\n  var isOpen = _ref.isOpen,\n      onClose = _ref.onClose;\n\n  //   const address = addrAddr\n  //   const coin = addrCoin\n  var _useColorMode = Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"useColorMode\"])(),\n      colorMode = _useColorMode.colorMode;\n\n  var _useWeb3React = Object(_web3_react_core__WEBPACK_IMPORTED_MODULE_6__[\"useWeb3React\"])(),\n      account = _useWeb3React.account,\n      chainId = _useWeb3React.chainId,\n      library = _useWeb3React.library;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(false),\n      copied = _useState[0],\n      setCopied = _useState[1];\n\n  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(false),\n      loading = _useState2[0],\n      setLoading = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(false),\n      loaded = _useState3[0],\n      setLoaded = _useState3[1];\n\n  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])([]),\n      tokenBalances = _useState4[0],\n      setTokenBalances = _useState4[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useEffect\"])(function () {\n    if (copied) {\n      var timeout = setTimeout(function () {\n        setCopied(false);\n      }, 750);\n      return function () {\n        clearTimeout(timeout);\n      };\n    }\n  }, [copied]);\n  Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useEffect\"])(function () {\n    if (!loaded && !loading) {\n      setLoading(true);\n      getBalances(account, /*#__PURE__*/function () {\n        var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(balances) {\n          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n            while (1) {\n              switch (_context.prev = _context.next) {\n                case 0:\n                  setTokenBalances(balances);\n                  setLoading(false);\n                  setLoaded(true);\n\n                case 3:\n                case \"end\":\n                  return _context.stop();\n              }\n            }\n          }, _callee);\n        }));\n\n        return function (_x) {\n          return _ref2.apply(this, arguments);\n        };\n      }());\n    }\n  });\n\n  var getBalances = /*#__PURE__*/function () {\n    var _ref3 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(address, cb) {\n      var responce, jsonData;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              _context2.next = 2;\n              return fetch(EMBLEM_API + '/' + _utils__WEBPACK_IMPORTED_MODULE_7__[\"NETWORK_SHORTNAMES\"][chainId] + '/balance/' + address, {\n                method: 'GET',\n                headers: {\n                  'Content-Type': 'application/json',\n                  service: 'evmetadata'\n                }\n              });\n\n            case 2:\n              responce = _context2.sent;\n              _context2.next = 5;\n              return responce.json();\n\n            case 5:\n              jsonData = _context2.sent;\n              return _context2.abrupt(\"return\", cb(jsonData.values));\n\n            case 7:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n\n    return function getBalances(_x2, _x3) {\n      return _ref3.apply(this, arguments);\n    };\n  }();\n\n  function copyWithFlag(content) {\n    copy_to_clipboard__WEBPACK_IMPORTED_MODULE_4___default()(content);\n    setCopied(true);\n  }\n\n  return __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Modal\"], {\n    isOpen: isOpen,\n    onClose: onClose,\n    isCentered: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 86,\n      columnNumber: 5\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"ModalOverlay\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 87,\n      columnNumber: 7\n    }\n  }), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"ModalContent\"], {\n    color: _constants__WEBPACK_IMPORTED_MODULE_5__[\"COLOR\"][colorMode],\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 88,\n      columnNumber: 7\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"ModalHeader\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 89,\n      columnNumber: 9\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Text\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 90,\n      columnNumber: 11\n    }\n  }, \"Offer\")), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"ModalCloseButton\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 92,\n      columnNumber: 9\n    }\n  }), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"ModalBody\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 93,\n      columnNumber: 9\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Stack\"], {\n    direction: \"column\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 94,\n      columnNumber: 11\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Stack\"], {\n    direction: \"row\",\n    align: \"center\",\n    justify: \"center\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 95,\n      columnNumber: 13\n    }\n  }), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Stack\"], {\n    direction: \"row\",\n    justify: \"center\",\n    mt: \"6\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 99,\n      columnNumber: 13\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Text\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 100,\n      columnNumber: 15\n    }\n  }, account, \" network: \", _utils__WEBPACK_IMPORTED_MODULE_7__[\"NETWORK_SHORTNAMES\"][chainId]), tokenBalances.map(function (coin, index) {\n    return __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Text\"], {\n      key: index,\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 104,\n        columnNumber: 27\n      }\n    }, index);\n  })), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Stack\"], {\n    direction: \"row\",\n    justify: \"center\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 109,\n      columnNumber: 13\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Button\"], {\n    onClick: function onClick() {\n      return copyWithFlag('address');\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 110,\n      columnNumber: 15\n    }\n  }, copied ? __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Text\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 111,\n      columnNumber: 27\n    }\n  }, \"Copied!\") : __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Text\"], {\n    isTruncated: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 111,\n      columnNumber: 50\n    }\n  }, 'address'))))), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"ModalFooter\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 116,\n      columnNumber: 9\n    }\n  })));\n}\n\n_s(OfferModal, \"xMX7D9s7Q3o5bvI4umxkXPPAVqA=\", false, function () {\n  return [_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"useColorMode\"], _web3_react_core__WEBPACK_IMPORTED_MODULE_6__[\"useWeb3React\"]];\n});\n\n_c = OfferModal;\n\nvar _c;\n\n$RefreshReg$(_c, \"OfferModal\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9PZmZlck1vZGFsLnRzeD8wZjdiIl0sIm5hbWVzIjpbIkVNQkxFTV9BUEkiLCJPZmZlck1vZGFsIiwiaXNPcGVuIiwib25DbG9zZSIsInVzZUNvbG9yTW9kZSIsImNvbG9yTW9kZSIsInVzZVdlYjNSZWFjdCIsImFjY291bnQiLCJjaGFpbklkIiwibGlicmFyeSIsInVzZVN0YXRlIiwiY29waWVkIiwic2V0Q29waWVkIiwibG9hZGluZyIsInNldExvYWRpbmciLCJsb2FkZWQiLCJzZXRMb2FkZWQiLCJ0b2tlbkJhbGFuY2VzIiwic2V0VG9rZW5CYWxhbmNlcyIsInVzZUVmZmVjdCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiZ2V0QmFsYW5jZXMiLCJiYWxhbmNlcyIsImFkZHJlc3MiLCJjYiIsImZldGNoIiwiTkVUV09SS19TSE9SVE5BTUVTIiwibWV0aG9kIiwiaGVhZGVycyIsInNlcnZpY2UiLCJyZXNwb25jZSIsImpzb24iLCJqc29uRGF0YSIsInZhbHVlcyIsImNvcHlXaXRoRmxhZyIsImNvbnRlbnQiLCJjb3B5IiwiQ09MT1IiLCJtYXAiLCJjb2luIiwiaW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFhQTtBQUVBO0FBQ0E7QUFDQTtBQUVPLElBQU1BLFVBQVUsR0FBRyw0QkFBbkI7QUFFUSxTQUFTQyxVQUFULE9BVUM7QUFBQTs7QUFBQTs7QUFBQSxNQVRkQyxNQVNjLFFBVGRBLE1BU2M7QUFBQSxNQVJkQyxPQVFjLFFBUmRBLE9BUWM7O0FBQ2hCO0FBQ0E7QUFGZ0Isc0JBSVFDLG9FQUFZLEVBSnBCO0FBQUEsTUFJTkMsU0FKTSxpQkFJTkEsU0FKTTs7QUFBQSxzQkFLd0JDLHFFQUFZLEVBTHBDO0FBQUEsTUFLTkMsT0FMTSxpQkFLTkEsT0FMTTtBQUFBLE1BS0dDLE9BTEgsaUJBS0dBLE9BTEg7QUFBQSxNQUtZQyxPQUxa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QUFBLEtBQ0d6QixNQUFNLEdBQUcsTUFBQyxvREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQUgsR0FBMEIsTUFBQyxvREFBRDtBQUFNLGVBQVcsTUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFtQixTQUFuQixDQURuQyxDQURGLENBZkYsQ0FERixDQUxGLEVBNEJFLE1BQUMsMkRBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQTVCRixDQUZGLENBREY7QUFtQ0Q7O0dBakd1QlYsVTtVQWNBRyw0RCxFQUNnQkUsNkQ7OztLQWZoQkwsVSIsImZpbGUiOiIuL2NvbXBvbmVudHMvT2ZmZXJNb2RhbC50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtcbiAgTW9kYWwsXG4gIE1vZGFsT3ZlcmxheSxcbiAgTW9kYWxDb250ZW50LFxuICBNb2RhbEhlYWRlcixcbiAgTW9kYWxDbG9zZUJ1dHRvbixcbiAgTW9kYWxCb2R5LFxuICBNb2RhbEZvb3RlcixcbiAgVGV4dCxcbiAgU3RhY2ssXG4gIEJ1dHRvbixcbiAgdXNlQ29sb3JNb2RlLFxufSBmcm9tICdAY2hha3JhLXVpL2NvcmUnXG5pbXBvcnQgY29weSBmcm9tICdjb3B5LXRvLWNsaXBib2FyZCdcbmltcG9ydCBRUkNvZGUgZnJvbSAncXJjb2RlLnJlYWN0J1xuaW1wb3J0IHsgQ09MT1IgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyB1c2VXZWIzUmVhY3QgfSBmcm9tICdAd2ViMy1yZWFjdC9jb3JlJ1xuaW1wb3J0IHsgTkVUV09SS19TSE9SVE5BTUVTIH0gZnJvbSAnLi4vdXRpbHMnXG5cbmV4cG9ydCBjb25zdCBFTUJMRU1fQVBJID0gJ2h0dHBzOi8vYXBpLmVtYmxlbXZhdWx0LmlvJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBPZmZlck1vZGFsKHtcbiAgaXNPcGVuLFxuICBvbkNsb3NlLFxuLy8gICBhZGRyQ29pbixcbi8vICAgYWRkckFkZHIsXG59OiB7XG4gIGlzT3BlbjogYm9vbGVhblxuICBvbkNsb3NlOiAoKSA9PiB2b2lkXG4vLyAgIGFkZHJDb2luOiBzdHJpbmdcbi8vICAgYWRkckFkZHI6IHN0cmluZ1xufSk6IEpTWC5FbGVtZW50IHtcbi8vICAgY29uc3QgYWRkcmVzcyA9IGFkZHJBZGRyXG4vLyAgIGNvbnN0IGNvaW4gPSBhZGRyQ29pblxuXG4gIGNvbnN0IHsgY29sb3JNb2RlIH0gPSB1c2VDb2xvck1vZGUoKVxuICBjb25zdCB7IGFjY291bnQsIGNoYWluSWQsIGxpYnJhcnkgfSA9IHVzZVdlYjNSZWFjdCgpXG4gIGNvbnN0IFtjb3BpZWQsIHNldENvcGllZF0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtsb2FkZWQsIHNldExvYWRlZF0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgY29uc3QgW3Rva2VuQmFsYW5jZXMsIHNldFRva2VuQmFsYW5jZXNdID0gdXNlU3RhdGUoW10pXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNvcGllZCkge1xuICAgICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRDb3BpZWQoZmFsc2UpXG4gICAgICB9LCA3NTApXG4gICAgICByZXR1cm4gKCk6IHZvaWQgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtjb3BpZWRdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBpZiAoIWxvYWRlZCAmJiAhbG9hZGluZykge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpXG4gICAgICAgIGdldEJhbGFuY2VzKGFjY291bnQsIGFzeW5jIGJhbGFuY2VzID0+e1xuICAgICAgICAgICAgc2V0VG9rZW5CYWxhbmNlcyhiYWxhbmNlcylcbiAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpXG4gICAgICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgfSlcblxuICBjb25zdCBnZXRCYWxhbmNlcyA9IGFzeW5jIChhZGRyZXNzLCBjYikgPT4ge1xuICAgIGNvbnN0IHJlc3BvbmNlID0gYXdhaXQgZmV0Y2goRU1CTEVNX0FQSSArICcvJytORVRXT1JLX1NIT1JUTkFNRVNbY2hhaW5JZF0rJy9iYWxhbmNlLycgKyBhZGRyZXNzLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBzZXJ2aWNlOiAnZXZtZXRhZGF0YScsXG4gICAgICB9LFxuICAgIH0pXG4gICAgY29uc3QganNvbkRhdGEgPSBhd2FpdCByZXNwb25jZS5qc29uKClcbiAgICAvLyBjb25zb2xlLmxvZyhOdW1iZXIodmF1bHRUb3RhbFZhbHVlKSwgTnVtYmVyKGpzb25EYXRhLnRvdGFsVmFsdWUpKVxuICAgIC8vIHNldFZhdWx0VG90YWxWYWx1ZShOdW1iZXIodmF1bHRUb3RhbFZhbHVlKSArIE51bWJlcihqc29uRGF0YS50b3RhbFZhbHVlKSlcbiAgICAvLyBjb25zb2xlLmxvZygnZ2V0IGV0aCBiYWxhbmNlcycsIGpzb25EYXRhLnZhbHVlcylcbiAgICByZXR1cm4gY2IoanNvbkRhdGEudmFsdWVzKVxuICB9XG5cbiAgZnVuY3Rpb24gY29weVdpdGhGbGFnKGNvbnRlbnQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvcHkoY29udGVudClcbiAgICBzZXRDb3BpZWQodHJ1ZSlcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPE1vZGFsIGlzT3Blbj17aXNPcGVufSBvbkNsb3NlPXtvbkNsb3NlfSBpc0NlbnRlcmVkPlxuICAgICAgPE1vZGFsT3ZlcmxheSAvPlxuICAgICAgPE1vZGFsQ29udGVudCBjb2xvcj17Q09MT1JbY29sb3JNb2RlXX0+XG4gICAgICAgIDxNb2RhbEhlYWRlcj5cbiAgICAgICAgICA8VGV4dD5PZmZlcjwvVGV4dD5cbiAgICAgICAgPC9Nb2RhbEhlYWRlcj5cbiAgICAgICAgPE1vZGFsQ2xvc2VCdXR0b24gLz5cbiAgICAgICAgPE1vZGFsQm9keT5cbiAgICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPVwiY29sdW1uXCI+XG4gICAgICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPVwicm93XCIgYWxpZ249XCJjZW50ZXJcIiBqdXN0aWZ5PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgIHsvKiA8UVJDb2RlIHZhbHVlPXtjb2luPT1cIkJUQ1wiID8gXCJiaXRjb2luOlwiK2FkZHJlc3M6IGFkZHJlc3N9IG9uQ2xpY2s9eygpID0+IGNvcHlXaXRoRmxhZyhhZGRyZXNzKX0gLz4gKi99XG4gICAgICAgICAgICA8L1N0YWNrPlxuXG4gICAgICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPVwicm93XCIganVzdGlmeT1cImNlbnRlclwiIG10PVwiNlwiPlxuICAgICAgICAgICAgICA8VGV4dD57YWNjb3VudH0gbmV0d29yazoge05FVFdPUktfU0hPUlROQU1FU1tjaGFpbklkXX08L1RleHQ+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIHt0b2tlbkJhbGFuY2VzLm1hcCgoY29pbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8VGV4dCBrZXk9e2luZGV4fT57aW5kZXh9PC9UZXh0PlxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPVwicm93XCIganVzdGlmeT1cImNlbnRlclwiPlxuICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IGNvcHlXaXRoRmxhZygnYWRkcmVzcycpfT5cbiAgICAgICAgICAgICAgICB7Y29waWVkID8gPFRleHQ+Q29waWVkITwvVGV4dD4gOiA8VGV4dCBpc1RydW5jYXRlZD57J2FkZHJlc3MnfTwvVGV4dD59XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9TdGFjaz5cbiAgICAgICAgICA8L1N0YWNrPlxuICAgICAgICA8L01vZGFsQm9keT5cbiAgICAgICAgPE1vZGFsRm9vdGVyPjwvTW9kYWxGb290ZXI+XG4gICAgICA8L01vZGFsQ29udGVudD5cbiAgICA8L01vZGFsPlxuICApXG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/OfferModal.tsx\n");

/***/ })

})