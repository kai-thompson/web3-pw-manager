import React from "react";
import { useState } from "react";
import { addPassword } from "../util/interact.js";
import { Button, Col, Form } from "react-bootstrap";
import cryptoRandomString from 'crypto-random-string';
var CryptoJS = require("crypto-js");

export default function AddPass({ login }) {
const [password, setPassword] = useState('');
const [website, setWebsite] = useState('');
const [id, setId] = useState('');

let ciphertext = CryptoJS.AES.encrypt(password, login).toString();

  const addPass = () => {
    addPassword(ciphertext, website, id);
  };

  return (
    <div>
    <Col sm={2}>
        <Form.Control size="sm" value={password} onInput={(e) => setPassword(e.target.value)} placeholder="Password"/>
        <Form.Control size="sm" value={website} onInput={(e) => setWebsite(e.target.value)} placeholder="Website URL"/>
        <Form.Control size="sm" value={id} onInput={(e) => setId(e.target.value)} placeholder="Manager ID"/>
        <Button variant="primary" onClick={addPass}>Add Password</Button>
    </Col>
    </div>
  );
}