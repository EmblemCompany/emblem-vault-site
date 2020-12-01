const _addTokenToWallet = function hook(token) {
  console.log(token)
  web3.currentProvider.sendAsync({
    method: 'wallet_watchAsset',
    params: {
      "type": "ERC20", // Initially only supports ERC20, but eventually more!
      "options": {
        "address": token.address, // The address that the token is at.
        "symbol": token.symbol, // A ticker symbol or shorthand, up to 5 chars.
        "decimals": token.decimals, // The number of decimals in the token
        "image": token.image || "https://raw.githubusercontent.com/trustwallet/tokens/master/tokens/"+token.address+".png"//"https://circuitsofvalue.com/public/coval-logo.png", // A string url of the token logo
      },
    },
    id: Math.round(Math.random() * 100000),
  }, (err, addedBoolean) => {

  })
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
module.exports = {
    addTokenToWallet: _addTokenToWallet,
    addMany: async (tokens)=>{
      let first = tokens.reverse().pop()
      first = tokens.pop()
      _addTokenToWallet(first)      
      await sleep(1)
      alert('Loading all tokens into wallet..')
      await sleep(1)
      tokens.reverse().forEach(token => _addTokenToWallet(token))
      // _addTokenToWallet(tokens[2])
    }
}