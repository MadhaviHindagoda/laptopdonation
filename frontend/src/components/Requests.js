import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid,  Typography } from '@mui/material';
import axios from 'axios';
import { selectUser,logout } from '../slices/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


const Requests = () => {
    const dispatch = useDispatch();
    // const user = useSelector(selectUser);
// 
 const Logout = (e) => {
   dispatch(logout());
   window.location.reload()
 };
    const user = useSelector(selectUser);

    const [products, setProducts] = useState([]);
    const [requests,setAdoptions] = useState([]);
    useEffect(() => {
        async function getProducts() {
            await axios.get("http://localhost:3001/api/v1/laptops/all", {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                setProducts(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        async function getAdoptions(){
            await axios.get("http://localhost:3001/api/v1/requests/", {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                setAdoptions(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        getAdoptions();
        getProducts();
    }, [])

    async function deleteProduct(id) {

        //confirm before deleting
        if (!window.confirm("Are you sure you want to delete this Laptop?")) {
            return;
        }

        await axios.delete("http://localhost:3001/api/v1/laptops/" + id, {
            headers: {
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            {/* <h1 style={{ marginRight: '80px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: 'black' }}>Laptop Donation Service</h1> */}
            <h1 style={{ marginRight: '80px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: 'black' }}>Laptop Donation Service</h1>

            <Button 
            sx={{
                mb: 4,
                // ml: 4,
            }}
            variant="contained" color="primary" href="/dashboard"
            style={{

              }}> 
                Back
            </Button>
     
<Typography
sx={{
    mb:2,
    fontWeight: 'bold',
    
}}>

</Typography>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right"  style={{ fontWeight: 'bold' }}>Requested User</TableCell>
            <TableCell align="right"  style={{ fontWeight: 'bold' }}>Requestd Laptop</TableCell>
            <TableCell  style={{ fontWeight: 'bold' }}>Requested Date</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.user_name}</TableCell>
              <TableCell align="center">{row.laptop_name}</TableCell>
              <TableCell component="th" scope="row">
                {new Date(row.date).toUTCString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

            
<br></br>

      
        </Container>
    );
}

export default Requests;