import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

const WalletAddress = () => {
  
  const wallet = useWallet();
  const [copied, setCopied] = useState(false);

  const address = wallet.publicKey?.toBase58() || "";
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-6)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 800); // reset after 
  };

  return (
    <button
      onClick={handleCopy}
      className="bg-slate-800 p-3 rounded-2xl hover:bg-slate-700 cursor-pointer font-mono"
    >
      {copied ? (
        <span className="transition-opacity duration-300">Copied</span>
      ) : (
        shortAddress
      )}
    </button>
  );
}

export default WalletAddress;