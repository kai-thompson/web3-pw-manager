import React from "react";
import { useState } from "react";
import { addPassword } from "../util/interact.js";
import { Button, Col, Form } from "react-bootstrap";

export default function AddPass({ login, id }) {
const [website, setWebsite] = useState('');

  const addPass = () => {
    addPassword(website, id, login);
  };

  return (
    <div>
    <Col sm={2}>
        <Form.Control size="sm" value={website} onInput={(e) => setWebsite(e.target.value)} placeholder="Website URL"/>
        <Button variant="primary" onClick={addPass}>Add Password</Button>
    </Col>
    </div>
  );
}