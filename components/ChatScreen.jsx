import { Avatar,IconButton } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useRef} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from "styled-components"
import { auth, db } from '../firebase';
import MoreVertIcon from "@material-ui/icons/MoreVert"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import Message from './Message';
import { useCollection } from 'react-firebase-hooks/firestore';
import getRecipientsEmail from "../utils/getRecipientsEmail"
import  InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import  MicIcon from '@material-ui/icons/Mic';
import firebase from 'firebase';
import TimeAgo from "timeago-react";
export default function ChatScreen({chat,messages}){
    const [user] = useAuthState(auth);
    const router = useRouter();
    const[input,setInput] = React.useState("")
    const endOfMessageRef = useRef(null)
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'));


       const scrollToBottom = () =>{
        
               endOfMessageRef.current.scrollIntoView({
                   behavior:"smooth",   
                   block: "start", inline: "nearest"
    
               })
          
       }    
     
          
      
    const showMessages = () =>{
if(messagesSnapshot){
    return messagesSnapshot.docs.map(message =>(
        <Message key={message.id} user={message.data().user} 
         message={{...message.data(),
            timestamp:message.data().timestamp?.toDate().getTime()}}/>
    ))
}else{
    return JSON.parse(messages).map(message => (
        <Message key={message.id} user={message.user} 
         message={message}/>
    ))
}
}
const[recipients] = useCollection(db.collection("users").where("email","==",getRecipientsEmail(chat?.users,user)))
    const sendmessage  = (e) => {
        e.preventDefault();
        db.collection("users").doc(user.uid).set({
            lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
        },{merge:true});
        db.collection("chats").doc(router.query.id).collection("messages").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user.email,
            photoURL:user.photoURL
        })
        scrollToBottom()
        setInput("")
      
          
       
    }
    const recipient = recipients?.docs?.[0]?.data()
    const recipientemail = getRecipientsEmail(chat.users,user)
    return (
        <Container>
           <Header>
               {recipient?(<Avatar src={recipient?.photoURL}/>):(<Avatar>{recipientemail[0]}</Avatar>)}

               <HeaderInformation>
                   <h3>{recipientemail}</h3>
                   {recipients?(<p>Last active :{' '} {recipient?.lastSeen?.toDate()
                   ?(<TimeAgo datetime={recipient?.lastSeen?.toDate()}/>):
"UnAvailable"
                   }</p>
                   
                   ):(<p>Loading last active</p>)}
               </HeaderInformation>
               <HeaderIcons>
          <IconButton>
              <AttachFileIcon/>
              
          </IconButton>
          <IconButton>
              <MoreVertIcon/>

          </IconButton>
               </HeaderIcons>
           </Header>
           <MessageContainer>
            
               {showMessages()}
        
               <EndOfMessage ref={endOfMessageRef} />
           </MessageContainer>
           <InputContainer>
              <InsertEmoticonIcon/>
              <Input value={input} onChange={e => setInput(e.target.value)}/>
              <button hidden disabled={!input} type="submit" onClick={sendmessage}>send something</button>
              <MicIcon/>
           </InputContainer>
        </Container>
    )
}
const Container =  styled.div``;

const Input = styled.input`
flex: 1;
outline:0;
border:none;
border-radius:10px;
background-color:whitesmoke;
padding:7px;
margin-left:15px;
margin-right:15px;
`;
const InputContainer = styled.form`
display:flex;
align-items:center;
padding:10px;
position:sticky;
bottom:0;
background-color:#bebebe;
z-index:100;


`;

const Header =  styled.div`
position:sticky;
background-color:white;
z-index:100;
top:0;
display:flex;
padding:8px;
height:70px;
align-items:center;
border-bottom:1px solid whitesmoke;
`;
const HeaderInformation =  styled.div`
margin-left:15px;
flex:1;
>h3{
    margin-bottom:3px;
}
>p{
    font-size:14px;
    color:gray;
}
`;
const HeaderIcons =  styled.div``;
const MessageContainer =  styled.div`
padding:30px;
background-color:#e5ded8;
min-height:90vh;
width: 100%;
    height: 200px;
    overflow-y: auto;
    position: relative;
    &::-webkit-scrollbar {
        width: 10px;
        border: 1px solid black;
    }
`;
const EndOfMessage =  styled.div`
margin-bottom:0;

`;
