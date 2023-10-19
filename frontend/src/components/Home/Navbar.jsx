import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { AccountContext } from '../context/AccountProvider';
import { AddArtists, Addsong, getSongs, searchinArtist, searchinusers } from '../service/Api';
import LogoutIcon from '@mui/icons-material/Logout';
import './Home.css'
import Scroll from './Scroll';
import SearchList from './SearchList';
import { Button, Dialog, TextField } from '@mui/material';
import './Navbar.css'


const Navbar = ({ notify }) => {

	const navigate = useNavigate();
	const { Account, setAccount, setisAdmin, isAdmin, isArtist,setisArtist } = useContext(AccountContext);
	const [songs, setsongs] = useState([]);
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
			}



		}
		const getSongsdata = async () => {
			const res = await getSongs();
			setsongs(res.data);
		}
		getSongsdata();
		check();

	}, []);
	const call = () => {
		setAccount('');
		localStorage.setItem("token", "")
		localStorage.removeItem("isArtist")
		navigate('/auth')
		notify("user logged out successfully")
	}
	const [searchField, setSearchField] = useState("");

	const filteredPersons = songs.filter(
		person => {
			return (
				person
					.name
					.toLowerCase()
					.includes(searchField.toLowerCase()) ||
				person
					.genre
					.toLowerCase()
					.includes(searchField.toLowerCase())
			);
		}
	);

	const handleChange = e => {
		setSearchField(e.target.value);
	};

	function searchList() {
		return (
			<Scroll>
				<SearchList filteredPersons={filteredPersons} />
			</Scroll>
		);
	}
	const [open, setOpen] = React.useState(false);
	const [person, setperson] = React.useState(false);


	const handleClickOpen = (person) => {
		setOpen(true);
		setperson(person)
	};

	const handleClose = (value) => {
		setOpen(false);

	};
    const [song, setsong] = useState({ name: "", genre: "", duration: "",Artistname:"",isApproved:"false" });
    let name, value;
    const handlechange = (e) => {
        name = e.target.name;
        value = e.target.value
        setsong({ ...song, [name]: value })
		

    }

    const postDetails=async(data)=>{
		const res =await  Addsong( song,Account.email,Account.name,song,setsong);
        if(res==200){
            notify("song added successfulyy")
            handleClose();
        }else{
            notify(res)
        }
        
    }

	return (
		<>
			<Dialog onClose={handleClose} open={open} >
            <form style={{ overflow: 'hidden' }} onSubmit={postDetails}>
                <div className='Navbar_form_addsong'>

                    <p className='Heading_addItem'>Add Song</p>

                    <div className='AddItem_textfields'><TextField name="name" id="standard-basic" label="Name" variant="standard" color="success" value={song.name} onChange={handlechange} /></div>
                    <div className='AddItem_textfields'><TextField name="genre" id="standard-basic" label="genre" variant="standard" color="success" value={song.genre} onChange={handlechange} /></div>
                    <div className='AddItem_textfields'><TextField name="duration" id="standard-basic" label="duration" variant="standard" color="success" value={song.duration} onChange={handlechange} /></div>
                    <div className='AddItem_textfields'>
                        <Button variant="contained" color="success" onClick={()=>postDetails()}>
                            Submit
                        </Button>
                    </div>

                </div>

            </form>


			</Dialog>

			<section className="ftco-section">
				<div className="container">
					<div className="row justify-content-center">

					</div>
				</div>

				<div className="container-fluid px-md-5">
					<div className="row justify-content-between">
						<div className="col-md-8 order-md-last">
							<div className="row">
								<div className="col-md-6 text-center">
									<a className="navbar-brand" style={{ fontWeight: "800", cursor: 'pointer' }}>Musica <span>A music webapp</span></a>
								</div>
								<div className="col-md-6 d-md-flex justify-content-end mb-md-0 mb-3">
									<div className="form-group d-flex">
										<section className="garamond">

											<div className="pa2">
												<input
													className="pa3 bb br3 grow b--none bg-lightest-blue ma3 "
													type="search"
													style={{ borderWidth: '1px', borderRadius: '20px', textAlign: 'center' }}
													placeholder="Search songs "
													onChange={handleChange}
												/>

											</div>
											{searchField !== "" && searchList()}

										</section></div></div>

							</div>
						</div>
						<div className="col-md-4 d-flex" style={{ fontWeight: 'bolder' }}>
							<span style={{ cursor: 'pointer' }}>Hi {Account.name}</span>	 <div>&nbsp;</div> <div>&nbsp;</div> <LogoutIcon onClick={() => call()} style={{ cursor: 'pointer', fontSize: '4vh', marginTop: '0.4vh' }} />
							{isAdmin.isAdmin === true && <span style={{ cursor: 'pointer', marginLeft: '2vw' }} onClick={() => navigate('/AdminDashboard/AddArtist')} >AdminDashboard</span>}
							{isArtist &&  isArtist === true && <span style={{ cursor: 'pointer', marginLeft: '2vw' }} onClick={handleClickOpen} >Add song</span>}
						</div>
					</div>
				</div>
				<nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
					<div className="container-fluid">

						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
							<span className="fa fa-bars"></span> Menu
						</button>
						<div className="collapse navbar-collapse" id="ftco-nav">
							<ul className="navbar-nav m-auto">
								<li className="nav-item "><Link to='/' className="nav-link">Songs</Link></li>

								<li className="nav-item "><Link to='/Artists' className="nav-link">Artists</Link></li>
							</ul>
						</div>
					</div>
				</nav>


			</section>







		</>

	)
}

export default Navbar