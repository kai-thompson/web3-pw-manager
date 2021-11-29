import React from "react";
import { useState } from "react";
import { verifyPassword } from "../util/interact.js";
import { Button, Col, Form } from "react-bootstrap";
import AddPass from "./addPassword";
import GetPass from "./retrievePassword";
var CryptoJS = require("crypto-js");

export default function VerifyLogin() {
const [login, setLogin] = useState('');
const [id, setId] = useState('');
const [status, setStatus] = useState('Please enter login credentials');

  const loginPass = async () => {
    let response = await verifyPassword(login, id);
    console.log(response)
    response ? setStatus('Logged In') : setStatus('Incorrect Login')
  };

  return (
    <div>
    <Col sm={2}>
        <h5 style={{ display: "inline-block", fontFamily: "sans-serif" }}> {status}</h5>
        <Form.Control size="sm" value={id} onInput={(e) => setId(e.target.value)} placeholder="Manager ID"/>
        <Form.Control size="sm" value={login} onInput={(e) => setLogin(e.target.value)} placeholder="Login Password"/>
        <Button variant="primary" onClick={loginPass}>Add Password</Button>
    </Col>
        <AddPass login={login}/>
        <GetPass login={login}/>
    </div>
  );
}