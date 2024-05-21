import { useState, useCallback } from 'react';
import MessageInput from '../components/MessageInput';
import JournalList from '../components/JournalList';
import SearchAndSort from '../components/SearchAndSort';

function Journal() {
  const [journalMessages, setJournalMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const addMessage = useCallback((message) => {
    const newMessage = {
      id: journalMessages.length + 1,
      content: message,
      date: new Date().toISOString(),
      response: null,
    };
    setJournalMessages((prevMessages) => [...prevMessages, newMessage]);
  }, [journalMessages]);

  const sortedMessages = [...journalMessages].sort((a, b) =>
    sortOrder === 'asc'
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date)
  );

  const filteredMessages = sortedMessages.filter((message) =>
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="w-full flex justify-center">
      <h1 className="p-2 mr-2 bg-blue-500 text-white font-bold text-center text-xl w-1/4 mb-4">Journal</h1>
      </div>
      <MessageInput addMessage={addMessage} />
      <SearchAndSort
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <JournalList journalMessages={filteredMessages} setJournalMessages={setJournalMessages} />
    </div>
  );
}

export default Journal;
