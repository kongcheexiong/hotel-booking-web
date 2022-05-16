import React from 'react'

//componetn
import Header from './components/Header'
import DataTables from './components/Table'

import PageSizeCustomOptions from './components/DataTable'

import { Stack } from '@mui/material'

export default function RoomType() {
  return (
    <Stack direction='column' spacing={2}>
        <Header/>
        {/**<DataTables/>*/}
        <PageSizeCustomOptions/>

        
    </Stack>
  )
}
