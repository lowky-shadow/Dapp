import type { FC, ChangeEvent } from "react";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";

interface SendSolProps {}

const SendSol: FC<SendSolProps> = () => {
  const [amount, setAmount] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const wallet = useWallet();
  const { connection } = useConnection();

  if (!wallet.publicKey) return;

  // Validation helper
  const isValidAddress = (addr: string): boolean => {
    try {
      new PublicKey(addr);
      return true;
    } catch {
      return false;
    }
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAmount(e.target.value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setAddress(e.target.value);
  };

  const sendSol = async (): Promise<void> => {
    // Input validation
    if (!wallet.publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!address.trim()) { //if address is empty
      alert("Please enter a recipient address!");
      return;
    }

    if (!isValidAddress(address.trim())) { //if address is invalid
      alert("Invalid Solana address!");
      return;
    }

    const numAmount: number = parseFloat(amount);
    if (!numAmount || numAmount <= 0) { //if it is zero of negative, return
      alert("Please enter a valid amount greater than 0!");
      return;
    }

    setIsLoading(true);

    try {
      // Check balance first
      const balance: number = await connection.getBalance(wallet.publicKey);
      const balanceInSol: number = balance / LAMPORTS_PER_SOL;

      //balanceInSol is the balance you have
      //numAmount is the amount you want to send
      if (balanceInSol < numAmount) {
        alert(`Insufficient balance! You have ${balanceInSol.toFixed(4)} SOL`);
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(address.trim()),
          lamports: Math.floor(numAmount * LAMPORTS_PER_SOL),
        })
      );

      // Get latest blockhash
      const latestBlockhash = await connection.getLatestBlockhash();

      // Send the transaction
      const signature: string = await wallet.sendTransaction(
        transaction,
        connection
      );

      console.log(`Transaction sent: ${signature}`);

      // Confirm the transaction
      await connection.confirmTransaction(
        {
          signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        },
        "confirmed"
      );

      alert(`Transaction successful! Signature: ${signature.slice(0, 20)}...`);

      // Clear form
      setAmount("");
      setAddress("");
    } catch (err: unknown) {
      console.error("Transaction error:", err);

      const errorMessage = err instanceof Error ? err.message : "Unknown error";

      if (errorMessage.includes("User rejected")) {
        alert("Transaction was cancelled.");
      } else if (errorMessage.includes("insufficient")) {
        alert("Insufficient funds for transaction and fees!");
      } else {
        alert(`Transaction failed: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-3">Send SOL</h3>

      <div className="flex flex-col gap-3 max-w-md">
        <input
          type="text"
          placeholder="Recipient address"
          className="p-2 border rounded"
          value={address}
          onChange={handleAddressChange}
          disabled={isLoading}
        />

        <input
          type="number"
          placeholder="Amount (SOL)"
          className="p-2 border rounded"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          step="0.001"
          disabled={isLoading}
        />

        <button
          className={`p-3 rounded font-medium ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          onClick={sendSol}
          disabled={isLoading || !wallet.publicKey}
        >
          {isLoading ? "Sending..." : "Send SOL"}
        </button>
      </div>
    </div>
  );
};

export default SendSol;
