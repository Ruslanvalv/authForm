import React from 'react'
import { useNavigate } from 'react-router-dom' 
import styled from 'styled-components'

interface ProfilePageProps {
    userName:string
  }
  
  const Profile= styled.div`
  margin: auto;
`

  const ExitBtn= styled.button`
background: #F5F5F5;
cursor: pointer;
border-radius: 8px;
border: none;
max-width: 200px;
margin: 50px auto 0;
text-align: center;
padding: 19px 71px;
font-family: 'Helvetica Neue',sans-serif;
font-weight: bold;
font-size: 18px;
line-height: 22px;
color: #000;
`

const Greetings=styled.div`
 font-size: 40px;
line-height: 48px;
& span {
    font-weight: 700;
}
`

export const ProfilePage:React.FC<ProfilePageProps> =(props) =>{ 

    const navigate=useNavigate()



     const btnHandler= () => {
      navigate('/') 
      localStorage.removeItem('userLogin')
     }
    return <Profile>
    <Greetings> Здраствуйте ,  <span>{props.userName}</span></Greetings>
    <ExitBtn  onClick={btnHandler} >Выйти</ExitBtn>
    </Profile>
}