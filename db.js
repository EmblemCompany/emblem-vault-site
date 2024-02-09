export const openDB = async () => {
    if (!('indexedDB' in window)) {
        console.error('IndexedDB is not supported by this browser.');
        return null;
    }

    return new Promise((resolve, reject) => {
        const request = indexedDB.open('MyDatabase', 1);

        request.onerror = (event) => {
            console.error('Database error:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('vaults')) {
                db.createObjectStore('vaults', { keyPath: 'tokenId' });
            }
        };
    });
};

export const deleteDB = async () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.deleteDatabase('MyDatabase');

        request.onerror = (event) => {
            console.error('Database error:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = () => {
            resolve(true);
        };
    });
};


export const getCachedVaults = async (vaultType, account) => {
    console.log("getVaults - start");
    const db = await openDB();
    if (!db) {
        console.error('Failed to open database');
        throw new Error('Failed to open database');
    }

    const transaction = db.transaction(['vaults'], 'readonly');
    const store = transaction.objectStore('vaults');
    const request = store.getAll();

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            console.log("All vaults successfully retrieved from store");
            const filteredVaults = request.result.filter(record => { 
                return (vaultType === record.ownership?.status || vaultType === record.ownershipInfo?.status)
            })
                .filter(record => { 
                    if (vaultType == "claimed") {
                        return (account === record.ownership?.claimedBy || account === record.ownershipInfo?.claimedBy);
                    }  
                    else if (vaultType == "unminted") {
                        return (record.ownership?.createdBy === account || account === record.ownershipInfo?.createdBy);
                    }
                    else {
                        return (account === record.ownership?.owner || account === record.ownershipInfo?.owner);
                    }
                });
            resolve(filteredVaults);
        };
        request.onerror = (event) => {
            console.error('Error retrieving vaults from store:', event.target.error);
            reject(event.target.error);
        };
    });
};

export const getCachedVault = async (tokenId) => {
    console.log("getVaults - start");
    const db = await openDB();
    if (!db) {
        console.error('Failed to open database');
        throw new Error('Failed to open database');
    }

    const transaction = db.transaction(['vaults'], 'readonly');
    const store = transaction.objectStore('vaults');
    const request = store.get(tokenId);

    return new Promise((resolve, reject) => {
        request.onsuccess = () => {
            console.log("All vaults successfully retrieved from store");
            // const filteredVault = request.result.filter(record => tokenId === record.tokenId)
            resolve(request.result);
        };
        request.onerror = (event) => {
            console.error('Error retrieving vaults from store:', event.target.error);
            reject(event.target.error);
        };
    });
};


// Use this function to interact with the database
export const saveVaultsToDatabase = async (jsonData) => {
    console.log("useDB - start");
    const db = await openDB();
    if (!db) {
        console.error('Failed to open database');
        throw new Error('Failed to open database');
    }

    const transaction = db.transaction(['vaults'], 'readwrite');
    const store = transaction.objectStore('vaults');

    return new Promise((resolve, reject) => {
        jsonData.forEach((item, index) => {
            console.log(`Processing item ${index}`, item);
            if (!item.tokenId) {
                console.error('Item missing tokenId:', item);
                return; // Skip this item
            }

            const getRequest = store.get(item.tokenId);
            getRequest.onsuccess = () => {
                console.log(`Got vault ${item.tokenId} from store`);
                if (!getRequest.result) {
                    console.error('Item missing tokenId:', item);
                    resolve(insertItem(store, item, index, reject));
                }
                if (getRequest && getRequest.result && !getRequest.result.addresses) {
                    resolve(insertItem(store, item, index, reject));
                }
            };
            getRequest.onerror = (event) => {
                console.error('Item missing tokenId:', item);
                resolve(insertItem(store, item, index, reject));
            };

            // const request = insertItem(store, item, index, reject);
        });

        transaction.oncomplete = () => {
            console.log("Transaction complete");
            db.close();
            resolve(true);
        };

        transaction.onerror = (event) => {
            console.error('Transaction error:', event.target.error);
            db.close();
            reject(event.target.error);
        };
    });
};

export const saveVaultToDatabase = async (jsonData) => {
    console.log("useDB - start");
    const db = await openDB();
    if (!db) {
        console.error('Failed to open database');
        throw new Error('Failed to open database');
    }

    const transaction = db.transaction(['vaults'], 'readwrite');
    const store = transaction.objectStore('vaults');

    return new Promise((resolve, reject) => {

        const request = store.put(jsonData);
        request.onsuccess = () => {
            console.log(`Item ${jsonData.tokenId} successfully put into store`);
        };
        request.onerror = (event) => {
            console.error(`Error putting item ${index} into store:`, event.target.error);
            reject(event.target.error);
        };

        transaction.oncomplete = () => {
            console.log("Transaction complete");
            db.close();
            resolve(true);
        };

        transaction.onerror = (event) => {
            console.error('Transaction error:', event.target.error);
            db.close();
            reject(event.target.error);
        };
    });
};


export const deleteVaultFromDatabase = async (tokenId) => {
    console.log("deleteVaultFromDatabase - start");
    const db = await openDB();
    if (!db) {
        console.error('Failed to open database');
        throw new Error('Failed to open database');
    }

    const transaction = db.transaction(['vaults'], 'readwrite');
    const store = transaction.objectStore('vaults');

    return new Promise((resolve, reject) => {
        deleteItem(store, tokenId, tokenId, reject);

        transaction.oncomplete = () => {
            console.log("Transaction complete");
            db.close();
            resolve(true);
        };

        transaction.onerror = (event) => {
            console.error('Transaction error:', event.target.error);
            db.close();
            reject(event.target.error);
        };
    });
}


export function deleteItem(store, item, index, reject) {
    const request = store.delete(item);
    request.onsuccess = () => {
        console.log(`Item ${index} successfully deleted from store`);
    };
    request.onerror = (event) => {
        console.error(`Error deleting item ${index} from store:`, event.target.error);
        reject(event.target.error);
    };
    return request;
}



function insertItem(store, item, index, reject) {
    const request = store.put(item);
    request.onsuccess = () => {
        console.log(`Item ${index} successfully put into store`);
    };
    request.onerror = (event) => {
        console.error(`Error putting item ${index} into store:`, event.target.error);
        reject(event.target.error);
    };
    return request;
}

