import './App.css';
import { Button, Card, Form, Row } from 'react-bootstrap';
import React, { useRef, useState } from 'react';




function App() {

  const cardNumberRef = useRef(null);
  const cardExpiryRef = useRef(null);
  const cardCvcRef = useRef(null);
  const nameInputRef = useRef(null);


  const processCardPayment = (e) => {
    e.preventDefault();
    cardNumberRef.current.value = ''
    cardExpiryRef.current.value = ''
    cardCvcRef.current.value = ''
    nameInputRef.current.value = ''
    alert('Card details submitted successfully')
  }

  const validateCardNumber = () => {
    const cardNumberValue = cardNumberRef.current.value;
    const v = cardNumberValue.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      cardNumberRef.current.value = parts.join(' ');
    } else {
      return cardNumberRef.current.value;
    }
  };

  const validateCardExpiry = (event) => {
    // const inputChar = String.fromCharCode(event.keyCode);
    const code = event.keyCode;
    const allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }

    event.target.value = event.target.value.replace(
      /^([1-9]\/|[2-9])$/g, '0$1/', // 3 > 03/
    ).replace(
      /^(0[1-9]|1[0-2])$/g, '$1/', // 11 > 11/
    ).replace(
      /^([0-1])([3-9])$/g, '0$1/$2', // 13 > 01/3
    ).replace(
      /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2', // 141 > 01/41
    ).replace(
      /^([0]+)\/|[0]+$/g, '0', // 0/ > 0 and 00 > 0
    ).replace(
      /[^\d\/]|^[\/]*$/g, '', // To allow only digits and `/`
    ).replace(
      /\/\//g, '/', // Prevent entering more than 1 `/`
    );
  };

  const validateCardCvv = (e) => {
    const cvvValue = cardCvcRef.current.value;
    const found = /^[0-9]{3,4}$/.test(cvvValue);
    if (!found) {
      cardCvcRef.current.classList.add('invalid');
      cardCvcRef.current.classList.remove('valid');
    } else {
      cardCvcRef.current.classList.remove('invalid');
      cardCvcRef.current.classList.add('valid');
    }
  };
  return (
    <div className="App">
      <Form className="sh-payment-form"
      >
        <Form.Group>
          <Form.Label>
            CARD NUMBER
            </Form.Label>
          <Form.Control
            className="sh-input"
            ref={cardNumberRef}
            onInput={validateCardNumber}
            name="billing-cc-number"
            placeholder={'1234 1234 1234 1234'}
            autoComplete="off"
            required={true}
          />

        </Form.Group>
        <Row>
          <Form.Group controlId="cardExpiry">
            <Form.Label className="card-expiry">
              CARD EXPIRY
              </Form.Label>
            <Form.Control
              className="sh-input"
              ref={cardExpiryRef}
              onKeyUp={validateCardExpiry}
              name="billing-cc-exp"
              placeholder={'MM/YY'}
              autoComplete="off"
              maxLength='5'
              required={true}
            />
          </Form.Group>
          <Form.Group controlId="cardCvc">
            <Form.Label className="card-cvv">
              CARD CVV
              </Form.Label>
            <Form.Control
              className="sh-input"
              ref={cardCvcRef}
              onInput={validateCardCvv}
              name="billing-cvv"
              placeholder={'CVV/VCC'}
              autoComplete="off"
              maxLength="4"
              required={true}
            />
          </Form.Group>
        </Row>
        <Form.Group controlId="cardName">
          <Form.Label>
            NAME
            </Form.Label>
          <Form.Control
            className="sh-input"
            ref={nameInputRef}
            type="text"
            name="name"
            placeholder={'NAME'}
            autoComplete="off"
            required={true}
          />
        </Form.Group>
        <Card>
          <Button
            type="submit"
            onClick={processCardPayment}
            className="payBtn"
          >SUBMIT
            </Button>
        </Card>
      </Form>
    </div>
  );
}

export default App;
