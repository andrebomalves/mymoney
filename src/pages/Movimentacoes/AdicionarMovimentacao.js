import React, { useState } from 'react';

function AdicionarMovimentacao(props) {

  //gestao do formulario
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
      await salvarNovaMovimentacao(formulario)
      setFormulario({ descricao: '', valor: 0 })
      //await movimentacoes.refetch()
      setTimeout(() => { }, 5000);
      //await infoMes.refetch()
    }
  }


  return (
    <tr>
      <td><input placeholder='Descrição' className='form-control' value={formulario.descricao} onChange={onChange('descricao')} /></td>
      <td><input type='number' step='0.01' placeholder='Valor' className='form-control' value={formulario.valor} onChange={onChange('valor')} /></td>
      <td className=''>
        <button type="button" className="btn btn-sm btn-outline-dark" onClick={saveFormulario}> <i className="fas fa-save"></i> </button>
      </td>
    </tr>
  );
}

export default AdicionarMovimentacao;
