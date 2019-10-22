import React from 'react';

function AdicionarMes() {
  return (
    <React.Fragment>
    <h2>Adicionar Mês</h2>
    <div className='form-inline'>
      <select className='form-control col-sm-2'>
        <option value='2019'>2019</option>
        <option value='2020'>2020</option>
      </select>

      <select className='form-control col-sm-2'>
        <option value='01'>01</option>
        <option value='02'>02</option>
      </select>

      <button className='btn btn-primary '> Adicionar mês</button>
    </div>
    </React.Fragment>
  );
}

export default AdicionarMes;
