import { Route, Routes } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import MessagesList from './MessagesList';
import Message from './Message';

const Messages = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<MessagesList />} />
          <Route path="/:id" element={<Message />} />
        </Routes>
      </div>
    </>
  );
};

export default Messages;
