import React from 'react'
import styled from 'styled-components'

const Info=styled.div`
    font-size: 48px;
    line-height: 56px;
    text-align: center;
    margin: auto;
`


export const NotFound:React.FC =() =>{ 
    return <Info>Такой страницы не существует</Info>
}