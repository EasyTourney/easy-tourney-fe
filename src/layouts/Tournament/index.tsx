import 'react-day-picker/dist/style.css'
import Button from '@mui/material/Button'
import DialogAddTournament from '../../components/Dialog/Tournament/DialogAddTournament'
import { useState } from 'react'
import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Tournament = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  return (
    <Box sx={{ mt: '1rem' }}>
      <Button onClick={handleClickOpen} style={{ backgroundColor: '#24292e', color: 'white' }}>
        Add new
      </Button>
      {open && <DialogAddTournament open={open} setOpen={setOpen} />}
      <div>
        <Link to="/tournament/general">Detail tournament</Link>
      </div>
    </Box>
  )
}

export default Tournament
