'use client';

import { useState } from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ResumeRequestForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message: purpose || 'Resume requested',
          type: 'resume_request',
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Request failed');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setPurpose('');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-sm">
        <p className="font-semibold">Got it — message received.</p>
        <p className="text-accent mt-1">I&apos;ll get back to you at {email || 'the email you provided'} shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          required
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded border border-accent/30 bg-transparent focus:border-accent/60 focus:outline-none"
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded border border-accent/30 bg-transparent focus:border-accent/60 focus:outline-none"
        />
      </div>
      <textarea
        rows={3}
        placeholder="Your message — what's up?"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        className="w-full px-3 py-2 rounded border border-accent/30 bg-transparent focus:border-accent/60 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="glass-card px-4 py-2 font-medium border-2 border-accent/30 hover:border-accent/60 hover:!bg-accent/40 dark:hover:!bg-foreground/30 transition-all disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-red-500">Could not send the request: {errorMsg}. Email parthnuwal7@gmail.com directly.</p>
      )}
    </form>
  );
}
