import axios from 'axios';
import jwt from 'jwt-decode'
//export const url = 'http://localhost:3050'
 export const url ='https://musicaBackend.onrender.com'



export const addUser = async (data) => {
    try {
        const res = await axios.post(`${url}/api/users`, data);
        const res2 = await axios.post(`${url}/api/login`, data);


        const user = jwt(res2.data.data)
        localStorage.setItem("token", JSON.stringify(user))
        return res.status
    } catch (error) {
        return error.response.data.message;
    }
}
export const LoginApi = async (data) => {
    try {

        const res2 = await axios.post(`${url}/api/login`, data);
        const user = jwt(res2.data.data)
        localStorage.setItem("token", JSON.stringify(user))
        return res2.status
    } catch (error) {
        return error.response.data.message;
    }
}
export const LoginApiArtist = async (data) => {
    try {

        const res2 = await axios.post(`${url}/api/artists/login`, data);
        const user = jwt(res2.data.data)
        localStorage.setItem("token", JSON.stringify(user))
        localStorage.setItem("isArtist", "true")
        return res2.status
    } catch (error) {
        return error.response.data.message;
    }
}

export const searchinusers = async (data) => {
    try {
        let response = await axios.post(`${url}/api/users/search`, data);

        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const searchinArtist = async (data) => {
    try {
        let response = await axios.post(`${url}/api/artists/search`, data);

        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const getSongs = async () => {
    try {
        let response = await axios.get(`${url}/api/songs`);

        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}
export const getArtist = async () => {
    try {
        let response = await axios.get(`${url}/api/artists/getArtist`);

        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const getAllusers = async () => {
    try {
        let response = await axios.get(`${url}/api/users`);

        return response.data
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const deleteuserbyid = async (id) => {
    try {
        let response = await axios.delete(`${url}/api/users/${id}`);

        return response.status
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}
export const deleteArtistbyid = async (id) => {
    try {
        let response = await axios.delete(`${url}/api/artists/${id}`);

        return response.status
    } catch (error) {
        console.log('Error while calling getUsers API ', error);
    }
}

export const AddArtists = async (data) => {
    try {
        let response = await axios.post(`${url}/api/artists`, data);

        return response.status
    } catch (error) {
        return error.response.data.message;
    }
}

export const Addsong = async (data, email,name) => {
    try {
        console.log(data)
        const data2 ={...data,Artistname:name}

        let response = await axios.post(`${url}/api/songs/${email}`, data2);

        return response.status


    } catch (error) {
        return error.response.data.message;
    }
}
export const Acceptrequest = async (id) => {
    try {


        let response = await axios.get(`${url}/api/songs/change/${id}`);

        return response.status


    } catch (error) {
        return error.response.data.message;
    }
}
export const deletesong = async (id) => {
    try {


        let response = await axios.delete(`${url}/api/songs/${id}`);

        return response.status


    } catch (error) {
        return error.response.data.message;
    }
}
