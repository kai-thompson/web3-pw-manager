import React from "react";
import { useState } from "react";
import { addPassword } from "../util/interact.js";
import { Button, Col, Form } from "react-bootstrap";

export default function AddPass() {
const [password, setPassword] = useState('');
const [website, setWebsite] = useState('');
const [id, setId] = useState('');

  const addPass = () => {
    addPassword(password, website, id);
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