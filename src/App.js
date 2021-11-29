import "./App.css";
import AddManager from "./components/addManager";
import Wallet from "./components/wallet";
import VerifyLogin from "./components/login";

function App() {
  return (
    <div className="App">
      <div className="wallet">
        <Wallet />
      </div>
      <div className="Actions">
        <VerifyLogin/>
      </div>
      <div className="addManager">
        <AddManager />
      </div>
    </div>
  );
}

export default App;
