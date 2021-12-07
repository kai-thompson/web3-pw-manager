import React from "react";
import { useState } from "react";
import { changeManagerPassword } from "../util/interact.js";
import { Button, Form, Col } from "react-bootstrap";

export default function ChangeManagerPwd({ id }) {
const [oldLogin, setOldLogin] = useState('');
const [newLogin, setNewLogin] = useState('');

let status = "Waiting for input..."

  const changePwd = async () => {
    const response = await changeManagerPassword(newLogin, id, oldLogin);
    if(response === true) {
        status = "Success!"
    }
    else{
        status = response;
    }
  };

  return (
    <div>
      <Col sm={2}>
        <Form.Control size="sm" value={oldLogin} onInput={(e) => setOldLogin(e.target.value)} placeholder="Enter Old Manager Password"/>
        <Form.Control size="sm" value={newLogin} onInput={(e) => setNewLogin(e.target.value)} placeholder="Enter New Manager Password"/>
        <h5 style={{ display: "inline-block", fontFamily: "sans-serif" }}>{status}</h5>
        <Button size="lg" onClick={changePwd} id="walletButton">
          Change Manager Password
        </Button>
      </Col>
    </div>
  );
}