import React from 'react';
import Rest from '../utils/useRest'

const url = 'https://mymoney-andre.firebaseio.com/'
const { useGet } = Rest(url)

//TODO: converter as funções do useRest de promesi para async e usar wait dentro das funções
// Desta forma a gente pode retornar o resultado (res) para fora da função ou chamar um refetch
function Movimentacoes(props) {

  const data = useGet(`movimentacoes/${props.match.params.data}`)

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

  if (data.data && Object.keys(data.data).length > 0) {
    return (
      <div className='container'>
        <h1>Movimentações</h1>
        <table className='table'>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
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
                    </tr>
                  )
                })
            }
          </tbody>
        </table>
      </div>
    )
  }
  return null
}

export default Movimentacoes;
