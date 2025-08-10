import "./App.css";
import type { FC } from "react";
import { useMemo } from "react";
// import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

import Gather from "./components/Gather";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import type { Adapter } from "@solana/wallet-adapter-base";


const RPC_URL: string =
  "https://shy-damp-bird.solana-devnet.quiknode.pro/090ab3d499fc648bdbefc73a5329ce499715a6fc/";
// const DEVNET_RPC_URL: string = "https://api.devnet.solana.com";

const App: FC = () => {
  const wallets: Adapter[] = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={RPC_URL}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="m-5">
            <div className="flex gap-3 mb-4">
              <WalletMultiButton>Connect</WalletMultiButton>
              <WalletDisconnectButton>Disconnect</WalletDisconnectButton>
            </div>

            <Gather />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
