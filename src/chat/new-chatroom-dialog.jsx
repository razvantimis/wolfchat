// @flow

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetState as resetStateAction } from '../redux/chat';
import { createChatRoom } from '../redux/room';
import type { Chatroom } from '../redux/room';

export function NewChatroomDialog() {
  const { lat, lng } = useSelector(state => state.chat.selectedCoordinates);
  const dispatch = useDispatch()
  const resetStateDispatch = useCallback(
    () => dispatch(resetStateAction()),
    [dispatch]
  )

  const createChatDispatch = useCallback(
    (chatroom) => dispatch(createChatRoom(chatroom)),
    [dispatch]
  )
  const [chatName, setChatName] = useState('');

  const createChat = () => {
    const newChatroom: Chatroom = {
      name: chatName,
      coordinates: { lat, lng }
    }
    createChatDispatch(newChatroom);
    resetStateDispatch();
  }

  return (
    <Dialog open={true} onClose={resetStateDispatch} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Chat</DialogTitle>
      <DialogContent>
        <DialogContentText>
          @ Latitude: {lat.toFixed(2)} , Longitude: {lng.toFixed(2)}
        </DialogContentText>
        <TextField
          autoFocus
          id="name"
          label="Name this chat"
          type="text"
          value={chatName}
          onChange={e => setChatName(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={createChat} color="primary">
          Create
          </Button>

      </DialogActions>
    </Dialog>
  );
}