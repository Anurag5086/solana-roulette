const web3 = require("@solana/web3.js");

const requestAirdrop = async (userPublicKey, connection, solAmount) => {
  const fromAirDropSignature = await connection.requestAirdrop(
    new web3.PublicKey(userPublicKey),
    solAmount * web3.LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(fromAirDropSignature);
};

const checkBalance = async (userPublicKey, connection) => {
  const balance = await connection.getBalance(userPublicKey);
  console.log(balance / web3.LAMPORTS_PER_SOL + " SOL");
};

const transferSOL = async (from, to, transferAmt, connection) => {
  try {
    const transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: new web3.PublicKey(from.publicKey.toString()),
        toPubkey: new web3.PublicKey(to.publicKey.toString()),
        lamports: transferAmt * web3.LAMPORTS_PER_SOL,
      })
    );
    const signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [from]
    );
    return signature;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  transferSOL,
  checkBalance,
  requestAirdrop,
};
