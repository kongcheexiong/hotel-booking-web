import * as react from 'react'

import { authContext } from '../context/authContext'

const initialState = {}

export const reducer = (state = initialState, action) {
  switch (action.type) {
    case : login
      return {
        ...state,
        
      }; 
     
    default:
      return state;
  }
}
export default function AuthProvider() {

  return (
    <div>AuthProvider</div>
  )
}
