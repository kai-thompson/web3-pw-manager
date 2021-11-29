import React from "react";
import { useState } from "react";
import { retrievePassword } from "../util/interact.js";
import { Button, Col, Form } from "react-bootstrap";
var CryptoJS = require("crypto-js");

export default function GetPass({ login }) {
const [website, setWebsite] = useState('');
const [id, setId] = useState('');
const [password, setPassword] = useState('Undefined');

  const getPass = async () => {
    let ciphertext = await retrievePassword(website, id);
    var bytes = CryptoJS.AES.decrypt(ciphertext, login);
    setPassword(bytes.toString(CryptoJS.enc.Utf8));
  };

  return (
    <div>
    <Col sm={2}>
        <Form.Control size="sm" value={website} onInput={(e) => setWebsite(e.target.value)} placeholder="Website URL"/>
        <Form.Control size="sm" value={id} onInput={(e) => setId(e.target.value)} placeholder="Manager ID"/>
        <Button variant="primary" onClick={getPass}>Get Password</Button>
        <h5 style={{ display: "inline-block", fontFamily: "sans-serif" }}>Returned Password: {password}</h5>
    </Col>
    </div>
  );
}