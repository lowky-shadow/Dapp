import { useState } from "react";
import {getMinimumBalanceForRentExemptMint} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

function TokenLaunchpad() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [supply, setSupply] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {connection} = useConnection();
  const wallet = useWallet();
  
  async function createToken() {
    // const lamport = await getMinimumBalanceForRentExemptMint(connection);
  }

  const inputText = "p-5 w-[50%] border";
  return (
    <div className=" flex justify-center items-center  flex-col mt-10">
      <h1 className="text-3xl p-5">Solana Token Launchpad</h1>
      <input
        className={inputText}
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      ></input>{" "}
      <br />
      <input
        className={inputText}
        type="text"
        placeholder="Symbol"
        onChange={(e) => setSymbol(e.target.value)}
      ></input>{" "}
      <br />
      <input
        className={inputText}
        type="text"
        placeholder="Image URL"
        onChange={(e) => setImageUrl(e.target.value)}
      ></input>{" "}
      <br />
      <input
        className={inputText}
        type="text"
        placeholder="Initial Supply"
        onChange={(e) => setSupply(e.target.value)}
      ></input>{" "}
      <br />
      <button
        className={`border p-3 rounded min-w-1/3 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        } `}
        onClick={createToken}
      >
        Create a token
      </button>
    </div>
  );
}

export default TokenLaunchpad;
