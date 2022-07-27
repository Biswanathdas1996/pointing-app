export const Network = `rinkeby`;

export const EtherscanBaseAPI = `https://api-${Network}.etherscan.io/api`;

export const EtherscanAPIKEY = `WCVDU52748WW4F7EKDEDB89HKH41BIA4N2`;

export const IPFSLink = `https://${Network}.infura.io/v3`;

export const WalletPrivateKey = get_random([
  "33e8389993eea0488d813b34ee8d8d84f74f204c17b95896e9380afc6a514dc7",
  "82e4fb5555837b975e4402a02c2fbe230ae7d4d61574ee00ed2b1ff79be84195",
  "8c5948e0dbc4163b176ea8cfb7ca6a3d2e9c52d2d1df7c363fababb8f2eb6f42",
  "52a59a41b5a60ff025a5ad6329bcbd3b05fe0d57e5d3aea8a7ed544c8bafa5e1",
]);

function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export const InfuraProjectId = `10c69a1702e04868aa5c87e4a1063cfb`;

// export const InfuraNodeURL = `https://${Network}.infura.io/v3/${InfuraProjectId}`;
export const InfuraNodeURL = `https://eth-rinkeby.alchemyapi.io/v2/yyMuLAplkUWu7tJMqY-QIHUYoW-Y_jF3`;

export const IpfsViewLink = (fingerprint) =>
  `https://ipfs.infura.io/ipfs/${fingerprint}`;

export const ViewTransctionDetailsLink = (transactionHash) =>
  `https://${Network}.etherscan.io/tx/${transactionHash}`;
