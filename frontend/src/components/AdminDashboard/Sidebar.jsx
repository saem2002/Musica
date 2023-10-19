import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddBoxIcon from '@mui/icons-material/AddBox';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import GroupIcon from '@mui/icons-material/Group';
import { NavLink, useNavigate } from 'react-router-dom';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import LyricsIcon from '@mui/icons-material/Lyrics';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';
import { searchinArtist, searchinusers } from '../service/Api';
import { AccountContext } from '../context/AccountProvider';
import { useContext } from 'react';
const Sidebar = () => {
    const navigate = useNavigate();
    const { setAccount, setisAdmin ,setisArtist} = useContext(AccountContext)
    useEffect(() => {
		const check = async () => {
			const res = localStorage.getItem("token");
			const res2 = localStorage.getItem("isArtist");
			const store2 = JSON.parse(res2)

			console.log(store2);
			if (store2===true) {
				if (res) {
					const store = JSON.parse(res)
					const search = await searchinArtist(store);
					console.log(search)
					if (!search) {
						navigate('/auth')
					} else {
						localStorage.setItem("token", JSON.stringify(search.data, search.data.isAdmin))
						setAccount({ name: search.data.name, email: search.data.email, password: search.data.password })
						setisAdmin({ isAdmin: search.data.isAdmin })
						setisArtist(true)
					}
				} else {
					navigate('/auth')
				}
			} else {
				if (res) {
					const store = JSON.parse(res)
					const search = await searchinusers(store);
					console.log(search)
					if (!search) {
						navigate('/auth')
					} else {
						localStorage.setItem("token", JSON.stringify(search.data, search.data.isAdmin))
						setAccount({ name: search.data.name, email: search.data.email, password: search.data.password })
						setisAdmin({ isAdmin: search.data.isAdmin })
					}
				} else {
					navigate('/auth')
				}
			}}

        check();

    }, []);

    return (
        <>
            <div className='Navbar_div_Admin'>

                <div className='Navbar_Navlinks_Menu'>
                    <div style={{

                        backgroundColor: '#1B2F3D', height: '10vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', color: 'whitesmoke'
                    }}>
                        <EmojiEmotions />
                        <div> AdminDashboard</div>
                    </div>

                </div>


            </div>

            <Box
                className='AddItem_sidebar'
                role="presentation">




                <List>
                    <NavLink to="/" style={{ textDecoration: 'none', color: 'whitesmoke' }} >
                        <ListItem button  >
                            <ListItemIcon sx={{ color: 'whitesmoke' }}>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />

                        </ListItem>   </NavLink>
                </List>
                <List>
                    <NavLink to="/AdminDashboard/Allsongs" style={{ textDecoration: 'none', color: 'whitesmoke' }} >
                        <ListItem button  >
                            <ListItemIcon sx={{ color: 'whitesmoke' }}>
                                <LyricsIcon />
                            </ListItemIcon>
                            <ListItemText primary="All songs" />

                        </ListItem>   </NavLink>
                </List>
                <List>
                    <NavLink to="/AdminDashboard/Allusers" style={{ textDecoration: 'none', color: 'whitesmoke' }} >
                        <ListItem button  >
                            <ListItemIcon sx={{ color: 'whitesmoke' }}>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="All users" />

                        </ListItem>   </NavLink>
                </List>
                <List>
                    <NavLink to="/AdminDashboard/AllArtists" style={{ textDecoration: 'none', color: 'whitesmoke' }} >
                        <ListItem button  >
                            <ListItemIcon sx={{ color: 'whitesmoke' }}>
                                <SpatialAudioOffIcon />
                            </ListItemIcon>
                            <ListItemText primary="All Artists" />

                        </ListItem>   </NavLink>
                </List>
                <List>
                    <NavLink to="/AdminDashboard/AddArtist" style={{ textDecoration: 'none', color: 'whitesmoke' }} >
                        <ListItem button  >
                            <ListItemIcon sx={{ color: 'whitesmoke' }}>
                                <AddBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add new Artist" />






                        </ListItem>   </NavLink>
                </List>

                <NavLink to="/AdminDashboard/pending" style={{ textDecoration: 'none', color: 'whitesmoke' }} >
                    <List>
                        <ListItem button  >
                            <ListItemIcon sx={{ color: 'whitesmoke' }}>
                                <TipsAndUpdatesIcon />
                            </ListItemIcon>
                            <ListItemText primary="Pending requests" />


                        </ListItem>
                    </List>
                </NavLink>

            </Box>



        </>
    )
}

export default Sidebar