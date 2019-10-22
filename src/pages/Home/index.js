import React from 'react';
import Meses from './Meses'
import AdicionarMes from './AdicionarMes'

function Home() {
  return (
    <div className='container'>
      <AdicionarMes />
      <br />
      <Meses />
    </div>
  );
}

export default Home;
