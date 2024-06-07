"use client"


import './login.css'
import React, { useState } from 'react';
import Link from "next/link";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', {
        email,
        senha: password
      });

      if (response.status === 200) {
        alert('Login realizado com sucesso!');
        window.location.href = '/Inicial';
      } else {
        alert('Falha no login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
      alert('Erro ao autenticar usuário. Por favor, tente novamente mais tarde.');
    }
  };

  return (
    <div className='bol'>
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
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
          <div className="remember-forgot">
            <label htmlFor="">
              <input type="checkbox" /> Manter-me conectado
            </label>
            <Link href="#">Esqueceu a senha?</Link>
          </div>
          <button type="submit" className="btn">
            Entrar
          </button>
          <div className="register-link">
            <p>Não tem uma conta? <Link href="/Cadastro">Faça uma.</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
