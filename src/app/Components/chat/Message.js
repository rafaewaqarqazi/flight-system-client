import React from 'react';
import {useSelector} from "react-redux";
import moment from 'moment'
const Message = ({message}) => {
  const { user } = useSelector(
    ({  auth: { user } }) => ({
      user
    })
  );
  return (
    <div className={`message-container mb-2 ${message.sender._id === user._id ? 'ml-auto bg-sender' : 'bg-receiver'}`}>
      <img src={message.sender.profileImage && message.sender.profileImage.filename ? `/images/${message.sender.profileImage.filename}` : "/media/users/100_13.jpg"} alt="Pic" className='kt-img-rounded user-image-message mr-2' />

      <div>
        <div className='kt-font-bold'>{`${message.sender.firstName} ${message.sender.lastName}`}</div>
        <div className='kt-font-sm'>{moment(message.timestamp).fromNow()}</div>
        <div>{message.message}</div>
      </div>

    </div>
  );
};

export default Message;