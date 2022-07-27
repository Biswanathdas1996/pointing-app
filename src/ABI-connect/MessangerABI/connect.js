import _ from "lodash";
import Web3 from "web3";
import ABI from "./ABI.json";
import ADDRESS from "./Address.json";
import { WalletPrivateKey, InfuraNodeURL } from "../../config";
import { decode } from "js-base64";

// const web3 = new Web3(new Web3.providers.HttpProvider(InfuraNodeURL));
const web3 = new Web3(InfuraNodeURL);

export const _create_new_account = async () => {
  const account = await web3.eth.accounts.create();
  return account;
};

export const _transction = async (service, ...props) => {
  const uid =
    localStorage.getItem("uid") && decode(localStorage.getItem("uid"));
  let signer;
  let contract;
  if (uid) {
    signer = web3.eth.accounts.privateKeyToAccount(uid);
    web3.eth.accounts.wallet.add(signer);
    contract = new web3.eth.Contract(ABI, ADDRESS);
  } else {
    signer = web3.eth.accounts.privateKeyToAccount(WalletPrivateKey);
    web3.eth.accounts.wallet.add(signer);
    contract = new web3.eth.Contract(ABI, ADDRESS);
  }
  const callService = _.get(contract, ["methods", service]);

  const tx = callService(...props);

  const responseData = await tx
    .send({
      from: signer.address,
      // gas: await tx.estimateGas(),
      gas: "4700000",
      value: 0,
    })
    // .then((data) => data)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(txhash);
      return txhash;
    })
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

export const _paid_transction = async (cost, service, ...props) => {
  const uid =
    localStorage.getItem("uid") && decode(localStorage.getItem("uid"));
  let signer;
  let contract;
  if (uid) {
    signer = web3.eth.accounts.privateKeyToAccount(uid);
    web3.eth.accounts.wallet.add(signer);
    contract = new web3.eth.Contract(ABI, ADDRESS);
  } else {
    signer = web3.eth.accounts.privateKeyToAccount(WalletPrivateKey);
    web3.eth.accounts.wallet.add(signer);
    contract = new web3.eth.Contract(ABI, ADDRESS);
  }

  const callService = _.get(contract, ["methods", service]);

  const responseData = await callService(...props)
    .send({
      from: signer.address,
      value: cost,
    })
    .then((data) => data)
    .catch((error) => {
      const errorData = { error };
      return { error: errorData.error };
    });
  return responseData;
};

export const _account = async () => {
  const uid = localStorage.getItem("uid");
  if (uid) {
    return decode(uid);
  } else {
    return null;
  }
};

export const _fetch = async (service, ...props) => {
  const uid =
    localStorage.getItem("uid") && decode(localStorage.getItem("uid"));
  let signer;
  let contract;
  if (uid) {
    signer = web3.eth.accounts.privateKeyToAccount(uid);
    web3.eth.accounts.wallet.add(signer);
    contract = new web3.eth.Contract(ABI, ADDRESS);
  } else {
    signer = web3.eth.accounts.privateKeyToAccount(WalletPrivateKey);
    web3.eth.accounts.wallet.add(signer);
    contract = new web3.eth.Contract(ABI, ADDRESS);
  }
  const callService = _.get(contract, ["methods", service]);
  let data;
  if (props) {
    data = await callService(...props).call();
  } else {
    data = await callService().call();
  }

  return data;
};
