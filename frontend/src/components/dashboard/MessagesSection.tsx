import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MessagesList from '../../pages/Messages/MessagesList';
import Message from '../../pages/Messages/Message';


const MessagesSection: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MessagesList />} />
      <Route path="/:id" element={<Message />} />
    </Routes>
  );
};

export default MessagesSection;
