webpackHotUpdate_N_E("pages/newest",{

/***/ "./components/Embed.tsx":
/*!******************************!*\
  !*** ./components/Embed.tsx ***!
  \******************************/
/*! exports provided: Embed, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Embed\", function() { return Embed; });\n/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ \"./node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/core */ \"./node_modules/@chakra-ui/core/dist/es/index.js\");\n/* harmony import */ var _embed_SketchFab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./embed/SketchFab */ \"./components/embed/SketchFab.tsx\");\n/* harmony import */ var _embed_ShaderToy__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./embed/ShaderToy */ \"./components/embed/ShaderToy.tsx\");\n/* harmony import */ var _embed_Bandcamp__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./embed/Bandcamp */ \"./components/embed/Bandcamp.tsx\");\n/* harmony import */ var _embed_SoundCloud__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./embed/SoundCloud */ \"./components/embed/SoundCloud.tsx\");\n/* harmony import */ var _embed_Clyp__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./embed/Clyp */ \"./components/embed/Clyp.tsx\");\n/* harmony import */ var _embed_Sketchup__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./embed/Sketchup */ \"./components/embed/Sketchup.tsx\");\n/* harmony import */ var _embed_Clara__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./embed/Clara */ \"./components/embed/Clara.tsx\");\n/* harmony import */ var _embed_MyMiniFactory__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./embed/MyMiniFactory */ \"./components/embed/MyMiniFactory.tsx\");\n/* harmony import */ var _embed_Audius__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./embed/Audius */ \"./components/embed/Audius.tsx\");\n/* harmony import */ var _embed_Generic__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./embed/Generic */ \"./components/embed/Generic.tsx\");\n/* harmony import */ var _embed_Youtube__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./embed/Youtube */ \"./components/embed/Youtube.tsx\");\n/* harmony import */ var _embed_Vimeo__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./embed/Vimeo */ \"./components/embed/Vimeo.tsx\");\n\n\n\n\n\nvar _jsxFileName = \"/Users/shannoncode/repo/Emblem.Currentwork/emblem-vault-site/components/Embed.tsx\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar Embed = /*#__PURE__*/function (_Component) {\n  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(Embed, _Component);\n\n  var _super = _createSuper(Embed);\n\n  function Embed() {\n    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, Embed);\n\n    return _super.apply(this, arguments);\n  }\n\n  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(Embed, [{\n    key: \"render\",\n    value: function render() {\n      var url = this.props.url || \"\";\n      return __jsx(react__WEBPACK_IMPORTED_MODULE_5___default.a.Fragment, null, url.includes('sketchfab.com/') ? __jsx(_embed_SketchFab__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n        url: url,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 28,\n          columnNumber: 11\n        }\n      }) : url.includes('shadertoy.com/') ? __jsx(_embed_ShaderToy__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n        url: url,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 32,\n          columnNumber: 11\n        }\n      }) : url.includes('bandcamp.com/') ? __jsx(_embed_Bandcamp__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n        url: url,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 36,\n          columnNumber: 11\n        }\n      }) : url.includes('soundcloud.com/') ? __jsx(_embed_SoundCloud__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n        url: url,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 40,\n          columnNumber: 11\n        }\n      }) : url.includes('clyp.it/') ? __jsx(_embed_Clyp__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n        url: url,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 44,\n          columnNumber: 11\n        }\n      }) : url.includes('sketchup.com/') ? __jsx(_embed_Sketchup__WEBPACK_IMPORTED_MODULE_12__[\"default\"], {\n        url: url,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 48,\n          columnNumber: 11\n        }\n      }) : url.includes('clara.io/') ? __jsx(_embed_Clara__WEBPACK_IMPORTED_MODULE_13__[\"default\"], {\n        url: url,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 52,\n          columnNumber: 11\n        }\n      }) : url.includes('myminifactory.com/') ? __jsx(_embed_MyMiniFactory__WEBPACK_IMPORTED_MODULE_14__[\"default\"], {\n        url: url,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 56,\n          columnNumber: 11\n        }\n      }) : url.includes('audius.co/') ? __jsx(_embed_Audius__WEBPACK_IMPORTED_MODULE_15__[\"Audius\"], {\n        url: url,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 60,\n          columnNumber: 11\n        }\n      }) : url.includes('youtube.com') ? __jsx(_embed_Youtube__WEBPACK_IMPORTED_MODULE_17__[\"default\"], {\n        url: url,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 64,\n          columnNumber: 11\n        }\n      }) : url.includes('vimeo.com') ? __jsx(_embed_Vimeo__WEBPACK_IMPORTED_MODULE_18__[\"default\"], {\n        url: url,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 68,\n          columnNumber: 11\n        }\n      }) : url.includes('/dynamic/') || url.includes('ipfs://') || url.includes('arweave') || url.includes('https://s3.amazonaws.com/') || url.includes('googleusercontent.com') || url.includes('ipfs.io') || url.includes('framed/') || url.includes('.png') || url.includes('.jpg') || url.includes('.jpeg') || url.includes('.gif') || url.includes('.svg') || url.includes('data:image') ? __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_6__[\"Image\"], {\n        p: \"20px\",\n        h: \"100%\",\n        className: this.props.className || \"d-block w-100\",\n        src: url || 'https://circuitsofvalue.com/public/coval-logo.png',\n        width: \"250px\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 72,\n          columnNumber: 15\n        }\n      }) : __jsx(_embed_Generic__WEBPACK_IMPORTED_MODULE_16__[\"Generic\"], {\n        url: url,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 80,\n          columnNumber: 11\n        }\n      }));\n    }\n  }]);\n\n  return Embed;\n}(react__WEBPACK_IMPORTED_MODULE_5__[\"Component\"]);\n/* harmony default export */ __webpack_exports__[\"default\"] = (Embed);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9FbWJlZC50c3g/M2NiYyJdLCJuYW1lcyI6WyJFbWJlZCIsInVybCIsInByb3BzIiwiaW5jbHVkZXMiLCJjbGFzc05hbWUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT08sSUFBTUEsS0FBYjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsV0FDRSxrQkFBUztBQUNQLFVBQUlDLEdBQUcsR0FBRyxLQUFLQyxLQUFMLENBQVdELEdBQVgsSUFBa0IsRUFBNUI7QUFDQSxhQUNFLG1FQUNHQSxHQUFHLENBQUNFLFFBQUosQ0FBYSxnQkFBYixJQUNDLE1BQUMsd0RBQUQ7QUFDRSxXQUFHLEVBQUVGLEdBRFA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQURELEdBSUdBLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLGdCQUFiLElBQ0YsTUFBQyx3REFBRDtBQUNFLFdBQUcsRUFBRUYsR0FEUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBREUsR0FJQUEsR0FBRyxDQUFDRSxRQUFKLENBQWEsZUFBYixJQUNGLE1BQUMsdURBQUQ7QUFDRSxXQUFHLEVBQUVGLEdBRFA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQURFLEdBSUFBLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLGlCQUFiLElBQ0YsTUFBQywwREFBRDtBQUNFLFdBQUcsRUFBRUYsR0FEUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBREUsR0FJQUEsR0FBRyxDQUFDRSxRQUFKLENBQWEsVUFBYixJQUNGLE1BQUMsb0RBQUQ7QUFDRSxXQUFHLEVBQUVGLEdBRFA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQURFLEdBSUFBLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLGVBQWIsSUFDRixNQUFDLHdEQUFEO0FBQ0UsV0FBRyxFQUFFRixHQURQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFERSxHQUlBQSxHQUFHLENBQUNFLFFBQUosQ0FBYSxXQUFiLElBQ0YsTUFBQyxxREFBRDtBQUNFLFdBQUcsRUFBRUYsR0FEUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBREUsR0FJQUEsR0FBRyxDQUFDRSxRQUFKLENBQWEsb0JBQWIsSUFDRixNQUFDLDZEQUFEO0FBQ0UsV0FBRyxFQUFFRixHQURQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFERSxHQUlBQSxHQUFHLENBQUNFLFFBQUosQ0FBYSxZQUFiLElBQ0YsTUFBQyxxREFBRDtBQUNFLFdBQUcsRUFBRUYsR0FEUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBREUsR0FJQUEsR0FBRyxDQUFDRSxRQUFKLENBQWEsYUFBYixJQUNGLE1BQUMsdURBQUQ7QUFDRSxXQUFHLEVBQUVGLEdBRFA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQURFLEdBSUFBLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLFdBQWIsSUFDRixNQUFDLHFEQUFEO0FBQ0UsV0FBRyxFQUFFRixHQURQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFERSxHQUlBQSxHQUFHLENBQUNFLFFBQUosQ0FBYSxXQUFiLEtBQTZCRixHQUFHLENBQUNFLFFBQUosQ0FBYSxTQUFiLENBQTdCLElBQXdERixHQUFHLENBQUNFLFFBQUosQ0FBYSxTQUFiLENBQXhELElBQW1GRixHQUFHLENBQUNFLFFBQUosQ0FBYSwyQkFBYixDQUFuRixJQUFpSUYsR0FBRyxDQUFDRSxRQUFKLENBQWEsdUJBQWIsQ0FBakksSUFBMEtGLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLFNBQWIsQ0FBMUssSUFBcU1GLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLFNBQWIsQ0FBck0sSUFBaU9GLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLE1BQWIsQ0FBak8sSUFBeVBGLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLE1BQWIsQ0FBelAsSUFBaVJGLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLE9BQWIsQ0FBalIsSUFBMFNGLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLE1BQWIsQ0FBMVMsSUFBa1VGLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLE1BQWIsQ0FBbFUsSUFBMFZGLEdBQUcsQ0FBQ0UsUUFBSixDQUFhLFlBQWIsQ0FBMVYsR0FDRSxNQUFDLHFEQUFEO0FBQ0UsU0FBQyxFQUFFLE1BREw7QUFFRSxTQUFDLEVBQUUsTUFGTDtBQUdFLGlCQUFTLEVBQUUsS0FBS0QsS0FBTCxDQUFXRSxTQUFYLElBQXdCLGVBSHJDO0FBSUUsV0FBRyxFQUFHSCxHQUFHLElBQUksbURBSmY7QUFLRSxhQUFLLEVBQUMsT0FMUjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBREYsR0FTRixNQUFDLHVEQUFEO0FBQ0UsV0FBRyxFQUFFQSxHQURQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUF0REosQ0FERjtBQThERDtBQWpFSDs7QUFBQTtBQUFBLEVBQTJCSSwrQ0FBM0I7QUFvRWVMLG9FQUFmIiwiZmlsZSI6Ii4vY29tcG9uZW50cy9FbWJlZC50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB2YWxpZEltYWdlIH0gZnJvbSAnLi4vdXRpbHMnXG5pbXBvcnQgeyBJbWFnZSB9IGZyb20gJ0BjaGFrcmEtdWkvY29yZSdcbmltcG9ydCBTa2V0Y2hGYWIgZnJvbSAnLi9lbWJlZC9Ta2V0Y2hGYWInXG5pbXBvcnQgU2hhZGVyVG95IGZyb20gJy4vZW1iZWQvU2hhZGVyVG95J1xuaW1wb3J0IEJhbmRjYW1wIGZyb20gJy4vZW1iZWQvQmFuZGNhbXAnXG5pbXBvcnQgU291bmRDbG91ZCBmcm9tICcuL2VtYmVkL1NvdW5kQ2xvdWQnXG5pbXBvcnQgQ2x5cCBmcm9tICcuL2VtYmVkL0NseXAnXG5pbXBvcnQgU2tldGNodXAgZnJvbSAnLi9lbWJlZC9Ta2V0Y2h1cCdcbmltcG9ydCBDbGFyYSBmcm9tICcuL2VtYmVkL0NsYXJhJ1xuaW1wb3J0IE15TWluaUZhY3RvcnkgZnJvbSAnLi9lbWJlZC9NeU1pbmlGYWN0b3J5J1xuaW1wb3J0IHsgQXVkaXVzIH0gZnJvbSAnLi9lbWJlZC9BdWRpdXMnXG5pbXBvcnQgeyBHZW5lcmljIH0gZnJvbSAnLi9lbWJlZC9HZW5lcmljJ1xuaW1wb3J0IFlvdXR1YmUgZnJvbSAnLi9lbWJlZC9Zb3V0dWJlJ1xuaW1wb3J0IFZpbWVvIGZyb20gJy4vZW1iZWQvVmltZW8nXG5cbnR5cGUgRW1iZWRQcm9wcyA9IHtcbiAgdXJsOiBzdHJpbmcsXG4gIGNsYXNzTmFtZT86IHN0cmluZ1xufVxuXG5leHBvcnQgY2xhc3MgRW1iZWQgZXh0ZW5kcyBDb21wb25lbnQ8RW1iZWRQcm9wcz4ge1xuICByZW5kZXIoKSB7XG4gICAgbGV0IHVybCA9IHRoaXMucHJvcHMudXJsIHx8IFwiXCJcbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAge3VybC5pbmNsdWRlcygnc2tldGNoZmFiLmNvbS8nKSA/IChcbiAgICAgICAgICA8U2tldGNoRmFiXG4gICAgICAgICAgICB1cmw9e3VybH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogdXJsLmluY2x1ZGVzKCdzaGFkZXJ0b3kuY29tLycpID8gKFxuICAgICAgICAgIDxTaGFkZXJUb3lcbiAgICAgICAgICAgIHVybD17dXJsfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiB1cmwuaW5jbHVkZXMoJ2JhbmRjYW1wLmNvbS8nKSA/IChcbiAgICAgICAgICA8QmFuZGNhbXBcbiAgICAgICAgICAgIHVybD17dXJsfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiB1cmwuaW5jbHVkZXMoJ3NvdW5kY2xvdWQuY29tLycpID8gKFxuICAgICAgICAgIDxTb3VuZENsb3VkXG4gICAgICAgICAgICB1cmw9e3VybH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogdXJsLmluY2x1ZGVzKCdjbHlwLml0LycpID8gKFxuICAgICAgICAgIDxDbHlwXG4gICAgICAgICAgICB1cmw9e3VybH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogdXJsLmluY2x1ZGVzKCdza2V0Y2h1cC5jb20vJykgPyAoXG4gICAgICAgICAgPFNrZXRjaHVwXG4gICAgICAgICAgICB1cmw9e3VybH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogdXJsLmluY2x1ZGVzKCdjbGFyYS5pby8nKSA/IChcbiAgICAgICAgICA8Q2xhcmFcbiAgICAgICAgICAgIHVybD17dXJsfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiB1cmwuaW5jbHVkZXMoJ215bWluaWZhY3RvcnkuY29tLycpID8gKFxuICAgICAgICAgIDxNeU1pbmlGYWN0b3J5XG4gICAgICAgICAgICB1cmw9e3VybH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogdXJsLmluY2x1ZGVzKCdhdWRpdXMuY28vJykgPyAoXG4gICAgICAgICAgPEF1ZGl1c1xuICAgICAgICAgICAgdXJsPXt1cmx9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IHVybC5pbmNsdWRlcygneW91dHViZS5jb20nKSA/IChcbiAgICAgICAgICA8WW91dHViZVxuICAgICAgICAgICAgdXJsPXt1cmx9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IHVybC5pbmNsdWRlcygndmltZW8uY29tJykgPyAoXG4gICAgICAgICAgPFZpbWVvXG4gICAgICAgICAgICB1cmw9e3VybH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogdXJsLmluY2x1ZGVzKCcvZHluYW1pYy8nKSB8fCB1cmwuaW5jbHVkZXMoJ2lwZnM6Ly8nKSB8fCB1cmwuaW5jbHVkZXMoJ2Fyd2VhdmUnKSB8fCB1cmwuaW5jbHVkZXMoJ2h0dHBzOi8vczMuYW1hem9uYXdzLmNvbS8nKSB8fCAgdXJsLmluY2x1ZGVzKCdnb29nbGV1c2VyY29udGVudC5jb20nKSB8fCB1cmwuaW5jbHVkZXMoJ2lwZnMuaW8nKSB8fCB1cmwuaW5jbHVkZXMoJ2ZyYW1lZC8nKSB8fCAgdXJsLmluY2x1ZGVzKCcucG5nJykgfHwgdXJsLmluY2x1ZGVzKCcuanBnJykgfHwgdXJsLmluY2x1ZGVzKCcuanBlZycpIHx8IHVybC5pbmNsdWRlcygnLmdpZicpIHx8IHVybC5pbmNsdWRlcygnLnN2ZycpIHx8IHVybC5pbmNsdWRlcygnZGF0YTppbWFnZScpID8gKFxuICAgICAgICAgICAgICA8SW1hZ2VcbiAgICAgICAgICAgICAgICBwPXtcIjIwcHhcIn1cbiAgICAgICAgICAgICAgICBoPXtcIjEwMCVcIn1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lIHx8IFwiZC1ibG9jayB3LTEwMFwifVxuICAgICAgICAgICAgICAgIHNyYz17IHVybCB8fCAnaHR0cHM6Ly9jaXJjdWl0c29mdmFsdWUuY29tL3B1YmxpYy9jb3ZhbC1sb2dvLnBuZyd9XG4gICAgICAgICAgICAgICAgd2lkdGg9XCIyNTBweFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEdlbmVyaWNcbiAgICAgICAgICAgIHVybD17dXJsfVxuICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICA8Lz5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW1iZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Embed.tsx\n");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
false,

/***/ "./node_modules/assert/assert.js":
false,

/***/ "./node_modules/base64-js/index.js":
false,

/***/ "./node_modules/brorand/index.js":
false,

/***/ "./node_modules/cipher-base/index.js":
false,

/***/ "./node_modules/core-util-is/lib/util.js":
false,

/***/ "./node_modules/create-hash/browser.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/curve/base.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/curve/edwards.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/curve/index.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/curve/mont.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/curve/short.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/curves.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/ec/index.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/ec/key.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/ec/signature.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/eddsa/index.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/eddsa/key.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/eddsa/signature.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/precomputed/secp256k1.js":
false,

/***/ "./node_modules/elliptic/lib/elliptic/utils.js":
false,

/***/ "./node_modules/elliptic/package.json":
false,

/***/ "./node_modules/ethereum-bloom-filters/dist/index.js":
false,

/***/ "./node_modules/ethereum-bloom-filters/dist/utils.js":
false,

/***/ "./node_modules/ethereum-cryptography/hash-utils.js":
false,

/***/ "./node_modules/ethereum-cryptography/keccak.js":
false,

/***/ "./node_modules/ethereum-cryptography/random.js":
false,

/***/ "./node_modules/ethereum-cryptography/secp256k1.js":
false,

/***/ "./node_modules/ethjs-unit/lib/index.js":
false,

/***/ "./node_modules/ethjs-unit/node_modules/bn.js/lib/bn.js":
false,

/***/ "./node_modules/events/events.js":
false,

/***/ "./node_modules/hash-base/index.js":
false,

/***/ "./node_modules/hash-base/node_modules/safe-buffer/index.js":
false,

/***/ "./node_modules/hmac-drbg/lib/hmac-drbg.js":
false,

/***/ "./node_modules/ieee754/index.js":
false,

/***/ "./node_modules/is-hex-prefixed/src/index.js":
false,

/***/ "./node_modules/isarray/index.js":
false,

/***/ "./node_modules/keccak/js.js":
false,

/***/ "./node_modules/keccak/lib/api/index.js":
false,

/***/ "./node_modules/keccak/lib/api/keccak.js":
false,

/***/ "./node_modules/keccak/lib/api/shake.js":
false,

/***/ "./node_modules/keccak/lib/keccak-state-unroll.js":
false,

/***/ "./node_modules/keccak/lib/keccak.js":
false,

/***/ "./node_modules/md5.js/index.js":
false,

/***/ "./node_modules/minimalistic-crypto-utils/lib/utils.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/buffer/index.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/duplex-browser.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/lib/_stream_duplex.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/lib/_stream_passthrough.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/lib/_stream_readable.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/lib/_stream_transform.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/lib/_stream_writable.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/lib/internal/streams/BufferList.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/lib/internal/streams/destroy.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/lib/internal/streams/stream-browser.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/passthrough.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/readable-browser.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/transform.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/readable-stream/writable-browser.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/stream-browserify/index.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/util/node_modules/inherits/inherits_browser.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/util/support/isBufferBrowser.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/util/util.js":
false,

/***/ "./node_modules/number-to-bn/node_modules/bn.js/lib/bn.js":
false,

/***/ "./node_modules/number-to-bn/src/index.js":
false,

/***/ "./node_modules/process-nextick-args/index.js":
false,

/***/ "./node_modules/randombytes/browser.js":
false,

/***/ "./node_modules/readable-stream/errors-browser.js":
false,

/***/ "./node_modules/readable-stream/lib/_stream_duplex.js":
false,

/***/ "./node_modules/readable-stream/lib/_stream_passthrough.js":
false,

/***/ "./node_modules/readable-stream/lib/_stream_readable.js":
false,

/***/ "./node_modules/readable-stream/lib/_stream_transform.js":
false,

/***/ "./node_modules/readable-stream/lib/_stream_writable.js":
false,

/***/ "./node_modules/readable-stream/lib/internal/streams/async_iterator.js":
false,

/***/ "./node_modules/readable-stream/lib/internal/streams/buffer_list.js":
false,

/***/ "./node_modules/readable-stream/lib/internal/streams/destroy.js":
false,

/***/ "./node_modules/readable-stream/lib/internal/streams/end-of-stream.js":
false,

/***/ "./node_modules/readable-stream/lib/internal/streams/from-browser.js":
false,

/***/ "./node_modules/readable-stream/lib/internal/streams/pipeline.js":
false,

/***/ "./node_modules/readable-stream/lib/internal/streams/state.js":
false,

/***/ "./node_modules/readable-stream/lib/internal/streams/stream-browser.js":
false,

/***/ "./node_modules/readable-stream/readable-browser.js":
false,

/***/ "./node_modules/ripemd160/index.js":
false,

/***/ "./node_modules/rlp/dist.browser/index.js":
false,

/***/ "./node_modules/rlp/node_modules/bn.js/lib/bn.js":
false,

/***/ "./node_modules/safe-buffer/index.js":
false,

/***/ "./node_modules/secp256k1/elliptic.js":
false,

/***/ "./node_modules/secp256k1/lib/elliptic.js":
false,

/***/ "./node_modules/secp256k1/lib/index.js":
false,

/***/ "./node_modules/sha.js/hash.js":
false,

/***/ "./node_modules/sha.js/index.js":
false,

/***/ "./node_modules/sha.js/sha.js":
false,

/***/ "./node_modules/sha.js/sha1.js":
false,

/***/ "./node_modules/sha.js/sha224.js":
false,

/***/ "./node_modules/sha.js/sha256.js":
false,

/***/ "./node_modules/sha.js/sha384.js":
false,

/***/ "./node_modules/sha.js/sha512.js":
false,

/***/ "./node_modules/string_decoder/lib/string_decoder.js":
false,

/***/ "./node_modules/string_decoder/node_modules/safe-buffer/index.js":
false,

/***/ "./node_modules/strip-hex-prefix/src/index.js":
false,

/***/ "./node_modules/utf8/utf8.js":
false,

/***/ "./node_modules/util-deprecate/browser.js":
false,

/***/ "./node_modules/web3-utils/lib/index.js":
false,

/***/ "./node_modules/web3-utils/lib/soliditySha3.js":
false,

/***/ "./node_modules/web3-utils/lib/utils.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/dist.browser/account.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/dist.browser/address.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/dist.browser/bytes.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/dist.browser/constants.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/dist.browser/externals.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/dist.browser/hash.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/dist.browser/helpers.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/dist.browser/index.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/dist.browser/internal.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/dist.browser/object.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/dist.browser/signature.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/dist.browser/types.js":
false,

/***/ "./node_modules/web3-utils/node_modules/ethereumjs-util/node_modules/bn.js/lib/bn.js":
false,

/***/ "./utils.ts":
false,

/***/ 2:
false,

/***/ 3:
false,

/***/ 4:
false,

/***/ 5:
false,

/***/ 6:
false,

/***/ 7:
false,

/***/ 8:
false

})