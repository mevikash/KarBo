import React, { useState, useEffect } from 'react';
import Ticket from './Ticket';
import GroupingOptions from './GroupingOptions'; // Create this component
import SortingOptions from './SortingOptions'; // Create this component
import CreateTicket from './CreateTicket';
import './styles.css'; // Adjust the path to your CSS file
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faArrowUp,
  faInfoCircle,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import {
  faPlus,
  faEllipsisH,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';

const priorityLevels = {
  '4': 'Urgent',
  '3': 'High',
  '2': 'Medium',
  '1': 'Low',
  '0': 'No priority',
};

const mapPriorityToDisplay = (priority) => {
  const priorityMap = {
    '4': 'Urgent',
    '3': 'High',
    '2': 'Medium',
    '1': 'Low',
    '0': 'No priority',
    '5': 'Custom Priority 1', // Add any other custom mappings if needed
  };
  return priorityMap[priority] || priority; // Return the mapped value or the original priority if not found
};

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isCreateTicketVisible, setIsCreateTicketVisible] = useState(false); // New state for "Create a ticket" section

  const renderPriorityIcon = (priority) => {
    // Implement your priority icons or components here
  };

  const statusesArray = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
  const prioritiesArray = ['0', '1', '2', '3', '4', '5'];

  const groupTicketsByStatus = (tickets) => {
    const grouped = {};
    tickets.forEach((ticket) => {
      const status = ticket.status;
      if (!grouped[status]) {
        grouped[status] = { name: status, tickets: [] };
      }
      grouped[status].tickets.push(ticket);
    });
    return Object.values(grouped);
  };

  const groupTicketsByUser = (tickets) => {
    const grouped = {};
    tickets.forEach((ticket) => {
      const user = ticket.user.name; // Assuming user is an object with a 'name' property
      if (!grouped[user]) {
        grouped[user] = { name: user, tickets: [] };
      }
      grouped[user].tickets.push(ticket);
    });
    return Object.values(grouped);
  };

  const groupTicketsByPriority = (tickets) => {
    const grouped = {};
    tickets.forEach((ticket) => {
      const priority = ticket.priority;
      if (!grouped[priority]) {
        grouped[priority] = { name: priority, tickets: [] };
      }
      grouped[priority].tickets.push(ticket);
    });
    return Object.values(grouped);
  };

  const handleGroupingChange = (e) => {
    setGroupingOption(e.target.value);
    saveUserPreferences();
  };

  const handleSortingChange = (e) => {
    setSortingOption(e.target.value);
    saveUserPreferences();
  };

  const toggleOptions = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const loadTickets = async () => {
    try {
      const response = await fetch(
        'https://api.quicksell.co/v1/internal/frontend-assignment'
      );
      if (response.ok) {
        const data = await response.json();
        const updatedTickets = data.tickets.map((ticket) => ({
          ...ticket,
          user: data.users.find((user) => user.id === ticket.userId),
          // feature: ticket.tag[0], // Assuming tag is an array with a single value
          // userId: ticket.userId,
          // status: ticket.status,
          // priority: ticket.priority,
        }));
        adjustPriorityLabels(updatedTickets);
        setTickets(updatedTickets);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderUserTitle = (user) => (
    <div className="user-title">
      <h2>{user.name}</h2>
    </div>
  );

  const saveUserPreferences = () => {
    const userPreferences = {
      groupingOption,
      sortingOption,
    };
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  };

  const loadUserPreferences = () => {
    const userPreferencesJSON = localStorage.getItem('userPreferences');
    if (userPreferencesJSON) {
      const userPreferences = JSON.parse(userPreferencesJSON);
      setGroupingOption(userPreferences.groupingOption);
      setSortingOption(userPreferences.sortingOption);
    }
  };

  useEffect(() => {
    loadUserPreferences();
    loadTickets();
  }, []);

  const addTicket = (newTicket) => {
    setTickets([...tickets, newTicket]);
  };

  const deleteTicket = (ticketId) => {
    const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
    setTickets(updatedTickets);
  };

  const updateTicket = (updatedTicket) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    );
    setTickets(updatedTickets);
  };

  let groupedTickets = [];
  if (groupingOption === 'status') {
    groupedTickets = groupTicketsByStatus(tickets);
  } else if (groupingOption === 'user') {
    groupedTickets = groupTicketsByUser(tickets);
  } else if (groupingOption === 'priority') {
    groupedTickets = groupTicketsByPriority(tickets);
  }

  groupedTickets.forEach((group) => {
    group.tickets.sort((a, b) => {
      if (sortingOption === 'priority') {
        return b.priority - a.priority;
      } else if (sortingOption === 'title') {
        return a.title.localeCompare(b.title);
      }
    });
  });

  const adjustPriorityLabels = (tickets) => {
    const uniquePriorities = new Set(tickets.map((ticket) => ticket.priority));
    uniquePriorities.forEach((priority) => {
      if (!priorityLevels[priority]) {
        priorityLevels[priority] = `Priority level ${priority}`;
      }
    });
  };

  const toggleCreateTicket = () => {
    setIsCreateTicketVisible(!isCreateTicketVisible);
  };
  return (
    <div className="kanban-board">
      <div className="options-container">
        <button onClick={toggleOptions}>
          <label>
            Display <FontAwesomeIcon icon={isOptionsVisible ? faAngleUp : faAngleDown} />
          </label>
        </button>

        {isOptionsVisible && (
          <div className="filter-and-group">
            <label>Grouping</label>
            <select value={groupingOption} onChange={handleGroupingChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>

            <label>Ordering:</label>
            <select value={sortingOption} onChange={handleSortingChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        )}
      </div>
      {isCreateTicketVisible && (
        <CreateTicket
          onAddTicket={addTicket}
          statuses={['Backlog', 'Todo', 'In progress', 'Done', 'Canceled']}
          priorities={['0', '1', '2', '3', '4', '5']}
          users={[
            { id: 'usr-1', name: 'Anoop sharma', available: false },
            { id: 'usr-2', name: 'Yogesh', available: false },
            { id: 'usr-3', name: 'Suresh', available: false },
            { id: 'usr-4', name: 'Shankar Kumar', available: false },
            { id: 'usr-5', name: 'Ramesh', available: false },
          ]}
        />
      )}
      <div className="section-rows">
        {groupedTickets.map((group) => (
          <div className="section-row" key={group.name}>
            <h2>
              {group.name === 'user' ? (
                <>
                  {group.tickets[0]?.user.name} ({group.tickets.length})
                  <button className="plus-button" onClick={toggleCreateTicket}>
                    +
                  </button>
                </>
              ) : group.name === 'priority' ? (
                <>
                  {group.tickets[0]?.priority === '0' ? (
                    'No priority'
                  ) : (
                    `${mapPriorityToDisplay(group.tickets[0]?.priority)} (${group.tickets.length})`
                  )}
                  <FontAwesomeIcon
                    icon={faPlus}
                    onClick={toggleCreateTicket}
                  />
                </>
              ) : (
                <>
                  {group.name} {group.tickets.length}
                  <button className="plus-button" onClick={toggleCreateTicket}>
                    +
                  </button>
                </>
              )}
            </h2>

            {group.tickets.map((ticket) => (
              <Ticket
                key={ticket.id}
                ticket={ticket}
                renderPriorityIcon={renderPriorityIcon}
                onDeleteTicket={deleteTicket}
                onUpdateTicket={updateTicket}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
