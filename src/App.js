import React from 'react'
import useGet from './useGet'
import usePost from './usePost'
import './App.css'

//#region Exemplo de Promise e Assync Await
/*
const setTimeoutPromise = (time, text) => new Promise((resolve,reject) => {
  setTimeout(() => {
    console.log(text)
    resolve()
  }, time);
})

const func = async() => {
  await setTimeoutPromise(2000,'Olá async 1')
  await setTimeoutPromise(1000,'Olá async 2')
}
*/
//#endregion

const url = 'https://mymoney-andre.firebaseio.com/periodos/2019-08.json'

function App() {
  //#region Funções assincronas para teste
  //func()
  /*
  setTimeoutPromise(2000,'Olá 1')
    .then(() => setTimeoutPromise(1000,'Olá 2'))
    .then(() => setTimeoutPromise(3000,'Olá 3'))
    .then(() => setTimeoutPromise(1000,'Olá 4'))
  */
  /*
  useEffect(() => {
    setTimeout(() => {
      console.log('Ola')
    }, 2000);
  });
*/
//#endregion

  const data = useGet(url)
  const [dataPost, post] = usePost(url)

  const postNew = () =>{
    post({descricao:'comida', valor:60.00})
  }

  if(data.loading){
    return <div className="App"> <pre>Carregando... Aguarde!</pre> </div>
  }

  const listItem = (item) => {
    return( 
    <div>
      <label>{item.descricao}:{item.valor}</label>
    </div>
    )}

  return (
    <div className="App">
    <pre>{JSON.stringify(data)}</pre>
    <pre>{ /*data.map(listItem)*/} </pre>
    <pre>{JSON.stringify(dataPost)}</pre>
    <button onClick={postNew}> Salvar</button>
    </div>
  );
}

export default App
