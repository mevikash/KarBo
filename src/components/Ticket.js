import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCircle, faTag } from '@fortawesome/free-solid-svg-icons';

const Ticket = ({ ticket, renderPriorityIcon, onDeleteTicket, onUpdateTicket }) => {
  const { id, title, tag, description, status, user, priority } = ticket;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedStatus, setEditedStatus] = useState(status);
  const [editedPriority, setEditedPriority] = useState(priority);
  const [editedTag, setEditedTag] = useState(tag);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    const updatedTicket = {
      id: ticket.id,
      title: editedTitle,
      description: editedDescription,
      status: editedStatus,
      priority: editedPriority,
      tag: editedTag,
    };
    onUpdateTicket(updatedTicket);
    toggleEdit();
  };

  return (
    <div className={`ticket ${isEditing ? 'editing' : ''}`}>
      <div className="ticket-header">
        
          
        
        <div className="ticket-info">
          <div className="ticket-info-line">
            <span className="value">{id}</span> <FontAwesomeIcon icon={faUserCircle} />
          </div>
          <div className="ticket-info-line">
            <div className="title-line">
              <div className="circle-icon title-icon">
                
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <span className="title-value">{title}</span>
              )}
            </div>
          </div>
          <div className="ticket-info-line">
            <div className="tag-line">
            <div className="circle-icon title-icon">
                
              </div>
                {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={toggleEdit}>---</button>
      )} 
              
              <span className="tag-value">{tag}</span>
              <button onClick={() => onDeleteTicket(id  ) }> Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div className="ticket-body">
        {/* Include other ticket details as needed */}
        {/* For example: <div>Status: {status}</div> */}
        {/* For example: <div>Priority: {priority}</div> */}
      </div>
      
      
    </div>
  );
};

export default Ticket;
