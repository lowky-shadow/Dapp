import Gather from "@/pages/Gather";
import TokenLaunchpad from "@/pages/TokenLaunchpad";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link, Route, Routes } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="p-5">
        <div className="flex justify-evenly">
          <WalletMultiButton>Connect</WalletMultiButton>
          <WalletDisconnectButton>Disconnect</WalletDisconnectButton>
        </div>
        <div>
          {/* Navigation */}
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            
          </nav>

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
