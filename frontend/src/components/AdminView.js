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


const AdminView = () => {
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
            <h1 style={{ marginRight: '80px', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: 'black' }}>Laptop Donation Service</h1>
            <br></br>
            <Button 
            sx={{
                mb: 4,
                // ml: 4,
            }}
            variant="contained" color="primary" href="/addlaptop"
            style={{

                marginRight:"2px"
              }}> 
                Add New Laptop
            </Button>

            <Button 
            sx={{
                mb: 4,
                // ml: 4,
            }}
            variant="contained" color="primary" href="/requests"
            style={{

                
              }}> 
                Laptop Requests
            </Button>

            <Button variant="contained"  className="logout__button" onClick={(e) => 
            Logout(e)}
            sx={{
                mb: 4,
                ml:50
                // ml: 4,
            }}>
        Log out
      </Button>
            <Grid container spacing={4}>
                {products.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    // 16:9
                                    pt: '56.25%',
                                }}
                                image={"http://localhost:3001" + card.image}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                 Name : {card.name}
                                </Typography>
                                <Typography>
                                    Brand : {card.brand}
                                </Typography>
                                <Typography>
                                    Storage : {card.storage}
                                </Typography>
                                <Typography>
                                    Processor : {card.processor}
                                </Typography>
                                <Typography>
                                   RAM :  {card.ram}
                                </Typography>
                                <Typography>
                                    Location : {card.location}
                                </Typography>

                            </CardContent>
                            <CardActions>

                                {user.userType === "b2 uyer" ? <Button size="small">Order</Button> :
                                    <>
                                        <Button size="small"  variant="contained"
                                            onClick={() => { window.location.href = "/addlaptop/" + card._id }}
                                        >Edit</Button>
                                        <Button color="error"  variant="contained"  size="small"
                                            onClick={() => { deleteProduct(card._id) }}
                                        >Delete</Button>
                                    </>}


                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
<br></br>


        
        </Container>
    );
}

export default AdminView;