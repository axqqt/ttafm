"use client"
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import StartLivestream from '../components/StartLivestream';
import LivestreamFeed from '../components/LivestreamFeed';

export default function Livestreams() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Livestreams</h1>
      <StartLivestream />
      <LivestreamFeed />
    </div>
  );
}