import React from "react";
import { useState } from "react";
import { retrievePassword } from "../util/interact.js";
import { Button, Col, Form } from "react-bootstrap";

export default function GetPass({ login, id}) {
const [website, setWebsite] = useState('');
const [password, setPassword] = useState('Undefined');

  const getPass = async () => {
    let returnedPass = await retrievePassword(website, id, login);
    setPassword(returnedPass);
  };

  return (
    <div>
    <Col sm={2}>
        <Form.Control size="sm" value={website} onInput={(e) => setWebsite(e.target.value)} placeholder="Website URL"/>
        <Button variant="primary" onClick={getPass}>Get Password</Button>
        <h5 style={{ display: "inline-block", fontFamily: "sans-serif" }}>Returned Password: {password}</h5>
    </Col>
    </div>
  );
}