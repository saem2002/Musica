import { CircularProgress } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Acceptrequest, deletesong, getSongs } from '../service/Api';
import Sidebar from './Sidebar'
import DoneIcon from '@mui/icons-material/Done';
import Delete from '@mui/icons-material/Delete';
const Allsongs = ({notify}) => {
    const [songs, setsongs] = useState([]);
    const [flag,setflag] = useState(0)
    useEffect(() => {

        const getSongsdata = async () => {
            const res = await getSongs();
            setsongs(res.data);
        }


        getSongsdata();

    }, [flag]);
    const call = async (data) => 
    {
        const res = await deletesong(data._id);
        console.log(res)
        if (res === 200) {
            setflag(flag+1);
            notify("song deleted successfully")
        }        

    }
    return (
        <>
            <Sidebar />
            <div className='Allusers_data'>
                <div className='Users_heading'>All Pending requests will be seen here</div>
                {!songs && <CircularProgress />}
                <div className='Allusers_map'>

                    {songs && songs.map((data, index) => (
                        <>
                            

                                    <div style={{ display: 'flex', alignItems: 'center' }}>

                                        <div style={{ width: '15vw', borderStyle: 'solid', textAlign: 'center' }} >
                                            {data.name}

                                        </div>
                                        <div style={{ width: '20vw', borderStyle: 'solid', textAlign: 'center' }}>
                                            {data.Artistname}
                                        </div>
                                        <div style={{ width: '10vw', borderStyle: 'solid', textAlign: 'center' }}>
                                            {data.genre}
                                        </div>
                                        <div style={{ width: '10vw', borderStyle: 'solid', textAlign: 'center', cursor: "pointer" }}>
                                            <Delete onClick={()=>call(data)} />

                                        </div>
                                    </div>
                          




                        </>
                    ))}
                </div>
            </div>
        </>

    )
}

export default Allsongs