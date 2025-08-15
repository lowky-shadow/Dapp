import Gather from "@/pages/Gather";
import TokenLaunchpad from "@/pages/TokenLaunchpad";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Link, Route, Routes } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="p-5 ">
        <div className="flex justify-around">
          {/* Wallet Connect Buttons */}
          <div className="flex justify-evenly w-1/3">
            <WalletMultiButton>Connect</WalletMultiButton>
            <WalletDisconnectButton>Disconnect</WalletDisconnectButton>
          </div>

          {/* Navigation */}
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link to="/">Home</Link>
            <Link to="/launchpad">Launchpad</Link>
          </nav>
        </div>

        <div>
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Gather />} />
            <Route path="/launchpad" element={<TokenLaunchpad />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default NavBar;
