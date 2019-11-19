import { useReducer, useEffect } from 'react'
import axios from 'axios'

const reducer = (state, action) => {
  switch (action.type) {
    case 'REQUESTS':
      return { ...state, loading: true };
    case 'SUCCESS':
      return { ...state, loading: false, data: action.data };
    case 'ERROR':
      return { ...state, loading: false, data: action.data, error: action.error, code: action.code };
    default:
      return state
  } 
}

const getAuth = () =>{
  const token = localStorage.getItem('token')
  if(token){
    return '?auth='+token
  }
  return ''
}

const Init = (url) => {

  const useGet = (resource, sufix = '.json') => {

    const [data, dispatch] = useReducer(reducer, { loading: true, data: {} })
    const carregar = async() => {
      dispatch({ type: 'REQUEST' })
      try{
      const res = await axios.get(url + resource +  sufix + getAuth())
      dispatch({ type: 'SUCCESS', data: res.data })
      }
      catch(e){
        console.log(e.response)
        dispatch({ type: 'ERROR', data:{}, error: e.response.statusText, code:e.response.status })
        return e.response.data
      }
    }
    useEffect(() => {
      carregar()
    }, [resource]);

    return {...data, refetch: carregar}
  }

  const usePost = (resource, sufix = '.json') => {

    const [data, dispatch] = useReducer(reducer, { loading: true, data: {} })

    const post = async(data) => {
      dispatch({ type: 'REQUESTS' })
      try{
        console.log(url, resource,sufix,getAuth())
      const res = await axios.post(url + resource + sufix + getAuth(), data)
        dispatch({ type: 'SUCCESS', data: res.data })
        return res.data
      }
      catch(e){
        dispatch({ type: 'ERROR', data:{}, error: e.response.statusText, code:e.response.status })
        return e.response.data
      }
    }
    return [data, post]
  }

  const useDelete = () => {

    const [data, dispatch] = useReducer(reducer, { loading: true, data: {} })
    const remove = async(resource) => {
      dispatch({ type: 'REQUEST' })
      const res = await axios.delete(url + resource + '.json' + getAuth())
      dispatch({ type: 'SUCCESS', data: res.data })
    }
    return [data,remove]
  }

  const usePatch = (resource) => {

    const [data, dispatch] = useReducer(reducer, { loading: true, data: {} })
    const patch = async(data) => {
      dispatch({ type: 'REQUEST' })
      const res = await axios.patch(url + resource + '.json' + getAuth(),data)
      dispatch({ type: 'SUCCESS', data: res.data })
    }
    return [data,patch]
  }

  return { useGet, usePost, useDelete, usePatch}
}

export default Init
