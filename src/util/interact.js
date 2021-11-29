import { ethers } from "ethers";

const managerAbi = require("../Manager.json");
const managerAddress = "0x33ff097b9F0Ca1bd4C6170dC11AD9FA387D11703";

export const addManager = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const managerContract = new ethers.Contract(managerAddress, managerAbi, signer);

  await managerContract
    .connect(signer)
    .createManager();

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
