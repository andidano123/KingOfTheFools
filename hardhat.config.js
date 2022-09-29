/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/7c9448a2f76049feb2c7efc4b2d529e5`,
      accounts: ["0x5b8fd754513435ede9586f7405f0634b9db5faf9345f601871b59a5b0397fc55"]
    }
  }
};
