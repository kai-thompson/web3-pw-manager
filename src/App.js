import "./App.css";
import AddManager from "./components/addManager";
import AddPass from "./components/addPassword";
import GetPass from "./components/retrievePassword";
import Wallet from "./components/wallet";

function App() {
  return (
    <div className="App">
      <div className="wallet">
        <Wallet />
      </div>
      <div className="addGetPass">
        <AddPass />
        <GetPass />
      </div>
      <div className="addManager">
        <AddManager />
      </div>
    </div>
  );
}

export default App;
