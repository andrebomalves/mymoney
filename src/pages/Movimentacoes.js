import React, {useState} from 'react';
import Rest from '../utils/useRest'

const url = 'https://mymoney-andre.firebaseio.com/'
const { useGet, usePost, useDelete } = Rest(url)

//TODO: converter as funções do useRest de promesi para async e usar wait dentro das funções
// Desta forma a gente pode retornar o resultado (res) para fora da função ou chamar um refetch
function Movimentacoes(props) {

  const data = useGet(`movimentacoes/${props.match.params.data}`)
  const [dataPost,post] = usePost(`movimentacoes/${props.match.params.data}`)
  const [dataRemove,setRemove] = useDelete()

  const [formulario, setFormulario] = useState({descricao:'',valor:0})
  
  console.log(data)

  const onChange = itemName => evt => {
    setFormulario({
      ...formulario,
      [itemName]: evt.target.value
    })
  }

  const saveFormulario = async() => {
    await post(formulario)
    setFormulario({descricao:'',valor:0})
    await data.refetch()
  }

  const removeItem = async(chave) => {
    await setRemove(`movimentacoes/${props.match.params.data}/${chave}`)
    await data.refetch()
  }

  if (data.loading) {
    return <div className='d-flex justify-content-center'><span>Carregando...</span></div>
  }

  if (!data.data) {
    return (
      <div className='container'>
        <h1>Movimentações</h1>
        <br />
        <div className='alert alert-info'> Não há dados para serem exibidos</div>
      </div>
    )
  }

  if (data.data && Object.keys(data.data).length >= 0) {
    return (
      <div className='container'>
        <h1>Movimentações</h1>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              Object
                .keys(data.data)
                .map((mov) => {
                  return (
                    <tr key={mov}>
                      <td>{data.data[mov].descricao}</td>
                      <td>{data.data[mov].valor}</td>
                      <td>
                      <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => removeItem(mov)}><i className="fas fa-trash-alt"></i> </button> 
                      </td>
                    </tr>
                  )
                })
            }
            <tr>
              <td><input placeholder='Descrição' className='form-control' value={formulario.descricao} onChange={onChange('descricao')} /></td>
              <td><input type='number' step='0.01' placeholder='Valor' className='form-control' value={formulario.valor} onChange={onChange('valor')} /></td>
              <td>
                <button type="button" className="btn btn-sm btn-outline-dark" onClick={saveFormulario}> <i className="fas fa-save"></i> </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  return null
}

export default Movimentacoes;
