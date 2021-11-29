import { ethers } from "ethers";
var CryptoJS = require("crypto-js");

const managerAbi = require("../Manager.json");
const managerAddress = "0xb0757c80e0091E95fAD5735c3Af6403469ca8be5";

export const addManager = async (plainText, encryptedText) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const managerContract = new ethers.Contract(managerAddress, managerAbi, signer);

  await managerContract
    .connect(signer)
    .createManager(plainText, encryptedText);

  managerContract.on("newManager", (addr, id) => {
    console.log(addr + " Created new manager with ID: " + id);
  });
};

export const addPassword = async (pwd, website, id) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    const signer = provider.getSigner();
  
    const managerContract = new ethers.Contract(managerAddress, managerAbi, signer);
  
    await managerContract
      .connect(signer)
      .addPassword(pwd, website, id);
};

export const retrievePassword = async (website, id) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  
    const managerContract = new ethers.Contract(managerAddress, managerAbi, signer);
  
    const password = await managerContract
      .connect(signer)
      .retrievePassword(website, id);

    return password;
};

export const verifyPassword = async (login, id) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const managerContract = new ethers.Contract(managerAddress, managerAbi, signer);

  const verifyText = await managerContract
    .connect(signer)
    .getVerifyText(id);

  let bytes = CryptoJS.AES.decrypt(verifyText[1], login);
  let originalText = bytes.toString(CryptoJS.enc.Utf8);

  if(!verifyText[0]) return false;

  return originalText === verifyText[0]
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
      };
    }
  } else {
    return {
      address: "",
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
        };
      } else {
        return {
          address: "",
        };
      }
    } catch (err) {
      return {
        address: "",
      };
    }
  } else {
    return {
      address: "",
    };
  }
};
