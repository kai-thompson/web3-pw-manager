import React from "react";
import { useState } from "react";
import { addManager } from "../util/interact.js";
import { Button, Form, Col } from "react-bootstrap";

export default function AddManager() {
const [login, setLogin] = useState('');

  const addMngr = () => {
    addManager(login);
  };

  return (
    <div>
      <Col sm={2}>
        <Form.Control size="sm" value={login} onInput={(e) => setLogin(e.target.value)} placeholder="Enter New Manager Password"/>
        <Button size="lg" onClick={addMngr} id="walletButton">
          Add Manager
        </Button>
      </Col>
    </div>
  );
}