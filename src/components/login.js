import React from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import { verifyPassword } from "../util/interact.js";
import { Button, Col, Form } from "react-bootstrap";

export default function VerifyLogin({ setLogin, setManager }) {
const [masterPass, setMasterPass] = useState('');
const [id, setId] = useState('');
const [status, setStatus] = useState('Please enter login credentials');

  const loginPass = async () => {
    let response = await verifyPassword(masterPass, id);
    if(response) {
      setStatus('Logged In');
      setLogin(masterPass);
      setManager(id);
    } else {
      setStatus('Incorrect Login');
    }
  };

  return (
    <div>
    <Col sm={2}>
        <h5 style={{ display: "inline-block", fontFamily: "sans-serif" }}> {status}</h5>
        <Form.Control size="sm" value={id} onInput={(e) => setId(e.target.value)} placeholder="Manager ID"/>
        <Form.Control size="sm" value={masterPass} onInput={(e) => setMasterPass(e.target.value)} placeholder="Login Password"/>
        <Button variant="primary" onClick={loginPass}>Login</Button>
    </Col>
    </div>
  );
}

VerifyLogin.propTypes = {
  setLogin: PropTypes.func.isRequired,
  setManager: PropTypes.func.isRequired
};