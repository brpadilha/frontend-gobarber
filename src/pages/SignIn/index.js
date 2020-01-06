import React from 'react';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

// import { Container } from './styles';

export default function SignIn() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email válido')
      .required('Email é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });

  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
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
