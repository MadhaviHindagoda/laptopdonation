/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";

import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
// import { get } from "mongoose";
import { useParams } from "react-router-dom";

const CreateProduct = (props) => {

    const { id } = useParams();

    const user = useSelector(selectUser);
    
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [storage, setStorage] = useState("");
    const [ram, setRam] = useState("");
    const [processor, setProcessor] = useState("");
    const [location, setLocation] = useState("");



    useEffect(() => {
        async function getCompany(id) {
            await axios.get("http://localhost:3001/api/v1/laptops/" + id, {
                headers: {
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                setName(response.data.name);
                
                setImage(response.data.image);

                setBrand(response.data.brand);

                setStorage(response.data.storage);
                setProcessor(response.data.ram);

                setLocation(response.data.location);

                setRam(response.data.processor);


            
            }).catch((error) => {
                console.log(error);
            });
        }
        
        if (id)         {                                    getCompany(id)}

    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("image", image);
        formData.append("brand", brand);
        formData.append("storage", storage);
        formData.append("processor", ram);
        formData.append("ram", processor);
        formData.append("location", location);


       

        if (id) {
            await axios.put("http://localhost:3001/api/v1/laptops/" + id, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": user.token
                },
            }).then((response) => {
                console.log(response);
                window.location.href = "/dashboard";
            }).catch((error) => {
                console.log(error);
            });
            return;
        }


        await axios.post("http://localhost:3001/api/v1/laptops", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": user.token
            },
        }).then((response) => {
            console.log(response);
            window.location.href = "/dashboard";
        }).catch((error) => {
            console.log(error);
        });


    }



    return (
        
        <Box
        
    
        >
            <form onSubmit={handleSubmit}
               style={{
            paddingTop:100
            
        }}

            >
                <Typography
                variant="h5"
                >
                    Add Laptop Details:
                </Typography>
                <TextField
                sx={{
                    mt:2,
                    mb:2
                }}
                    fullWidth
                    type="text"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
               
               />
                <TextField
                 sx={{
                    mb:2
                }}
                    fullWidth
                    type="text"
                    label="Brand"
                    variant="outlined"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    
                />
                <TextField
                 sx={{
                    mb:2
                }}
                    fullWidth
                    type="text"
                    label="Storage"
                    variant="outlined"
                    value={storage}
                    onChange={
                        (e) => setStorage(e.target.value)
                    }
                
                />
                <TextField
                 sx={{
                    mb:2
                }}
                    fullWidth
                    type="text"
                    label="RAM"
                    variant="outlined"
                    value={ram}
                    onChange={
                        (e) => setRam(e.target.value)
                    }
                
                />
                <TextField
                 sx={{
                    mb:2
                }}
                    fullWidth
                    type="text"
                    label="processor"
                    variant="outlined"
                    value={processor}
                    onChange={
                        (e) => setProcessor(e.target.value)
                    }
                
                />
                <TextField
                 sx={{
                    mb:2
                }}
                    fullWidth
                    type="text"
                    label="Location"
                    variant="outlined"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                
                />
                <input
                
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <label htmlFor="image-upload">
                    <Button variant="outlined" component="span"
                     sx={{
                        mb:2
                    }}
                    >
                        Upload Image
                    </Button>
                </label>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{
                        marginTop:"30px",
        
                        textTransform: 'capitalize',
                        borderRadius: '14px', // Corrected the syntax for border-radius
                        border: '1px solid #ffffff3e',
                        background: 'linear-gradient(318deg, rgba(0, 0, 0, 0.40) 0%, rgba(255, 255, 255, 0.40) 105.18%), black',
                        backgroundBlendMode: 'soft-light, normal', // Corrected the syntax for background-blend-mode
                        boxShadow: '5px 5px 10px 0px #A6ABBD, -5px -5px 10px 0px #FAFBFF',
                        color: '#fff',
                        transition: 'background 0.8s',
                        
                      }}>
                    Submit
                </Button>
            </form>
        </Box>
    );
}

export default CreateProduct;