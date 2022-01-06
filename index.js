const web3 = require("@solana/web3.js");
const inquirer = require("inquirer");
const { transferSOL, checkBalance, requestAirdrop } = require("./solana");

const driverFunction = async () => {
  //creating the connection with the devnet of solana
  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );

  let userInput = [
    {
      type: "string",
      name: "SenderAddress",
      message: "Enter Senders Wallet Address: ",
    },
    {
      type: "string",
      name: "RecieverAddress",
      message: "Enter Receivers Wallet Address: ",
    },
    {
      type: "string",
      name: "Amount",
      message: "Enter Amount To Be Transferred: ",
    },
  ];

  inquirer.prompt(userInput).then(async (answers) => {
    let SenderAddress = new TextEncoder().encode(answers["SenderAddress"]);
    let RecieverAddress = new TextEncoder().encode(answers["RecieverAddress"]);
    let Amount = new TextEncoder().encode(answers["Amount"]);

    console.log(SenderAddress.toString());

    await transferSOL(SenderAddress, RecieverAddress, Amount);
    await checkBalance(RecieverAddress.publicKey, connection);
  });
};

driverFunction();
