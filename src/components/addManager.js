import React from "react";
import { useState } from "react";
import { addManager } from "../util/interact.js";
import { Button, Form, Col } from "react-bootstrap";
import cryptoRandomString from 'crypto-random-string';
var CryptoJS = require("crypto-js");

export default function AddManager() {
const [login, setLogin] = useState('');

let msg = cryptoRandomString({length: 10});

let ciphertext = CryptoJS.AES.encrypt(msg, login).toString();

  const addMngr = () => {
    addManager(msg, ciphertext);
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