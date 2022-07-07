import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './style.css';
import { useLogin } from "components/contexts/LoginContextContainer";
import { NotiArea } from 'components/atoms/NotiArea';
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const { users, login } = useLogin();
  const [selUser, setSelUser] = useState('');
  const [showNoti, setShowNoti] = useState(false);
  const [message, setMessage] = useState('');


  const onLogin = () => {
    if(selUser === '') {
      setMessage('Please select an user');
      setShowNoti(true);
    }else {
      // login user
      const expired = Math.floor(Date.now() / 1000) + 10 * 60; // 10 mins
      login(selUser, expired);
      navigate('/dashboard')
    }
  }


  return (
    <>
      <Container className="mt-100">
        <Row className="justify-content-md-center">
          <Col md="auto" className='text-center'>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>User</Form.Label>
                <Form.Select onChange={(e) => setSelUser(e.target.value)}>
                  <option value={''} >Select user</option>
                  {users.map( (u, index) => <option value={u.name} key={index}>{u.name}</option>)}
                </Form.Select>
              </Form.Group>
              <Button type="button" onClick={onLogin}>Login</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <NotiArea show={showNoti} message={message} onHide={() => {setMessage(''); setShowNoti(false);}} />
    </>
  );
}

