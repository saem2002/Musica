 import React,{ createContext,useState,useEffect} from 'react'



export const AccountContext = createContext(null);

const AccountProvider = ({children}) => {
    const [Account, setAccount] = useState({name: "", email: "", password: ""});
    const [isAdmin,setisAdmin] = useState({isAdmin:""});
    const [isArtist,setisArtist] = useState({isArtist:""});
    // const [test, settest] = useState(0);

    // const [hidden, sethidden] = useState(()=>{
    // const localdata = localStorage.getItem('hidden');
    // return localdata ? JSON.parse(localdata) : ''});

    // const [loading, setloading] = useState(()=>{
    //     const localdata = localStorage.getItem('loading');
    //     return localdata ? JSON.parse(localdata) : 'none'});

    
    // const [yourstore, setyourstore] = useState('')
    // const [youritems, setyouritems] = useState([])
    // const [value, setValue] =useState(() => {
    //     const localdata = localStorage.getItem('value');
    //     return localdata ? JSON.parse(localdata) : ['search not found']})
    // useEffect(() => {
    //         localStorage.setItem('value', JSON.stringify(value))
    // }, [value])

    // const [items2, setitems2] = useState([])
    // const [homeimage,sethomeimage]=useState('')
    // const [imgpath,setimgpath]=useState('')
    // const [storeimage,setstoreimage]=useState('')

    

  

    
    
    return (
        <div>
            <AccountContext.Provider value={{Account,setAccount,isAdmin,setisAdmin,setisArtist,isArtist}}>
                {children}
            </AccountContext.Provider>
        </div>
    )
}

export default AccountProvider
