export const Network = `rinkeby`;

export const EtherscanBaseAPI = `https://api-${Network}.etherscan.io/api`;

export const EtherscanAPIKEY = `WCVDU52748WW4F7EKDEDB89HKH41BIA4N2`;

export const IPFSLink = `https://${Network}.infura.io/v3`;

export const WalletPrivateKey =
  "33e8389993eea0488d813b34ee8d8d84f74f204c17b95896e9380afc6a514dc7";

export const InfuraProjectId = `10c69a1702e04868aa5c87e4a1063cfb`;

// export const InfuraNodeURL = `https://${Network}.infura.io/v3/${InfuraProjectId}`;
export const InfuraNodeURL = `https://eth-rinkeby.alchemyapi.io/v2/yyMuLAplkUWu7tJMqY-QIHUYoW-Y_jF3`;

export const IpfsViewLink = (fingerprint) =>
  `https://ipfs.infura.io/ipfs/${fingerprint}`;

export const ViewTransctionDetailsLink = (transactionHash) =>
  `https://${Network}.etherscan.io/tx/${transactionHash}`;
