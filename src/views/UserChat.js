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
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import Contact from "./Contact";
import UserProfile from "./UserProfile";
import BubbleMessage from "./BubbleMessage";
import MessageInput from "./MessageInput";
import SendIcon from "./SendIcon";

import { useLocation } from "react-router-dom";

import { getMessages, getChat } from '../services/Service';
import { MESSAGES_FETCHING_LIMIT, SERVICE_URL, MOBILE_BREAKPOINT  } from '../utils/Consts';

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
  const [width, setWidth] = useState(window.innerWidth);
  const [isDrawerShowed, setIsDrawerShowed] = useState(false);

  const messagesBottomRef = useRef(null);
  const query = useQuery();

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {  window.removeEventListener('resize', handleWindowSizeChange); }
  }, []);

  useEffect(() => {
    socket.on('on_server_message', (incomingMessage) => {
      onIncomingMessage(incomingMessage)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    setUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onIncomingMessage = (incomingMessage) => {
    setMessages((messages) => {
      if (messages.length === 0) {
        incomingMessage.isFirst = true;
      } else {
        incomingMessage.isFirst = incomingMessage.senderId !== messages[messages.length - 1].senderId;
      }
      return [...messages, incomingMessage]
    });
    scrollToMessage(incomingMessage.id);
  };

  const onClickBtnSendMsg = (e) => {
    let cleanedMsg = newMessage.replace(/^[\s\uFEFF\xA0]+/g, '')
      .replace(/[\s\uFEFF\xA0]+$/g, '')
    if (cleanedMsg.length > 0) {
      socket.emit('on_client_message', {
        chatId: chatId,
        senderId: user.id,
        content: cleanedMsg,
        sentDate: Date.now(),
      });
      setNewMessage('')
    }
  };

  const setUserData = async () => {
    try {
      const userId = query.get('id');
      const chat = await getChat(userId, Date.now(), MESSAGES_FETCHING_LIMIT);
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
      loadOldMessages();
    }
  }

  const onClickMoreInfo = (e) => {
    setIsDrawerShowed(true);
  };

  const scrollToBottom = () => {
    messagesBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const scrollToMessage = (msgId) => {
    const focusedMessage = document.getElementById(`message_${msgId}`)
    focusedMessage.scrollIntoView({ behavior: "smooth" });
  }

  const onKeyPressAction = (e) => {};

  const onOpenDrawer = (e) => {};

  const onCloseDrawer = (e) => { setIsDrawerShowed(false) };

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  return (
    <Grid container direction="row" sx={{ height: '100vh' }}>
      <SwipeableDrawer
        anchor="bottom"
        open={isDrawerShowed}
        onClose={onCloseDrawer}
        onOpen={onOpenDrawer}
      >
        <Contact contact={ contact }/>
      </SwipeableDrawer>
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
        sx={{ color: '#fff', zIndex: 10, pt: '10vh' }}
        open={isLoadingData}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {width > MOBILE_BREAKPOINT && (
        <Grid item lg={2} sx={{ bgcolor: 'background.secondary' }} container>
          <UserProfile user={user} />
        </Grid>
      )}
      <Grid item lg={8} sx={{ bgcolor: 'background.default' }} direction="column" container>
        <Grid
          sx={{
            pl: [24, 24, 24, 48, 48],
            pr:  [24, 24, 24, 53, 53],
            pt: [6, 6, 6, 12, 12],
            pb: [6, 6, 6, 10, 10],
            height: ['9vh', '9vh', '9vh', '8vh', '8vh'],
            position: 'fixed', zIndex: 5
          }}
          direction="row" container bgcolor="primary.main"
        >
          <Avatar alt="Avatar" src={contact.imageProfileSRC} sx={{ width: [44, 44, 44, 52, 52], height: [44, 44, 44, 52, 52] }} />
          <Typography variant="body1" color="text.light" sx={{ ml: 32, mt: 13, fontSize: [14, 14, 14, 18, 18] }}>{contact.name}</Typography>
          {width <= MOBILE_BREAKPOINT && (
            <IconButton aria-label="info" sx={{ color: 'primary.main', right: 6, top: 6, position: 'absolute'}} onClick={ onClickMoreInfo }>
              <MoreVertIcon sx={{ color: '#ffffff', fontSize: 30 }}  />
            </IconButton>
          )}
        </Grid>
        <Grid
          sx={{ height: '90vh' }}
          direction="column"
          container>
            <Box sx={{pl: [20, 20, 20, 48, 48], pr: [20, 20, 20, 53, 53], pt: '8vh', pb: 20, height: '100%' }}
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
                  ismobile={width < MOBILE_BREAKPOINT ? 1 : 0}
                  imgsrc={user.id === msg.senderId ? user.imageProfileSRC : contact.imageProfileSRC }
                  id={'message_' + msg.id}
                />
              ))}
              <div id="messagesBottomRef" sx={{ width: '100%', height: 1 }} ref={messagesBottomRef}></div>
            </Box>
        </Grid>
        <Divider light />
        <Grid sx={{ pl: 10, pr: 0, pt: [10, 10, 10, 20, 20], pb: 20 , height: '9vh' }}
          direction="row"
          container
          bgcolor="background.secondary">
            <MessageInput
              sx={{
                width: ['75%', '75%', '75%', '90%', '90%'],
                height: [14, 14, 14, 18, 18]
              }}
              maxRows={1}
              placeholder="Escribe un mensaje..."
              value={ newMessage }
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={onKeyPressAction} />
            <SendIcon
              sx={{
                ml: 10,
                width: [35, 35, 35, 45, 45],
                height: [35, 35, 35, 45, 45]
              }}
              style={{ cursor: 'pointer', right: '2%' }}
              onClick={ onClickBtnSendMsg }
            />
        </Grid>
      </Grid>
      {width > MOBILE_BREAKPOINT && (
        <Grid item lg={2} sx={{ bgcolor: 'background.secondary', zIndex: 10 }} container>
          <Contact contact={ contact } />
        </Grid>
      )}
    </Grid>
  );
}

export default UserChat;