import React from 'react';
import Rest from '../utils/useRest'

const url = 'https://mymoney-andre.firebaseio.com/'
const { useGet } = Rest(url)

function Movimentacoes(props) {

  const data = useGet(`movimentacoes/${props.match.params.data}`)
 
  if (data.loading) {
    return <span>Carregando...</span>
  }

  if ( data.data && Object.keys(data.data).length > 0) {
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
