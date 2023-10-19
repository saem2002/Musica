import React, { useContext } from 'react'
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { AccountContext } from '../context/AccountProvider';
import { getArtist, getSongs, searchinusers } from '../service/Api';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import './Home.css'
import { CardActionArea, Dialog, TextField } from '@mui/material';
import Navbar from './Navbar';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
const Artist = () => {
  const [artists, setartists] = useState([]);
  useEffect(() => {

    const getArtistsdata = async () => {
      const res = await getArtist();
      setartists(res.data);
    }

    getArtistsdata();
  }, []);
  const [open, setOpen] = React.useState(false);
  const [person, setperson] = React.useState(false);


  const handleClickOpen = (data) => {
    setOpen(true);
    setperson(data)
  };

  const handleClose = (value) => {
    setOpen(false);

  };
  return (
    <>
      <Dialog onClose={handleClose} open={open} >
        <div className='Artist_dialog'>
          <h4>All songs of artist</h4>
              {person && person.songs.map((data, index) => (
                <>

                  <div style={{ display: 'flex',justifyContent:'center'}}>

                    <div> {data.name}</div>
                  </div>

                </>
              ))}

        </div>
      </Dialog>
      <Navbar />
      <div className='Artists_card_div'>
        {artists && artists.map((data, index) => (
          <>
            <Card sx={{ maxWidth: 245, minHeight: 300, margin: '1vh' }} onClick={()=>handleClickOpen(data)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="240"
                  image="https://c0.wallpaperflare.com/preview/27/313/180/man-singing-on-stage.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {data.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    {data.genre}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </>))}

      </div>
    </>
  )
}

export default Artist
