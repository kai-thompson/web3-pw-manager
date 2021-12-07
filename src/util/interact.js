import { ethers } from "ethers";
import cryptoRandomString from 'crypto-random-string';
var CryptoJS = require("crypto-js");

const managerAbi = require("../Manager.json");
const managerAddress = "0x8E7cC2ca44116C8222235D4ECeF2e3F22FB3Fc7C";

export const addManager = async (login) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  let plainText = cryptoRandomString({length: 10});

  let encryptedText = CryptoJS.AES.encrypt(plainText, login).toString();

  const signer = provider.getSigner();

  const managerContract = new ethers.Contract(managerAddress, managerAbi, signer);

  await managerContract
    .connect(signer)
    .createManager(plainText, encryptedText);

  managerContract.on("newManager", (addr, id) => {
    console.log(addr + " Created new manager with ID: " + id);
  });
};

export const addPassword = async (website, id, login) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    const signer = provider.getSigner();

    let password = cryptoRandomString({length: 24});

    let pwd = CryptoJS.AES.encrypt(password, login).toString();
  
    const managerContract = new ethers.Contract(managerAddress, managerAbi, signer);
  
    await managerContract
      .connect(signer)
      .addPassword(pwd, website, id);
};

export const retrievePassword = async (website, id, login) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  
    const managerContract = new ethers.Contract(managerAddress, managerAbi, signer);
  
    const password = await managerContract
      .connect(signer)
      .retrievePassword(website, id);

    const bytes = CryptoJS.AES.decrypt(password, login);

    return bytes.toString(CryptoJS.enc.Utf8)
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

export const changeManagerPassword = async (newPass, id, login) => {
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
  
    const managerContract = new ethers.Contract(managerAddress, managerAbi, signer);
  
    const siteArr = await managerContract
      .connect(signer)
      .retrieveSiteArr(id);
  
    let newArr = [];
  
    for(let i = 0; i < siteArr.length; i++) {
      let site = siteArr[i].substring(0, siteArr[i].length - 32);
      const sitePass = await managerContract
      .connect(signer)
      .retrievePassword(site, id);
      
      let bytes = CryptoJS.AES.decrypt(sitePass, login);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      newArr.push(CryptoJS.AES.encrypt(originalText, newPass).toString());
    }
  
    let plainText = cryptoRandomString({length: 10});
  
    let encryptedText = CryptoJS.AES.encrypt(plainText, newPass).toString();
  
    await managerContract
    .connect(signer)
    .changeMangerPassword(newArr, plainText, encryptedText, id);
    
    return true;
  }
  catch(err) {
    return err;
  }
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
