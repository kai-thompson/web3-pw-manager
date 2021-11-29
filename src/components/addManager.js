import React from "react";
import { addManager } from "../util/interact.js";
import { Button } from "react-bootstrap";

export default function AddManager() {

  const addMngr = () => {
    addManager();
  };

  return (
    <div>
      <Button size="lg" onClick={addMngr} id="walletButton">
        Add Manager
      </Button>
    </div>
  );
}