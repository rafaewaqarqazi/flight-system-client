import React, {useEffect, useState} from 'react';
import Message from "./Message";
import {connect, useSelector} from "react-redux";
import * as chat from "../../store/ducks/chat.duck";
import ScrollToBottom from 'react-scroll-to-bottom';

const Conversation = ({socket, addMessage, getRoom, addReceiver,addNewReceiver}) => {
  const [message, setMessage] = useState('')
  const { chat, user } = useSelector(
    ({ chat, auth: { user } }) => ({
      chat,
      user
    })
  );

  useEffect(() => {
    if (socket) {
      socket.on('receive-message', (result) => {
        addMessage(result.messages, result._id)
      })
    }

  }, [socket])
  useEffect(() => {
    if (socket) {
      if (chat.room) {
        socket.emit('msg-seen', {userId: user._id, room: chat.room}, (result) => {
          console.log('result', result)
        })
      }
    }
  }, [chat.chatList, socket, chat.room])
  const handleSubmitMessage = (e) => {
    e.preventDefault()
    if (chat.room) {
      sendMessage(chat.receiver, chat.room)
    } else {
      if (chat.newReceiver) {
        const receiver = chat.newReceiver
        getRoom(receiver, user._id, true, (room) => {
          sendMessage(receiver, room)
        })
      }
      else if (chat.receiver) {
        getRoom(chat.receiver, user._id, false,(room) => {
          sendMessage(chat.receiver, room)
        })
      }
    }

  }
  const sendMessage = (receiver, room) => {
    setMessage('')
    if (receiver && room) {
      socket.emit('send-message', {message, senderId: user._id, receiverId: receiver, roomId: room}, (result) => {
        console.log('receiver', receiver)
        if (!chat.receiver) {
          addReceiver(receiver)
        }

        addNewReceiver(null)
        addMessage(result.messages, result._id)
      })
    }

  }
  return (
    <div className='d-flex flex-column h-100'>

      <ScrollToBottom className="flex-grow-1 conversation">
        {
          chat.chatList.filter(list => list._id === chat.room)
            .map(sChat =>
              sChat.messages.map(message =>(
              <Message message={message}/>
            )))
        }
      </ScrollToBottom>
      <form onSubmit={handleSubmitMessage}>
        <input className='form-control' value={message} onChange={event => setMessage(event.target.value)}/>
        <button type='submit' className="btn btn-primary mt-2 btn-block" disabled={message.trim() === ''}>Send</button>
      </form>

    </div>
  );
};

export default connect(null, chat.actions)(Conversation);