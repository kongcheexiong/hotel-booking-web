import React from 'react'
import { Route } from 'react-router-dom'
function PublicRoute({ props }) {
  const {Component, ...rest} = props
  return (
    <Route {...rest}>
      <Component/>
    </Route>
  )
}

export default PublicRoute