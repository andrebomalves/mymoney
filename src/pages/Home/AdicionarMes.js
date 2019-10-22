import React from 'react';

function AdicionarMes() {

  const year = (new Date()).getFullYear() - 5 ;
  const years = Array.from(new Array(10),( val, index) => index + year);
  const months = Array.from(new Array(12),( val, index) => index + 1);

  console.log(years, months)

  return (
    <React.Fragment>
      <h2>Adicionar Mês</h2>
      <div className='form-inline'>
        <select className='form-control col-sm-2'>
          {
            years.map( (ano) => {
              return <option value={ano}>{ano}</option>
            })
          }
        </select>

        <select className='form-control col-sm-2'>
          {months.map( (mes) => {
            return <option value={mes.toString().padStart(2,'0')}>{mes.toString().padStart(2,'0')}</option>
          })}
        </select>

        <button className='btn btn-primary '> Adicionar mês</button>
      </div>
    </React.Fragment>
  );
}

export default AdicionarMes;
