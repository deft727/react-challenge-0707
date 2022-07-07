import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './style.css';
import { useLogin } from "components/contexts/LoginContextContainer";
import { NotiArea } from 'components/atoms/NotiArea';
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";

export function Dashboard() {
  const navigate = useNavigate();
  const { emails, checkedEmails, setCheckedEmails } = useLogin();
  const [showNoti, setShowNoti] = useState(false);
  const [message, setMessage] = useState('');
  const [activeEmail, setActiveEmail] = useState(null);

  const onLogout = () => {
    navigate('/logout')
  }

  const onEmailReply = (type='positive') => {
    if(type === 'positive') {
      findNextEmail()
      // navigate('/overview');
    }else if(type === 'neutral'){
      // next email
      findNextEmail()
    }else {
      // next email
      findNextEmail()
    }
  }

  const sessionExpired = () => {
    // show modal
    // next email
    findNextEmail()
  }

  const findNextEmail = () => {
    if(activeEmail) {
      setActiveEmail(null)
      const updatedCheckedEmails = [...checkedEmails]
      updatedCheckedEmails.push({...activeEmail, ...{status: 'checked'}})
      setCheckedEmails(updatedCheckedEmails)
    }

    for (const pendingEmail of emails) {
      const chk = checkedEmails.findIndex(el => el.subject === pendingEmail.subject)
      if(chk === -1) {
        setActiveEmail(pendingEmail)
        break;
      }
    }
  }

  useEffect(() => {
    findNextEmail()
  }, [])

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <Countdown date={Date.now() + 120000} onComplete={sessionExpired}></Countdown>
          </Col>
          <Col md="auto"></Col>
          <Col xs lg="2" className='text-right'>
            <Button type="button" variant='dark' onClick={onLogout}>Logout</Button>
          </Col>
        </Row>
        <Row className='mt-100'>
          <Col className='text-center'>
            <Button type="button" variant="primary" onClick={() => onEmailReply('positive')}>POSITIVE REPLY</Button>
          </Col>
          <Col className='text-center'>
            <Button type="button" variant="primary" onClick={() => onEmailReply('neutral')}>NEUTRAL REPLY</Button>
          </Col>
          <Col className='text-center'>
            <Button type="button" variant="primary" onClick={() => onEmailReply('not')}>NOT A LEAD</Button>
          </Col>
        </Row>
        {activeEmail ? (
        <Row className="mt-5">
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control placeholder="Subject" value={activeEmail.subject} readOnly/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email body</Form.Label>
                <Form.Control as="textarea" rows={15}  placeholder="Email body" value={activeEmail.body} readOnly/>
              </Form.Group>
            </Form>
          </Col>
        </Row>) 
        : (
        <Row className="mt-5">
          <Col>
            <p className='text-center'>There is no email to checkout</p>
          </Col>
        </Row>
        )}
      </Container>
      <NotiArea show={showNoti} message={message} onHide={() => {setMessage(''); setShowNoti(false);}} />
    </>
  );
}

