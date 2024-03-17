import axios from 'axios';

const baseURL = 'http://localhost:3001';

const fetchTickets = async () => {
  try {
    const response = await axios.get(`${baseURL}/tickets`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

const createTicket = async (ticketData: { title: string; message: string }) => {
  try {
    const response = await axios.post(`${baseURL}/tickets`, ticketData);
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};
const fetchTicket = async (ticketId: number) => {
  try {
    const response = await axios.get(`${baseURL}/tickets/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching ticket:', error);
    throw error;
  }
};
const postTicketResponse = async ({ ticketId, body }: { ticketId: string; body: string }) => {
  try {
    const response = await axios.get(`${baseURL}/tickets/${ticketId}`);
    const ticketData = response.data;
    const updatedTicketData = {
      ...ticketData,
      responses: [...ticketData.responses, body],
    };
    await axios.put(`${baseURL}/tickets/${ticketId}`, updatedTicketData);
    return updatedTicketData;
  } catch (error) {
    console.error('Error adding response to ticket:', error);
    throw error;
  }
};

export { fetchTickets, createTicket, fetchTicket, postTicketResponse };
