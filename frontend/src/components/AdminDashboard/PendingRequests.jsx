import { CircularProgress } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Acceptrequest, getSongs } from '../service/Api';
import Sidebar from './Sidebar'
import DoneIcon from '@mui/icons-material/Done';
const PendingRequests = ({notify}) => {
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
        const res = await Acceptrequest(data._id);
        console.log(res)
        if (res === 200) {
            setflag(flag+1);
            notify("song Approved successfully")
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
                            {data.isApproved == "false" &&
                                <>

                                    <div style={{ display: 'flex', alignItems: 'center' }}>

                                        <div style={{ width: '25vw', borderStyle: 'solid', textAlign: 'center' }} >
                                            {data.name}

                                        </div>
                                        <div style={{ width: '20vw', borderStyle: 'solid', textAlign: 'center' }}>
                                            {data.Artistname}
                                        </div>
                                        <div style={{ width: '10vw', borderStyle: 'solid', textAlign: 'center', cursor: "pointer" }}>
                                            <DoneIcon onClick={()=>call(data)} />

                                        </div>
                                    </div>
                                </>}




                        </>
                    ))}
                </div>
            </div>
        </>

    )
}

export default PendingRequests