import React, { useEffect } from 'react';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { selectUser,logout } from '../slices/userSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';

const GetAll = () => {
    const dispatch = useDispatch();
     const user = useSelector(selectUser);

  const Logout = (e) => {
    dispatch(logout());
    window.location.href = "/"
  };


    const [products, setProducts] = useState([]);
    const [search,setSearch] = useState("");
    const [msg,setMsg] = useState("");

    useEffect(() => {
        async function getProducts() {
            await axios.get("http://localhost:3001/api/v1/laptops/all", {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                setMsg("")
                setProducts(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }
        getProducts();
    }, [])

    async function getProducts2() {
        await axios.get("http://localhost:3001/api/v1/laptops/all", {
            headers: {
                "x-access-token": user.token
            },
        }).then((response) => {
            setMsg("")
            console.log(response);
            setProducts(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    async function getProductsSearch() {
        const search2 = search;
        if(search2 == ""){
            getProducts2()
            return;
        }
        const url = "http://localhost:3001/api/v1/laptops/search/" + search2
        await axios.get(url, {
            headers: {
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);


            if(response.data.length ==0){
                setMsg("No results")
                setProducts([])
                return;
            }else{
                setMsg("")
                setProducts(response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }


   async function requestToAdopt(id) {
        await axios.post("http://localhost:3001/api/v1/requests", {
            laptop_id: id,
            user_id: user.id,
        }, {
            headers: {
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);
            alert("Request sent successfully");
            // window.location.reload();
        }).catch((error) => {
            console.log(error);
        });
   }

    return (
        <div className='show'>
        <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <h1 style={{ marginRight: '80px', fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: 'black', color: 'black' }}>Apply for a Laptop</h1>
            <br></br>
            <TextField
             id="standard-basic" variant="outlined"
             sx={{
                mb:4,
                mr:2
             }}
            label="Type here to search"
            onChange={(e)=>
            {

                setSearch(e.target.value)
            }}
            
            ></TextField>
            <Button 
            variant="contained"
            style={{
                padding:"15px",
                height:"100%"
     
              }}
            onClick={()=>{
                getProductsSearch()
            }}
            >NewChange</Button>
     <Button variant="contained"  className="logout__button" onClick={(e) => Logout(e)}
            style={{
             marginLeft:"410px"
              }}>
        Log out
      </Button>
            {msg}
            <br></br>

            

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
                                <Typography gutterBottom variant="h5" component="h2" style={{ fontWeight: 'bold' , fontSize: '1.2rem'}}>
                                    Name : {card.name}
                                </Typography>
                              
                                <Typography>
                                    Brand : {card.brand}
                                </Typography>
                                <Typography>
                                    Storage : {card.storage}
                                </Typography>
                                <Typography>
                                   Processor :  {card.processor}
                                </Typography>
                                <Typography>
                                    ram : {card.ram}
                                </Typography>
                                <Typography>
                                    Location : {card.location}
                                </Typography>

                            </CardContent>
                            <CardActions>

                                <Button size="small"
                                variant='contained'
                                fullWidth
                                style={{
                                    
                                    
                                  }}


                                onClick={() => requestToAdopt(card._id)}>
                                 Request The Laptop </Button>


                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
       
        </Container>
        </div>
    );
}

export default GetAll;