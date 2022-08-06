import { Stack } from '@mui/material'
import React from 'react'
//components
import Menu from './components/Menu'
import Table from './components/Table'

function BookingOffline() {
  return (
    <Stack
    sx={{
      //backgroundColor: "#F8F9FA",
      //padding: '30px'

    }}
    direction="column"
    spacing={2}
    
    >
     <Menu/>
      <hr/>
      <Table/>

    </Stack>

  )
}

export default BookingOffline