"use client"
import "./cadastro.css"

import Link from "next/link";

import React, { useState } from 'react';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Email já existe');
      }

      const data = await response.json();
      console.log(data);

      alert('Usuário cadastrado');

      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      const err = error as Error;
      alert(err.message);
    }

  };

  return (

    <div className='boc'>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Cadastro</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Cadastrar
          </button>
        </form>
      </div>
      <div className="vlo">
        <Link href="/Login" className="link">Voltar Para o Login?</Link>
      </div>
    </div>
  );
}

export default Cadastro;
