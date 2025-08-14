import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useState } from "react";


export function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    if (!publicKey) throw new Error("Wallet not connected!");
    if (!signMessage)
      throw new Error("Wallet does not support message signing!");

    setIsLoading(true);
    const encodedMessage = new TextEncoder().encode(message.trim());
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
      throw new Error("Message signature invalid!");
    console.log(`Message signature: ${bs58.encode(signature)}`)
    alert("Success : Message signed Successfully");
    setMessage("");
    setIsLoading(false);
  }

  return (
    <div className="border p-5 rounded ">
      <div className="flex gap-3">
        <input
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          value={message}
          placeholder="Message"
          className="border p-2 rounded min-w-1/3"
        />
        <button
          onClick={onClick}
          className={`border p-3 rounded min-w-1/3 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } `}
        >
          {isLoading ? "Signing..." : "Sign the message"}
        </button>
      </div>
    </div>
  );
}
