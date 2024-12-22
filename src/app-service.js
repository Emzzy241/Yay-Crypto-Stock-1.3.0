// the business logic file of my application

// updating the code for the new technology added; Async and Await functions
// this is version 1.3.0; I still couldn't make use of me converter class but I hope to be able to do that soon in upcoming versions

// export class CurrencyConvertService {
//     static async convertCurrencytToNaira() {

//         //         // wrapping up me code in a try...catch block because I want to handle the errors the Async and Await way
//         try {
//             let converterResponse = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${process.env.CONVERSION_API_KEY}&symbols=ngn&prettyprint=false&show_alternative=false`)

//             if (!converterResponse.ok) {
//                 throw Error(converterResponse.statusText);
//             }
//             return converterResponse.json();

//         }
//         catch (converrterError) {
//             // returning the message property for users when there is an error
//             return converrterError.message
//         }

//     }
// }

export class CryptoService {
  static async getAllCoins() {
    try {
      let cryptoResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`
      );

      if (!cryptoResponse.ok) {
        throw Error(cryptoResponse.statusText);
      }
      return cryptoResponse.json();
    } catch (cryptoError) {
      // fetch returns me a promise; I can then use a .then() to handle it

      // handling the error thrown above in a catch block
      return cryptoError.message;
    }
    // adding a semicolon here now tells JS that's the end of handling the response gotten
  }
}

// the class for searching crypto's
export class SearchFeature {
  static async searchMeCrypto(userSearch) {
    try {
      let searchResponse = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${userSearch}`
      );

      if (!searchResponse.ok) {
        throw Error(searchResponse.statusText);
      }
      return searchResponse.json();
    } catch (searchError) {
      return searchError.message;
    }
  }
}

// Incorporating QuickNode streams into the application

async function getLatestBlock() {
  try {
    const response = await fetch(`https://quaint-late-pine.quicknode.pro/${process.env.QUICKNODE_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_blockNumber",
        params: [],
      }),
    });

    const data = await response.json();
    const blockNumber = parseInt(date.result, 16);
    console.log("Latest block Number:", blockNumber);
    document.getElementById(
      "latest-block"
    ).innerText = `Latest Block: ${blockNumber}`;
  } catch (error) {
    console.error("Error fetching block number: ", error);
  }

  setInterval(getLatestBlock, 1000); // update every 10 seconds

}

getLatestBlock();

  // Update block number every 10 seconds
  setInterval(getLatestBlock, 10000);
  getLatestBlock();
  


  async function getEthBalance(walletAddress) {
    const response = await fetch(`https://quaint-late-pine.quicknode.pro/${process.env.QUICKNODE_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_getBalance",
        params: [walletAddress, "latest"],
      }),
    });
  
    const data = await response.json();
    const balanceInWei = parseInt(data.result, 16);
    const balanceInEth = balanceInWei / 1e18; // Convert Wei to ETH
    console.log(`Balance: ${balanceInEth} ETH`);
  }
  
  // Example Usage
  getEthBalance("0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae");
  

  async function getRecentBTCTransactions() {
    const response = await fetch(`https://quaint-late-pine.quicknode.pro/${process.env.QUICKNODE_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getblock",
        params: ["latestblockhash", true],
      }),
    });
  
    const data = await response.json();
    console.log("Recent Transactions:", data.result.tx);
  }
  
  getRecentBTCTransactions();
  