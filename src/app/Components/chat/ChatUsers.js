import React, { Fragment } from "react";
import {connect, useSelector} from "react-redux";
import * as chat from "../../store/ducks/chat.duck";

const ChatUsers = ({addReceiver, addRoom}) => {
  const { chat, user } = useSelector(({ chat, auth: { user } }) => ({
    chat,
    user
  }));
  const handleClickChat = (receiver, room) => {
    addReceiver(receiver)
    addRoom(room)
  }
  const unseenMsg = messages => {
    let bool = false
    messages.map(msg => {
      if (msg.receiver?._id === user._id && !msg.seen) {
        bool = true
      }
    })
    return bool
  }
  return (
    <Fragment>
      {chat?.chatList &&
        chat.chatList.length > 0 ?
        chat.chatList.map(ch =>
          ch.users
            .filter(u => u._id !== user._id)
            .map(receiver => (
              <div onClick={() => handleClickChat(receiver._id, ch._id)} className={`p-3  ${receiver._id === chat.receiver ? 'active-chat' : 'border-bottom'}`} style={{cursor: 'pointer'}} key={ch._id}>
                <div className="d-flex">
                  <div>
                    {receiver?.profileImage &&
                    receiver.profileImage?.filename ? (
                      <img
                        alt="Pic"
                        className="kt-img-rounded user-image"
                        src={`/images/${receiver.profileImage?.filename}`}
                      />
                    ) : (
                      <span className="kt-badge kt-badge--lg kt-badge--bold text-white bg-info">
                        {receiver && receiver.firstName[0]}
                      </span>
                    )}
                  </div>
                  <div className="d-flex flex-column ml-3 flex-grow-1">
                    <div>{`${receiver?.firstName} ${receiver?.lastName}`}</div>
                    <div className='kt-font-sm'>{ch.messages[ch.messages.length - 1]?.message}</div>
                  </div>
                  {
                    unseenMsg(ch.messages) && <i className='fa fa-dot-circle kt-font-sm text-danger'/>
                  }

                </div>
              </div>
            ))
        )
        : <div className='text-center text-info'>No Chat Found!</div>
      }
    </Fragment>
  );
};

export default connect(null, chat.actions)(ChatUsers);
