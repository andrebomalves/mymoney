import React from 'react';
import { useMesApi } from '../../api'

function InfoMes({ data }) {

  const {infoMes, alterarMes} = useMesApi(data)

  const alterarPrevisaoEntrada = (evt) => {
    alterarMes({previsao_entrada: evt.target.value})
  }

  const alterarPrevisaoSaida = (evt) => {
    alterarMes({previsao_saida: evt.target.value})
  }

  if(infoMes.loading){
    return <p>Carregando dados do Mês</p>
  }

  if(infoMes.data){
    return (
      <div>
      Previsão Entrada: {infoMes.data.previsao_entrada} <input onBlur={alterarPrevisaoEntrada} defaultValue={infoMes.data.previsao_entrada} /> /
    Entrada: {infoMes.data.entrada} <br />
      Previsão Saída: {infoMes.data.previsao_saida} <input onBlur={alterarPrevisaoSaida} defaultValue={infoMes.data.previsao_saida} />  /
    Saída: {infoMes.data.saida} <br />
    </div>
    )
  }

  return null
}

export default InfoMes;
