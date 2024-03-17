'use client';
import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import TicketForm from '@/components/forms/TicketForm';

const AddTicket = () => {
  const router = useRouter();

  const handleSubmitSuccess = () => {
    router.push('/list'); // Redirect to the ticket list page after successful form submission
  };

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Ticket List Data:
      </Typography>
      <Grid justifyContent={'center'} display={'flex'} container spacing={2}>
        <Grid item xs={12}>
          <Button
            onClick={() => router.back()}
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2 }}
          >
            Close The Ticket
          </Button>
        </Grid>
        <Grid justifyContent={'center'} display={'flex'} item xs={12}>
          <TicketForm onSubmitSuccess={handleSubmitSuccess} />
        </Grid>
      </Grid>
    </div>
  );
};

export default AddTicket;
