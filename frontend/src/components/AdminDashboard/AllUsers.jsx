import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AccountContext } from '../context/AccountProvider';
import { deleteuserbyid, getAllusers } from '../service/Api';
import Sidebar from './Sidebar'
import './AllUsers.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress } from '@mui/material';
const AllUsers = ({ notify }) => {
    const [usersData, setusersData] = useState("");
    const [flag, setflag] = useState(0);

    useEffect(() => {
        const call = async () => {

            const res = localStorage.getItem("token");

            const store = JSON.parse(res)


            const data = await getAllusers();
            const res2 = data.data

            setusersData(res2.filter(item => item._id !== store._id));


        }
        call();

    }, [flag]);

    const deleteuser = async (id) => {
        const res = await deleteuserbyid(id);
        console.log(res)
        if (res === 200) {
            setflag(flag + 1);
            notify("user deleted successfully")
        }
    }

    return (
        <>
            <Sidebar />
            <div className='Allusers_data'>
                <div className='Users_heading'>All users will be seen here</div>
                {!usersData && <CircularProgress />}
                <div className='Allusers_map'>
                    
                    {usersData && usersData.map((data, index) => (
                        <>


                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ width: '10vw', borderStyle: 'solid', textAlign: 'center' }} >
                                    {index + 1}

                                </div>
                                <div style={{ width: '15vw', borderStyle: 'solid', textAlign: 'center' }} >
                                    {data.name}

                                </div>
                                <div style={{ width: '20vw', borderStyle: 'solid', textAlign: 'center' }}>
                                    {data.email}
                                </div>
                                <div style={{ width: '10vw', borderStyle: 'solid', textAlign: 'center',cursor:"pointer" }}>
                                    <DeleteIcon onClick={() => deleteuser(data._id)} />

                                </div>
                            </div>


                        </>
                    ))}
                </div>
            </div>
        </>

    )
}

export default AllUsers