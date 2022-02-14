import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom' 
import styled from 'styled-components'

type Profile= {
    login:string
    password: string
    remember:false
  }

type AuthPageProps = {
    setUser(user:string) : void
  }
  
type User= {
    login?:string
    type: string
    
  }

const Form = styled.form`
  width: 640px;
  text-align: start;
  margin: auto;
`

const Label=styled.label`
 color: #1F1F1F;
`

const Circle=styled.div ` 
background: #FFC8C8;
margin-right: 14px ;
font-size: 14px;
width: 20px;
height: 20px;
border-radius: 50%;
color: #EE6565;
text-align: center;

 `

const UserNotExist=styled.div `
display: flex;
align-items: center;
  background: #F5E9E9;
border: 1px solid #E26F6F;
width: 100%;
padding: 20px;
border-radius: 8px;
margin-bottom: 27px;
`

const WarningMsg=styled.div`
font-size: 14px;
line-height: 17px;
color: #E26F6F;
`

 const SubmitBtn= styled.button`
   background: #4A67FF;
border-radius: 8px;
border: none;
width: 640px;
padding: 19px;
margin-top: 40px;
font-weight: bold;
font-size: 18px;
line-height: 22px;
color: #ffffff;
:hover{
  opacity: 0.7;
  cursor: pointer;
}
:disabled {
  opacity: 0.5;
}
 `

const FieldSet = styled.div`
  margin-bottom: 20px;
`

const Input = styled.input<{InputType:string}>`
background: #F5F5F5;
border-radius: 8px;
border:  ${props => props.InputType} ;
padding: 20px;
width: 640px;
margin-top: 10px;
margin-bottom: 8px;

font-size: 16px;
line-height: 19px;
color:  #232323;

`


const db= [ {login:'steve.jobs@example.com',password:'password'}]

export const AuthPage:React.FC<AuthPageProps> =(props) =>{
  
 const [isLoading,setIsLoading]=useState<boolean>(false)
 const [warning,setWarning]= useState<User>({login:'',type:''})

 const navigate=useNavigate()
 
 const {register,handleSubmit, formState: { errors }}= useForm<Profile>()

 const onSubmit= handleSubmit((data) => { setWarning({login:'',type:''})
      
 db.map((user)=>{ 
        if( user.login.toLowerCase()===data.login.toLowerCase() && user.password=== data.password)
       { 
        props.setUser(user.login)
        localStorage.setItem('userLogin',JSON.stringify(user.login))
        setIsLoading(true)
        setTimeout(() => {
          navigate("/profile")
          setIsLoading(false)
        }, 2000);
     }
        else { if(user.login != data.login)
      setWarning({login:data.login,type:'login'})
                else setWarning({type:'pass'})
             }
    })
 
  })

    return <>
    <Form onSubmit={onSubmit}>
  {warning.type==='login' &&  <UserNotExist> <Circle>!</Circle>
    Пользователя {warning.login} не существует
      </UserNotExist> }  
      {warning.type==='pass' &&  <UserNotExist> <Circle>!</Circle>
    Неверный пароль
      </UserNotExist> }  
   <FieldSet>
     <Label htmlFor="login">Логин</Label>
     <Input  {...register('login',{required:true})}  InputType={errors.login ? '1px red solid' : 'none'}   id="login" name='login' type="email"/>
     {errors.login && <WarningMsg >Обязательное поле</WarningMsg> }
   </FieldSet>
   <FieldSet>
     <Label htmlFor="password">Пароль</Label>
     <Input  {...register('password',{required:true})}   InputType={errors.password ? '1px red solid' : 'none'}     id="password" name='password' type="password"/>
     {errors.password && <WarningMsg > Обязательное поле</WarningMsg> }
   </FieldSet>
   <div> <input {...register('remember')}   type="checkbox" /> <span>Запомнить пароль</span></div>
   <SubmitBtn  type='submit'  disabled={isLoading} >Войти</SubmitBtn>
 </Form></>
}