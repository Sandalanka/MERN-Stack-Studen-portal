import React  from 'react';
import {BrowserRouter ,Routes,Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
// import Assignment from './Components/Assignment';
// import Landing from './Components/Landing';
// import FileUpload from './Components/FileUpload';
// import Login from './Components/Login';
// import Registration from './Components/Registrataion';
// import Profile from './Components/Profile';

function App() {
  return (
      <BrowserRouter>
       
        <Routes>
          <div className='App'>
            <Navbar/>
            {/* <Route exact path="/" element={<Landing/>}/>
            <div className='container'>
              <Route  path="/fileupload" element={<FileUpload/>}/>
              <Route  path="/assignment" element={<Assignment/>}/>
              <Route  path="/login" element={<Login/>}/>
              <Route  path="/registration" element={<Registration/>}/>
              <Route  path="/profile" element={<Profile/>}/>
            </div> */}
          </div>
        
        </Routes>
      </BrowserRouter>
  );
}

export default App;
