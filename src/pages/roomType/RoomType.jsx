import React from 'react'

//componetn
import Header from './components/Header'
//import DataTables from './components/Table'
import { RoomTypeProvider } from './RoomType.context'

import PageSizeCustomOptions from './components/DataTable'

import { Stack } from '@mui/material'
import { CounterProvider } from '../../context/counter'

export default function RoomType() {
  return (
    <RoomTypeProvider>
  
      <Stack direction='column' spacing={2}>
        <Header/>
        {/**<DataTables/>*/}
        <PageSizeCustomOptions/>
        </Stack>

   

        
    

    </RoomTypeProvider>
   
  )
}
