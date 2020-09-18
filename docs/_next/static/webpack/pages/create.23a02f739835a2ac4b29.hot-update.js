webpackHotUpdate_N_E("pages/create",{

/***/ "./components/Create.tsx":
/*!*******************************!*\
  !*** ./components/Create.tsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Create; });\n/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ \"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js\");\n/* harmony import */ var _chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/core */ \"./node_modules/@chakra-ui/core/dist/es/index.js\");\n/* harmony import */ var react_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-loader */ \"./node_modules/react-loader/lib/react-loader.js\");\n/* harmony import */ var react_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_loader__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _web3_react_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @web3-react/core */ \"./node_modules/@web3-react/core/dist/core.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../constants */ \"./constants.ts\");\n\n\nvar _jsxFileName = \"/Users/dcode/dev/emblem/emblem-vault-uni/components/Create.tsx\",\n    _s = $RefreshSig$();\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement;\n\n\n\n\n\nfunction Create(props) {\n  _s();\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(0),\n      _React$useState2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_React$useState, 2),\n      tabIndex = _React$useState2[0],\n      setTabIndex = _React$useState2[1];\n\n  var _useWeb3React = Object(_web3_react_core__WEBPACK_IMPORTED_MODULE_3__[\"useWeb3React\"])(),\n      account = _useWeb3React.account,\n      chainId = _useWeb3React.chainId;\n\n  var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(account || ''),\n      _React$useState4 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_React$useState3, 2),\n      vaultAddress = _React$useState4[0],\n      setVaultAddress = _React$useState4[1];\n\n  var _React$useState5 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState('Public'),\n      _React$useState6 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_React$useState5, 2),\n      vaultPubPriv = _React$useState6[0],\n      setVaultPubPriv = _React$useState6[1];\n\n  var _React$useState7 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(''),\n      _React$useState8 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_React$useState7, 2),\n      vaultName = _React$useState8[0],\n      setVaultName = _React$useState8[1];\n\n  var _React$useState9 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(''),\n      _React$useState10 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_React$useState9, 2),\n      vaultDesc = _React$useState10[0],\n      setVaultDesc = _React$useState10[1];\n\n  var _React$useState11 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(''),\n      _React$useState12 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_React$useState11, 2),\n      vaultImage = _React$useState12[0],\n      setVaultImage = _React$useState12[1];\n\n  var _React$useState13 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(''),\n      _React$useState14 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_React$useState13, 2),\n      password = _React$useState14[0],\n      setPassword = _React$useState14[1];\n\n  var _React$useState15 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(''),\n      _React$useState16 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_React$useState15, 2),\n      service = _React$useState16[0],\n      setService = _React$useState16[1];\n\n  var _React$useState17 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(false),\n      _React$useState18 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_React$useState17, 2),\n      isCovalApproved = _React$useState18[0],\n      setIsCovalApproved = _React$useState18[1];\n\n  var _React$useState19 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState({\n    loaded: true,\n    \"private\": false\n  }),\n      _React$useState20 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_React$useState19, 2),\n      state = _React$useState20[0],\n      setState = _React$useState20[1];\n\n  var handlePrivateRadio = function handlePrivateRadio(e) {\n    console.log('Changed Private visibility', e);\n  };\n\n  var approveCovalFlow = function approveCovalFlow() {\n    alert('Approve?');\n    setIsCovalApproved(true);\n  };\n\n  var handleSubmit = function handleSubmit(evt) {\n    evt.preventDefault();\n    setState({\n      loaded: false,\n      \"private\": state[\"private\"]\n    });\n    fetch(_constants__WEBPACK_IMPORTED_MODULE_5__[\"EMBLEM_API\"] + '/mint', {\n      method: 'POST',\n      headers: {\n        Authorization: 'Basic YWRtaW46c3VwZXJzZWNyZXQ=',\n        'Content-Type': 'application/json',\n        service: service\n      },\n      // We convert the React state to JSON and send it as the POST body\n      body: JSON.stringify({\n        fromAddress: account,\n        toAddress: vaultAddress,\n        description: vaultDesc,\n        name: vaultName,\n        image: vaultImage,\n        chainId: chainId,\n        \"private\": state[\"private\"],\n        password: password || ''\n      })\n    }).then(function (response) {\n      setState({\n        loaded: true,\n        \"private\": state[\"private\"]\n      });\n      location.href = location.origin + '/vaultlist'; // console.log(response.json())\n      // return response.json();\n    });\n  };\n\n  function previewFile() {\n    var preview = document.querySelector('img');\n    var inputelement = document.querySelector('input[type=file]'); //.files[0];\n\n    var reader = new FileReader();\n    reader.addEventListener('load', function () {\n      var _reader$result;\n\n      // convert image file to base64 string\n      if (preview) preview.src = ((_reader$result = reader.result) === null || _reader$result === void 0 ? void 0 : _reader$result.toString()) || '';\n      if (preview) setVaultImage(preview.src);\n    }, false);\n\n    if (inputelement.files) {\n      reader.readAsDataURL(inputelement.files[0]);\n    }\n  }\n\n  var _React$useState21 = react__WEBPACK_IMPORTED_MODULE_4___default.a.useState(''),\n      _React$useState22 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_React$useState21, 2),\n      acct = _React$useState22[0],\n      setAcct = _React$useState22[1];\n\n  Object(react__WEBPACK_IMPORTED_MODULE_4__[\"useEffect\"])(function () {\n    if (account && acct != account) {\n      setAcct(account);\n      setVaultAddress(account);\n    }\n  }, [account, acct]);\n  return __jsx(react_loader__WEBPACK_IMPORTED_MODULE_2___default.a, {\n    loaded: state.loaded,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 108,\n      columnNumber: 5\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Flex\"], {\n    width: \"full\",\n    align: \"center\",\n    justifyContent: \"center\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 109,\n      columnNumber: 7\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Box\"], {\n    maxW: \"sm\",\n    borderWidth: \"1px\",\n    rounded: \"lg\",\n    overflow: \"hidden\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 110,\n      columnNumber: 9\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Tabs\"], {\n    defaultIndex: 0,\n    index: tabIndex,\n    onChange: function onChange(index) {\n      return setTabIndex(index);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 111,\n      columnNumber: 11\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"TabList\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 112,\n      columnNumber: 13\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Tab\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 113,\n      columnNumber: 15\n    }\n  }, \"Make\"), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Tab\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 114,\n      columnNumber: 15\n    }\n  }, \"My\"), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Tab\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 115,\n      columnNumber: 15\n    }\n  }, \"Vault\")), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"TabPanels\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 118,\n      columnNumber: 13\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"TabPanel\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 119,\n      columnNumber: 15\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    direction: \"column\",\n    align: \"center\",\n    spacing: \"2rem\",\n    flexGrow: 1,\n    justifyContent: \"center\",\n    px: \"2rem\",\n    py: \"2rem\",\n    shouldWrapChildren: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 120,\n      columnNumber: 17\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    direction: \"row\",\n    align: \"flex-start\",\n    spacing: \"0rem\",\n    flexWrap: \"wrap\",\n    shouldWrapChildren: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 130,\n      columnNumber: 19\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormControl\"], {\n    isRequired: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 131,\n      columnNumber: 21\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormLabel\"], {\n    htmlFor: \"owner-address\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 132,\n      columnNumber: 23\n    }\n  }, \"Vault Owner Address\"), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Input\"], {\n    type: \"text\",\n    id: \"owner-address\",\n    \"aria-describedby\": \"owner-helper-text\",\n    placeholder: \"0xdeadbeef\",\n    value: vaultAddress,\n    onChange: function onChange(e) {\n      return setVaultAddress(e.target.value);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 133,\n      columnNumber: 23\n    }\n  }), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormHelperText\"], {\n    id: \"owner-helper-text\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 141,\n      columnNumber: 23\n    }\n  }, \"What is the address of the first owner of this vault? Pro tip: When you connect a web3 wallet, this will populate automagically with your address.\"))), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    direction: \"row\",\n    align: \"flex-start\",\n    spacing: \"0rem\",\n    flexWrap: \"wrap\",\n    shouldWrapChildren: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 148,\n      columnNumber: 19\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormControl\"], {\n    as: \"fieldset\",\n    isRequired: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 149,\n      columnNumber: 21\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormLabel\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 150,\n      columnNumber: 23\n    }\n  }, \"Public or Private?\"), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"RadioGroup\"], {\n    id: \"pubpriv\",\n    defaultValue: \"Public\",\n    onChange: function onChange(e) {\n      setVaultPubPriv(e.target.value);\n      setState({\n        loaded: state.loaded,\n        \"private\": e.target.value === 'Private'\n      });\n      console.log('Private', e.target.value === 'Private');\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 151,\n      columnNumber: 23\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Radio\"], {\n    value: \"Public\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 160,\n      columnNumber: 25\n    }\n  }, \"Public\"), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Radio\"], {\n    value: \"Private\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 161,\n      columnNumber: 25\n    }\n  }, \"Private\")), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormHelperText\"], {\n    id: \"email-helper-text\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 163,\n      columnNumber: 23\n    }\n  }, \"Do you want people to be able to see the contents?\")), state[\"private\"] ? __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormControl\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 168,\n      columnNumber: 23\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormLabel\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 169,\n      columnNumber: 25\n    }\n  }, \"Password\"), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Input\"], {\n    type: \"password\",\n    id: \"vault-password\",\n    onChange: function onChange(e) {\n      return setPassword(e.target.value);\n    },\n    \"aria-describedby\": \"password-helper-text\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 170,\n      columnNumber: 25\n    }\n  }), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormHelperText\"], {\n    id: \"password-helper-text\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 176,\n      columnNumber: 25\n    }\n  }, \"This password will encrypt and decrypt the contents of this vault\")) : ''), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    direction: \"row\",\n    align: \"flex-start\",\n    spacing: \"0rem\",\n    flexWrap: \"wrap\",\n    shouldWrapChildren: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 184,\n      columnNumber: 19\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n    onClick: function onClick() {\n      return setTabIndex(1);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 185,\n      columnNumber: 21\n    }\n  }, \"Next\")))), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"TabPanel\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 190,\n      columnNumber: 15\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    direction: \"column\",\n    align: \"center\",\n    spacing: \"2rem\",\n    flexGrow: 1,\n    justifyContent: \"center\",\n    px: \"2rem\",\n    py: \"2rem\",\n    shouldWrapChildren: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 191,\n      columnNumber: 17\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    direction: \"row\",\n    align: \"flex-start\",\n    spacing: \"0rem\",\n    flexWrap: \"wrap\",\n    shouldWrapChildren: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 201,\n      columnNumber: 19\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormControl\"], {\n    isRequired: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 202,\n      columnNumber: 21\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormLabel\"], {\n    htmlFor: \"vault-name\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 203,\n      columnNumber: 23\n    }\n  }, \"Vault Name\"), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Input\"], {\n    type: \"text\",\n    id: \"vault-name\",\n    \"aria-describedby\": \"vault-name-text\",\n    value: vaultName,\n    onChange: function onChange(e) {\n      return setVaultName(e.target.value);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 204,\n      columnNumber: 23\n    }\n  }), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormHelperText\"], {\n    id: \"vault-name-text\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 211,\n      columnNumber: 23\n    }\n  }, \"Give it some love so you can find it later.\"))), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    direction: \"row\",\n    align: \"flex-start\",\n    spacing: \"0rem\",\n    flexWrap: \"wrap\",\n    shouldWrapChildren: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 214,\n      columnNumber: 19\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormControl\"], {\n    isRequired: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 215,\n      columnNumber: 21\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormLabel\"], {\n    htmlFor: \"vault-desc\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 216,\n      columnNumber: 23\n    }\n  }, \"Vault Description\"), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Textarea\"], {\n    id: \"vault-desc\",\n    size: \"lg\",\n    \"aria-describedby\": \"vault-desc-text\",\n    value: vaultDesc,\n    onChange: function onChange(e) {\n      return setVaultDesc(e.target.value);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 217,\n      columnNumber: 23\n    }\n  }), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormHelperText\"], {\n    id: \"vault-desc-text\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 224,\n      columnNumber: 23\n    }\n  }, \"Want to add some fluffy text to tell people what the point is?\"))), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    direction: \"row\",\n    align: \"flex-start\",\n    spacing: \"0rem\",\n    flexWrap: \"wrap\",\n    shouldWrapChildren: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 229,\n      columnNumber: 19\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"ButtonGroup\"], {\n    spacing: 4,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 230,\n      columnNumber: 21\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n    onClick: function onClick() {\n      return setTabIndex(0);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 231,\n      columnNumber: 23\n    }\n  }, \"Back\"), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n    onClick: function onClick() {\n      return setTabIndex(2);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 232,\n      columnNumber: 23\n    }\n  }, \"Next\"))))), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"TabPanel\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 238,\n      columnNumber: 15\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    direction: \"column\",\n    align: \"center\",\n    spacing: \"2rem\",\n    flexGrow: 1,\n    justifyContent: \"center\",\n    px: \"2rem\",\n    py: \"2rem\",\n    shouldWrapChildren: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 239,\n      columnNumber: 17\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    direction: \"row\",\n    align: \"flex-start\",\n    spacing: \"0rem\",\n    flexWrap: \"wrap\",\n    shouldWrapChildren: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 249,\n      columnNumber: 19\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormControl\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 250,\n      columnNumber: 21\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormLabel\"], {\n    htmlFor: \"vault-img\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 251,\n      columnNumber: 23\n    }\n  }, \"Vault Image\"), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Box\"], {\n    maxW: \"sm\",\n    borderWidth: \"1px\",\n    p: 1,\n    rounded: \"lg\",\n    overflow: \"hidden\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 252,\n      columnNumber: 23\n    }\n  }, __jsx(\"input\", {\n    type: \"file\",\n    onChange: function onChange() {\n      return previewFile();\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 253,\n      columnNumber: 25\n    }\n  }), __jsx(\"br\", {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 254,\n      columnNumber: 25\n    }\n  }), __jsx(\"img\", {\n    src: \"\",\n    width: \"200\",\n    alt: \"Image preview...\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 255,\n      columnNumber: 25\n    }\n  })))), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    direction: \"row\",\n    align: \"flex-start\",\n    spacing: \"0rem\",\n    flexWrap: \"wrap\",\n    shouldWrapChildren: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 260,\n      columnNumber: 19\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormControl\"], {\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 261,\n      columnNumber: 21\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"FormLabel\"], {\n    htmlFor: \"service\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 262,\n      columnNumber: 23\n    }\n  }, \"Password:\"), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Input\"], {\n    type: \"password\",\n    id: \"service\",\n    \"aria-describedby\": \"service\",\n    onChange: function onChange(e) {\n      return setService(e.target.value);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 263,\n      columnNumber: 23\n    }\n  }))), __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Stack\"], {\n    direction: \"row\",\n    align: \"flex-start\",\n    spacing: \"0rem\",\n    flexWrap: \"wrap\",\n    shouldWrapChildren: true,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 272,\n      columnNumber: 19\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"ButtonGroup\"], {\n    spacing: 4,\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 273,\n      columnNumber: 21\n    }\n  }, __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n    onClick: function onClick() {\n      return setTabIndex(1);\n    },\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 274,\n      columnNumber: 23\n    }\n  }, \"Back\"), !account ? __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n    isDisabled: true,\n    onClick: handleSubmit,\n    type: \"submit\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 276,\n      columnNumber: 25\n    }\n  }, \"No Wallet Connected!\") : !vaultAddress || !vaultName || !vaultDesc ? __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n    isDisabled: true,\n    onClick: handleSubmit,\n    type: \"submit\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 280,\n      columnNumber: 25\n    }\n  }, \"Missing Fields!\") : !service ? __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n    isDisabled: true,\n    onClick: handleSubmit,\n    type: \"submit\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 284,\n      columnNumber: 25\n    }\n  }, \"Creation Password?\") : !isCovalApproved() ? __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n    onClick: approveCovalFlow,\n    type: \"submit\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 288,\n      columnNumber: 25\n    }\n  }, \"Approve Coval\") : __jsx(_chakra_ui_core__WEBPACK_IMPORTED_MODULE_1__[\"Button\"], {\n    onClick: handleSubmit,\n    type: \"submit\",\n    __self: this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 292,\n      columnNumber: 25\n    }\n  }, \"DO IT!\"))))))))));\n}\n\n_s(Create, \"Xak9jiJjPBxXwld/twE7Col61CA=\", false, function () {\n  return [_web3_react_core__WEBPACK_IMPORTED_MODULE_3__[\"useWeb3React\"]];\n});\n\n_c = Create;\n\nvar _c;\n\n$RefreshReg$(_c, \"Create\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9DcmVhdGUudHN4PzYzMmQiXSwibmFtZXMiOlsiQ3JlYXRlIiwicHJvcHMiLCJSZWFjdCIsInVzZVN0YXRlIiwidGFiSW5kZXgiLCJzZXRUYWJJbmRleCIsInVzZVdlYjNSZWFjdCIsImFjY291bnQiLCJjaGFpbklkIiwidmF1bHRBZGRyZXNzIiwic2V0VmF1bHRBZGRyZXNzIiwidmF1bHRQdWJQcml2Iiwic2V0VmF1bHRQdWJQcml2IiwidmF1bHROYW1lIiwic2V0VmF1bHROYW1lIiwidmF1bHREZXNjIiwic2V0VmF1bHREZXNjIiwidmF1bHRJbWFnZSIsInNldFZhdWx0SW1hZ2UiLCJwYXNzd29yZCIsInNldFBhc3N3b3JkIiwic2VydmljZSIsInNldFNlcnZpY2UiLCJpc0NvdmFsQXBwcm92ZWQiLCJzZXRJc0NvdmFsQXBwcm92ZWQiLCJsb2FkZWQiLCJzdGF0ZSIsInNldFN0YXRlIiwiaGFuZGxlUHJpdmF0ZVJhZGlvIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJhcHByb3ZlQ292YWxGbG93IiwiYWxlcnQiLCJoYW5kbGVTdWJtaXQiLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsImZldGNoIiwiRU1CTEVNX0FQSSIsIm1ldGhvZCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmcm9tQWRkcmVzcyIsInRvQWRkcmVzcyIsImRlc2NyaXB0aW9uIiwibmFtZSIsImltYWdlIiwidGhlbiIsInJlc3BvbnNlIiwibG9jYXRpb24iLCJocmVmIiwib3JpZ2luIiwicHJldmlld0ZpbGUiLCJwcmV2aWV3IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5wdXRlbGVtZW50IiwicmVhZGVyIiwiRmlsZVJlYWRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJzcmMiLCJyZXN1bHQiLCJ0b1N0cmluZyIsImZpbGVzIiwicmVhZEFzRGF0YVVSTCIsImFjY3QiLCJzZXRBY2N0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RixDQXhIRixDQVBGLENBREYsQ0FERixDQURGLENBREY7QUF1TUQ7O0dBdlJ1QmxDLE07VUFFT00sNkQ7OztLQUZQTixNIiwiZmlsZSI6Ii4vY29tcG9uZW50cy9DcmVhdGUudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRm9ybUNvbnRyb2wsXG4gIEZvcm1MYWJlbCxcbiAgRm9ybUhlbHBlclRleHQsXG4gIElucHV0LFxuICBTdGFjayxcbiAgVGFicyxcbiAgVGFiTGlzdCxcbiAgVGFiUGFuZWxzLFxuICBUYWIsXG4gIFRhYlBhbmVsLFxuICBCb3gsXG4gIEZsZXgsXG4gIFJhZGlvR3JvdXAsXG4gIFJhZGlvLFxuICBUZXh0YXJlYSxcbiAgQnV0dG9uLFxuICBCdXR0b25Hcm91cCxcbn0gZnJvbSAnQGNoYWtyYS11aS9jb3JlJ1xuXG5pbXBvcnQgTG9hZGVyIGZyb20gJ3JlYWN0LWxvYWRlcidcbmltcG9ydCB7IHVzZVdlYjNSZWFjdCB9IGZyb20gJ0B3ZWIzLXJlYWN0L2NvcmUnXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgeyBFTUJMRU1fQVBJIH0gZnJvbSAnLi4vY29uc3RhbnRzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDcmVhdGUocHJvcHM6IGFueSkge1xuICBjb25zdCBbdGFiSW5kZXgsIHNldFRhYkluZGV4XSA9IFJlYWN0LnVzZVN0YXRlKDApXG4gIGNvbnN0IHsgYWNjb3VudCwgY2hhaW5JZCB9ID0gdXNlV2ViM1JlYWN0KClcblxuICBjb25zdCBbdmF1bHRBZGRyZXNzLCBzZXRWYXVsdEFkZHJlc3NdID0gUmVhY3QudXNlU3RhdGUoYWNjb3VudCB8fCAnJylcbiAgY29uc3QgW3ZhdWx0UHViUHJpdiwgc2V0VmF1bHRQdWJQcml2XSA9IFJlYWN0LnVzZVN0YXRlKCdQdWJsaWMnKVxuICBjb25zdCBbdmF1bHROYW1lLCBzZXRWYXVsdE5hbWVdID0gUmVhY3QudXNlU3RhdGUoJycpXG4gIGNvbnN0IFt2YXVsdERlc2MsIHNldFZhdWx0RGVzY10gPSBSZWFjdC51c2VTdGF0ZSgnJylcbiAgY29uc3QgW3ZhdWx0SW1hZ2UsIHNldFZhdWx0SW1hZ2VdID0gUmVhY3QudXNlU3RhdGUoJycpXG4gIGNvbnN0IFtwYXNzd29yZCwgc2V0UGFzc3dvcmRdID0gUmVhY3QudXNlU3RhdGUoJycpXG4gIGNvbnN0IFtzZXJ2aWNlLCBzZXRTZXJ2aWNlXSA9IFJlYWN0LnVzZVN0YXRlKCcnKVxuICBjb25zdCBbaXNDb3ZhbEFwcHJvdmVkLCBzZXRJc0NvdmFsQXBwcm92ZWRdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gUmVhY3QudXNlU3RhdGUoeyBsb2FkZWQ6IHRydWUsIHByaXZhdGU6IGZhbHNlIH0pXG5cbiAgY29uc3QgaGFuZGxlUHJpdmF0ZVJhZGlvID0gKGUpID0+IHtcbiAgICBjb25zb2xlLmxvZygnQ2hhbmdlZCBQcml2YXRlIHZpc2liaWxpdHknLCBlKVxuICB9XG5cbiAgY29uc3QgYXBwcm92ZUNvdmFsRmxvdyA9ICgpID0+IHtcbiAgICBhbGVydCgnQXBwcm92ZT8nKVxuICAgIHNldElzQ292YWxBcHByb3ZlZCh0cnVlKVxuICB9XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gKGV2dDogeyBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZCB9KSA9PiB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KClcbiAgICBzZXRTdGF0ZSh7IGxvYWRlZDogZmFsc2UsIHByaXZhdGU6IHN0YXRlLnByaXZhdGUgfSlcbiAgICBmZXRjaChFTUJMRU1fQVBJICsgJy9taW50Jywge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIEF1dGhvcml6YXRpb246ICdCYXNpYyBZV1J0YVc0NmMzVndaWEp6WldOeVpYUT0nLFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICBzZXJ2aWNlOiBzZXJ2aWNlLFxuICAgICAgfSxcbiAgICAgIC8vIFdlIGNvbnZlcnQgdGhlIFJlYWN0IHN0YXRlIHRvIEpTT04gYW5kIHNlbmQgaXQgYXMgdGhlIFBPU1QgYm9keVxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBmcm9tQWRkcmVzczogYWNjb3VudCxcbiAgICAgICAgdG9BZGRyZXNzOiB2YXVsdEFkZHJlc3MsXG4gICAgICAgIGRlc2NyaXB0aW9uOiB2YXVsdERlc2MsXG4gICAgICAgIG5hbWU6IHZhdWx0TmFtZSxcbiAgICAgICAgaW1hZ2U6IHZhdWx0SW1hZ2UsXG4gICAgICAgIGNoYWluSWQ6IGNoYWluSWQsXG4gICAgICAgIHByaXZhdGU6IHN0YXRlLnByaXZhdGUsXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCB8fCAnJyxcbiAgICAgIH0pLFxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBzZXRTdGF0ZSh7IGxvYWRlZDogdHJ1ZSwgcHJpdmF0ZTogc3RhdGUucHJpdmF0ZSB9KVxuICAgICAgbG9jYXRpb24uaHJlZiA9IGxvY2F0aW9uLm9yaWdpbiArICcvdmF1bHRsaXN0J1xuICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UuanNvbigpKVxuICAgICAgLy8gcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcHJldmlld0ZpbGUoKSB7XG4gICAgY29uc3QgcHJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2ltZycpXG4gICAgY29uc3QgaW5wdXRlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1maWxlXScpIGFzIEhUTUxJbnB1dEVsZW1lbnQgLy8uZmlsZXNbMF07XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuXG4gICAgcmVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAnbG9hZCcsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgaW1hZ2UgZmlsZSB0byBiYXNlNjQgc3RyaW5nXG4gICAgICAgIGlmIChwcmV2aWV3KSBwcmV2aWV3LnNyYyA9IHJlYWRlci5yZXN1bHQ/LnRvU3RyaW5nKCkgfHwgJydcbiAgICAgICAgaWYgKHByZXZpZXcpIHNldFZhdWx0SW1hZ2UocHJldmlldy5zcmMpXG4gICAgICB9LFxuICAgICAgZmFsc2VcbiAgICApXG5cbiAgICBpZiAoaW5wdXRlbGVtZW50LmZpbGVzKSB7XG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChpbnB1dGVsZW1lbnQuZmlsZXNbMF0pXG4gICAgfVxuICB9XG5cbiAgY29uc3QgW2FjY3QsIHNldEFjY3RdID0gUmVhY3QudXNlU3RhdGUoJycpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGFjY291bnQgJiYgYWNjdCAhPSBhY2NvdW50KSB7XG4gICAgICBzZXRBY2N0KGFjY291bnQpXG4gICAgICBzZXRWYXVsdEFkZHJlc3MoYWNjb3VudClcbiAgICB9XG4gIH0sIFthY2NvdW50LCBhY2N0XSlcblxuICByZXR1cm4gKFxuICAgIDxMb2FkZXIgbG9hZGVkPXtzdGF0ZS5sb2FkZWR9PlxuICAgICAgPEZsZXggd2lkdGg9XCJmdWxsXCIgYWxpZ249XCJjZW50ZXJcIiBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiPlxuICAgICAgICA8Qm94IG1heFc9XCJzbVwiIGJvcmRlcldpZHRoPVwiMXB4XCIgcm91bmRlZD1cImxnXCIgb3ZlcmZsb3c9XCJoaWRkZW5cIj5cbiAgICAgICAgICA8VGFicyBkZWZhdWx0SW5kZXg9ezB9IGluZGV4PXt0YWJJbmRleH0gb25DaGFuZ2U9eyhpbmRleCkgPT4gc2V0VGFiSW5kZXgoaW5kZXgpfT5cbiAgICAgICAgICAgIDxUYWJMaXN0PlxuICAgICAgICAgICAgICA8VGFiPk1ha2U8L1RhYj5cbiAgICAgICAgICAgICAgPFRhYj5NeTwvVGFiPlxuICAgICAgICAgICAgICA8VGFiPlZhdWx0PC9UYWI+XG4gICAgICAgICAgICA8L1RhYkxpc3Q+XG5cbiAgICAgICAgICAgIDxUYWJQYW5lbHM+XG4gICAgICAgICAgICAgIDxUYWJQYW5lbD5cbiAgICAgICAgICAgICAgICA8U3RhY2tcbiAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbj1cImNvbHVtblwiXG4gICAgICAgICAgICAgICAgICBhbGlnbj1cImNlbnRlclwiXG4gICAgICAgICAgICAgICAgICBzcGFjaW5nPVwiMnJlbVwiXG4gICAgICAgICAgICAgICAgICBmbGV4R3Jvdz17MX1cbiAgICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgIHB4PVwiMnJlbVwiXG4gICAgICAgICAgICAgICAgICBweT1cIjJyZW1cIlxuICAgICAgICAgICAgICAgICAgc2hvdWxkV3JhcENoaWxkcmVuXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFN0YWNrIGRpcmVjdGlvbj1cInJvd1wiIGFsaWduPVwiZmxleC1zdGFydFwiIHNwYWNpbmc9XCIwcmVtXCIgZmxleFdyYXA9XCJ3cmFwXCIgc2hvdWxkV3JhcENoaWxkcmVuPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgaXNSZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUxhYmVsIGh0bWxGb3I9XCJvd25lci1hZGRyZXNzXCI+VmF1bHQgT3duZXIgQWRkcmVzczwvRm9ybUxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJvd25lci1hZGRyZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJvd25lci1oZWxwZXItdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIjB4ZGVhZGJlZWZcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZhdWx0QWRkcmVzc31cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VmF1bHRBZGRyZXNzKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtSGVscGVyVGV4dCBpZD1cIm93bmVyLWhlbHBlci10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBXaGF0IGlzIHRoZSBhZGRyZXNzIG9mIHRoZSBmaXJzdCBvd25lciBvZiB0aGlzIHZhdWx0PyBQcm8gdGlwOiBXaGVuIHlvdSBjb25uZWN0IGEgd2ViMyB3YWxsZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzIHdpbGwgcG9wdWxhdGUgYXV0b21hZ2ljYWxseSB3aXRoIHlvdXIgYWRkcmVzcy5cbiAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1IZWxwZXJUZXh0PlxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Db250cm9sPlxuICAgICAgICAgICAgICAgICAgPC9TdGFjaz5cblxuICAgICAgICAgICAgICAgICAgPFN0YWNrIGRpcmVjdGlvbj1cInJvd1wiIGFsaWduPVwiZmxleC1zdGFydFwiIHNwYWNpbmc9XCIwcmVtXCIgZmxleFdyYXA9XCJ3cmFwXCIgc2hvdWxkV3JhcENoaWxkcmVuPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgYXM9XCJmaWVsZHNldFwiIGlzUmVxdWlyZWQ+XG4gICAgICAgICAgICAgICAgICAgICAgPEZvcm1MYWJlbD5QdWJsaWMgb3IgUHJpdmF0ZT88L0Zvcm1MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8UmFkaW9Hcm91cFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJwdWJwcml2XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZT1cIlB1YmxpY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VmF1bHRQdWJQcml2KGUudGFyZ2V0LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTdGF0ZSh7IGxvYWRlZDogc3RhdGUubG9hZGVkLCBwcml2YXRlOiBlLnRhcmdldC52YWx1ZSA9PT0gJ1ByaXZhdGUnIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQcml2YXRlJywgZS50YXJnZXQudmFsdWUgPT09ICdQcml2YXRlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJhZGlvIHZhbHVlPVwiUHVibGljXCI+UHVibGljPC9SYWRpbz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxSYWRpbyB2YWx1ZT1cIlByaXZhdGVcIj5Qcml2YXRlPC9SYWRpbz5cbiAgICAgICAgICAgICAgICAgICAgICA8L1JhZGlvR3JvdXA+XG4gICAgICAgICAgICAgICAgICAgICAgPEZvcm1IZWxwZXJUZXh0IGlkPVwiZW1haWwtaGVscGVyLXRleHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIERvIHlvdSB3YW50IHBlb3BsZSB0byBiZSBhYmxlIHRvIHNlZSB0aGUgY29udGVudHM/XG4gICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtSGVscGVyVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgICAgICAgICAgICAgICAge3N0YXRlLnByaXZhdGUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZvcm1MYWJlbD5QYXNzd29yZDwvRm9ybUxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwidmF1bHQtcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cInBhc3N3b3JkLWhlbHBlci10ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUhlbHBlclRleHQgaWQ9XCJwYXNzd29yZC1oZWxwZXItdGV4dFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBUaGlzIHBhc3N3b3JkIHdpbGwgZW5jcnlwdCBhbmQgZGVjcnlwdCB0aGUgY29udGVudHMgb2YgdGhpcyB2YXVsdFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3JtSGVscGVyVGV4dD5cbiAgICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Db250cm9sPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICcnXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L1N0YWNrPlxuICAgICAgICAgICAgICAgICAgPFN0YWNrIGRpcmVjdGlvbj1cInJvd1wiIGFsaWduPVwiZmxleC1zdGFydFwiIHNwYWNpbmc9XCIwcmVtXCIgZmxleFdyYXA9XCJ3cmFwXCIgc2hvdWxkV3JhcENoaWxkcmVuPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFRhYkluZGV4KDEpfT5OZXh0PC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICA8L1N0YWNrPlxuICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgIDwvVGFiUGFuZWw+XG5cbiAgICAgICAgICAgICAgPFRhYlBhbmVsPlxuICAgICAgICAgICAgICAgIDxTdGFja1xuICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgIGFsaWduPVwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgIHNwYWNpbmc9XCIycmVtXCJcbiAgICAgICAgICAgICAgICAgIGZsZXhHcm93PXsxfVxuICAgICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ9XCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgcHg9XCIycmVtXCJcbiAgICAgICAgICAgICAgICAgIHB5PVwiMnJlbVwiXG4gICAgICAgICAgICAgICAgICBzaG91bGRXcmFwQ2hpbGRyZW5cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8U3RhY2sgZGlyZWN0aW9uPVwicm93XCIgYWxpZ249XCJmbGV4LXN0YXJ0XCIgc3BhY2luZz1cIjByZW1cIiBmbGV4V3JhcD1cIndyYXBcIiBzaG91bGRXcmFwQ2hpbGRyZW4+XG4gICAgICAgICAgICAgICAgICAgIDxGb3JtQ29udHJvbCBpc1JlcXVpcmVkPlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtTGFiZWwgaHRtbEZvcj1cInZhdWx0LW5hbWVcIj5WYXVsdCBOYW1lPC9Gb3JtTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD1cInZhdWx0LW5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cInZhdWx0LW5hbWUtdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmF1bHROYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRWYXVsdE5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPEZvcm1IZWxwZXJUZXh0IGlkPVwidmF1bHQtbmFtZS10ZXh0XCI+R2l2ZSBpdCBzb21lIGxvdmUgc28geW91IGNhbiBmaW5kIGl0IGxhdGVyLjwvRm9ybUhlbHBlclRleHQ+XG4gICAgICAgICAgICAgICAgICAgIDwvRm9ybUNvbnRyb2w+XG4gICAgICAgICAgICAgICAgICA8L1N0YWNrPlxuICAgICAgICAgICAgICAgICAgPFN0YWNrIGRpcmVjdGlvbj1cInJvd1wiIGFsaWduPVwiZmxleC1zdGFydFwiIHNwYWNpbmc9XCIwcmVtXCIgZmxleFdyYXA9XCJ3cmFwXCIgc2hvdWxkV3JhcENoaWxkcmVuPlxuICAgICAgICAgICAgICAgICAgICA8Rm9ybUNvbnRyb2wgaXNSZXF1aXJlZD5cbiAgICAgICAgICAgICAgICAgICAgICA8Rm9ybUxhYmVsIGh0bWxGb3I9XCJ2YXVsdC1kZXNjXCI+VmF1bHQgRGVzY3JpcHRpb248L0Zvcm1MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8VGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkPVwidmF1bHQtZGVzY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplPVwibGdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cInZhdWx0LWRlc2MtdGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmF1bHREZXNjfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRWYXVsdERlc2MoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPEZvcm1IZWxwZXJUZXh0IGlkPVwidmF1bHQtZGVzYy10ZXh0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBXYW50IHRvIGFkZCBzb21lIGZsdWZmeSB0ZXh0IHRvIHRlbGwgcGVvcGxlIHdoYXQgdGhlIHBvaW50IGlzP1xuICAgICAgICAgICAgICAgICAgICAgIDwvRm9ybUhlbHBlclRleHQ+XG4gICAgICAgICAgICAgICAgICAgIDwvRm9ybUNvbnRyb2w+XG4gICAgICAgICAgICAgICAgICA8L1N0YWNrPlxuICAgICAgICAgICAgICAgICAgPFN0YWNrIGRpcmVjdGlvbj1cInJvd1wiIGFsaWduPVwiZmxleC1zdGFydFwiIHNwYWNpbmc9XCIwcmVtXCIgZmxleFdyYXA9XCJ3cmFwXCIgc2hvdWxkV3JhcENoaWxkcmVuPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uR3JvdXAgc3BhY2luZz17NH0+XG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRUYWJJbmRleCgwKX0+QmFjazwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gc2V0VGFiSW5kZXgoMil9Pk5leHQ8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9CdXR0b25Hcm91cD5cbiAgICAgICAgICAgICAgICAgIDwvU3RhY2s+XG4gICAgICAgICAgICAgICAgPC9TdGFjaz5cbiAgICAgICAgICAgICAgPC9UYWJQYW5lbD5cblxuICAgICAgICAgICAgICA8VGFiUGFuZWw+XG4gICAgICAgICAgICAgICAgPFN0YWNrXG4gICAgICAgICAgICAgICAgICBkaXJlY3Rpb249XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgYWxpZ249XCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgc3BhY2luZz1cIjJyZW1cIlxuICAgICAgICAgICAgICAgICAgZmxleEdyb3c9ezF9XG4gICAgICAgICAgICAgICAgICBqdXN0aWZ5Q29udGVudD1cImNlbnRlclwiXG4gICAgICAgICAgICAgICAgICBweD1cIjJyZW1cIlxuICAgICAgICAgICAgICAgICAgcHk9XCIycmVtXCJcbiAgICAgICAgICAgICAgICAgIHNob3VsZFdyYXBDaGlsZHJlblxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxTdGFjayBkaXJlY3Rpb249XCJyb3dcIiBhbGlnbj1cImZsZXgtc3RhcnRcIiBzcGFjaW5nPVwiMHJlbVwiIGZsZXhXcmFwPVwid3JhcFwiIHNob3VsZFdyYXBDaGlsZHJlbj5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sPlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtTGFiZWwgaHRtbEZvcj1cInZhdWx0LWltZ1wiPlZhdWx0IEltYWdlPC9Gb3JtTGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPEJveCBtYXhXPVwic21cIiBib3JkZXJXaWR0aD1cIjFweFwiIHA9ezF9IHJvdW5kZWQ9XCJsZ1wiIG92ZXJmbG93PVwiaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBvbkNoYW5nZT17KCkgPT4gcHJldmlld0ZpbGUoKX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxiciAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCJcIiB3aWR0aD1cIjIwMFwiIGFsdD1cIkltYWdlIHByZXZpZXcuLi5cIj48L2ltZz5cbiAgICAgICAgICAgICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgICAgICAgICAgICAgIDwvU3RhY2s+XG5cbiAgICAgICAgICAgICAgICAgIDxTdGFjayBkaXJlY3Rpb249XCJyb3dcIiBhbGlnbj1cImZsZXgtc3RhcnRcIiBzcGFjaW5nPVwiMHJlbVwiIGZsZXhXcmFwPVwid3JhcFwiIHNob3VsZFdyYXBDaGlsZHJlbj5cbiAgICAgICAgICAgICAgICAgICAgPEZvcm1Db250cm9sPlxuICAgICAgICAgICAgICAgICAgICAgIDxGb3JtTGFiZWwgaHRtbEZvcj1cInNlcnZpY2VcIj5QYXNzd29yZDo8L0Zvcm1MYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBpZD1cInNlcnZpY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cInNlcnZpY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZXJ2aWNlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L0Zvcm1Db250cm9sPlxuICAgICAgICAgICAgICAgICAgPC9TdGFjaz5cblxuICAgICAgICAgICAgICAgICAgPFN0YWNrIGRpcmVjdGlvbj1cInJvd1wiIGFsaWduPVwiZmxleC1zdGFydFwiIHNwYWNpbmc9XCIwcmVtXCIgZmxleFdyYXA9XCJ3cmFwXCIgc2hvdWxkV3JhcENoaWxkcmVuPlxuICAgICAgICAgICAgICAgICAgICA8QnV0dG9uR3JvdXAgc3BhY2luZz17NH0+XG4gICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRUYWJJbmRleCgxKX0+QmFjazwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIHshYWNjb3VudCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaXNEaXNhYmxlZCBvbkNsaWNrPXtoYW5kbGVTdWJtaXR9IHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgTm8gV2FsbGV0IENvbm5lY3RlZCFcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiAhdmF1bHRBZGRyZXNzIHx8ICF2YXVsdE5hbWUgfHwgIXZhdWx0RGVzYyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gaXNEaXNhYmxlZCBvbkNsaWNrPXtoYW5kbGVTdWJtaXR9IHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgTWlzc2luZyBGaWVsZHMhXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICApIDogIXNlcnZpY2UgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8QnV0dG9uIGlzRGlzYWJsZWQgb25DbGljaz17aGFuZGxlU3VibWl0fSB0eXBlPVwic3VibWl0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIENyZWF0aW9uIFBhc3N3b3JkP1xuICAgICAgICAgICAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgKSA6ICFpc0NvdmFsQXBwcm92ZWQoKSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17YXBwcm92ZUNvdmFsRmxvd30gdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBBcHByb3ZlIENvdmFsXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVTdWJtaXR9IHR5cGU9XCJzdWJtaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgRE8gSVQhXG4gICAgICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbkdyb3VwPlxuICAgICAgICAgICAgICAgICAgPC9TdGFjaz5cbiAgICAgICAgICAgICAgICA8L1N0YWNrPlxuICAgICAgICAgICAgICA8L1RhYlBhbmVsPlxuICAgICAgICAgICAgPC9UYWJQYW5lbHM+XG4gICAgICAgICAgPC9UYWJzPlxuICAgICAgICA8L0JveD5cbiAgICAgIDwvRmxleD5cbiAgICA8L0xvYWRlcj5cbiAgKVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/Create.tsx\n");

/***/ }),

/***/ "./connectors.ts":
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

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
false,

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
false,

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
false,

/***/ "./node_modules/@uniswap/v2-core/build/IERC20.json":
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

/***/ "./node_modules/bignumber.js/bignumber.js":
false,

/***/ "./node_modules/chalk/index.js":
false,

/***/ "./node_modules/chalk/templates.js":
false,

/***/ "./node_modules/clone/clone.js":
false,

/***/ "./node_modules/detect-node/index.js":
false,

/***/ "./node_modules/escape-string-regexp/index.js":
false,

/***/ "./node_modules/eth-block-tracker/src/hexUtils.js":
false,

/***/ "./node_modules/eth-block-tracker/src/index.js":
false,

/***/ "./node_modules/eth-query/index.js":
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

/***/ "./node_modules/ethjs-util/lib/index.js":
false,

/***/ "./node_modules/is-hex-prefixed/src/index.js":
false,

/***/ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js":
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

/***/ "./node_modules/next/dist/build/polyfills/fetch/whatwg-fetch.js":
false,

/***/ "./node_modules/next/dist/client/normalize-trailing-slash.js":
false,

/***/ "./node_modules/next/dist/client/router.js":
false,

/***/ "./node_modules/next/dist/client/with-router.js":
false,

/***/ "./node_modules/next/dist/next-server/lib/mitt.js":
false,

/***/ "./node_modules/next/dist/next-server/lib/router-context.js":
false,

/***/ "./node_modules/next/dist/next-server/lib/router/router.js":
false,

/***/ "./node_modules/next/dist/next-server/lib/router/utils/format-url.js":
false,

/***/ "./node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js":
false,

/***/ "./node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js":
false,

/***/ "./node_modules/next/dist/next-server/lib/router/utils/querystring.js":
false,

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-matcher.js":
false,

/***/ "./node_modules/next/dist/next-server/lib/router/utils/route-regex.js":
false,

/***/ "./node_modules/next/dist/next-server/lib/utils.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/arrayWithHoles.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/asyncToGenerator.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/classCallCheck.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/construct.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/createClass.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/nonIterableRest.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/setPrototypeOf.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/slicedToArray.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/typeof.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
false,

/***/ "./node_modules/next/node_modules/@babel/runtime/regenerator/index.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/util/node_modules/inherits/inherits_browser.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/util/support/isBufferBrowser.js":
false,

/***/ "./node_modules/node-libs-browser/node_modules/util/util.js":
false,

/***/ "./node_modules/pify/index.js":
false,

/***/ "./node_modules/regenerator-runtime/runtime.js":
false,

/***/ "./node_modules/rlp/dist/index.js":
false,

/***/ "./node_modules/secp256k1/elliptic.js":
false,

/***/ "./node_modules/secp256k1/lib/elliptic.js":
false,

/***/ "./node_modules/secp256k1/lib/index.js":
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

/***/ "./node_modules/webpack/buildin/amd-options.js":
false,

/***/ "./tokens.ts":
false,

/***/ "./utils.ts":
false

})