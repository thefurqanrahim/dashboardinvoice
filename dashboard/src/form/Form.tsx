import React, { useState } from 'react'

// MUI Design Library
import {Alert, Select, MenuItem, InputLabel, TextField, FormControl, Grid, Button, Typography, Box, Stack, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom';

//Api
import { addUser, updateUser } from '../utils/HandleApi';

type UserProps = {
  user: any,
  setUser: any,
  update: boolean,
  setUpdate: any,
  data: any,
  setData: any,
  userId: any,
  setUserId: any
}  //TypeScript


const Form = ({ setUser, user, update, setUpdate, data, setData, userId, setUserId }: UserProps) => {
  const [showAlert, setShowAlert] = useState(false);
  
  const dataChange = (e: any) => {
    let value = e.target.value
    let name = e.target.name
    setData({ ...data, [name]: value })
  }

  const navigate = useNavigate()

  const onInvoice = () => {
    navigate("/result")
  }

  const userUpdate = () => {
    updateUser(userId, data.username, data.amount, data.date, data.status, setData, setUser, setUpdate)
 setTimeout(() => {
   navigate("/result")
 }, 1000);
  }

  return (
    <Box>
      <Typography mb={4} variant="h4" gutterBottom>
        Create New Invoice
      </Typography>
      <FormControl required variant="standard" sx={{ background: '#fff', padding: '20px 40px', borderRadius: "05px" }}>
        <Typography variant="h5" mb={4} gutterBottom>
          Customer Information
        </Typography>
        <Grid container spacing={4}>
          <Grid item lg={6} sm={6} xs={12}>
            <TextField
              label="Full Name"
              id="fullWidth"
              sx={{ width: "100%" }}
              value={data.username}
              name='username'
              onChange={dataChange}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <TextField
              label="Amount"
              id="fullWidth"
              type='number'
              name="amount"
              value={data.amount}
              onChange={dataChange}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <Grid>
              <input type="date" value={data.date} name='date' onChange={dataChange} style={{ width: '100%', height: "55px", border: "1px solid #ddd", borderRadius: '4px', padding: "0 10px", color: "#888", textTransform: "capitalize" }} />
            </Grid>
          </Grid>
          <Grid item lg={6} sm={6} xs={12}>
            <FormControl sx={{ width: "100%" }} >
              <InputLabel id="demo-select-small-label">Status</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={data.status}
                onChange={dataChange}
                name='status'
                label="Status"
              >
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Unpaid">Unpaid</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={6}>
            <Button onClick={update === true ? () => userUpdate() : () => addUser(setShowAlert, data.username, data.amount, data.date, data.status, setData, setUser)} variant="contained">{update === true ? "Update" : "Add"} </Button>
          </Grid>
        </Grid>
      </FormControl>
      <Grid>
        {
          showAlert === true ?
            <Alert variant="outlined" severity="success">
              Your Invoice has generated! <Button onClick={onInvoice}>Click here</Button>
            </Alert> : ""
        }
      </Grid>
    </Box>
  )
}

export default Form