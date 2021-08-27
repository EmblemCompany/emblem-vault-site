var mnemonics = { "english": new Mnemonic("english") };
var mnemonic = mnemonics["english"];

function phrasePathToKey(phrase, path) {
    return phraseToKey(phrase, 0, path)
}

function phraseToKey(phrase, coinValue, path){
    if (path) {
        coinValue = parseInt(path.split('/')[2].replace("'",""))

    }
    var entropy = mnemonic.toRawEntropyHex(phrase);
    
    if (entropy !== null) {
        mnemonicLength = "raw"
        entrypyType = "hexadecimal"
        entropyTypeAutoDetect = false;        
    }
    var seed = mnemonic.toSeed(phrase, '');
    let networkName =
        coinValue == 3 ? 'dogecoin' :
            coinValue == 20 ? 'digibyte' :
                coinValue == 7 ? 'namecoin' :
                    coinValue == 2 ? 'litecoinXprv' :
                        "bitcoin"
    var network = libs.bitcoin.networks[networkName];
    // var coinValue = 0 //bitcoin
    var bip32RootKey = libs.bitcoin.HDNode.fromSeedHex(seed, network);
    console.log('bip32RootKey', bip32RootKey.toBase58())

    return calculateAddressAndKey(coinValue, bip32RootKey, path);
}

function calculateAddressAndKey(coinValue, bip32RootKey, path) {
    var isBch = coinValue == 145;
    if (isBch) {coinValue = 0}
    var derivationPath = path? path : generateDerivationPath(coinValue);
    var bip32ExtendedKey = generateBip32ExtendedKey(derivationPath, bip32RootKey);
    var accountXprv = bip32ExtendedKey.toBase58();
    var accountXpub = bip32ExtendedKey.neutered().toBase58();
    var key = bip32ExtendedKey.derive(0);
    var keyPair = key.keyPair;
    var address = keyPair.getAddress().toString();
    var privkey = keyPair.toWIF();
    var pubkey = keyPair.getPublicKeyBuffer().toString('hex');
    if (coinValue == 60) {
        var pubkeyBuffer = keyPair.getPublicKeyBuffer();
        var ethPubkey = libs.ethUtil.importPublic(pubkeyBuffer);
        var addressBuffer = libs.ethUtil.publicToAddress(ethPubkey);
        var hexAddress = addressBuffer.toString('hex');
        var checksumAddress = libs.ethUtil.toChecksumAddress(hexAddress);
        address = libs.ethUtil.addHexPrefix(checksumAddress);
        pubkey = libs.ethUtil.addHexPrefix(pubkey);
        privkey = libs.ethUtil.bufferToHex(keyPair.d.toBuffer(32));
    } else if (isBch) {
        address = libs.bchaddr.toCashAddress(address);
    }
    // } else if(coinValue == 245) {
    //      address = libs.bchaddrSlp.toSlpAddress(address);
    // }
    console.log('path', derivationPath)
    console.log('address', address);
    console.log('privkey', privkey);
    console.log('pubkey', pubkey);
    console.log('coinName', coinValue == 60 ? "ETH": coinValue == 0? "BTC": coinValue == 3? "DOGE": coinValue==20? "DGB": "BCH");
    return privkey
}

function generateDerivationPath(coin){
    var purpose =  44
    var account = 0
    var change = 0
    var path = "m/";
    path += purpose + "'/";
    path += coin + "'/";
    path += account + "'/";
    path += change;
    return path
}

function generateBip32ExtendedKey(path, bip32RootKey){
    var extendedKey = bip32RootKey;
        // Derive the key from the path
        var pathBits = path.split("/");
        for (var i=0; i<pathBits.length; i++) {
            var bit = pathBits[i];
            var index = parseInt(bit);
            if (isNaN(index)) {
                continue;
            }
            var hardened = bit[bit.length-1] == "'";
            var isPriv = !(extendedKey.isNeutered());
            var invalidDerivationPath = hardened && !isPriv;
            if (invalidDerivationPath) {
                extendedKey = null;
            }
            else if (hardened) {
                extendedKey = extendedKey.deriveHardened(index);
            }
            else {
                extendedKey = extendedKey.derive(index);
            }
        }
        return extendedKey;
}
