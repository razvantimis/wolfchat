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


  static joinRoom(roomId, user) {
    let updates = {};
    updates["users/" + user.uid + "/rooms/" + roomId] = true;
    updates["members/" + roomId + "/" + user.uid] = true;
    return firebase.database().ref().update(updates);
  }
  static leaveRoom(roomId, user) {
    let updates = {};
    updates["users/" + user.uid + "/rooms/" + roomId] = null;
    updates["members/" + roomId + "/" + user.uid] = null;
    return firebase.database().ref().update(updates);
  }

  static fetchRooms() {
    return firebase
      .database()
      .ref("chats")
      .orderByKey();
  }
  static fetchRoomMembers(roomId) {
    return firebase
      .database()
      .ref("members/" + roomId)
      .orderByKey();
  }
  static fetchMessages(roomId) {
    return firebase
      .database()
      .ref("messages/" + roomId)
      .orderByKey()
      .limitToLast(10);
  }
  static createUserWithEmailAndPassword(user) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
  }

  static signInWithEmailAndPassword(user) {
    return firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password);
  }

  static authSignOut() {
    return firebase.auth().signOut();
  }

  static databasePush(path, value) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(path).push(value, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  static GetValueByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once("value");
  }

  static GetChildAddedByKeyOnce(path, key) {
    return firebase
      .database()
      .ref(path)
      .orderByKey()
      .equalTo(key)
      .once("child_added");
  }

  static databaseSet(path, value) {
    return firebase.database().ref(path).set(value);
  }
}

