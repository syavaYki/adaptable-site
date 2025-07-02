import { faCommentDots, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import './AIAgent.scss';

type Message = {
  id: number;
  role: 'user' | 'model';
  content: string;
  isLoading?: boolean;
};

export const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'model',
      content:
        "Hi! I'm an AI assistant. How can I help you find the perfect pet today?",
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = userInput.trim();
    if (trimmedInput === '') return;

    const newUserMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: trimmedInput,
    };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');

    const loadingMessageId = Date.now() + 1;
    setMessages(prev => [
      ...prev,
      { id: loadingMessageId, role: 'model', content: '', isLoading: true },
    ]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput }),
      });

      // If the response is not OK, parse the error message from the server
      if (!response.ok) {
        // Try to get the error message from the server's JSON response
        const errorData = await response.json().catch(() => {
          // If the server sends back a non-JSON error (like plain text)
          return { error: `Server responded with status: ${response.status}` };
        });
        // Throw an error that includes the server's message
        throw new Error(
          errorData.error || 'Failed to get a response from the server.',
        );
      }

      const data = await response.json();
      setMessages(prev =>
        prev.map(msg =>
          msg.id === loadingMessageId
            ? { ...msg, content: data.message, isLoading: false }
            : msg,
        ),
      );
    } catch (error) {
      console.error('Chat error:', error);
      // Display the specific error message in the chat
      let errorMessage = 'Sorry, something went wrong.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setMessages(prev =>
        prev.map(msg =>
          msg.id === loadingMessageId
            ? { ...msg, content: errorMessage, isLoading: false }
            : msg,
        ),
      );
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          className="pet-chatbot-bubble"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <span className="icon">
            <FontAwesomeIcon icon={faCommentDots} />
          </span>
        </button>
      )}

      <div className={`pet-chatbot-window ${isOpen ? 'is-open' : ''}`}>
        <header className="chat-header">
          <div className="ai-avatar">AI</div>
          <p className="header-title">Pet Finder Assistant</p>
          <button
            className="close-button"
            aria-label="close"
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </header>

        <main className="chat-body">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`message-container ${msg.role === 'user' ? 'is-user' : 'is-model'}`}
            >
              <div className="message-bubble">
                {msg.isLoading ? (
                  <div className="dot-flashing"></div>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </main>

        <footer className="chat-footer">
          <form
            onSubmit={handleSendMessage}
            className="chat-input-form"
          >
            <input
              className="chat-input"
              type="text"
              placeholder="Type a message..."
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              aria-label="Chat input"
            />
            <button
              className="send-button"
              type="submit"
              aria-label="Send message"
              disabled={userInput.trim() === ''}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </footer>
      </div>
    </>
  );
};
