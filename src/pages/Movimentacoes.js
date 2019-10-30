import React, { useState } from 'react';
import Rest from '../utils/useRest'


const url = 'https://mymoney-andre.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(url)

function Movimentacoes(props) {

  const data = useGet(`movimentacoes/${props.match.params.data}`)
  const dataMeses = useGet(`meses/${props.match.params.data}`)
  const [dataPatch,patch] = usePatch()
  const [dataPost, post] = usePost(`movimentacoes/${props.match.params.data}`)
  const [dataRemove, setRemove] = useDelete()

  const [formulario, setFormulario] = useState({ descricao: '', valor: 0 })

  const onChange = itemName => evt => {
    setFormulario({
      ...formulario,
      [itemName]: evt.target.value
    })
  }

  const saveFormulario = async () => {
    const validaNumero = /[-]?\d+(\.)?\d+/
    if (!isNaN(formulario.valor) && formulario.valor.search(validaNumero) >= 0) {
      await post(formulario)
      setFormulario({ descricao: '', valor: 0 })
      await data.refetch()
      setTimeout(() => { }, 5000);
      await dataMeses.refetch()
    }
  }

  const removeItem = async (chave) => {
    await setRemove(`movimentacoes/${props.match.params.data}/${chave}`)
    await data.refetch()
  }

  const alterarPrevisaoEntrada = (evt) => {
    patch(`meses/${props.match.params.data}`,{previsao_entrada: evt.target.value})
  }

  const alterarPrevisaoSaida = (evt) => {
    patch(`meses/${props.match.params.data}`,{previsao_saida: evt.target.value})
  }

  if (data.loading) {
    return <div className='d-flex justify-content-center'><span>Carregando...</span></div>
  }

  //if (data.data && Object.keys(data.data).length >= 0) {
  return (
    <div className='container'>
      <h1>Movimentações</h1>
      {
        
        dataMeses && <div>
        Previsão Entrada: {dataMeses.data.previsao_entrada} <input onBlur={alterarPrevisaoEntrada} defaultValue={dataMeses.data.previsao_entrada} /> /
        Entrada: {dataMeses.data.entrada} <br/>
        Previsão Saída: {dataMeses.data.previsao_saida} <input onBlur={alterarPrevisaoSaida} defaultValue={dataMeses.data.previsao_saida} />  / 
        Saída: {dataMeses.data.saida} <br/>
        </div>
      }
      <table className='table table-sm table-striped'>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody className='align-middle'>
          {!data.data &&
            <tr>
              <td colSpan='3' className='text-center'>
                 Não há dados para serem exibidos
              </td>
            </tr>
          }
          {data.data &&
            Object
              .keys(data.data)
              .map((mov) => {

                return (
                  <tr key={mov}>
                    <td className='align-middle' >{data.data[mov].descricao}</td>
                    <td className='align-middle' >{data.data[mov].valor}</td>
                    <td className=''>
                      <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => removeItem(mov)}><i className="fas fa-trash-alt"></i> </button>
                    </td>
                  </tr>
                )
              })
          }
          <tr>
            <td><input placeholder='Descrição' className='form-control' value={formulario.descricao} onChange={onChange('descricao')} /></td>
            <td><input type='number' step='0.01' placeholder='Valor' className='form-control' value={formulario.valor} onChange={onChange('valor')} /></td>
            <td className=''>
              <button type="button" className="btn btn-sm btn-outline-dark" onClick={saveFormulario}> <i className="fas fa-save"></i> </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
  //}
  //return null
}

export default Movimentacoes;
