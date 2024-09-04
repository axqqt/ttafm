import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/clientApp';
import { collection, addDoc } from 'firebase/firestore';

export default function StartLivestream() {
  const [title, setTitle] = useState('');
  const { user } = useAuth();

  const handleStartLivestream = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      // In a real application, you would integrate with a livestreaming service here
      // For this example, we'll just create a document in Firestore
      await addDoc(collection(db, 'livestreams'), {
        title,
        userId: user.uid,
        userName: user.displayName,
        startedAt: new Date(),
        isActive: true,
      });

      setTitle('');
      alert('Livestream started!');
    } catch (error) {
      console.error('Error starting livestream:', error);
    }
  };

  return (
    <form onSubmit={handleStartLivestream}>
      <input
        type="text"
        placeholder="Livestream Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Start Livestream</button>
    </form>
  );
}