import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
  AddChats: "[AddChats] Action",
  AddReceiver: "[AddReceiver] Action",
  AddNewReceiver: "[AddNewReceiver] Action",
  AddRoom: "[AddRoom] Action",
  AddMessage: "[AddMessage] Action",
  RemoveMessage: "[RemoveMessage] Action",
  EditMessage: "[EditMessage] Action",
  SetSocket: "[SetSocket] Action"
};

const initialAuthState = {
  chatList: [],
  conversation: [],
  receiver: null,
  newReceiver: null,
  room: null,
  socket: null
};

export const reducer = persistReducer(
  { storage, key: "chat", whitelist: ['conversation', 'receiver', 'newReceiver'] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.SetSocket: {
        const {socket} = action.payload
        return {
          ...state,
          socket
        }
      }
      case actionTypes.AddReceiver: {
        const { receiver } = action.payload;
        return {
          ...state,
          receiver
        };
      }
      case actionTypes.AddNewReceiver: {
        const { newReceiver } = action.payload;
        return {
          ...state,
          newReceiver
        };
      }
      case actionTypes.AddChats: {
        const { chats } = action.payload;
        return {
          ...state,
          chatList: chats
        };
      }
      case actionTypes.AddRoom: {
        const { room } = action.payload;
        return {
          ...state,
          room
        };
      }
      case actionTypes.AddMessage: {
        const { messages, room } = action.payload;
        const newState = state.chatList.map(chat => {
          if (chat._id === room) {
            return {
              ...chat,
              messages
            }
          } else {
            return chat
          }
        })
        return {
          ...state,
          chatList: newState
        };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  addReceiver: receiver => ({ type: actionTypes.AddReceiver, payload: { receiver } }),
  addNewReceiver: newReceiver => ({ type: actionTypes.AddNewReceiver, payload: { newReceiver } }),
  addChats: chats => ({ type: actionTypes.AddChats, payload: { chats } }),
  addRoom: room => ({ type: actionTypes.AddRoom, payload: { room } }),
  addMessage: (messages, room) => ({ type: actionTypes.AddMessage, payload: { messages, room } }),
  setSocket: socket => ({ type: actionTypes.SetSocket, payload: { socket } })
};

export function* saga() {

}
