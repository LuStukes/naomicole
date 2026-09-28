import React, { useState } from 'react';
import { Copy, Check, MessageCircleHeart, Loader2 } from 'lucide-react';

const CHANNEL_META = {
  email: { label: 'Email version', color: '#5B3A56' },
  text: { label: 'Text message version', color: '#C97064' },
};

export default function TestimonialRequestTool() {
  const [coachName, setCoachName] = useState('Naomi Cole');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [copied, setCopied] = useState({});

  const generate = async () => {
    if (!input.trim()) {
      setError('Add a few details about the client and their win first.');
      return;
    }
    setError('');
    setLoading(true);
    setResults(null);

    try {
      const systemPrompt = `You are helping the coach/consultant "${coachName}" ask a client for a testimonial. Given a short description of the client and what they accomplished, write two versions of a testimonial request message:
- email: warm, genuine, 3-4 sentences, references the specific win mentioned, ends with a clear but low-pressure ask for a short testimonial. Include a natural subject line on its own first line, then a blank line, then the body.
- text: much shorter and more casual, 2-3 sentences, suitable for a text message, same low-pressure ask.
Both should sound like they're from a real person, not a template. Avoid being pushy or salesy.
Respond with ONLY a raw JSON object in this exact shape, no markdown formatting, no code fences, no extra text: {"email": "...", "text": "..."}`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: 'user', content: input }],
        }),
      });

      const data = await response.json();
      const textBlock = data.content?.find((b) => b.type === 'text');
      if (!textBlock) throw new Error('No response text received.');
      const cleaned = textBlock.text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setResults(parsed);
    } catch (err) {
      console.error(err);
      setError('Something went wrong generating drafts. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (channel, text) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [channel]: true }));
    setTimeout(() => setCopied((prev) => ({ ...prev, [channel]: false })), 1800);
  };

  return (
    <div className="min-h-screen w-full flex justify-center p-6" style={{ backgroundColor: '#FBF6EF' }}>
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-xs font-semibold tracking-wide" style={{ color: '#C97064' }}>
              CLIENT PORTAL
            </p>
            <h1 className="text-2xl font-semibold" style={{ color: '#2E2430', fontFamily: 'serif' }}>
              {coachName}
            </h1>
          </div>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#5B3A56' }}
          >
            <MessageCircleHeart size={18} color="#FBF6EF" />
          </div>
        </div>
        <p className="text-sm mb-6" style={{ color: '#7A6D74' }}>
          Testimonial Request Generator
        </p>

        <div className="rounded-lg p-5 mb-6" style={{ border: '1px solid #DCD3C6', backgroundColor: '#FFFFFF' }}>
          <label className="block text-xs font-semibold mb-2" style={{ color: '#2E2430' }}>
            Your name (as the sender)
          </label>
          <input
            value={coachName}
            onChange={(e) => setCoachName(e.target.value)}
            className="w-full rounded-md px-3 py-2 mb-4 text-sm"
            style={{ border: '1px solid #DCD3C6', color: '#2E2430' }}
          />

          <label className="block text-xs font-semibold mb-2" style={{ color: '#2E2430' }}>
            Tell us about the client and their win
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder="e.g. Priya finished our 6-month engagement and just got promoted to Senior Director. She specifically struggled with speaking up in exec meetings when we started."
            className="w-full rounded-md px-3 py-2 text-sm mb-4"
            style={{ border: '1px solid #DCD3C6', color: '#2E2430' }}
          />

          {error && (
            <p className="text-sm mb-3" style={{ color: '#C97064' }}>
              {error}
            </p>
          )}

          <button
            onClick={generate}
            disabled={loading}
            className="w-full py-3 text-sm font-semibold flex items-center justify-center gap-2 rounded-full"
            style={{ backgroundColor: loading ? '#A85850' : '#C97064', color: '#FFFFFF' }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Generating drafts...
              </>
            ) : (
              'Generate request messages'
            )}
          </button>
        </div>

        {results && (
          <div className="space-y-4">
            {['email', 'text'].map((channel) => (
              <div
                key={channel}
                className="rounded-lg p-5"
                style={{ border: '1px solid #DCD3C6', backgroundColor: '#FFFFFF' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-semibold uppercase tracking-wide"
                    style={{ color: CHANNEL_META[channel].color }}
                  >
                    {CHANNEL_META[channel].label}
                  </span>
                  <button
                    onClick={() => handleCopy(channel, results[channel])}
                    className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ border: '1px solid #DCD3C6', color: '#2E2430' }}
                  >
                    {copied[channel] ? (
                      <>
                        <Check size={13} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-sm whitespace-pre-wrap" style={{ color: '#2E2430' }}>
                  {results[channel]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
