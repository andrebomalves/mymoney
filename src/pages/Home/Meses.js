import React, {useEffect} from 'react';
import Rest from '../../utils/useRest'
import { Link, Redirect } from 'react-router-dom';

const url = 'https://mymoney-andre.firebaseio.com/'
const { useGet } = Rest(url)

function Meses() {
  const data = useGet('meses')

  useEffect(() => {
    if((data.code && data.code === 401) || !localStorage.getItem('token') ){
      return window.location.pathname = 'Login'
    }
  }, [data.code]);

  if (data.loading) {
    return (<span>Carregando...</span>)
  }

  if (Object.keys(data.data).length > 0) {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Mês</th>
            <th>Previsão Entrada</th>
            <th>Entrada</th>
            <th>Previsão Saída</th>
            <th>Saída</th>
          </tr>
        </thead>
        <tbody>
          {
            Object
              .keys(data.data)
              .map((mes) => {
                return (
                  <tr key={mes}>
                    <td><Link tag='a' to={'/movimentacoes/'+mes}>{mes}</Link></td>
                    <td>{data.data[mes].previsao_entrada}</td>
                    <td>{data.data[mes].entrada}</td>
                    <td>{data.data[mes].previsao_saida}</td>
                    <td>{data.data[mes].saida}</td>
                  </tr>
                )
              })
          }
        </tbody>
      </table>
    )
  }

  return null
}

export default Meses;
