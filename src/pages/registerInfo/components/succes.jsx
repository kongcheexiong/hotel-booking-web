import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Success() {
    const navigate = useNavigate();
  return (
    <div style={{
        width: '500px',
        height: '600px',
        display:'flex',
        flexDirection: 'column',
        rowGap: '20px'}}>
           <h3> ສໍາເລັດການລົງທະບຽນຂໍ້ມູນ, ກາລຸນາລໍຖ້າການຢືນຢັນຈາກລະບົບ</h3>
           <div className='previewImg' onClick={()=> navigate(`/public`) }>ກັບສູ່ໜ້າຫຼັກ</div>
            </div>
  )
}
