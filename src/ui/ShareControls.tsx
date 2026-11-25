import { useState } from 'react';

export default function ShareControls() {
  const [message, setMessage] = useState('');

  async function share() {
    const data = { title: 'Halo H1', text: 'Explore the Halo H1 wireless headphone story.', url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(data);
        setMessage('');
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(data.url);
        setMessage('Link copied');
      } else {
        setMessage('Sharing is unavailable in this browser');
      }
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') setMessage('Could not share this page');
    }
  }

  return (
    <div className="share-controls">
      <button type="button" className="utility-button" onClick={share} aria-label="Share the Halo H1 story">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 16V3m0 0L7 8m5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" /></svg>
        <span>Share</span>
      </button>
      <span className="share-status" role="status" aria-live="polite">{message}</span>
    </div>
  );
}
