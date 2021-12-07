import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddManager from "./components/addManager";
import Wallet from "./components/wallet";
import VerifyLogin from "./components/login";
import ChangeManagerPwd from "./components/changeManagerPassword";
import GetPass from "./components/retrievePassword";
import AddPass from "./components/addPassword";

function App() {
  const [login, setLogin] = useState();
  const [manager, setManager] = useState()

  return (
    // <div className="App">
    // <Wallet />
    // <VerifyLogin setLogin={setLogin} setManager={setManager}/>
    // <Routes>
    //   {/* <Route path="/home">
    //     <AddPass login={login} id={manager}/>
    //     <GetPass login={login} id={manager}/>
    //     <ChangeManagerPwd id={manager} />
    //   </Route> */}
    //   <Route path="/create-manager">
    //     <AddManager/>
    //   </Route>
    // </Routes>
    // </div>

    <div className="App">
    <Wallet />
    <VerifyLogin setLogin={setLogin} setManager={setManager}/>
    <AddManager/>
    <AddPass login={login} id={manager}/>
    <GetPass login={login} id={manager}/>
    <ChangeManagerPwd id={manager} />
    </div>
  );
}

export default App;
