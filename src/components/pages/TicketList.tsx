'use client'
import React from 'react';
import { useQuery } from 'react-query';
import { fetchTickets } from '@/api';
import { Card, CardContent, CircularProgress, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TicketListTable from '@/components/tables/TicketListTable';

const TicketList = () => {
  const router = useRouter();
  const { isLoading, error, data } = useQuery('tickets', fetchTickets);

  const handleClick = (ticketId:number) => {
    router.push(`/list/${ticketId}`);
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error: {(error as any).message}</div>;

  return (
    <Card  sx={{ minWidth: 300, }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Ticket List Data:
        </Typography>
        <Link href="/add" passHref>
          <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
            Create Ticket
          </Button>
        </Link>
        <Divider sx={{ marginBottom: 2 }} />
        <TicketListTable data={data} handleClick={handleClick} />
      </CardContent>
    </Card>
  );
};

export default TicketList;
