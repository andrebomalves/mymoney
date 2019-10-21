import {useReducer,useEffect} from 'react'
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
  
  
  
  const useDelete = url => {
    const [data, dispatch] = useReducer(reducer,{loading:true, data:{}});
  
      dispatch({type:'REQUEST'})
      axios.delete(url)
        .then((res) => {
          console.log(res)
          dispatch({type:'SUCCESS', data:res.data})
        }) 
  
    return data
  } 

  export default useDelete