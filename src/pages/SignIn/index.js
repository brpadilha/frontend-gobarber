import React from 'react';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

// import { Container } from './styles';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit}>
        <Input name="name" type="email" placeholder="Seu email" />
        <Input name="email" type="password" placeholder="Sua senha secreta" />

        <button name="password" type="submit">
          Acessar
        </button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
