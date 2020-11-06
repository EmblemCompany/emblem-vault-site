module.exports = {
    addTokenToWallet: function hook(token) {
        console.log(token)
        web3.currentProvider.sendAsync({
          method: 'metamask_watchAsset',
          params: {
            "type": "ERC20", // Initially only supports ERC20, but eventually more!
            "options": {
              "address": token.address, // The address that the token is at.
              "symbol": token.symbol, // A ticker symbol or shorthand, up to 5 chars.
              "decimals": token.decimals, // The number of decimals in the token
              "image": "https://circuitsofvalue.com/public/coval-logo.png", // A string url of the token logo
            },
          },
          id: Math.round(Math.random() * 100000),
        }, (err, addedBoolean) => {
    
        })
      }
}