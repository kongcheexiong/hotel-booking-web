import React from 'react'

import Header from './components/Header'

import PageSizeCustomOptions from './components/DataTable'
import { Stack } from '@mui/material'

function Room() {
  return (
   <Stack direction='column' spacing={2} >
        <Header/>
        
        <PageSizeCustomOptions/>

   </Stack>
  )
}

export default Room