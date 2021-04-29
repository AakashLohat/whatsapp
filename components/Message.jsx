import moment from 'moment';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from "styled-components"
import { auth } from '../firebase';
export default function Message({user, message}) {
    const [userLoggedIn] = useAuthState(auth);
    const TypeOfMessage = user==userLoggedIn.email?Sender:Reciever
    return (
       <TypeOfMessage>
             {message.message}
             <Timestamp>
             {message.timestamp?moment(message.timestamp).format("LT"):"..."}
             </Timestamp>
       </TypeOfMessage>
    )
}
const Container = styled.div``;
const MessageSender = styled.p`
width:fit-content;
padding:15px;
border-radius:8px;
margin:10px;
min-width:60px;
padding-bottom:26px;
position:relative;
text-align:right;
`
const Sender = styled(MessageSender)`
margin-left:auto;
background-color:#dcf8c6;
`;

const Reciever = styled(MessageSender)`
background-color: whitesmoke;
text-align:left;
`;
const Timestamp = styled.span`
color:gray;
padding:10px;
font-size:9px;
position:absolute;
bottom:0;
text-align:right;
right:0;
`;