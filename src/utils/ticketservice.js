// Generate unique ticket ID
const generateId = () => Date.now();

// Save tickets back to localStorage
const saveTickets = (tickets) => {
  localStorage.setItem("tickets", JSON.stringify(tickets));
};

// Get all tickets from localStorage
export const getTickets = () => {
  const storedTickets = localStorage.getItem("tickets");
  // If storedTickets is null or undefined, return an empty array
  return storedTickets ? JSON.parse(storedTickets) : [];
};

// Create and store a new ticket
export const createTicket = (data) => {
  const newTicket = {
    id: generateId(),
    title: data.title,
    description: data.description ?? "", // fallback to empty string if not provided
    status: data.status,
    priority: data.priority,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const existingTickets = getTickets();
  const updatedTickets = [...existingTickets, newTicket];
  saveTickets(updatedTickets);

  return newTicket;
};
