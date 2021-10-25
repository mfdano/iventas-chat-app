import '../css/user.css';

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
import { MESSAGES_FETCHING_LIMIT, SERVICE_URL  } from '../utils/Consts';

import io from "socket.io-client";
const socket = io(SERVICE_URL, {
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
  const [theresMoreMessages, setTheresMoreMessages] = useState(true);
  const [appStatus, setAppStatus] = useState({});
  const [onNotify, setOnNotify] = useState(false);

  const messagesBottomRef = useRef(null);
  const query = useQuery();

  useEffect(() => {
    socket.on('on_server_message', (incomingMessage) => {
      console.log('on_server_message')
      onIncomingMessage(incomingMessage)
    });
  }, [socket]);

  useEffect(() => {
    setUserData()
  }, []);

  const onIncomingMessage = (incomingMessage) => {
    console.log('onIncomingMessage')
    setMessages((messages) => {
      incomingMessage.isFirst = incomingMessage.senderId !== messages[messages.length - 1].senderId;
      return [...messages, incomingMessage]
    });
    scrollToMessage(incomingMessage.id);
  };

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
    try {
      const userId = query.get('id');
      const chat = await getChat(userId, Date.now(), MESSAGES_FETCHING_LIMIT);
      //console.log('setUserData', JSON.stringify(chat, null, 2))
      //console.log(JSON.stringify(chat, null, 2))
      setChatId(chat.id);
      setMessages(chat.messages.reverse());
      setUser(chat.users.find(user => user.id === userId));
      setContact(chat.users.filter(user => user.id !== userId)[0]);
    } catch(err) {
      if (parseInt(err.message) === 401) {setAppStatus({ status: 'error', message: 'Tu sesión ha expirado, vuelve a ingresar.'})}
      else setAppStatus({ status: 'error', message: 'Error al obtener datos de usuario.'})
      setOnNotify(true)
    } finally {
      scrollToBottom()
      setIsLoadingData(false)
    }
  }

  const loadOldMessages = async () => {
    try {
      setIsLoadingMessages(true);
      console.log('IsOldLoadingMessages', MESSAGES_FETCHING_LIMIT, messages.length)
      const lastLoadedMessage = messages[0];
      const oldMessages = await getMessages(chatId, lastLoadedMessage.sentDate, MESSAGES_FETCHING_LIMIT);

      if (oldMessages.length === 0) {
        setTheresMoreMessages(false)
      } else {
        setMessages([...oldMessages.reverse(), ...messages])
        scrollToMessage(oldMessages[oldMessages.length - 1].id);      
      }
    } catch(err) {
      setAppStatus({ status: 'error', message: 'Error al cargar mensajes anteriores.'})
      setOnNotify(true)
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const onScrollMessages = (e) => {
    const isOnTop = e.target.scrollTop === 0;
    if (isOnTop && theresMoreMessages) {
      console.log('isOnTop', messages.length)
      loadOldMessages();
    }
  }

  const scrollToBottom = () => {
    messagesBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const scrollToMessage = (msgId) => {
    console.log('scrollToMessage', msgId)
    const focusedMessage = document.getElementById(`message_${msgId}`)
    focusedMessage.scrollIntoView({ behavior: "smooth" });
  }

  const onKeyPressAction = (e) => {
    if (e.key === 'Enter') console.log('on send')
  };

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
          <Avatar alt="Avatar" src={contact.imageProfileSRC} sx={{ width: 52, height: 52 }} />
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
              {!theresMoreMessages && (
                <Alert severity="info">
                  <Typography variant="body2" color="text.main" >Inicio de la conversación</Typography>
                </Alert>
              )}
              {isLoadingMessages && (
                <CircularProgress color="primary" sx={{ position: 'absolute', left: '50%' }} size={30} />
              )}
              {messages.map((msg) => (
                <BubbleMessage
                  sentbyme={user.id === msg.senderId ? 1 : 0}
                  isfirst={msg.isFirst ? 1 : 0}
                  message={msg.content}
                  key={msg.id}
                  imgsrc={user.id === msg.senderId ? user.imageProfileSRC : contact.imageProfileSRC }
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
              maxRows={1}
              placeholder="Escribe un mensaje..."
              value={ newMessage }
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={onKeyPressAction} />
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