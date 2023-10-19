import React, { useContext } from 'react'
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { AccountContext } from '../context/AccountProvider';
import { getArtist, getSongs, searchinusers } from '../service/Api';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import './Home.css'
import { Skeleton } from '@mui/material';
import Navbar from './Navbar';
const Home = ({ notify }) => {
  const theme = useTheme();

  const navigate = useNavigate();
  const [songtoggle, setsongtoggle] = useState('song');
  const [songs, setsongs] = useState([]);
  const [artists, setartists] = useState([]);
  const { Account, setAccount } = useContext(AccountContext);
  useEffect(() => {

    const getSongsdata = async () => {
      const res = await getSongs();
      setsongs(res.data);
    }
    const getArtistsdata = async () => {
      const res = await getArtist();
      setartists(res.data);
    }

    getSongsdata();
    getArtistsdata();
  }, []);
  return (
    <>
      <Navbar notify={notify} />
      {songs.length === 0 &&
        <>
          <Skeleton sx={{ bgcolor: 'grey.600', margin: '2vh 8vw' }} height="8vh" variant="rectangular" />

          <Skeleton sx={{ bgcolor: 'grey.600', margin: '2vh 8vw' }} height="8vh" variant="rectangular" />
          <Skeleton sx={{ bgcolor: 'grey.600', margin: '2vh 8vw' }} height="8vh" variant="rectangular" />
          <Skeleton sx={{ bgcolor: 'grey.600', margin: '2vh 8vw' }} height="8vh" variant="rectangular" />
          <Skeleton sx={{ bgcolor: 'grey.600', margin: '2vh 8vw' }} height="8vh" variant="rectangular" />
          <Skeleton sx={{ bgcolor: 'grey.600', margin: '2vh 8vw' }} height="8vh" variant="rectangular" />
          <Skeleton sx={{ bgcolor: 'grey.600', margin: '2vh 8vw' }} height="8vh" variant="rectangular" />
          <Skeleton sx={{ bgcolor: 'grey.600', margin: '2vh 8vw' }} height="8vh" variant="rectangular" />
        </>}
      <div className='songs_card_div'>
        {songs.length > 0 && <>

          <div className='Titles_songs'>
            <hr />
            <div style={{ width: '20vw', paddingLeft: '1vw' }}># Title</div>
            <div style={{ width: '20vw' }}>Song Name</div>
            <div style={{ width: '15vw' }}>Genre</div>
            <div style={{ width: '15vw' }}>Artist Name</div>
            <div style={{ width: '10vw' }}>Duration</div>
            <hr />

          </div>
        </>}


        {songs && songs.map((data, index) => (
          <>
            {data.isApproved === "true" && <>
              <div style={{ overflow: 'hidden' }}>

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', cursor: 'context-menu' }}>



                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '20vw' }}>
                      <div style={{ margin: '0 1vw', width: '2vw' }} >
                        {index + 1}
                      </div>

                      <CardMedia
                        component="img"
                        sx={{ width: '5vw', height: '9vh', padding: '0.5vh' }}
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR52mjqG3lcRarWAIJWX-hY0OsQR1afGB0RZm9TNJ1tuCLy9Q-9esUWwJNHdErssp--1AE&usqp=CAU"
                        alt="Live from space album cover"
                      /></div>
                    <div style={{ width: '20vw' }}>

                      {data.name}

                    </div>
                    <div style={{ width: '15vw' }}>

                      {data.genre}

                    </div>
                    <div style={{ width: '15vw' }}>

                      {data.Artistname}

                    </div>
                    <div style={{ width: '10vw' }}>

                      {data.duration}

                    </div>
                  </div>

                </Box>

              </div>
            </>}

          </>))}


      </div>
    </>












  )
}

export default Home