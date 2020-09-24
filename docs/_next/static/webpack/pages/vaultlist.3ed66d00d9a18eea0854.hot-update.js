webpackHotUpdate_N_E("pages/vaultlist",{

/***/ "./components/VaultList.tsx":
/*!**********************************!*\
  !*** ./components/VaultList.tsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return VaultList; });\n/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ \"./node_modules/@babel/runtime/helpers/esm/extends.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/core */ \"./node_modules/@chakra-ui/core/dist/es/index.js\");\n/* harmony import */ var react_loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-loader */ \"./node_modules/react-loader/lib/react-loader.js\");\n/* harmony import */ var react_loader__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_loader__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @web3-react/core */ \"./node_modules/@web3-react/core/dist/core.esm.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils */ \"./utils.ts\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../constants */ \"./constants.ts\");\n\n\n\n\nvar _jsxFileName = \"/Users/shannoncode/repo/Emblem.Currentwork/emblem-vault-site/components/VaultList.tsx\",\n    _s = $RefreshSig$();\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement;\n\n\n\n\n\n\nfunction VaultList() {\n  _s();\n\n  var _this = this;\n\n  var _useWeb3React = Object(_web3_react_core__WEBPACK_IMPORTED_MODULE_6__[\"useWeb3React\"])(),\n      account = _useWeb3React.account,\n      chainId = _useWeb3React.chainId;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useState\"])([]),\n      vaults = _useState[0],\n      setVaults = _useState[1];\n\n  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useState\"])({\n    loaded: false\n  }),\n      state = _useState2[0],\n      setState = _useState2[1];\n\n  var getVaults = /*#__PURE__*/function () {\n    var _ref = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {\n      var response, jsonData;\n      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              setState({\n                loaded: true\n              });\n              alert(JSON.parse(localStorage.getItem('vaults')));\n              setVaults(JSON.parse(localStorage.getItem('vaults')));\n              _context.next = 5;\n              return fetch(_constants__WEBPACK_IMPORTED_MODULE_8__[\"EMBLEM_API\"] + '/vaults/' + account, {\n                method: 'GET',\n                headers: {\n                  'Content-Type': 'application/json',\n                  service: 'evmetadata',\n                  chainId: chainId.toString()\n                }\n              });\n\n            case 5:\n              response = _context.sent;\n              _context.next = 8;\n              return response.json();\n\n            case 8:\n              jsonData = _context.sent;\n              setVaults(jsonData);\n              localStorage.setItem('vaults', JSON.stringify(jsonData));\n\n            case 11:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function getVaults() {\n      return _ref.apply(this, arguments);\n    };\n  }();\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useState\"])(''),\n      acct = _useState3[0],\n      setAcct = _useState3[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useEffect\"])(function () {\n    if (account && acct != account) {\n      setAcct(account);\n      setState({\n        loaded: false\n      });\n      getVaults();\n    }\n  }, [account, acct]);\n\n  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useState\"])(chainId),\n      chain = _useState4[0],\n      setChain = _useState4[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useEffect\"])(function () {\n    if (chainId && chain != chainId) {\n      setChain(chainId);\n      setState({\n        loaded: false\n      });\n      getVaults();\n    }\n  }, [chainId, chain]);\n  Object(react__WEBPACK_IMPORTED_MODULE_3__[\"useEffect\"])(function () {\n    account && chainId ? getVaults() : setState({\n      loaded: true\n    });\n  }, []);\n  return __jsx(react_loader__WEBPACK_IMPORTED_MODULE_5___default.a, {\n    loaded: state.loaded,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 54,\n      columnNumber: 5\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[\"Flex\"], {\n    w: \"100%\",\n    justify: \"center\",\n    flexWrap: \"wrap\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 55,\n      columnNumber: 7\n    }\n  }, vaults.length ? vaults.map(function (vault, index) {\n    var pieces = location.pathname.split('/');\n    pieces.pop();\n    var url = location.origin + pieces.join('/') + '/vault?id=' + vault.tokenId;\n    var flexSettings = {\n      flex: '1',\n      minW: '300px',\n      maxW: '300px',\n      borderWidth: '1px',\n      color: 'white',\n      mx: '6',\n      mb: '6',\n      rounded: 'lg',\n      overflow: 'hidden'\n    };\n\n    var redirect = function redirect() {\n      location.href = url;\n    };\n\n    return __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[\"Box\"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      key: index\n    }, flexSettings, {\n      onClick: redirect,\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 76,\n        columnNumber: 15\n      }\n    }), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[\"Text\"], {\n      fontWeight: \"semibold\",\n      textAlign: \"center\",\n      mt: 2,\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 77,\n        columnNumber: 17\n      }\n    }, vault.name), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[\"Stack\"], {\n      align: \"center\",\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 80,\n        columnNumber: 17\n      }\n    }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[\"Image\"], {\n      src: Object(_utils__WEBPACK_IMPORTED_MODULE_7__[\"validImage\"])(vault.image) ? vault.image : 'https://circuitsofvalue.com/public/coval-logo.png',\n      p: 2,\n      width: \"250px\",\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 81,\n        columnNumber: 19\n      }\n    })), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[\"Box\"], {\n      d: \"flex\",\n      alignItems: \"baseline\",\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 87,\n        columnNumber: 17\n      }\n    }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[\"Box\"], {\n      color: \"gray.500\",\n      fontWeight: \"semibold\",\n      letterSpacing: \"wide\",\n      fontSize: \"sm\",\n      ml: \"2\",\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 88,\n        columnNumber: 19\n      }\n    }, vault.isPrivate ? __jsx(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[\"Text\"], {\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 91,\n        columnNumber: 25\n      }\n    }, \"Contents hidden. Click to view the vault and unlock values.\")) : vault.values.length ? vault.values.map(function (coin) {\n      return __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[\"Text\"], {\n        key: coin.name,\n        isTruncated: true,\n        __self: _this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 96,\n          columnNumber: 27\n        }\n      }, coin.name, \": \", coin.balance);\n    }) : __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[\"Text\"], {\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 102,\n        columnNumber: 23\n      }\n    }, \"Nothing in here! \", __jsx(\"br\", {\n      __self: _this,\n      __source: {\n        fileName: _jsxFileName,\n        lineNumber: 103,\n        columnNumber: 42\n      }\n    }), \"Click to fill 'er up!\"))));\n  }) : __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[\"Text\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 113,\n      columnNumber: 11\n    }\n  }, \"YOU DON'T SEEM TO HAVE ANY VAULTS.\", ' ', __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_4__[\"Link\"], {\n    color: \"#638cd8\",\n    href: \"../create\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 115,\n      columnNumber: 13\n    }\n  }, \"CREATE ONE HERE!\"))));\n}\n\n_s(VaultList, \"49lcp43zp9gaHky/KBhHMN/4mI4=\", false, function () {\n  return [_web3_react_core__WEBPACK_IMPORTED_MODULE_6__[\"useWeb3React\"]];\n});\n\n_c = VaultList;\n\nvar _c;\n\n$RefreshReg$(_c, \"VaultList\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9WYXVsdExpc3QudHN4PzFmYjgiXSwibmFtZXMiOlsiVmF1bHRMaXN0IiwidXNlV2ViM1JlYWN0IiwiYWNjb3VudCIsImNoYWluSWQiLCJ1c2VTdGF0ZSIsInZhdWx0cyIsInNldFZhdWx0cyIsImxvYWRlZCIsInN0YXRlIiwic2V0U3RhdGUiLCJnZXRWYXVsdHMiLCJhbGVydCIsIkpTT04iLCJwYXJzZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJmZXRjaCIsIkVNQkxFTV9BUEkiLCJtZXRob2QiLCJoZWFkZXJzIiwic2VydmljZSIsInRvU3RyaW5nIiwicmVzcG9uc2UiLCJqc29uIiwianNvbkRhdGEiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiYWNjdCIsInNldEFjY3QiLCJ1c2VFZmZlY3QiLCJjaGFpbiIsInNldENoYWluIiwibGVuZ3RoIiwibWFwIiwidmF1bHQiLCJpbmRleCIsInBpZWNlcyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJzcGxpdCIsInBvcCIsInVybCIsIm9yaWdpbiIsImpvaW4iLCJ0b2tlbklkIiwiZmxleFNldHRpbmdzIiwiZmxleCIsIm1pblciLCJtYXhXIiwiYm9yZGVyV2lkdGgiLCJjb2xvciIsIm14IiwibWIiLCJyb3VuZGVkIiwib3ZlcmZsb3ciLCJyZWRpcmVjdCIsImhyZWYiLCJuYW1lIiwidmFsaWRJbWFnZSIsImltYWdlIiwiaXNQcml2YXRlIiwidmFsdWVzIiwiY29pbiIsImJhbGFuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRWUsU0FBU0EsU0FBVCxHQUFxQjtBQUFBOztBQUFBOztBQUFBLHNCQUNMQyxxRUFBWSxFQURQO0FBQUEsTUFDMUJDLE9BRDBCLGlCQUMxQkEsT0FEMEI7QUFBQSxNQUNqQkMsT0FEaUIsaUJBQ2pCQSxPQURpQjs7QUFBQSxrQkFFTkMsc0RBQVEsQ0FB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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQURuQiwwQkFkSixDQURGLENBWEYsQ0FERjtBQW9DRCxHQXRERCxDQURELEdBeURDLE1BQUMsb0RBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQ0FDcUMsR0FEckMsRUFFRSxNQUFDLG9EQUFEO0FBQU0sU0FBSyxFQUFDLFNBQVo7QUFBc0IsUUFBSSxFQUFDLFdBQTNCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0JBRkYsQ0ExREosQ0FERixDQURGO0FBc0VEOztHQW5IdUIvRCxTO1VBQ09DLDZEOzs7S0FEUEQsUyIsImZpbGUiOiIuL2NvbXBvbmVudHMvVmF1bHRMaXN0LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJveCwgRmxleCwgVGV4dCwgTGluaywgSW1hZ2UsIFN0YWNrIH0gZnJvbSAnQGNoYWtyYS11aS9jb3JlJ1xuaW1wb3J0IExvYWRlciBmcm9tICdyZWFjdC1sb2FkZXInXG5pbXBvcnQgeyB1c2VXZWIzUmVhY3QgfSBmcm9tICdAd2ViMy1yZWFjdC9jb3JlJ1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgdmFsaWRJbWFnZSB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgRU1CTEVNX0FQSSB9IGZyb20gJy4uL2NvbnN0YW50cydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVmF1bHRMaXN0KCkge1xuICBjb25zdCB7IGFjY291bnQsIGNoYWluSWQgfSA9IHVzZVdlYjNSZWFjdCgpXG4gIGNvbnN0IFt2YXVsdHMsIHNldFZhdWx0c10gPSB1c2VTdGF0ZShbXSlcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZSh7IGxvYWRlZDogZmFsc2UgfSlcblxuICBjb25zdCBnZXRWYXVsdHMgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0U3RhdGUoeyBsb2FkZWQ6IHRydWUgfSlcbiAgICBhbGVydChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd2YXVsdHMnKSkpXG4gICAgc2V0VmF1bHRzKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3ZhdWx0cycpKSlcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKEVNQkxFTV9BUEkgKyAnL3ZhdWx0cy8nICsgYWNjb3VudCwge1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgc2VydmljZTogJ2V2bWV0YWRhdGEnLFxuICAgICAgICBjaGFpbklkOiBjaGFpbklkLnRvU3RyaW5nKCksXG4gICAgICB9LFxuICAgIH0pXG4gICAgY29uc3QganNvbkRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKClcbiAgICBcbiAgICBzZXRWYXVsdHMoanNvbkRhdGEpXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3ZhdWx0cycsIEpTT04uc3RyaW5naWZ5KGpzb25EYXRhKSkgIFxuICB9XG5cbiAgY29uc3QgW2FjY3QsIHNldEFjY3RdID0gdXNlU3RhdGUoJycpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGFjY291bnQgJiYgYWNjdCAhPSBhY2NvdW50KSB7XG4gICAgICBzZXRBY2N0KGFjY291bnQpXG4gICAgICBzZXRTdGF0ZSh7IGxvYWRlZDogZmFsc2UgfSlcbiAgICAgIGdldFZhdWx0cygpXG4gICAgfVxuICB9LCBbYWNjb3VudCwgYWNjdF0pXG5cbiAgY29uc3QgW2NoYWluLCBzZXRDaGFpbl0gPSB1c2VTdGF0ZShjaGFpbklkKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChjaGFpbklkICYmIGNoYWluICE9IGNoYWluSWQpIHtcbiAgICAgIHNldENoYWluKGNoYWluSWQpXG4gICAgICBzZXRTdGF0ZSh7IGxvYWRlZDogZmFsc2UgfSlcbiAgICAgIGdldFZhdWx0cygpXG4gICAgfVxuICB9LCBbY2hhaW5JZCwgY2hhaW5dKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgYWNjb3VudCAmJiBjaGFpbklkID8gZ2V0VmF1bHRzKCkgOiBzZXRTdGF0ZSh7IGxvYWRlZDogdHJ1ZSB9KVxuICB9LCBbXSlcblxuICByZXR1cm4gKFxuICAgIDxMb2FkZXIgbG9hZGVkPXtzdGF0ZS5sb2FkZWR9PlxuICAgICAgPEZsZXggdz1cIjEwMCVcIiBqdXN0aWZ5PVwiY2VudGVyXCIgZmxleFdyYXA9XCJ3cmFwXCI+XG4gICAgICAgIHt2YXVsdHMubGVuZ3RoID8gKFxuICAgICAgICAgIHZhdWx0cy5tYXAoKHZhdWx0LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbGV0IHBpZWNlcyA9IGxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJylcbiAgICAgICAgICAgIHBpZWNlcy5wb3AoKVxuICAgICAgICAgICAgbGV0IHVybCA9IGxvY2F0aW9uLm9yaWdpbiArIHBpZWNlcy5qb2luKCcvJykgKyAnL3ZhdWx0P2lkPScgKyB2YXVsdC50b2tlbklkXG4gICAgICAgICAgICBjb25zdCBmbGV4U2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAgIGZsZXg6ICcxJyxcbiAgICAgICAgICAgICAgbWluVzogJzMwMHB4JyxcbiAgICAgICAgICAgICAgbWF4VzogJzMwMHB4JyxcbiAgICAgICAgICAgICAgYm9yZGVyV2lkdGg6ICcxcHgnLFxuICAgICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgbXg6ICc2JyxcbiAgICAgICAgICAgICAgbWI6ICc2JyxcbiAgICAgICAgICAgICAgcm91bmRlZDogJ2xnJyxcbiAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcmVkaXJlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSB1cmxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxCb3gga2V5PXtpbmRleH0gey4uLmZsZXhTZXR0aW5nc30gb25DbGljaz17cmVkaXJlY3R9PlxuICAgICAgICAgICAgICAgIDxUZXh0IGZvbnRXZWlnaHQ9XCJzZW1pYm9sZFwiIHRleHRBbGlnbj1cImNlbnRlclwiIG10PXsyfT5cbiAgICAgICAgICAgICAgICAgIHt2YXVsdC5uYW1lfVxuICAgICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgICA8U3RhY2sgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxJbWFnZVxuICAgICAgICAgICAgICAgICAgICBzcmM9e3ZhbGlkSW1hZ2UodmF1bHQuaW1hZ2UpID8gdmF1bHQuaW1hZ2UgOiAnaHR0cHM6Ly9jaXJjdWl0c29mdmFsdWUuY29tL3B1YmxpYy9jb3ZhbC1sb2dvLnBuZyd9XG4gICAgICAgICAgICAgICAgICAgIHA9ezJ9XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoPVwiMjUwcHhcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L1N0YWNrPlxuICAgICAgICAgICAgICAgIDxCb3ggZD1cImZsZXhcIiBhbGlnbkl0ZW1zPVwiYmFzZWxpbmVcIj5cbiAgICAgICAgICAgICAgICAgIDxCb3ggY29sb3I9XCJncmF5LjUwMFwiIGZvbnRXZWlnaHQ9XCJzZW1pYm9sZFwiIGxldHRlclNwYWNpbmc9XCJ3aWRlXCIgZm9udFNpemU9XCJzbVwiIG1sPVwiMlwiPlxuICAgICAgICAgICAgICAgICAgICB7dmF1bHQuaXNQcml2YXRlID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dD5Db250ZW50cyBoaWRkZW4uIENsaWNrIHRvIHZpZXcgdGhlIHZhdWx0IGFuZCB1bmxvY2sgdmFsdWVzLjwvVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgKSA6IHZhdWx0LnZhbHVlcy5sZW5ndGggPyAoXG4gICAgICAgICAgICAgICAgICAgICAgdmF1bHQudmFsdWVzLm1hcCgoY29pbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFRleHQga2V5PXtjb2luLm5hbWV9IGlzVHJ1bmNhdGVkPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2luLm5hbWV9OiB7Y29pbi5iYWxhbmNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8VGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICAgIE5vdGhpbmcgaW4gaGVyZSEgPGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICBDbGljayB0byBmaWxsICdlciB1cCFcbiAgICAgICAgICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgPC9Cb3g+XG4gICAgICAgICAgICApXG4gICAgICAgICAgfSlcbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8VGV4dD5cbiAgICAgICAgICAgIFlPVSBET04nVCBTRUVNIFRPIEhBVkUgQU5ZIFZBVUxUUy57JyAnfVxuICAgICAgICAgICAgPExpbmsgY29sb3I9XCIjNjM4Y2Q4XCIgaHJlZj1cIi4uL2NyZWF0ZVwiPlxuICAgICAgICAgICAgICBDUkVBVEUgT05FIEhFUkUhXG4gICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICApfVxuICAgICAgPC9GbGV4PlxuICAgIDwvTG9hZGVyPlxuICApXG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/VaultList.tsx\n");

/***/ })

})