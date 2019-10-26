import React, {useRef,useState} from 'react'
import { Redirect } from 'react-router-dom'

function AdicionarMes() {

  const year = (new Date()).getFullYear() - 5 ;
  const years = Array.from(new Array(10),( val, index) => index + year);
  const months = Array.from(new Array(12),( val, index) => index + 1);
  const valAno = useRef();
  const valMes = useRef();
  const [redir, setRedir] = useState('');
 
  const btnAdicionaMes = () => {
    setRedir(valAno.current.value+'-'+valMes.current.value)
  }

  if(redir !== ''){
    return <Redirect to={`/movimentacoes/${redir}`} ></Redirect>
  }

  return (
    <React.Fragment>
      <h2>Adicionar Mês</h2>
      
      <div className='form-inline'>
      <div className='form-group'>
        <select ref={valAno} className='form-control'>
          {
            years.map( (ano) => {
              return <option key={ano} value={ano}>{ano}</option>
            })
          }
        </select>
        </div>
        <div className='form-group'>
        <select ref={valMes} className='form-control'>
          {months.map( (mes) => {
            return <option key={mes} value={mes.toString().padStart(2,'0')}>{mes.toString().padStart(2,'0')}</option>
          })}
        </select>
          </div>
        <button className='btn btn-primary' onClick={btnAdicionaMes}> Adicionar mês</button>
      </div>
    </React.Fragment>
  );
}

export default AdicionarMes;
