
import React from 'react';
import Dialog from '@mui/material/Dialog';






function SearchList({ filteredPersons }) {
  const [open, setOpen] = React.useState(false);
  const [person, setperson] = React.useState(false);


  const handleClickOpen = (person) => {
    setOpen(true);
    setperson(person)
  };

  const handleClose = (value) => {
    setOpen(false);
    
  };


  const filtered = filteredPersons.map(person => <><div style={{cursor:'pointer'}}  onClick={()=>handleClickOpen(person)}>{person.name} </div>
    

    
  </>);

  return (
    <div>
    <Dialog onClose={handleClose} open={open}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR52mjqG3lcRarWAIJWX-hY0OsQR1afGB0RZm9TNJ1tuCLy9Q-9esUWwJNHdErssp--1AE&usqp=CAU" alt=""></img>

      <div>{person.name}</div>
      <div>{person.genre}</div>
      <div>{person.duration}</div>
    </div>

  </Dialog>
      {filtered}
    </div>
  );
}

export default SearchList;