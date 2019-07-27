// @flow
import * as firebase from "firebase";
import 'firebase/firestore';
import { firebaseConfig } from "../config";
import type { Chatroom } from '../redux/room';
export class FirebaseApi {
  static initConfig() {
    firebase.initializeApp(firebaseConfig);
  }

  static async fetchRoomList(): Promise<Chatroom[]> {
    const snapshot = await firebase.firestore().collection("chats").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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


  static async sendMessage(text, user, roomId) {

    let msg = {
      text: text,
      timestamp: Date.now(),
      name: user.email
    };
    const newMsgRef = await firebase
      .database()
      .ref("messages/" + roomId + "/")
      .push();
    msg.id = newMsgRef.key;
    newMsgRef.set(msg);
    return msg;

  }


 
}

