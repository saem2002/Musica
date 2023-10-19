import { Button, CircularProgress, TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { AddArtists } from '../service/Api';
import Sidebar from './Sidebar'

const AddArtist = ({notify}) => {
    const [artist, setartist] = useState({ name: "", email: "", password: "", genre: "" });
    let name, value;
    const handlechange = (e) => {
        name = e.target.name;
        value = e.target.value
        setartist({ ...artist, [name]: value })

    }
    const postDetails=async(data)=>{
        const res =await AddArtists(artist);
        if(res==200){
            notify("Artist added successfulyy")
            setartist({name:"",email:"",password:"",genre:""})
        }else{
            notify(res)
        }
        
    }
    return (
        <>
            <Sidebar />
            <form style={{ overflow: 'hidden' }} onSubmit={()=>postDetails()}>
                <div className='Form_item_div'>

                    <p className='Heading_addItem'>Add Artist</p>

                    <div className='AddItem_textfields'><TextField name="name" id="standard-basic" label="Name" variant="standard" color="success" value={artist.name} onChange={handlechange} /></div>
                    <div className='AddItem_textfields'><TextField name="email" id="standard-basic" label="Email" variant="standard" color="success" value={artist.email} onChange={handlechange} /></div>
                    <div className='AddItem_textfields'><TextField name="password" id="standard-basic" label="Password" variant="standard" color="success" value={artist.password} onChange={handlechange} /></div>
                    <div className='AddItem_textfields'><TextField name="genre" id="standard-basic" label="Genre" variant="standard" color="success" value={artist.genre} onChange={handlechange} /></div>
                    <div className='AddItem_textfields'>
                        <Button variant="contained" color="success" onClick={()=>postDetails()}>
                            Submit
                        </Button>
                    </div>

                </div>

            </form>
        </>

    )
}

export default AddArtist