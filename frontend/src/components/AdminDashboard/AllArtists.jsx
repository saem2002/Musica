import React, { useState } from 'react'
import { useEffect } from 'react';
import { deleteArtistbyid, getArtist } from '../service/Api';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar'
import { CircularProgress } from '@mui/material';

const AllArtists = ({ notify }) => {
    const [usersData, setusersData] = useState("");

    const [flag, setflag] = useState(0);
    useEffect(() => {
        const call = async () => {


            const data = await getArtist();

            setusersData(data.data);
        }
        call();

    }, [flag]);
    const deleteArtist = async (id) => {
        const res = await deleteArtistbyid(id);
        console.log(res)
        if (res === 200) {
            setflag(flag + 1);
            notify("Artist deleted successfully")
        }
    }
    return (
        <>
            <Sidebar />
            <div className='Allusers_data'>
                <div className='Users_heading'>All Artists will be seen here</div>
                {!usersData && <CircularProgress />}
                <div className='Allusers_map'>
                
                    {usersData && usersData.map((data, index) => (
                        <>


                            <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ width: '5vw',borderStyle:'solid',textAlign:'center' }} >
                                    {index+1}

                                </div>
                                <div style={{ width: '10vw',borderStyle:'solid',textAlign:'center' }} >
                                    {data.name}

                                </div>
                                <div style={{ width: '20vw',borderStyle:'solid' ,textAlign:'center'}}>
                                    {data.email}
                                </div>
                                <div style={{ width: '15vw',borderStyle:'solid' ,textAlign:'center'}}>
                                    {data.password}
                                </div>
                                <div style={{ width: '5vw',borderStyle:'solid',textAlign:'center',cursor:"pointer"  }}>
                                    <DeleteIcon onClick={() => deleteArtist(data._id)} />

                                </div>
                            </div>

                        </>
                    ))}
                </div>
            </div>
        </>


    )
}

export default AllArtists