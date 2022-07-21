export const Network: string = `rinkeby`;

export const EtherscanBaseAPI = `https://api-${Network}.etherscan.io/api`;

export const EtherscanAPIKEY = `WCVDU52748WW4F7EKDEDB89HKH41BIA4N2`;

export const IPFSLink: any = `https://ipfs.infura.io:5001/api/v0`;

export const WalletPrivateKey =
  "33e8389993eea0488d813b34ee8d8d84f74f204c17b95896e9380afc6a514dc7";

export const InfuraProjectId = `24022fda545f41beb59334bdbaf3ef32`;

export const InfuraNodeURL = `https://${Network}.infura.io/v3/${InfuraProjectId}`;

export const IpfsViewLink = (fingerprint: string) =>
  `https://ipfs.infura.io/ipfs/${fingerprint}`;

export const ViewTransctionDetailsLink = (transactionHash: string) =>
  `https://${Network}.etherscan.io/tx/${transactionHash}`;
