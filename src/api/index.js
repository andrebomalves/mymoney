import Rest from '../utils/useRest'

const url = 'https://mymoney-andre.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(url)


export const useMesApi = (data) => {
  const infoMes = useGet(`meses/${data}`)
  const [dataPatch,alterarMes] = usePatch(`meses/${data}`)

    return {infoMes, alterarMes}
}

export const useMovimentacaoApi = (data) =>{
  const movimentacoes = useGet(`movimentacoes/${data}`)
  const [dataPost, salvarNovaMovimentacao] = usePost(`movimentacoes/${data}`)
  const [dataRemove, removerMovimentacao] = useDelete()

  return {movimentacoes, salvarNovaMovimentacao, removerMovimentacao}
}

