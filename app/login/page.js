"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import VideoFeed from '../components/VideoFeed';
import UploadForm from '../components/UploadForm';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const { user, signInWithGoogle, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      // Fetch videos from Firestore
      // This is a placeholder. Implement the actual Firestore query.
      const fetchVideos = async () => {
        // Firestore query logic here
        // setVideos(fetchedVideos);
      };
      fetchVideos();
    }
  }, [user]);

  if (loading || !user) return <div>Loading...</div>;

  return (
    <div>
      <h1>TikTok Clone</h1>
      <button onClick={logout}>Logout</button>
      <UploadForm />
      <VideoFeed videos={videos} />
    </div>
  );
}

"use client"
import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}
