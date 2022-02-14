import React, { useState } from 'react';
import { BrowserRouter, Routes, Route,Link} from 'react-router-dom';
import styled from 'styled-components'

import { AuthPage } from './pages/AuthPage';
import { NotFound } from './pages/NotFound';
import { ProfilePage } from './pages/ProfilePage';

const Title = styled.h1`
font-weight: 700;
font-size: 64px;
line-height: 78px;
width: 180px;
margin: 40px auto 0;
`

const Container=styled.div`
max-width: 800px;
margin: 0 auto;
text-align: center;
height: 100vh;
display: flex;
flex-direction: column;
`

 const  App:React.FC = () => {
   
  const [user,setUser]=useState<string>('')
 
React.useEffect(()=> {
  const login:string=(localStorage.getItem('userLogin') || '') 
  setUser(login)
}, [])

  return (
    <BrowserRouter>
    <Container>
    <Title>  <Link to="/">ONLY. </Link></Title>
   <Routes>
 <Route path='/'   element={<AuthPage setUser={setUser} />}/> 
     { user && <Route path='/profile'  element={<ProfilePage userName={user}/>}/>}
     <Route path="*" element={<NotFound/>} />
   </Routes>
   </Container>
 </BrowserRouter>
  )
}


export default App;
