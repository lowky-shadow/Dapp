import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

function Airdrop() {
  const wallet = useWallet();
  const [amount, setAmount] = useState(0);
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  if (!wallet.publicKey) return;

  connection
    .getBalance(wallet.publicKey)
    .then((bal) => setBalance(bal / LAMPORTS_PER_SOL));

  async function airdrop(amountSol: number) {
    try {
      if (!wallet.publicKey) return;
      await connection.requestAirdrop(
        wallet.publicKey,
        amountSol * LAMPORTS_PER_SOL
      );

      alert("Airdrop successful!");
    } catch (err) {
      console.error(err);
      alert(`Airdrop failed! ${err}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function callAirDrop() {
    setIsLoading(true);
    await airdrop(amount);
  }

  return (
    <div className="p-4 border rounded mb-2 mt-2 ">
      <div className="flex gap-3 ">
        <input
          type="number"
          placeholder="Enter airdrop amount (SOL)"
          className="border p-2 rounded ml-3 min-w-1/3"
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button
          onClick={callAirDrop}
          className={`border p-3 rounded min-w-1/3 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } `}
        >
          {isLoading ? "Sending..." : "Send Airdrop"}
        </button>
      </div>
      <div className="p-3 text-2xl">
        Wallet Address: {wallet.publicKey?.toBase58()}
      </div>
      <div className="p-3 text-2xl"> Balance: {balance} Sol</div>
    </div>
  );
}

export default Airdrop;
