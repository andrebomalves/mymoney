import React, { useState, useEffect } from 'react';
import {useMovimentacaoApi} from '../../api'
import InfoMes from './InfoMes'
import AdicionarMovimentacao from './AdicionarMovimentacao'

function Movimentacoes(props) {
  
 
  const { movimentacoes, salvarNovaMovimentacao, removerMovimentacao } =  useMovimentacaoApi(props.match.params.data)

  useEffect(() => {
    if((movimentacoes.code && movimentacoes.code === 401) || !localStorage.getItem('token') ){
      return window.location.pathname = 'Login'
    }
  }, [movimentacoes.code]);

  const removeItem = async (chave) => {
    await removerMovimentacao(`movimentacoes/${props.match.params.data}/${chave}`)
    await movimentacoes.refetch()
  }

  if (movimentacoes.loading) {
    return <div className='d-flex justify-content-center'><span>Carregando...</span></div>
  }

  const salvarMovimentacao = async(dados) => {
    await salvarNovaMovimentacao({
      ...dados
    })
    movimentacoes.refetch()

  }
  //if (data.data && Object.keys(data.data).length >= 0) {
  return (
    <div className='container'>
    
    <h1>Movimentações</h1>
    <InfoMes data={props.match.params.data} />
      
      <table className='table table-sm table-striped'>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className='align-middle'>
          {!movimentacoes.data &&
            <tr>
              <td colSpan='3' className='text-center'>
                 Não há dados para serem exibidos
              </td>
            </tr>
          }
          {movimentacoes.data &&
            Object
              .keys(movimentacoes.data)
              .map((mov) => {

                return (
                  <tr key={mov}>
                    <td className='align-middle' >{movimentacoes.data[mov].descricao}</td>
                    <td className='align-middle' >{movimentacoes.data[mov].valor}</td>
                    <td className=''>
                      <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => removeItem(mov)}><i className="fas fa-trash-alt"></i> </button>
                    </td>
                  </tr>
                )
              })
          }
          <AdicionarMovimentacao salvarMov={salvarMovimentacao} />
        </tbody>
      </table>
    </div>
  )
  //}
  //return null
}

export default Movimentacoes;
