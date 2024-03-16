'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import {
  TextField,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { createTicket } from '@/api'; // Import createTicket function from api.ts

const TicketForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const createNewTicket = useMutation(createTicket);

  const onSubmit = async (data: any) => {
    try {
      await createNewTicket.mutateAsync(data);
      reset();
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div>
      <h2>Create New Ticket</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('title', { required: true })}
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          {...register('message', { required: true })}
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select {...register('status', { required: true })} label="Status">
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="answered">Answered</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" disabled={createNewTicket.isLoading}>
          {createNewTicket.isLoading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </form>
    </div>
  );
};

export default TicketForm;
