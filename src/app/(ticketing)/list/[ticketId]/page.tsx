'use client';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { fetchTicket } from '@/api';
import { Card, CardContent, Typography, Button, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ITicketItemProps } from '@/ITypes/component-types';
import TicketResponseForm from '@/components/forms/TicketResponseForm';

const TicketItem: FC<ITicketItemProps> = ({ params }) => {
  const { data, isLoading, error } = useQuery(['ticket', params.ticketId], () =>
    fetchTicket(params.ticketId),
  );
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as any).message}</div>;

  const TicketItemRow = (label: string, value: string | number | Date) => (
    <Typography
      gutterBottom
      variant="subtitle1"
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <strong>{label}:</strong> {value instanceof Date ? value.toLocaleString() : value}
    </Typography>
  );
  return (
    <div style={{ marginLeft: '20px' }}>
      <Card>
        <CardContent sx={{ marginTop: 1, padding: 2, maxWidth: 400 }}>
          <Button
            onClick={() => router.back()}
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2 }}
          >
            Back
          </Button>
          {/*Details*/}
          <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
            Ticket Item:
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {TicketItemRow('Ticket ID', data.id)}
            {TicketItemRow('Title', data.title)}
            {TicketItemRow('Message', data.message)}
            {TicketItemRow('Status', data.status)}
            {TicketItemRow('Date', new Date(data.Date))}
          </div>
          {/*Responses*/}
          <Divider sx={{ my: 2 }} />
          {data?.responses && <Typography variant="h6">Ticket responses:</Typography>}
          {data?.responses?.map((response: string, index: number) => (
            <Typography key={index} variant="body1">
              {`- ${response}`}
            </Typography>
          ))}
          <Divider sx={{ my: 2 }} />
          {/*Form*/}
          <TicketResponseForm ticketId={params.ticketId as any} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketItem;
