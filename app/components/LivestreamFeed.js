import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/clientApp';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';

export default function LivestreamPlayer({ stream }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, 'livestreams', stream.id, 'messages'),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, [stream.id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, 'livestreams', stream.id, 'messages'), {
        text: newMessage,
        userId: user.uid,
        userName: user.displayName,
        createdAt: new Date(),
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h3>{stream.title}</h3>
      <p>Streamer: {stream.userName}</p>
      {/* In a real application, you would embed the actual video player here */}
      <div style={{ width: '640px', height: '360px', backgroundColor: 'black', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Livestream Video Player Placeholder
      </div>
      <div>
        <h4>Chat</h4>
        <div style={{ height: '200px', overflowY: 'scroll', border: '1px solid #ccc' }}>
          {messages.map(message => (
            <p key={message.id}><strong>{message.userName}:</strong> {message.text}</p>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
} 