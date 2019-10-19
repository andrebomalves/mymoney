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
  
  
  
  const useGet = url => {
    const [data, dispatch] = useReducer(reducer,{loading:true, data:{}});
  
    useEffect(() => {
      dispatch({type:'REQUEST'})
      axios.get(url)
        .then((res) => {
          console.log(res)
          dispatch({type:'SUCCESS', data:res.data})
        }) 
    }, []);
  
    return data
  } 

  export default useGet