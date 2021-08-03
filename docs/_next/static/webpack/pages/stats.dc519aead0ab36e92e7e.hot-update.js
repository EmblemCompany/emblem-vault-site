webpackHotUpdate_N_E("pages/stats",{

/***/ "./abi/coval.json":
false,

/***/ "./abi/emblem.json":
false,

/***/ "./abi/handler.json":
false,

/***/ "./abi/nftrade.json":
false,

/***/ "./components/Stats.tsx":
/*!******************************!*\
  !*** ./components/Stats.tsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Stats; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/core */ \"./node_modules/@chakra-ui/core/dist/es/index.js\");\n/* harmony import */ var react_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loader */ \"./node_modules/react-loader/lib/react-loader.js\");\n/* harmony import */ var react_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loader__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Refreshing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Refreshing */ \"./components/Refreshing.tsx\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/dist/client/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @web3-react/core */ \"./node_modules/@web3-react/core/dist/core.esm.js\");\nvar _jsxFileName = \"/Users/shannoncode/repo/Emblem.Currentwork/emblem-vault-site/components/Stats.tsx\",\n    _s = $RefreshSig$();\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\n\n\n\n\nfunction Stats() {\n  _s();\n\n  var _useRouter = Object(next_router__WEBPACK_IMPORTED_MODULE_4__[\"useRouter\"])(),\n      query = _useRouter.query;\n\n  var _useWeb3React = Object(_web3_react_core__WEBPACK_IMPORTED_MODULE_5__[\"useWeb3React\"])(),\n      account = _useWeb3React.account,\n      chainId = _useWeb3React.chainId; // const [vaults, setVaults] = useState([])\n\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])({\n    loaded: false\n  }),\n      state = _useState[0],\n      setState = _useState[1];\n\n  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(false),\n      loadingApi = _useState2[0],\n      setLoadingApi = _useState2[1]; // const [approving, setApproving] = useState(false)\n  // const [transfering, setTransfering] = useState(false)\n  // const [balance, setBalance] = useState(null)\n  // const [address, setAddress] = useState(query.address)\n  // const [experimental, setExperimental] = useState(query.experimental)\n  // const [decimals, setDecimals] = useState(null)\n  // const [allowance, setAllowance] = useState(null)\n  // const [transferChain, setTransferChain] = useState(0)\n  // const [covalApprovedFor, setIsCovalApproved] = useState(0)\n  // const [hash, setHash] = useState(null)\n  // const [swapAmount, setSwapAmount] = useState(0)\n  // const [isInvalid, setIsInvalid] = useState(false)\n  // const [transferChainChanged, setTransferChainChanged] = useState(true)\n  // const handlerContract = useContract(contractAddresses.vaultHandler[chainId], contractAddresses.vaultHandlerAbi, true)\n  // const covalContract = useContract(contractAddresses.coval[chainId], contractAddresses.covalAbi, true)\n\n\n  // const transferToChain = async () => {\n  //   setTransfering(true)\n  //   ;(handlerContract as Contract)\n  //   .transferToChain(transferChain, swapAmount.toString())\n  //   .then(({ hash }: { hash: string }) => {\n  //     setHash(hash)\n  //   })\n  //   .catch((error: ErrorWithCode) => {\n  //     if (error?.code == 4001) {\n  //       setTransfering(false)\n  //     }\n  //   })\n  // }\n  // const getContractStates = async () => {\n  //   setHash(null)\n  //   setDecimals(await covalContract.decimals())\n  //   setAllowance(\n  //     await covalContract\n  //       .allowance(account, contractAddresses.vaultHandler[chainId])\n  //       .then((balance: { toString: () => string }) => balance.toString())\n  //   )\n  //   setBalance(await covalContract.balanceOf(account).then((balance: { toString: () => string }) => balance.toString()))\n  //   if (Number(allowance) >= Number(0)) {      \n  //     setIsCovalApproved(allowance)\n  //   }\n  //   setState({ loaded: true })\n  // }\n  // const approveCovalFlow = () => {\n  //   setApproving(true)\n  //   ;(covalContract as Contract)\n  //     .approve(contractAddresses.vaultHandler[chainId], 10000000 * Math.pow(10, +decimals) )\n  //     .then(({ hash }: { hash: string }) => {\n  //       setHash(hash)\n  //     })\n  //     .catch((error: ErrorWithCode) => {\n  //       if (error?.code == 4001) {\n  //         setApproving(false)\n  //       }\n  //     })\n  // }\n  // const getTransferLogs = async () =>{\n  //   console.log(\"getting logs\")\n  //   fetch(EMBLEM_API + '/web3/transfersOut', {\n  //     method: 'GET',\n  //     headers: {\n  //       'Content-Type': 'application/json',\n  //       service: 'evmetadata',\n  //       chainid: chainId.toString()\n  //     }\n  //   }).then(async function (response) {\n  //     console.log(\"doing transfers\")\n  //     fetch(EMBLEM_API + '/doTransfers', {\n  //       method: 'GET',\n  //       headers: {\n  //         'Content-Type': 'application/json',\n  //         service: 'evmetadata',\n  //         chainid: chainId.toString()\n  //       }\n  //     }).then(async function (response) {\n  //       getContractStates()\n  //     })\n  //   })\n  // }\n  // function SwapText({ children, ...rest }: BoxProps): JSX.Element {\n  //   return (\n  //     <Text fontSize=\"2xl\" lineHeight={1} py=\"0.3rem\" {...rest}>\n  //       {children}\n  //     </Text>\n  //   )\n  // }\n  // const [acct, setAcct] = useState('')\n  // useEffect(() => {\n  //   if (account && acct != account) {\n  //     setAcct(account)\n  //     setState({ loaded: false })\n  //     getContractStates()\n  //   }\n  // }, [account, acct])\n  // const [chain, setChain] = useState(chainId)\n  // useEffect(() => {\n  //   if (chainId && chain != chainId) {\n  //     setChain(chainId)\n  //     setState({ loaded: false })\n  //     getContractStates()\n  //   }\n  // }, [chainId, chain])\n  // useEffect(() => {\n  //   account && chainId ? setState({ loaded: true }) : null\n  // }, [])\n  return __jsx(react_loader__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    loaded: state.loaded,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 142,\n      columnNumber: 5\n    }\n  }, loadingApi ? __jsx(_Refreshing__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 143,\n      columnNumber: 21\n    }\n  }) : '', __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Flex\"], {\n    w: \"100%\",\n    justify: \"center\",\n    mt: 10,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 145,\n      columnNumber: 7\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    align: \"center\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 146,\n      columnNumber: 9\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Text\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 147,\n      columnNumber: 11\n    }\n  }, \"Statistics go here\"))));\n}\n\n_s(Stats, \"aLEtzURr8cbTKaVO8K1ndjTo8bo=\", false, function () {\n  return [next_router__WEBPACK_IMPORTED_MODULE_4__[\"useRouter\"], _web3_react_core__WEBPACK_IMPORTED_MODULE_5__[\"useWeb3React\"]];\n});\n\n_c = Stats;\n\nvar _c;\n\n$RefreshReg$(_c, \"Stats\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9TdGF0cy50c3g/MGRmYyJdLCJuYW1lcyI6WyJTdGF0cyIsInVzZVJvdXRlciIsInF1ZXJ5IiwidXNlV2ViM1JlYWN0IiwiYWNjb3VudCIsImNoYWluSWQiLCJ1c2VTdGF0ZSIsImxvYWRlZCIsInN0YXRlIiwic2V0U3RhdGUiLCJsb2FkaW5nQXBpIiwic2V0TG9hZGluZ0FwaSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVVlLFNBQVNBLEtBQVQsR0FBaUI7QUFBQTs7QUFBQSxtQkFDWkMsNkRBQVMsRUFERztBQUFBLE1BQ3RCQyxLQURzQixjQUN0QkEsS0FEc0I7O0FBQUEsc0JBRURDLHFFQUFZLEVBRlg7QUFBQSxNQUV0QkMsT0FGc0IsaUJBRXRCQSxPQUZzQjtBQUFBLE1BRWJDLE9BRmEsaUJBRWJBLE9BRmEsRUFHOUI7OztBQUg4QixrQkFJSkMsc0RBQVEsQ0FBQztBQUFFQyxVQUFNLEVBQUU7QUFBVixHQUFELENBSko7QUFBQSxNQUl2QkMsS0FKdUI7QUFBQSxNQUloQkMsUUFKZ0I7O0FBQUEsbUJBS01ILHNEQUFRLENBQUMsS0FBRCxDQUxkO0FBQUEsTUFLdkJJLFVBTHVCO0FBQUEsTUFLWEMsYUFMVyxrQkFNOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSUEsU0FDRSxNQUFDLG1EQUFEO0FBQVEsVUFBTSxFQUFFSCxLQUFLLENBQUNELE1BQXRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDR0csVUFBVSxHQUFHLE1BQUMsbURBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUFILEdBQW9CLEVBRGpDLEVBR0UsTUFBQyxvREFBRDtBQUFNLEtBQUMsRUFBQyxNQUFSO0FBQWUsV0FBTyxFQUFDLFFBQXZCO0FBQWdDLE1BQUUsRUFBRSxFQUFwQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQ0UsTUFBQyxxREFBRDtBQUFPLFNBQUssRUFBQyxRQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FDRSxNQUFDLG9EQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMEJBREYsQ0FERixDQUhGLENBREY7QUFZRDs7R0F6SXVCVixLO1VBQ0pDLHFELEVBQ1dFLDZEOzs7S0FGUEgsSyIsImZpbGUiOiIuL2NvbXBvbmVudHMvU3RhdHMudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm94LCBGbGV4LCBUZXh0LCBMaW5rLCBJbWFnZSwgU3RhY2ssIEJ1dHRvbiwgQm94UHJvcHMsIElucHV0LCBTZWxlY3QsIFRhYnMsIFRhYiwgVGFiTGlzdCwgVGFiUGFuZWxzLCBUYWJQYW5lbCB9IGZyb20gJ0BjaGFrcmEtdWkvY29yZSdcbmltcG9ydCBMb2FkZXIgZnJvbSAncmVhY3QtbG9hZGVyJ1xuaW1wb3J0IFJlZnJlc2hpbmcgZnJvbSAnLi9SZWZyZXNoaW5nJ1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInXG5pbXBvcnQgeyB1c2VXZWIzUmVhY3QgfSBmcm9tICdAd2ViMy1yZWFjdC9jb3JlJ1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgdmFsaWRJbWFnZSwgdG9Db250cmFjdFZhbHVlLCBDSEFJTl9JRF9OQU1FUyB9IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgdXNlQ29udHJhY3QgfSBmcm9tICcuLi9ob29rcydcbmltcG9ydCB7IENvbnRyYWN0IH0gZnJvbSAnQGV0aGVyc3Byb2plY3QvY29udHJhY3RzJ1xuaW1wb3J0IHsgRU1CTEVNX0FQSSwgY29udHJhY3RBZGRyZXNzZXMgfSBmcm9tICcuLi9jb25zdGFudHMnXG5pbXBvcnQgeyBUcmFuc2FjdGlvblRvYXN0IH0gZnJvbSAnLi9UcmFuc2FjdGlvblRvYXN0J1xuaW1wb3J0IHsgcGFyc2VVbml0cyB9IGZyb20gJ0BldGhlcnNwcm9qZWN0L3VuaXRzJ1xuaW1wb3J0IEJyaWRnZURlcG9zaXRzIGZyb20gJy4vcGFydGlhbHMvQnJpZGdlRGVwb3NpdHMnXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3RhdHMoKSB7XG4gIGNvbnN0IHsgcXVlcnkgfSA9IHVzZVJvdXRlcigpXG4gIGNvbnN0IHsgYWNjb3VudCwgY2hhaW5JZCB9ID0gdXNlV2ViM1JlYWN0KClcbiAgLy8gY29uc3QgW3ZhdWx0cywgc2V0VmF1bHRzXSA9IHVzZVN0YXRlKFtdKVxuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlKHsgbG9hZGVkOiBmYWxzZSB9KVxuICBjb25zdCBbbG9hZGluZ0FwaSwgc2V0TG9hZGluZ0FwaV0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgLy8gY29uc3QgW2FwcHJvdmluZywgc2V0QXBwcm92aW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAvLyBjb25zdCBbdHJhbnNmZXJpbmcsIHNldFRyYW5zZmVyaW5nXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAvLyBjb25zdCBbYmFsYW5jZSwgc2V0QmFsYW5jZV0gPSB1c2VTdGF0ZShudWxsKVxuICAvLyBjb25zdCBbYWRkcmVzcywgc2V0QWRkcmVzc10gPSB1c2VTdGF0ZShxdWVyeS5hZGRyZXNzKVxuICAvLyBjb25zdCBbZXhwZXJpbWVudGFsLCBzZXRFeHBlcmltZW50YWxdID0gdXNlU3RhdGUocXVlcnkuZXhwZXJpbWVudGFsKVxuICAvLyBjb25zdCBbZGVjaW1hbHMsIHNldERlY2ltYWxzXSA9IHVzZVN0YXRlKG51bGwpXG4gIC8vIGNvbnN0IFthbGxvd2FuY2UsIHNldEFsbG93YW5jZV0gPSB1c2VTdGF0ZShudWxsKVxuICAvLyBjb25zdCBbdHJhbnNmZXJDaGFpbiwgc2V0VHJhbnNmZXJDaGFpbl0gPSB1c2VTdGF0ZSgwKVxuICAvLyBjb25zdCBbY292YWxBcHByb3ZlZEZvciwgc2V0SXNDb3ZhbEFwcHJvdmVkXSA9IHVzZVN0YXRlKDApXG4gIC8vIGNvbnN0IFtoYXNoLCBzZXRIYXNoXSA9IHVzZVN0YXRlKG51bGwpXG4gIC8vIGNvbnN0IFtzd2FwQW1vdW50LCBzZXRTd2FwQW1vdW50XSA9IHVzZVN0YXRlKDApXG4gIC8vIGNvbnN0IFtpc0ludmFsaWQsIHNldElzSW52YWxpZF0gPSB1c2VTdGF0ZShmYWxzZSlcbiAgLy8gY29uc3QgW3RyYW5zZmVyQ2hhaW5DaGFuZ2VkLCBzZXRUcmFuc2ZlckNoYWluQ2hhbmdlZF0gPSB1c2VTdGF0ZSh0cnVlKVxuICAvLyBjb25zdCBoYW5kbGVyQ29udHJhY3QgPSB1c2VDb250cmFjdChjb250cmFjdEFkZHJlc3Nlcy52YXVsdEhhbmRsZXJbY2hhaW5JZF0sIGNvbnRyYWN0QWRkcmVzc2VzLnZhdWx0SGFuZGxlckFiaSwgdHJ1ZSlcbiAgLy8gY29uc3QgY292YWxDb250cmFjdCA9IHVzZUNvbnRyYWN0KGNvbnRyYWN0QWRkcmVzc2VzLmNvdmFsW2NoYWluSWRdLCBjb250cmFjdEFkZHJlc3Nlcy5jb3ZhbEFiaSwgdHJ1ZSlcblxuICBpbnRlcmZhY2UgRXJyb3JXaXRoQ29kZSBleHRlbmRzIEVycm9yIHtcbiAgICBjb2RlPzogbnVtYmVyXG4gIH1cblxuICAvLyBjb25zdCB0cmFuc2ZlclRvQ2hhaW4gPSBhc3luYyAoKSA9PiB7XG4gIC8vICAgc2V0VHJhbnNmZXJpbmcodHJ1ZSlcbiAgLy8gICA7KGhhbmRsZXJDb250cmFjdCBhcyBDb250cmFjdClcbiAgLy8gICAudHJhbnNmZXJUb0NoYWluKHRyYW5zZmVyQ2hhaW4sIHN3YXBBbW91bnQudG9TdHJpbmcoKSlcbiAgLy8gICAudGhlbigoeyBoYXNoIH06IHsgaGFzaDogc3RyaW5nIH0pID0+IHtcbiAgLy8gICAgIHNldEhhc2goaGFzaClcbiAgLy8gICB9KVxuICAvLyAgIC5jYXRjaCgoZXJyb3I6IEVycm9yV2l0aENvZGUpID0+IHtcbiAgLy8gICAgIGlmIChlcnJvcj8uY29kZSA9PSA0MDAxKSB7XG4gIC8vICAgICAgIHNldFRyYW5zZmVyaW5nKGZhbHNlKVxuICAvLyAgICAgfVxuICAvLyAgIH0pXG4gIC8vIH1cblxuICAvLyBjb25zdCBnZXRDb250cmFjdFN0YXRlcyA9IGFzeW5jICgpID0+IHtcbiAgLy8gICBzZXRIYXNoKG51bGwpXG4gIC8vICAgc2V0RGVjaW1hbHMoYXdhaXQgY292YWxDb250cmFjdC5kZWNpbWFscygpKVxuICAvLyAgIHNldEFsbG93YW5jZShcbiAgLy8gICAgIGF3YWl0IGNvdmFsQ29udHJhY3RcbiAgLy8gICAgICAgLmFsbG93YW5jZShhY2NvdW50LCBjb250cmFjdEFkZHJlc3Nlcy52YXVsdEhhbmRsZXJbY2hhaW5JZF0pXG4gIC8vICAgICAgIC50aGVuKChiYWxhbmNlOiB7IHRvU3RyaW5nOiAoKSA9PiBzdHJpbmcgfSkgPT4gYmFsYW5jZS50b1N0cmluZygpKVxuICAvLyAgIClcbiAgLy8gICBzZXRCYWxhbmNlKGF3YWl0IGNvdmFsQ29udHJhY3QuYmFsYW5jZU9mKGFjY291bnQpLnRoZW4oKGJhbGFuY2U6IHsgdG9TdHJpbmc6ICgpID0+IHN0cmluZyB9KSA9PiBiYWxhbmNlLnRvU3RyaW5nKCkpKVxuICAvLyAgIGlmIChOdW1iZXIoYWxsb3dhbmNlKSA+PSBOdW1iZXIoMCkpIHsgICAgICBcbiAgLy8gICAgIHNldElzQ292YWxBcHByb3ZlZChhbGxvd2FuY2UpXG4gIC8vICAgfVxuICAvLyAgIHNldFN0YXRlKHsgbG9hZGVkOiB0cnVlIH0pXG4gIC8vIH1cblxuICAvLyBjb25zdCBhcHByb3ZlQ292YWxGbG93ID0gKCkgPT4ge1xuICAvLyAgIHNldEFwcHJvdmluZyh0cnVlKVxuICAvLyAgIDsoY292YWxDb250cmFjdCBhcyBDb250cmFjdClcbiAgLy8gICAgIC5hcHByb3ZlKGNvbnRyYWN0QWRkcmVzc2VzLnZhdWx0SGFuZGxlcltjaGFpbklkXSwgMTAwMDAwMDAgKiBNYXRoLnBvdygxMCwgK2RlY2ltYWxzKSApXG4gIC8vICAgICAudGhlbigoeyBoYXNoIH06IHsgaGFzaDogc3RyaW5nIH0pID0+IHtcbiAgLy8gICAgICAgc2V0SGFzaChoYXNoKVxuICAvLyAgICAgfSlcbiAgLy8gICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yV2l0aENvZGUpID0+IHtcbiAgLy8gICAgICAgaWYgKGVycm9yPy5jb2RlID09IDQwMDEpIHtcbiAgLy8gICAgICAgICBzZXRBcHByb3ZpbmcoZmFsc2UpXG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0pXG4gIC8vIH1cblxuICAvLyBjb25zdCBnZXRUcmFuc2ZlckxvZ3MgPSBhc3luYyAoKSA9PntcbiAgLy8gICBjb25zb2xlLmxvZyhcImdldHRpbmcgbG9nc1wiKVxuICAvLyAgIGZldGNoKEVNQkxFTV9BUEkgKyAnL3dlYjMvdHJhbnNmZXJzT3V0Jywge1xuICAvLyAgICAgbWV0aG9kOiAnR0VUJyxcbiAgLy8gICAgIGhlYWRlcnM6IHtcbiAgLy8gICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgLy8gICAgICAgc2VydmljZTogJ2V2bWV0YWRhdGEnLFxuICAvLyAgICAgICBjaGFpbmlkOiBjaGFpbklkLnRvU3RyaW5nKClcbiAgLy8gICAgIH1cbiAgLy8gICB9KS50aGVuKGFzeW5jIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAvLyAgICAgY29uc29sZS5sb2coXCJkb2luZyB0cmFuc2ZlcnNcIilcbiAgLy8gICAgIGZldGNoKEVNQkxFTV9BUEkgKyAnL2RvVHJhbnNmZXJzJywge1xuICAvLyAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAvLyAgICAgICBoZWFkZXJzOiB7XG4gIC8vICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgLy8gICAgICAgICBzZXJ2aWNlOiAnZXZtZXRhZGF0YScsXG4gIC8vICAgICAgICAgY2hhaW5pZDogY2hhaW5JZC50b1N0cmluZygpXG4gIC8vICAgICAgIH1cbiAgLy8gICAgIH0pLnRoZW4oYXN5bmMgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gIC8vICAgICAgIGdldENvbnRyYWN0U3RhdGVzKClcbiAgLy8gICAgIH0pXG4gIC8vICAgfSlcbiAgLy8gfVxuXG4gIC8vIGZ1bmN0aW9uIFN3YXBUZXh0KHsgY2hpbGRyZW4sIC4uLnJlc3QgfTogQm94UHJvcHMpOiBKU1guRWxlbWVudCB7XG4gIC8vICAgcmV0dXJuIChcbiAgLy8gICAgIDxUZXh0IGZvbnRTaXplPVwiMnhsXCIgbGluZUhlaWdodD17MX0gcHk9XCIwLjNyZW1cIiB7Li4ucmVzdH0+XG4gIC8vICAgICAgIHtjaGlsZHJlbn1cbiAgLy8gICAgIDwvVGV4dD5cbiAgLy8gICApXG4gIC8vIH1cblxuICAvLyBjb25zdCBbYWNjdCwgc2V0QWNjdF0gPSB1c2VTdGF0ZSgnJylcbiAgLy8gdXNlRWZmZWN0KCgpID0+IHtcbiAgLy8gICBpZiAoYWNjb3VudCAmJiBhY2N0ICE9IGFjY291bnQpIHtcbiAgLy8gICAgIHNldEFjY3QoYWNjb3VudClcbiAgLy8gICAgIHNldFN0YXRlKHsgbG9hZGVkOiBmYWxzZSB9KVxuICAvLyAgICAgZ2V0Q29udHJhY3RTdGF0ZXMoKVxuICAvLyAgIH1cbiAgLy8gfSwgW2FjY291bnQsIGFjY3RdKVxuXG4gIC8vIGNvbnN0IFtjaGFpbiwgc2V0Q2hhaW5dID0gdXNlU3RhdGUoY2hhaW5JZClcbiAgLy8gdXNlRWZmZWN0KCgpID0+IHtcbiAgLy8gICBpZiAoY2hhaW5JZCAmJiBjaGFpbiAhPSBjaGFpbklkKSB7XG4gIC8vICAgICBzZXRDaGFpbihjaGFpbklkKVxuICAvLyAgICAgc2V0U3RhdGUoeyBsb2FkZWQ6IGZhbHNlIH0pXG4gIC8vICAgICBnZXRDb250cmFjdFN0YXRlcygpXG4gIC8vICAgfVxuICAvLyB9LCBbY2hhaW5JZCwgY2hhaW5dKVxuXG4gIC8vIHVzZUVmZmVjdCgoKSA9PiB7XG4gIC8vICAgYWNjb3VudCAmJiBjaGFpbklkID8gc2V0U3RhdGUoeyBsb2FkZWQ6IHRydWUgfSkgOiBudWxsXG4gIC8vIH0sIFtdKVxuXG5cblxuICByZXR1cm4gKFxuICAgIDxMb2FkZXIgbG9hZGVkPXtzdGF0ZS5sb2FkZWR9PlxuICAgICAge2xvYWRpbmdBcGkgPyA8UmVmcmVzaGluZyAvPiA6ICcnfVxuXG4gICAgICA8RmxleCB3PVwiMTAwJVwiIGp1c3RpZnk9XCJjZW50ZXJcIiBtdD17MTB9PlxuICAgICAgICA8U3RhY2sgYWxpZ249XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dD5TdGF0aXN0aWNzIGdvIGhlcmU8L1RleHQ+XG4gICAgICAgIDwvU3RhY2s+XG4gICAgICA8L0ZsZXg+XG4gICAgIFxuICAgIDwvTG9hZGVyPlxuICApXG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Stats.tsx\n");

/***/ }),

/***/ "./components/TransactionToast.tsx":
false,

/***/ "./components/partials/BridgeDeposits.tsx":
false,

/***/ "./connectors.ts":
false,

/***/ "./constants.ts":
false,

/***/ "./context.tsx":
false,

/***/ "./data.ts":
false,

/***/ "./hooks.ts":
false,

/***/ "./node_modules/@0x/assert/lib/src/index.js":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/address_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/asset_pairs_request_opts_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/block_param_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/block_range_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/call_data_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/ec_signature_parameter_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/ec_signature_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/eip712_typed_data_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/hex_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/index_filter_values_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/js_number_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/number_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/order_cancel_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/order_config_request_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/order_fill_or_kill_requests_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/order_fill_requests_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/order_hash_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/order_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/orderbook_request_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/orders_request_opts_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/orders_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/paged_request_opts_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/paginated_collection_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_asset_data_pairs_response_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_asset_data_pairs_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_asset_data_trade_info_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_error_response_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_fee_recipients_response_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_order_config_payload_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_order_config_response_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_order_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_orderbook_response_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_orders_channel_subscribe_payload_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_orders_channel_subscribe_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_orders_channel_update_response_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_orders_response_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/relayer_api_orders_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/request_opts_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/signed_order_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/signed_orders_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/token_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/tx_data_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/whole_number_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/schemas/zero_ex_transaction_schema.json":
false,

/***/ "./node_modules/@0x/json-schemas/lib/src/index.js":
false,

/***/ "./node_modules/@0x/json-schemas/lib/src/schema_validator.js":
false,

/***/ "./node_modules/@0x/json-schemas/lib/src/schemas.js":
false,

/***/ "./node_modules/@0x/subproviders/lib/src/subproviders/rpc_subprovider.js":
false,

/***/ "./node_modules/@0x/subproviders/lib/src/subproviders/subprovider.js":
false,

/***/ "./node_modules/@0x/types/lib/index.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_decoder.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/abstract_data_types/data_type.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/abstract_data_types/types/blob.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/abstract_data_types/types/pointer.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/abstract_data_types/types/set.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/calldata/blocks/blob.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/calldata/blocks/pointer.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/calldata/blocks/set.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/calldata/calldata.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/calldata/calldata_block.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/calldata/iterator.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/calldata/raw_calldata.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/evm_data_type_factory.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/evm_data_types/address.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/evm_data_types/array.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/evm_data_types/bool.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/evm_data_types/dynamic_bytes.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/evm_data_types/int.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/evm_data_types/method.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/evm_data_types/pointer.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/evm_data_types/static_bytes.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/evm_data_types/string.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/evm_data_types/tuple.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/evm_data_types/uint.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/index.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/utils/constants.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/utils/math.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/utils/queue.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_encoder/utils/signature_parser.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/abi_utils.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/address_utils.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/class_utils.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/configured_bignumber.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/constants.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/delete_nested_property.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/error_utils.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/fetch_async.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/index.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/interval_utils.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/log_utils.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/promisify.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/provider_utils.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/random.js":
false,

/***/ "./node_modules/@0x/utils/lib/src/sign_typed_data_utils.js":
false,

/***/ "./node_modules/@0x/utils/node_modules/js-sha3/src/sha3.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
false,

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/abi-coder.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/abstract-coder.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/address.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/anonymous.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/array.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/boolean.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/bytes.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/fixed-bytes.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/null.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/number.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/string.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/coders/tuple.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/fragments.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/abi/lib.esm/interface.js":
false,

/***/ "./node_modules/@ethersproject/abstract-provider/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/abstract-provider/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/abstract-signer/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/abstract-signer/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/address/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/address/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/base64/lib/browser.js":
false,

/***/ "./node_modules/@ethersproject/bignumber/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/bignumber/lib.esm/bignumber.js":
false,

/***/ "./node_modules/@ethersproject/bignumber/lib.esm/fixednumber.js":
false,

/***/ "./node_modules/@ethersproject/bignumber/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/constants/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/contracts/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/contracts/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/hash/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/hash/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/networks/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/networks/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/properties/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/properties/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/alchemy-provider.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/base-provider.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/cloudflare-provider.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/etherscan-provider.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/fallback-provider.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/formatter.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/infura-provider.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/ipc-provider.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/json-rpc-provider.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/nodesmith-provider.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/url-json-rpc-provider.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/web3-provider.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib.esm/websocket-provider.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib/_version.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib/browser-net.js":
false,

/***/ "./node_modules/@ethersproject/providers/lib/browser-ws.js":
false,

/***/ "./node_modules/@ethersproject/random/lib/_version.js":
false,

/***/ "./node_modules/@ethersproject/random/lib/browser.js":
false,

/***/ "./node_modules/@ethersproject/random/lib/shuffle.js":
false,

/***/ "./node_modules/@ethersproject/rlp/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/rlp/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/sha2/lib/_version.js":
false,

/***/ "./node_modules/@ethersproject/sha2/lib/browser.js":
false,

/***/ "./node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash.js":
false,

/***/ "./node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/common.js":
false,

/***/ "./node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/hmac.js":
false,

/***/ "./node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/ripemd.js":
false,

/***/ "./node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha.js":
false,

/***/ "./node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/1.js":
false,

/***/ "./node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/224.js":
false,

/***/ "./node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/256.js":
false,

/***/ "./node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/384.js":
false,

/***/ "./node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/512.js":
false,

/***/ "./node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/sha/common.js":
false,

/***/ "./node_modules/@ethersproject/sha2/node_modules/hash.js/lib/hash/utils.js":
false,

/***/ "./node_modules/@ethersproject/signing-key/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/signing-key/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/solidity/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/strings/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/strings/lib.esm/bytes32.js":
false,

/***/ "./node_modules/@ethersproject/strings/lib.esm/idna.js":
false,

/***/ "./node_modules/@ethersproject/strings/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/strings/lib.esm/utf8.js":
false,

/***/ "./node_modules/@ethersproject/transactions/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/transactions/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/units/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/units/lib.esm/index.js":
false,

/***/ "./node_modules/@ethersproject/web/lib.esm/_version.js":
false,

/***/ "./node_modules/@ethersproject/web/lib.esm/geturl.js":
false,

/***/ "./node_modules/@ethersproject/web/lib.esm/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Paper/Paper.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Paper/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Table/Table.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Table/TableContext.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Table/Tablelvl2Context.js":
false,

/***/ "./node_modules/@material-ui/core/esm/Table/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TableBody/TableBody.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TableBody/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TableCell/TableCell.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TableCell/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TableContainer/TableContainer.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TableContainer/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TableHead/TableHead.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TableHead/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TableRow/TableRow.js":
false,

/***/ "./node_modules/@material-ui/core/esm/TableRow/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/colors/blue.js":
false,

/***/ "./node_modules/@material-ui/core/esm/colors/common.js":
false,

/***/ "./node_modules/@material-ui/core/esm/colors/green.js":
false,

/***/ "./node_modules/@material-ui/core/esm/colors/grey.js":
false,

/***/ "./node_modules/@material-ui/core/esm/colors/indigo.js":
false,

/***/ "./node_modules/@material-ui/core/esm/colors/orange.js":
false,

/***/ "./node_modules/@material-ui/core/esm/colors/pink.js":
false,

/***/ "./node_modules/@material-ui/core/esm/colors/red.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/colorManipulator.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/createBreakpoints.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/createMixins.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/createMuiStrictModeTheme.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/createMuiTheme.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/createPalette.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/createSpacing.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/createStyles.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/createTypography.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/cssUtils.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/defaultTheme.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/index.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/makeStyles.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/responsiveFontSizes.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/shadows.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/shape.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/styled.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/transitions.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/useTheme.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/withStyles.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/withTheme.js":
false,

/***/ "./node_modules/@material-ui/core/esm/styles/zIndex.js":
false,

/***/ "./node_modules/@material-ui/core/esm/utils/capitalize.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/ServerStyleSheets/ServerStyleSheets.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/ServerStyleSheets/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/StylesProvider/StylesProvider.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/StylesProvider/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/ThemeProvider/ThemeProvider.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/ThemeProvider/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/ThemeProvider/nested.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/createGenerateClassName/createGenerateClassName.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/createGenerateClassName/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/createStyles/createStyles.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/createStyles/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/getStylesCreator/getStylesCreator.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/getStylesCreator/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/getStylesCreator/noopTheme.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/getThemeProps/getThemeProps.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/getThemeProps/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/jssPreset/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/jssPreset/jssPreset.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/makeStyles/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/makeStyles/indexCounter.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/makeStyles/makeStyles.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/makeStyles/multiKeyStore.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/mergeClasses/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/mergeClasses/mergeClasses.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/styled/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/styled/styled.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/useTheme/ThemeContext.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/useTheme/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/useTheme/useTheme.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/withStyles/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/withStyles/withStyles.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/withTheme/index.js":
false,

/***/ "./node_modules/@material-ui/styles/esm/withTheme/withTheme.js":
false,

/***/ "./node_modules/@material-ui/system/esm/borders.js":
false,

/***/ "./node_modules/@material-ui/system/esm/breakpoints.js":
false,

/***/ "./node_modules/@material-ui/system/esm/compose.js":
false,

/***/ "./node_modules/@material-ui/system/esm/css.js":
false,

/***/ "./node_modules/@material-ui/system/esm/display.js":
false,

/***/ "./node_modules/@material-ui/system/esm/flexbox.js":
false,

/***/ "./node_modules/@material-ui/system/esm/grid.js":
false,

/***/ "./node_modules/@material-ui/system/esm/index.js":
false,

/***/ "./node_modules/@material-ui/system/esm/memoize.js":
false,

/***/ "./node_modules/@material-ui/system/esm/merge.js":
false,

/***/ "./node_modules/@material-ui/system/esm/palette.js":
false,

/***/ "./node_modules/@material-ui/system/esm/positions.js":
false,

/***/ "./node_modules/@material-ui/system/esm/responsivePropType.js":
false,

/***/ "./node_modules/@material-ui/system/esm/shadows.js":
false,

/***/ "./node_modules/@material-ui/system/esm/sizing.js":
false,

/***/ "./node_modules/@material-ui/system/esm/spacing.js":
false,

/***/ "./node_modules/@material-ui/system/esm/style.js":
false,

/***/ "./node_modules/@material-ui/system/esm/typography.js":
false,

/***/ "./node_modules/@material-ui/utils/esm/HTMLElementType.js":
false,

/***/ "./node_modules/@material-ui/utils/esm/chainPropTypes.js":
false,

/***/ "./node_modules/@material-ui/utils/esm/deepmerge.js":
false,

/***/ "./node_modules/@material-ui/utils/esm/elementAcceptingRef.js":
false,

/***/ "./node_modules/@material-ui/utils/esm/elementTypeAcceptingRef.js":
false,

/***/ "./node_modules/@material-ui/utils/esm/exactProp.js":
false,

/***/ "./node_modules/@material-ui/utils/esm/formatMuiErrorMessage.js":
false,

/***/ "./node_modules/@material-ui/utils/esm/getDisplayName.js":
false,

/***/ "./node_modules/@material-ui/utils/esm/index.js":
false,

/***/ "./node_modules/@material-ui/utils/esm/ponyfillGlobal.js":
false,

/***/ "./node_modules/@material-ui/utils/esm/refType.js":
false,

/***/ "./node_modules/@uniswap/sdk/dist/sdk.esm.js":
false,

/***/ "./node_modules/@uniswap/v2-core/build/IERC20.json":
false,

/***/ "./node_modules/@uniswap/v2-core/build/IUniswapV2Pair.json":
false,

/***/ "./node_modules/@web3-react/abstract-connector/dist/abstract-connector.esm.js":
false,

/***/ "./node_modules/@web3-react/injected-connector/dist/injected-connector.esm.js":
false,

/***/ "./node_modules/@web3-react/network-connector/dist/network-connector.esm.js":
false,

/***/ "./node_modules/@web3-react/walletconnect-connector/dist/walletconnect-connector.esm.js":
false,

/***/ "./node_modules/abortcontroller-polyfill/dist/abortcontroller-polyfill-only.js":
false,

/***/ "./node_modules/ansi-styles/index.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/api.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/base/buffer.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/base/index.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/base/node.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/base/reporter.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/constants/der.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/constants/index.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/decoders/der.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/decoders/index.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/decoders/pem.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/encoders/der.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/encoders/index.js":
false,

/***/ "./node_modules/asn1.js/lib/asn1/encoders/pem.js":
false,

/***/ "./node_modules/assert/assert.js":
false,

/***/ "./node_modules/async/asyncify.js":
false,

/***/ "./node_modules/async/eachLimit.js":
false,

/***/ "./node_modules/async/eachOf.js":
false,

/***/ "./node_modules/async/eachOfLimit.js":
false,

/***/ "./node_modules/async/eachSeries.js":
false,

/***/ "./node_modules/async/internal/breakLoop.js":
false,

/***/ "./node_modules/async/internal/doLimit.js":
false,

/***/ "./node_modules/async/internal/doParallel.js":
false,

/***/ "./node_modules/async/internal/eachOfLimit.js":
false,

/***/ "./node_modules/async/internal/getIterator.js":
false,

/***/ "./node_modules/async/internal/initialParams.js":
false,

/***/ "./node_modules/async/internal/iterator.js":
false,

/***/ "./node_modules/async/internal/map.js":
false,

/***/ "./node_modules/async/internal/once.js":
false,

/***/ "./node_modules/async/internal/onlyOnce.js":
false,

/***/ "./node_modules/async/internal/setImmediate.js":
false,

/***/ "./node_modules/async/internal/slice.js":
false,

/***/ "./node_modules/async/internal/withoutIndex.js":
false,

/***/ "./node_modules/async/internal/wrapAsync.js":
false,

/***/ "./node_modules/async/map.js":
false,

/***/ "./node_modules/base64-js/index.js":
false,

/***/ "./node_modules/big.js/big.js":
false,

/***/ "./node_modules/bignumber.js/bignumber.js":
false,

/***/ "./node_modules/bn.js/lib/bn.js":
false,

/***/ "./node_modules/brorand/index.js":
false,

/***/ "./node_modules/browserify-aes/aes.js":
false,

/***/ "./node_modules/browserify-aes/authCipher.js":
false,

/***/ "./node_modules/browserify-aes/browser.js":
false,

/***/ "./node_modules/browserify-aes/decrypter.js":
false,

/***/ "./node_modules/browserify-aes/encrypter.js":
false,

/***/ "./node_modules/browserify-aes/ghash.js":
false,

/***/ "./node_modules/browserify-aes/incr32.js":
false,

/***/ "./node_modules/browserify-aes/modes/cbc.js":
false,

/***/ "./node_modules/browserify-aes/modes/cfb.js":
false,

/***/ "./node_modules/browserify-aes/modes/cfb1.js":
false,

/***/ "./node_modules/browserify-aes/modes/cfb8.js":
false,

/***/ "./node_modules/browserify-aes/modes/ctr.js":
false,

/***/ "./node_modules/browserify-aes/modes/ecb.js":
false,

/***/ "./node_modules/browserify-aes/modes/index.js":
false,

/***/ "./node_modules/browserify-aes/modes/list.json":
false,

/***/ "./node_modules/browserify-aes/modes/ofb.js":
false,

/***/ "./node_modules/browserify-aes/streamCipher.js":
false,

/***/ "./node_modules/browserify-cipher/browser.js":
false,

/***/ "./node_modules/browserify-des/index.js":
false,

/***/ "./node_modules/browserify-des/modes.js":
false,

/***/ "./node_modules/browserify-rsa/index.js":
false,

/***/ "./node_modules/browserify-sign/algos.js":
false,

/***/ "./node_modules/browserify-sign/browser/algorithms.json":
false,

/***/ "./node_modules/browserify-sign/browser/curves.json":
false,

/***/ "./node_modules/browserify-sign/browser/index.js":
false,

/***/ "./node_modules/browserify-sign/browser/sign.js":
false,

/***/ "./node_modules/browserify-sign/browser/verify.js":
false,

/***/ "./node_modules/browserify-sign/node_modules/bn.js/lib/bn.js":
false,

/***/ "./node_modules/browserify-sign/node_modules/safe-buffer/index.js":
false,

/***/ "./node_modules/buffer-xor/index.js":
false,

/***/ "./node_modules/builtin-status-codes/browser.js":
false,

/***/ "./node_modules/chalk/index.js":
false,

/***/ "./node_modules/chalk/templates.js":
false,

/***/ "./node_modules/cipher-base/index.js":
false,

/***/ "./node_modules/clone/clone.js":
false,

/***/ "./node_modules/clsx/dist/clsx.m.js":
false,

/***/ "./node_modules/core-util-is/lib/util.js":
false,

/***/ "./node_modules/create-ecdh/browser.js":
false,

/***/ "./node_modules/create-hash/browser.js":
false,

/***/ "./node_modules/create-hash/md5.js":
false,

/***/ "./node_modules/create-hmac/browser.js":
false,

/***/ "./node_modules/create-hmac/legacy.js":
false,

/***/ "./node_modules/crypto-browserify/index.js":
false,

/***/ "./node_modules/css-vendor/dist/css-vendor.esm.js":
false,

/***/ "./node_modules/decimal.js-light/decimal.js":
false,

/***/ "./node_modules/des.js/lib/des.js":
false,

/***/ "./node_modules/des.js/lib/des/cbc.js":
false,

/***/ "./node_modules/des.js/lib/des/cipher.js":
false,

/***/ "./node_modules/des.js/lib/des/des.js":
false,

/***/ "./node_modules/des.js/lib/des/ede.js":
false,

/***/ "./node_modules/des.js/lib/des/utils.js":
false,

/***/ "./node_modules/detect-node/index.js":
false,

/***/ "./node_modules/diffie-hellman/browser.js":
false,

/***/ "./node_modules/diffie-hellman/lib/dh.js":
false,

/***/ "./node_modules/diffie-hellman/lib/generatePrime.js":
false,

/***/ "./node_modules/diffie-hellman/lib/primes.json":
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

/***/ "./node_modules/escape-string-regexp/index.js":
false,

/***/ "./node_modules/eth-block-tracker/src/hexUtils.js":
false,

/***/ "./node_modules/eth-block-tracker/src/index.js":
false,

/***/ "./node_modules/eth-lib/lib/hash.js":
false,

/***/ "./node_modules/eth-query/index.js":
false,

/***/ "./node_modules/ethereum-bloom-filters/dist/index.js":
false,

/***/ "./node_modules/ethereum-bloom-filters/dist/utils.js":
false,

/***/ "./node_modules/ethereum-bloom-filters/node_modules/js-sha3/src/sha3.js":
false,

/***/ "./node_modules/ethereum-cryptography/hash-utils.js":
false,

/***/ "./node_modules/ethereum-cryptography/keccak.js":
false,

/***/ "./node_modules/ethereum-cryptography/random.js":
false,

/***/ "./node_modules/ethereum-cryptography/secp256k1.js":
false,

/***/ "./node_modules/ethereum-types/lib/index.js":
false,

/***/ "./node_modules/ethereumjs-util/dist/index.js":
false,

/***/ "./node_modules/ethereumjs-util/dist/secp256k1-adapter.js":
false,

/***/ "./node_modules/ethereumjs-util/dist/secp256k1-lib/der.js":
false,

/***/ "./node_modules/ethereumjs-util/dist/secp256k1-lib/index.js":
false,

/***/ "./node_modules/ethers/dist/ethers.min.js":
false,

/***/ "./node_modules/ethjs-unit/lib/index.js":
false,

/***/ "./node_modules/ethjs-unit/node_modules/bn.js/lib/bn.js":
false,

/***/ "./node_modules/ethjs-util/lib/index.js":
false,

/***/ "./node_modules/events/events.js":
false,

/***/ "./node_modules/evp_bytestokey/index.js":
false,

/***/ "./node_modules/hash-base/index.js":
false,

/***/ "./node_modules/hash-base/node_modules/safe-buffer/index.js":
false,

/***/ "./node_modules/hash.js/lib/hash.js":
false,

/***/ "./node_modules/hash.js/lib/hash/common.js":
false,

/***/ "./node_modules/hash.js/lib/hash/hmac.js":
false,

/***/ "./node_modules/hash.js/lib/hash/ripemd.js":
false,

/***/ "./node_modules/hash.js/lib/hash/sha.js":
false,

/***/ "./node_modules/hash.js/lib/hash/sha/1.js":
false,

/***/ "./node_modules/hash.js/lib/hash/sha/224.js":
false,

/***/ "./node_modules/hash.js/lib/hash/sha/256.js":
false,

/***/ "./node_modules/hash.js/lib/hash/sha/384.js":
false,

/***/ "./node_modules/hash.js/lib/hash/sha/512.js":
false,

/***/ "./node_modules/hash.js/lib/hash/sha/common.js":
false,

/***/ "./node_modules/hash.js/lib/hash/utils.js":
false,

/***/ "./node_modules/hmac-drbg/lib/hmac-drbg.js":
false,

/***/ "./node_modules/https-browserify/index.js":
false,

/***/ "./node_modules/hyphenate-style-name/index.js":
false,

/***/ "./node_modules/ieee754/index.js":
false,

/***/ "./node_modules/inherits/inherits_browser.js":
false,

/***/ "./node_modules/is-hex-prefixed/src/index.js":
false,

/***/ "./node_modules/is-in-browser/dist/module.js":
false,

/***/ "./node_modules/isarray/index.js":
false,

/***/ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js":
false,

/***/ "./node_modules/jsbi/dist/jsbi-umd.js":
false,

/***/ "./node_modules/json-rpc-error/index.js":
false,

/***/ "./node_modules/json-rpc-error/lib/errors.js":
false,

/***/ "./node_modules/json-rpc-random-id/index.js":
false,

/***/ "./node_modules/json-stable-stringify/index.js":
false,

/***/ "./node_modules/jsonify/index.js":
false,

/***/ "./node_modules/jsonify/lib/parse.js":
false,

/***/ "./node_modules/jsonify/lib/stringify.js":
false,

/***/ "./node_modules/jsonschema/lib/attribute.js":
false,

/***/ "./node_modules/jsonschema/lib/helpers.js":
false,

/***/ "./node_modules/jsonschema/lib/index.js":
false,

/***/ "./node_modules/jsonschema/lib/scan.js":
false,

/***/ "./node_modules/jsonschema/lib/validator.js":
false,

/***/ "./node_modules/jss-plugin-camel-case/dist/jss-plugin-camel-case.esm.js":
false,

/***/ "./node_modules/jss-plugin-default-unit/dist/jss-plugin-default-unit.esm.js":
false,

/***/ "./node_modules/jss-plugin-global/dist/jss-plugin-global.esm.js":
false,

/***/ "./node_modules/jss-plugin-nested/dist/jss-plugin-nested.esm.js":
false,

/***/ "./node_modules/jss-plugin-props-sort/dist/jss-plugin-props-sort.esm.js":
false,

/***/ "./node_modules/jss-plugin-rule-value-function/dist/jss-plugin-rule-value-function.esm.js":
false,

/***/ "./node_modules/jss-plugin-vendor-prefixer/dist/jss-plugin-vendor-prefixer.esm.js":
false,

/***/ "./node_modules/jss/dist/jss.esm.js":
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

/***/ "./node_modules/lodash.values/index.js":
false,

/***/ "./node_modules/lodash/_Symbol.js":
false,

/***/ "./node_modules/lodash/_arrayLikeKeys.js":
false,

/***/ "./node_modules/lodash/_baseGetTag.js":
false,

/***/ "./node_modules/lodash/_baseIsArguments.js":
false,

/***/ "./node_modules/lodash/_baseIsTypedArray.js":
false,

/***/ "./node_modules/lodash/_baseKeys.js":
false,

/***/ "./node_modules/lodash/_baseTimes.js":
false,

/***/ "./node_modules/lodash/_baseUnary.js":
false,

/***/ "./node_modules/lodash/_freeGlobal.js":
false,

/***/ "./node_modules/lodash/_getRawTag.js":
false,

/***/ "./node_modules/lodash/_isIndex.js":
false,

/***/ "./node_modules/lodash/_isPrototype.js":
false,

/***/ "./node_modules/lodash/_nativeKeys.js":
false,

/***/ "./node_modules/lodash/_nodeUtil.js":
false,

/***/ "./node_modules/lodash/_objectToString.js":
false,

/***/ "./node_modules/lodash/_overArg.js":
false,

/***/ "./node_modules/lodash/_root.js":
false,

/***/ "./node_modules/lodash/isArguments.js":
false,

/***/ "./node_modules/lodash/isArray.js":
false,

/***/ "./node_modules/lodash/isArrayLike.js":
false,

/***/ "./node_modules/lodash/isBuffer.js":
false,

/***/ "./node_modules/lodash/isFunction.js":
false,

/***/ "./node_modules/lodash/isLength.js":
false,

/***/ "./node_modules/lodash/isObject.js":
false,

/***/ "./node_modules/lodash/isObjectLike.js":
false,

/***/ "./node_modules/lodash/isTypedArray.js":
false,

/***/ "./node_modules/lodash/keys.js":
false,

/***/ "./node_modules/lodash/lodash.js":
false,

/***/ "./node_modules/lodash/noop.js":
false,

/***/ "./node_modules/lodash/stubFalse.js":
false,

/***/ "./node_modules/md5.js/index.js":
false,

/***/ "./node_modules/miller-rabin/lib/mr.js":
false,

/***/ "./node_modules/minimalistic-assert/index.js":
false,

/***/ "./node_modules/minimalistic-crypto-utils/lib/utils.js":
false,

/***/ "./node_modules/native-url/dist/index.js":
false,

/***/ "./node_modules/next/dist/build/polyfills/fetch/whatwg-fetch.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/buffer/index.js":
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

/***/ "./node_modules/parse-asn1/aesid.json":
false,

/***/ "./node_modules/parse-asn1/asn1.js":
false,

/***/ "./node_modules/parse-asn1/certificate.js":
false,

/***/ "./node_modules/parse-asn1/fixProc.js":
false,

/***/ "./node_modules/parse-asn1/index.js":
false,

/***/ "./node_modules/pbkdf2/browser.js":
false,

/***/ "./node_modules/pbkdf2/lib/async.js":
false,

/***/ "./node_modules/pbkdf2/lib/default-encoding.js":
false,

/***/ "./node_modules/pbkdf2/lib/precondition.js":
false,

/***/ "./node_modules/pbkdf2/lib/sync-browser.js":
false,

/***/ "./node_modules/pbkdf2/lib/to-buffer.js":
false,

/***/ "./node_modules/pify/index.js":
false,

/***/ "./node_modules/process-nextick-args/index.js":
false,

/***/ "./node_modules/public-encrypt/browser.js":
false,

/***/ "./node_modules/public-encrypt/mgf.js":
false,

/***/ "./node_modules/public-encrypt/privateDecrypt.js":
false,

/***/ "./node_modules/public-encrypt/publicEncrypt.js":
false,

/***/ "./node_modules/public-encrypt/withPublic.js":
false,

/***/ "./node_modules/public-encrypt/xor.js":
false,

/***/ "./node_modules/querystring-es3/decode.js":
false,

/***/ "./node_modules/querystring-es3/encode.js":
false,

/***/ "./node_modules/querystring-es3/index.js":
false,

/***/ "./node_modules/randombytes/browser.js":
false,

/***/ "./node_modules/randomfill/browser.js":
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

/***/ "./node_modules/rlp/dist/index.js":
false,

/***/ "./node_modules/safe-buffer/index.js":
false,

/***/ "./node_modules/safer-buffer/safer.js":
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

/***/ "./node_modules/stream-browserify/index.js":
false,

/***/ "./node_modules/stream-http/index.js":
false,

/***/ "./node_modules/stream-http/lib/capability.js":
false,

/***/ "./node_modules/stream-http/lib/request.js":
false,

/***/ "./node_modules/stream-http/lib/response.js":
false,

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_duplex.js":
false,

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_passthrough.js":
false,

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_readable.js":
false,

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_transform.js":
false,

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/_stream_writable.js":
false,

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/BufferList.js":
false,

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/destroy.js":
false,

/***/ "./node_modules/stream-http/node_modules/readable-stream/lib/internal/streams/stream-browser.js":
false,

/***/ "./node_modules/stream-http/node_modules/readable-stream/readable-browser.js":
false,

/***/ "./node_modules/string_decoder/lib/string_decoder.js":
false,

/***/ "./node_modules/string_decoder/node_modules/safe-buffer/index.js":
false,

/***/ "./node_modules/strip-hex-prefix/src/index.js":
false,

/***/ "./node_modules/supports-color/browser.js":
false,

/***/ "./node_modules/swr/esm/cache.js":
false,

/***/ "./node_modules/swr/esm/config.js":
false,

/***/ "./node_modules/swr/esm/index.js":
false,

/***/ "./node_modules/swr/esm/libs/hash.js":
false,

/***/ "./node_modules/swr/esm/libs/is-document-visible.js":
false,

/***/ "./node_modules/swr/esm/libs/is-online.js":
false,

/***/ "./node_modules/swr/esm/libs/throttle.js":
false,

/***/ "./node_modules/swr/esm/swr-config-context.js":
false,

/***/ "./node_modules/swr/esm/use-swr-pages.js":
false,

/***/ "./node_modules/swr/esm/use-swr.js":
false,

/***/ "./node_modules/swr/node_modules/fast-deep-equal/index.js":
false,

/***/ "./node_modules/to-arraybuffer/index.js":
false,

/***/ "./node_modules/toformat/toFormat.js":
false,

/***/ "./node_modules/underscore/underscore.js":
false,

/***/ "./node_modules/utf8/utf8.js":
false,

/***/ "./node_modules/util-deprecate/browser.js":
false,

/***/ "./node_modules/valid-url/index.js":
false,

/***/ "./node_modules/web3-provider-engine/index.js":
false,

/***/ "./node_modules/web3-provider-engine/subproviders/cache.js":
false,

/***/ "./node_modules/web3-provider-engine/subproviders/subprovider.js":
false,

/***/ "./node_modules/web3-provider-engine/util/create-payload.js":
false,

/***/ "./node_modules/web3-provider-engine/util/random-id.js":
false,

/***/ "./node_modules/web3-provider-engine/util/rpc-cache-utils.js":
false,

/***/ "./node_modules/web3-provider-engine/util/stoplight.js":
false,

/***/ "./node_modules/web3-utils/lib/index.js":
false,

/***/ "./node_modules/web3-utils/lib/soliditySha3.js":
false,

/***/ "./node_modules/web3-utils/lib/utils.js":
false,

/***/ "./node_modules/webpack/buildin/amd-options.js":
false,

/***/ "./node_modules/xtend/immutable.js":
false,

/***/ "./tokens.ts":
false,

/***/ "./utils.ts":
false,

/***/ 1:
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
false

})