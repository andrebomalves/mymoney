import {useReducer, useEffect} from 'react'
import axios from 'axios'

const reducer = (state, action) => {
    switch (action.type) {
      case 'REQUESTS':
        return { ...state, loading: true};
      case 'SUCCESS':
        return {...state, loading:false, data:action.data};
      default:
        return state
    }
  }


const Init = (url) =>{

    const [data, dispatch] = useReducer(reducer,{loading:true, data:{}})

    const useGet = (resource) => {
      
        useEffect(() => {
          dispatch({type:'REQUEST'})
          axios.get(url + resource + '.json')
            .then((res) => {
              console.log(res)
              dispatch({type:'SUCCESS', data:res.data})
            }) 
        },[]);
      
        return data
    }

    const usePost = (resource) => {

        const post = data => { 
            dispatch({type:'REQUESTS'})
            axios.post(url + resource + '.json',data)
                .then((res) => {
                    dispatch({ type:'SUCCESS',data: res.data })
                })     
        } 
        return [data,post] 
    }

    const useDelete = (resource) => {
      
          dispatch({type:'REQUEST'})
          axios.delete(url + resource + '.json')
            .then((res) => {
              console.log(res)
              dispatch({type:'SUCCESS', data:res.data})
            }) 
      
        return data
      } 

      return  [useGet, usePost, useDelete]
}

export default Init
