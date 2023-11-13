import React, { useState } from 'react';

const CreateTicket = ({ onAddTicket, statuses, priorities, users }) => {
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(statuses[0]);
  const [priority, setPriority] = useState(priorities[0]);
  const [user, setUser] = useState(users[0].id);
  const [tag, setTag] = useState('');

  const handleAddTicket = () => {
    // Validate input fields if needed

    // Create a new ticket object
    const newTicket = {
      id,
      title,
      description,
      status,
      priority,
      user,
      tag, // Add tag to the new ticket object
    };

    // Pass the new ticket to the parent component
    onAddTicket(newTicket);

    // Clear input fields after adding the ticket
    setId('');
    setTitle('');
    setDescription('');
    setStatus(statuses[0]);
    setPriority(priorities[0]);
    setUser(users[0].id);
    setTag('');
  };

  return (
    <div className="create-ticket">
      <h2>Create New Ticket</h2>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"  
        placeholder="Tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        {statuses.map((statusOption) => (
          <option key={statusOption} value={statusOption}>
            {statusOption}
          </option>
        ))}
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        {priorities.map((priorityOption) => (
          <option key={priorityOption} value={priorityOption}>
            {priorityOption}
          </option>
        ))}
      </select>
      <select value={user} onChange={(e) => setUser(e.target.value)}>
        {users.map((userOption) => (
          <option key={userOption.id} value={userOption.id}>
            {userOption.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddTicket}>Add Ticket</button>
    </div>
  );
};

export default CreateTicket;
