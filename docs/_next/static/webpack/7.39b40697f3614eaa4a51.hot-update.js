webpackHotUpdate_N_E(7,{

/***/ "./components/OfferModal.tsx":
/*!***********************************!*\
  !*** ./components/OfferModal.tsx ***!
  \***********************************/
/*! exports provided: EMBLEM_API, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"EMBLEM_API\", function() { return EMBLEM_API; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return OfferModal; });\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @chakra-ui/core */ \"./node_modules/@chakra-ui/core/dist/es/index.js\");\n/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! copy-to-clipboard */ \"./node_modules/copy-to-clipboard/index.js\");\n/* harmony import */ var copy_to_clipboard__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(copy_to_clipboard__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants */ \"./constants.ts\");\n/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @web3-react/core */ \"./node_modules/@web3-react/core/dist/core.esm.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ \"./utils.ts\");\n\n\n\nvar _jsxFileName = \"/Users/shannoncode/repo/Emblem.Currentwork/emblem-vault-site/components/OfferModal.tsx\",\n    _s = $RefreshSig$();\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;\n\n\n\n\n\n\nvar EMBLEM_API = 'https://api.emblemvault.io';\nfunction OfferModal(_ref) {\n  _s();\n\n  var _this = this;\n\n  var isOpen = _ref.isOpen,\n      onClose = _ref.onClose;\n\n  //   const address = addrAddr\n  //   const coin = addrCoin\n  var _useColorMode = Object(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"useColorMode\"])(),\n      colorMode = _useColorMode.colorMode;\n\n  var _useWeb3React = Object(_web3_react_core__WEBPACK_IMPORTED_MODULE_6__[\"useWeb3React\"])(),\n      account = _useWeb3React.account,\n      chainId = _useWeb3React.chainId,\n      library = _useWeb3React.library;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(false),\n      copied = _useState[0],\n      setCopied = _useState[1];\n\n  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(false),\n      loading = _useState2[0],\n      setLoading = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(false),\n      loaded = _useState3[0],\n      setLoaded = _useState3[1];\n\n  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(null),\n      offeringToken = _useState4[0],\n      setOfferingToken = _useState4[1];\n\n  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])([]),\n      tokenBalances = _useState5[0],\n      setTokenBalances = _useState5[1];\n\n  var _useState6 = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useState\"])(0),\n      offeringTokenBalance = _useState6[0],\n      setOfferingTokenBalance = _useState6[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useEffect\"])(function () {\n    if (copied) {\n      var timeout = setTimeout(function () {\n        setCopied(false);\n      }, 750);\n      return function () {\n        clearTimeout(timeout);\n      };\n    }\n  }, [copied]);\n  Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useEffect\"])(function () {\n    if (!loaded && !loading) {\n      setLoading(true);\n      getBalances(account, /*#__PURE__*/function () {\n        var _ref2 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(balances) {\n          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {\n            while (1) {\n              switch (_context.prev = _context.next) {\n                case 0:\n                  setTokenBalances(balances);\n                  setLoading(false);\n                  setLoaded(true);\n\n                case 3:\n                case \"end\":\n                  return _context.stop();\n              }\n            }\n          }, _callee);\n        }));\n\n        return function (_x) {\n          return _ref2.apply(this, arguments);\n        };\n      }());\n    }\n  });\n\n  var getBalances = /*#__PURE__*/function () {\n    var _ref3 = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(address, cb) {\n      var responce, jsonData;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              _context2.next = 2;\n              return fetch(EMBLEM_API + '/' + _utils__WEBPACK_IMPORTED_MODULE_7__[\"NETWORK_SHORTNAMES\"][chainId] + '/balance/' + address, {\n                method: 'GET',\n                headers: {\n                  'Content-Type': 'application/json',\n                  service: 'evmetadata'\n                }\n              });\n\n            case 2:\n              responce = _context2.sent;\n              _context2.next = 5;\n              return responce.json();\n\n            case 5:\n              jsonData = _context2.sent;\n              return _context2.abrupt(\"return\", cb(jsonData.values));\n\n            case 7:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2);\n    }));\n\n    return function getBalances(_x2, _x3) {\n      return _ref3.apply(this, arguments);\n    };\n  }();\n\n  function copyWithFlag(content) {\n    copy_to_clipboard__WEBPACK_IMPORTED_MODULE_4___default()(content);\n    setCopied(true);\n  }\n\n  return __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Modal\"], {\n    isOpen: isOpen,\n    onClose: onClose,\n    isCentered: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 89,\n      columnNumber: 5\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"ModalOverlay\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 90,\n      columnNumber: 7\n    }\n  }), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"ModalContent\"], {\n    color: _constants__WEBPACK_IMPORTED_MODULE_5__[\"COLOR\"][colorMode],\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 91,\n      columnNumber: 7\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"ModalHeader\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 92,\n      columnNumber: 9\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Text\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 93,\n      columnNumber: 11\n    }\n  }, \"Offer\")), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"ModalCloseButton\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 95,\n      columnNumber: 9\n    }\n  }), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"ModalBody\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 96,\n      columnNumber: 9\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Stack\"], {\n    direction: \"column\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 97,\n      columnNumber: 11\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Stack\"], {\n    direction: \"row\",\n    align: \"center\",\n    justify: \"center\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 98,\n      columnNumber: 13\n    }\n  }), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Stack\"], {\n    mt: \"6\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 102,\n      columnNumber: 13\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Text\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 103,\n      columnNumber: 15\n    }\n  }, account, \" network: \", _utils__WEBPACK_IMPORTED_MODULE_7__[\"NETWORK_SHORTNAMES\"][chainId]), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Select\"], {\n    w: \"100%\",\n    value: offeringToken,\n    onChange: function onChange(e) {\n      var token = tokenBalances.filter(function (item) {\n        return item.address == e.target.value;\n      })[0];\n      setOfferingToken(token.address);\n      console.log(tokenBalances.filter(function (item) {\n        return item.address == e.target.value;\n      })[0]);\n      console.log(e.target.value);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 104,\n      columnNumber: 27\n    }\n  }, __jsx(\"option\", {\n    value: \"0\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 112,\n      columnNumber: 31\n    }\n  }, \"Choose a Token\"), tokenBalances.map(function (coin, index) {\n    if (coin.tokenType !== 'native') return __jsx(\"option\", {\n      value: coin.address,\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 116,\n        columnNumber: 37\n      }\n    }, coin.name);\n  }))), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Stack\"], {\n    direction: \"row\",\n    justify: \"center\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 123,\n      columnNumber: 13\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Button\"], {\n    onClick: function onClick() {\n      return copyWithFlag('address');\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 124,\n      columnNumber: 15\n    }\n  }, copied ? __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Text\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 125,\n      columnNumber: 27\n    }\n  }, \"Copied!\") : __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"Text\"], {\n    isTruncated: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 125,\n      columnNumber: 50\n    }\n  }, 'address'))))), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"ModalFooter\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 130,\n      columnNumber: 9\n    }\n  })));\n}\n\n_s(OfferModal, \"1O/d0u0kQ4zNQiBbmSl3fgcYfX8=\", false, function () {\n  return [_chakra_ui_core__WEBPACK_IMPORTED_MODULE_3__[\"useColorMode\"], _web3_react_core__WEBPACK_IMPORTED_MODULE_6__[\"useWeb3React\"]];\n});\n\n_c = OfferModal;\n\nvar _c;\n\n$RefreshReg$(_c, \"OfferModal\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9PZmZlck1vZGFsLnRzeD8wZjdiIl0sIm5hbWVzIjpbIkVNQkxFTV9BUEkiLCJPZmZlck1vZGFsIiwiaXNPcGVuIiwib25DbG9zZSIsInVzZUNvbG9yTW9kZSIsImNvbG9yTW9kZSIsInVzZVdlYjNSZWFjdCIsImFjY291bnQiLCJjaGFpbklkIiwibGlicmFyeSIsInVzZVN0YXRlIiwiY29waWVkIiwic2V0Q29waWVkIiwibG9hZGluZyIsInNldExvYWRpbmciLCJsb2FkZWQiLCJzZXRMb2FkZWQiLCJvZmZlcmluZ1Rva2VuIiwic2V0T2ZmZXJpbmdUb2tlbiIsInRva2VuQmFsYW5jZXMiLCJzZXRUb2tlbkJhbGFuY2VzIiwib2ZmZXJpbmdUb2tlbkJhbGFuY2UiLCJzZXRPZmZlcmluZ1Rva2VuQmFsYW5jZSIsInVzZUVmZmVjdCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwiZ2V0QmFsYW5jZXMiLCJiYWxhbmNlcyIsImFkZHJlc3MiLCJjYiIsImZldGNoIiwiTkVUV09SS19TSE9SVE5BTUVTIiwibWV0aG9kIiwiaGVhZGVycyIsInNlcnZpY2UiLCJyZXNwb25jZSIsImpzb24iLCJqc29uRGF0YSIsInZhbHVlcyIsImNvcHlXaXRoRmxhZyIsImNvbnRlbnQiLCJjb3B5IiwiQ09MT1IiLCJlIiwidG9rZW4iLCJmaWx0ZXIiLCJpdGVtIiwidGFyZ2V0IiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwibWFwIiwiY29pbiIsImluZGV4IiwidG9rZW5UeXBlIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQWNBO0FBRUE7QUFDQTtBQUNBO0FBRU8sSUFBTUEsVUFBVSxHQUFHLDRCQUFuQjtBQUVRLFNBQVNDLFVBQVQsT0FVQztBQUFBOztBQUFBOztBQUFBLE1BVGRDLE1BU2MsUUFUZEEsTUFTYztBQUFBLE1BUmRDLE9BUWMsUUFSZEEsT0FR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S0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUNHN0IsTUFBTSxHQUFHLE1BQUMsb0RBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFILEdBQTBCLE1BQUMsb0RBQUQ7QUFBTSxlQUFXLE1BQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FBbUIsU0FBbkIsQ0FEbkMsQ0FERixDQTFCRixDQURGLENBTEYsRUF1Q0UsTUFBQywyREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBdkNGLENBRkYsQ0FERjtBQThDRDs7R0E5R3VCVixVO1VBY0FHLDRELEVBQ2dCRSw2RDs7O0tBZmhCTCxVIiwiZmlsZSI6Ii4vY29tcG9uZW50cy9PZmZlck1vZGFsLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1xuICBNb2RhbCxcbiAgTW9kYWxPdmVybGF5LFxuICBNb2RhbENvbnRlbnQsXG4gIE1vZGFsSGVhZGVyLFxuICBNb2RhbENsb3NlQnV0dG9uLFxuICBNb2RhbEJvZHksXG4gIE1vZGFsRm9vdGVyLFxuICBUZXh0LFxuICBTdGFjayxcbiAgQnV0dG9uLFxuICB1c2VDb2xvck1vZGUsXG4gIFNlbGVjdCxcbn0gZnJvbSAnQGNoYWtyYS11aS9jb3JlJ1xuaW1wb3J0IGNvcHkgZnJvbSAnY29weS10by1jbGlwYm9hcmQnXG5pbXBvcnQgUVJDb2RlIGZyb20gJ3FyY29kZS5yZWFjdCdcbmltcG9ydCB7IENPTE9SIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuaW1wb3J0IHsgdXNlV2ViM1JlYWN0IH0gZnJvbSAnQHdlYjMtcmVhY3QvY29yZSdcbmltcG9ydCB7IE5FVFdPUktfU0hPUlROQU1FUyB9IGZyb20gJy4uL3V0aWxzJ1xuXG5leHBvcnQgY29uc3QgRU1CTEVNX0FQSSA9ICdodHRwczovL2FwaS5lbWJsZW12YXVsdC5pbydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gT2ZmZXJNb2RhbCh7XG4gIGlzT3BlbixcbiAgb25DbG9zZSxcbi8vICAgYWRkckNvaW4sXG4vLyAgIGFkZHJBZGRyLFxufToge1xuICBpc09wZW46IGJvb2xlYW5cbiAgb25DbG9zZTogKCkgPT4gdm9pZFxuLy8gICBhZGRyQ29pbjogc3RyaW5nXG4vLyAgIGFkZHJBZGRyOiBzdHJpbmdcbn0pOiBKU1guRWxlbWVudCB7XG4vLyAgIGNvbnN0IGFkZHJlc3MgPSBhZGRyQWRkclxuLy8gICBjb25zdCBjb2luID0gYWRkckNvaW5cblxuICBjb25zdCB7IGNvbG9yTW9kZSB9ID0gdXNlQ29sb3JNb2RlKClcbiAgY29uc3QgeyBhY2NvdW50LCBjaGFpbklkLCBsaWJyYXJ5IH0gPSB1c2VXZWIzUmVhY3QoKVxuICBjb25zdCBbY29waWVkLCBzZXRDb3BpZWRdID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCBbbG9hZGVkLCBzZXRMb2FkZWRdID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtvZmZlcmluZ1Rva2VuLCBzZXRPZmZlcmluZ1Rva2VuXSA9IHVzZVN0YXRlKG51bGwpXG4gIGNvbnN0IFt0b2tlbkJhbGFuY2VzLCBzZXRUb2tlbkJhbGFuY2VzXSA9IHVzZVN0YXRlKFtdKVxuICBjb25zdCBbb2ZmZXJpbmdUb2tlbkJhbGFuY2UsIHNldE9mZmVyaW5nVG9rZW5CYWxhbmNlXSA9IHVzZVN0YXRlKDApXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNvcGllZCkge1xuICAgICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRDb3BpZWQoZmFsc2UpXG4gICAgICB9LCA3NTApXG4gICAgICByZXR1cm4gKCk6IHZvaWQgPT4ge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dClcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtjb3BpZWRdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICBpZiAoIWxvYWRlZCAmJiAhbG9hZGluZykge1xuICAgICAgICBzZXRMb2FkaW5nKHRydWUpXG4gICAgICAgIGdldEJhbGFuY2VzKGFjY291bnQsIGFzeW5jIGJhbGFuY2VzID0+e1xuICAgICAgICAgICAgc2V0VG9rZW5CYWxhbmNlcyhiYWxhbmNlcylcbiAgICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpXG4gICAgICAgICAgICBzZXRMb2FkZWQodHJ1ZSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgfSlcblxuICBjb25zdCBnZXRCYWxhbmNlcyA9IGFzeW5jIChhZGRyZXNzLCBjYikgPT4ge1xuICAgIGNvbnN0IHJlc3BvbmNlID0gYXdhaXQgZmV0Y2goRU1CTEVNX0FQSSArICcvJytORVRXT1JLX1NIT1JUTkFNRVNbY2hhaW5JZF0rJy9iYWxhbmNlLycgKyBhZGRyZXNzLCB7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBzZXJ2aWNlOiAnZXZtZXRhZGF0YScsXG4gICAgICB9LFxuICAgIH0pXG4gICAgY29uc3QganNvbkRhdGEgPSBhd2FpdCByZXNwb25jZS5qc29uKClcbiAgICAvLyBjb25zb2xlLmxvZyhOdW1iZXIodmF1bHRUb3RhbFZhbHVlKSwgTnVtYmVyKGpzb25EYXRhLnRvdGFsVmFsdWUpKVxuICAgIC8vIHNldFZhdWx0VG90YWxWYWx1ZShOdW1iZXIodmF1bHRUb3RhbFZhbHVlKSArIE51bWJlcihqc29uRGF0YS50b3RhbFZhbHVlKSlcbiAgICAvLyBjb25zb2xlLmxvZygnZ2V0IGV0aCBiYWxhbmNlcycsIGpzb25EYXRhLnZhbHVlcylcbiAgICByZXR1cm4gY2IoanNvbkRhdGEudmFsdWVzKVxuICB9XG5cbiAgZnVuY3Rpb24gY29weVdpdGhGbGFnKGNvbnRlbnQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvcHkoY29udGVudClcbiAgICBzZXRDb3BpZWQodHJ1ZSlcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPE1vZGFsIGlzT3Blbj17aXNPcGVufSBvbkNsb3NlPXtvbkNsb3NlfSBpc0NlbnRlcmVkPlxuICAgICAgPE1vZGFsT3ZlcmxheSAvPlxuICAgICAgPE1vZGFsQ29udGVudCBjb2xvcj17Q09MT1JbY29sb3JNb2RlXX0+XG4gICAgICAgIDxNb2RhbEhlYWRlcj5cbiAgICAgICAgICA8VGV4dD5PZmZlcjwvVGV4dD5cbiAgICAgICAgPC9Nb2RhbEhlYWRlcj5cbiAgICAgICAgPE1vZGFsQ2xvc2VCdXR0b24gLz5cbiAgICAgICAgPE1vZGFsQm9keT5cbiAgICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPVwiY29sdW1uXCI+XG4gICAgICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPVwicm93XCIgYWxpZ249XCJjZW50ZXJcIiBqdXN0aWZ5PVwiY2VudGVyXCI+XG4gICAgICAgICAgICAgIHsvKiA8UVJDb2RlIHZhbHVlPXtjb2luPT1cIkJUQ1wiID8gXCJiaXRjb2luOlwiK2FkZHJlc3M6IGFkZHJlc3N9IG9uQ2xpY2s9eygpID0+IGNvcHlXaXRoRmxhZyhhZGRyZXNzKX0gLz4gKi99XG4gICAgICAgICAgICA8L1N0YWNrPlxuXG4gICAgICAgICAgICA8U3RhY2sgbXQ9XCI2XCI+XG4gICAgICAgICAgICAgIDxUZXh0PnthY2NvdW50fSBuZXR3b3JrOiB7TkVUV09SS19TSE9SVE5BTUVTW2NoYWluSWRdfTwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdCB3PVwiMTAwJVwiIHZhbHVlPXtvZmZlcmluZ1Rva2VufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b2tlbiA9IHRva2VuQmFsYW5jZXMuZmlsdGVyKChpdGVtKT0+e3JldHVybiBpdGVtLmFkZHJlc3MgPT0gZS50YXJnZXQudmFsdWV9KVswXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRPZmZlcmluZ1Rva2VuKHRva2VuLmFkZHJlc3MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRva2VuQmFsYW5jZXMuZmlsdGVyKChpdGVtKT0+e3JldHVybiBpdGVtLmFkZHJlc3MgPT0gZS50YXJnZXQudmFsdWV9KVswXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIwXCIgPkNob29zZSBhIFRva2VuPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW5CYWxhbmNlcy5tYXAoKGNvaW4sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvaW4udG9rZW5UeXBlICE9PSAnbmF0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17Y29pbi5hZGRyZXNzfT57Y29pbi5uYW1lfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L1NlbGVjdD5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICA8L1N0YWNrPlxuICAgICAgICAgICAgPFN0YWNrIGRpcmVjdGlvbj1cInJvd1wiIGp1c3RpZnk9XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBjb3B5V2l0aEZsYWcoJ2FkZHJlc3MnKX0+XG4gICAgICAgICAgICAgICAge2NvcGllZCA/IDxUZXh0PkNvcGllZCE8L1RleHQ+IDogPFRleHQgaXNUcnVuY2F0ZWQ+eydhZGRyZXNzJ308L1RleHQ+fVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgPC9TdGFjaz5cbiAgICAgICAgPC9Nb2RhbEJvZHk+XG4gICAgICAgIDxNb2RhbEZvb3Rlcj48L01vZGFsRm9vdGVyPlxuICAgICAgPC9Nb2RhbENvbnRlbnQ+XG4gICAgPC9Nb2RhbD5cbiAgKVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/OfferModal.tsx\n");

/***/ })

})