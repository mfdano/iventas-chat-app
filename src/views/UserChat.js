import '../css/user.css';
import avatar_default from '../img/avatar_default.png';

import React, { useState, useEffect, useRef } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Contact from "./Contact";
import UserProfile from "./UserProfile";
import BubbleMessage from "./BubbleMessage";
import MessageInput from "./MessageInput";
import SendIcon from "./SendIcon";

import { useLocation } from "react-router-dom";

import { getMessages, getChat } from '../services/Service';
import { MESSAGES_FETCHING_LIMIT  } from '../utils/Consts';

import io from "socket.io-client";
const socket = io("http://localhost:5000", {
  withCredentials: true,
  extraHeaders: {}
});

function useQuery() { return new URLSearchParams(useLocation().search); }

function UserChat() {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState({});
  const [contact, setContact] = useState({});
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [appStatus, setAppStatus] = useState({});
  const [onNotify, setOnNotify] = useState(false);

  const messagesBottomRef = useRef(null);
  const query = useQuery();

  useEffect(() => {
    socket.on('on_server_message', (data) => {
      console.log('on_server_message')
      console.log(JSON.stringify(data, null, 2))
    });
  }, [socket]);

  useEffect(() => {
    setUserData()
  }, []);

  const onClickBtnSendMsg = (e) => {
    console.log('on_client_message')
    setNewMessage('');
    socket.emit('on_client_message', {
      chatId: chatId,
      senderId: user.id,
      content: newMessage,
      sentDate: Date.now(),
    });
  };

  const setUserData = async () => {
    // console.log('fetch last messages of', query.get('id'))
    try {
      const userId = query.get('id');
      const chat = await getChat(userId, Date.now(), MESSAGES_FETCHING_LIMIT);
      setChatId(chat.id);
      setMessages(chat.messages.reverse());
      setUser(chat.users.find(user => user.id === userId));
      setContact(chat.users.filter(user => user.id !== userId)[0]);
    } catch(err) {
      console.log(err)
      setAppStatus({ status: 'error', message: 'Error al obtener datos de usuario.'})
      setOnNotify(true)
    } finally {
      scrollToBottom()
      setIsLoadingData(false)
    }
  }

  const loadOldMessages = async () => {
    try {
      setIsLoadingMessages(true);
      console.log('IsOldLoadingMessages', MESSAGES_FETCHING_LIMIT)
      
      const lastLoadedMessage = messages[0];
      const oldMessages = await getMessages(chatId, lastLoadedMessage.sentDate, MESSAGES_FETCHING_LIMIT);
      //console.log(JSON.stringify(oldMessages, null, 2))
      

      setMessages([...oldMessages.reverse(), ...messages])
      scrollToMessage(oldMessages[oldMessages.length - 1].id);      
    } catch(err) {
      setAppStatus({ status: 'error', message: 'Error al cargar mensajes anteriores.'})
      setOnNotify(true)
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const onScrollMessages = (e) => {
    const isOnTop = e.target.scrollTop === 0;
    if (isOnTop) {
      loadOldMessages();
    }
  }

  const scrollToBottom = () => {
    messagesBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const scrollToMessage = (msgId) => {
    const focusedMessage = document.getElementById(`message_${msgId}`)
    focusedMessage.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Grid container direction="row" sx={{ height: '100vh' }}>
      <Snackbar
        open={onNotify}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={appStatus.status} sx={{ width: '100%' }} onClose={() => { setOnNotify(false)}}>
          { appStatus.message }
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: 10 }}
        open={isLoadingData}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid item lg={2} sx={{ bgcolor: 'background.secondary' }} container>
        <UserProfile user={user} />
      </Grid>
      <Grid item lg={8} sx={{ bgcolor: 'background.default' }} direction="column" container>
        <Grid sx={{ pl: 48, pr: 53, pt: 12, pb: 10 , height: '8vh' }} direction="row" container bgcolor="primary.main">
          <Avatar alt="Avatar" src={avatar_default} sx={{ width: 52, height: 52 }} />
          <Typography variant="body1" color="text.light" sx={{ ml: 32, mt: 13 }}>{contact.name}</Typography>
        </Grid>
        <Grid
          sx={{ height: '82vh' }}
          direction="column"
          container>
            <Box sx={{pl: 48, pr: 53, pt: 20, pb: 20, height: '100%' }}
              style={{ overflowY: 'auto', overflowX: 'hidden' }}
              onScroll={onScrollMessages}
            >
              {isLoadingMessages && (
                <CircularProgress color="primary" sx={{ position: 'absolute', left: '50%' }} size={30} />
              )}
              {messages.map((msg) => (
                <BubbleMessage
                  sentbyme={user.id === msg.senderId ? 1 : 0}
                  isfirst={msg.isFirst ? 1 : 0}
                  message={msg.content}
                  key={msg.id}
                  id={'message_' + msg.id}
                />
              ))}
              <div id="messagesBottomRef" sx={{ width: '100%', height: 1 }} ref={messagesBottomRef}></div>
            </Box>
        </Grid>
        <Divider light />
        <Grid sx={{ pl: 22, pr: 0, pt: 20, pb: 20 , height: '9vh' }}
          direction="row"
          container
          bgcolor="background.secondary">
            <MessageInput
              placeholder="Escribe un mensaje..."
              value={ newMessage }
              onChange={(e) => setNewMessage(e.target.value)} />
            <SendIcon sx={{ width: 45, height: 45, ml: 10 }} style={{ cursor: 'pointer' }} onClick={ onClickBtnSendMsg } />
        </Grid>
      </Grid>
      <Grid item lg={2} sx={{ bgcolor: 'background.secondary' }} container>
        <Contact contact={ contact } />
      </Grid>
    </Grid>
  );
}

export default UserChat;