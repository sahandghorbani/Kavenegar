'use client';
import React from 'react';
import { useQuery } from 'react-query';
import { fetchTickets } from '@/api';

const TicketList = () => {
  const { isLoading, error, data } = useQuery('tickets', fetchTickets);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Ticket List Data:</h1>
      <ul>
        {data.map((ticket: any) => (
          <li key={ticket.id}>{ticket.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
