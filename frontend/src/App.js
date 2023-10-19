

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './components/Login/Login';
import AccountProvider from '../src/components/context/AccountProvider';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from './components/Home/Home';
import Artist from './components/Home/Artist';
import { ToastContainer, toast } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop'
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AllUsers from './components/AdminDashboard/AllUsers';
import AddArtist from './components/AdminDashboard/AddArtist';
import AllArtists from './components/AdminDashboard/AllArtists';
import PendingRequests from './components/AdminDashboard/PendingRequests';
import Allsongs from './components/AdminDashboard/Allsongs';
function App() {

  const notify = (res) => toast(res, {
    position: toast.POSITION.TOP_CENTER
  });
  return (
    <>
      <AccountProvider >
      <div>
        <ToastContainer />
      </div>
        <Router>
          
        <ScrollToTop />
          <Routes>
            <Route path="/Auth" element={<Login notify={notify} />} />
            <Route path="/Artists" element={<Artist />} />
            <Route path="/" element={<Home notify={notify} />} />
            <Route path="/AdminDashboard" element={<AdminDashboard/>} />
            <Route path="/AdminDashboard/Allusers" element={<AllUsers notify={notify} />} />
            <Route path="/AdminDashboard/AddArtist" element={<AddArtist notify={notify} />}  />
            <Route path="/AdminDashboard/Allsongs" element={<Allsongs notify={notify} />}  />
            <Route path="/AdminDashboard/pending" element={<PendingRequests  notify={notify} />}  />
            <Route path="/AdminDashboard/AllArtists" element={<AllArtists  notify={notify} />}  />
            <Route path="/AdminDashboard/pending" element={<PendingRequests  notify={notify} />}  />
         
          </Routes>


        </Router>
      </AccountProvider>
    </>
  );
}

export default App;
