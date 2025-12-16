'use client';

import { useState } from 'react';

export default function MessageSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="message" className="min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Leave a Message</h2>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-accent/20 bg-white/50 focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full glass-card px-6 py-3 font-medium hover:bg-foreground hover:text-background transition-all disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>

          {status === 'success' && (
            <p className="text-center text-green-600">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-600">Failed to send message. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}
