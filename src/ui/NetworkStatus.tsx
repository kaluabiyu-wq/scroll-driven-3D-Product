import { useEffect, useState } from 'react';

/** Small, accessible offline notice; the story itself remains usable without a connection. */
export default function NetworkStatus() {
  const [online, setOnline] = useState(() => typeof navigator === 'undefined' || navigator.onLine);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (online) return null;
  return <div className="network-status" role="status" aria-live="polite">You’re offline. The Halo H1 story is available from this device.</div>;
}
