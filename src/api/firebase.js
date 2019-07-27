// @flow
import * as firebase from "firebase";
import 'firebase/firestore';
import { firebaseConfig } from "../config";
import { collectionData } from 'rxfire/firestore';
import type { Chatroom, Message } from '../redux/room';
export class FirebaseApi {
  static initConfig() {
    firebase.initializeApp(firebaseConfig);
  }

  static async fetchRoomList(): Promise<Chatroom[]> {
    const snapshot = await firebase.firestore().collection("chats").orderBy('timestamp', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), messages: [] }));
  }

  static listenOnMessageFromRoom(selectedRoomId: string) {
    const ref = firebase.firestore().collection("chats").doc(selectedRoomId).collection('messages').orderBy('timestamp', 'asc');
    return collectionData(ref, 'id');
  }
  static async createRoom(chatRoom: Chatroom) {
    let room = {
      ...chatRoom,
      timestamp: Date.now()
    };
    const newChatRoomRef = firebase.firestore().collection("chats").doc();
    room.id = newChatRoomRef.id;
    await newChatRoomRef.set(room);
    return room;
  }


  static async sendMessage(selectedRoomId: string, message: Message) {
    let messageForSave = {
      ...message,
      timestamp: Date.now()
    }

    const newMessageRef = firebase.firestore().collection("chats").doc(selectedRoomId).collection('messages').doc();
    await newMessageRef.set(messageForSave);
    return message;
  }



}

