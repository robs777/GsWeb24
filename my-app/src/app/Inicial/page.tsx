"use client"
import React, { useState } from 'react';
import axios from 'axios';
import "./inicial.css";
import Footer from '../Footer/page';

interface Dados {
  sensor: string;
  localizacao: string;
  descricao: string;
}

const API_URL = 'http://localhost:5000/dados';

const Inicial = () => {
  const [dados, setDados] = useState<Dados[]>([]);
  const [dadoAtual, setDadoAtual] = useState<Dados | null>(null);

  const getAllDados = async () => {
    try {
      const response = await axios.get<Dados[]>(API_URL);
      setDados(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const addDado = async () => {
    try {
      const response = await axios.post<Dados>(API_URL, dadoAtual);
      setDados([...dados, response.data]);
      setDadoAtual(null);
    } catch (error) {
      console.error("Erro ao adicionar dado:", error);
    }
  };

  return (

    <div className='fun'>
      <div className='tew'>
        <div className='container'>
          <div className='funcB'>
            <button onClick={getAllDados}>Carregar Dados</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sensor</th>
                <th>Localização</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((dado) => (
                <tr key={dado.sensor}>
                  <td>{dado.sensor}</td>
                  <td>{dado.localizacao}</td>
                  <td>{dado.descricao}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="formm">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field-group">
                <input type="text" placeholder="Sensor" value={dadoAtual?.sensor || ''} onChange={(e) => setDadoAtual({ ...dadoAtual!, sensor: e.target.value })} required />
                <input type="text" placeholder="Localização" value={dadoAtual?.localizacao || ''} onChange={(e) => setDadoAtual({ ...dadoAtual!, localizacao: e.target.value })} required />
                <input type="text" placeholder="Descrição" value={dadoAtual?.descricao || ''} onChange={(e) => setDadoAtual({ ...dadoAtual!, descricao: e.target.value })} required />
                <div className="funcB">
                  <button type="submit" onClick={addDado}>Adicionar Dados</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>


  );
};

export default Inicial;
