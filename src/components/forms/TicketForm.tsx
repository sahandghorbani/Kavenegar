import React from 'react';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { createTicket } from '@/api';
import { IFormData } from '@/ITypes/IFormValus';
import { ITicketFormProps } from '@/ITypes/component-types';

const TicketForm: React.FC<ITicketFormProps> = ({ onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();
  const createNewTicket = useMutation(createTicket);

  const onSubmit = async (data: any) => {
    const newData = { ...data, Date: Date.now(), responses: [] };
    try {
      await createNewTicket.mutateAsync(newData);
      reset();
      onSubmitSuccess(); // Callback to handle success actions
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '400px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register('title', {
              required: 'This field is required',
              minLength: { value: 3, message: 'Title must be at least 3 characters long' },
              maxLength: { value: 50, message: 'Title must be at most 50 characters long' },
              pattern: { value: /^[^\d]+$/, message: 'Title must not contain numbers' },
            })}
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            error={Boolean(errors.title?.message)}
            helperText={Boolean(errors.title?.message) ? errors.title?.message : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('message', {
              required: 'This field is required',
              minLength: { value: 10, message: 'Message must be at least 10 characters long' },
              maxLength: { value: 200, message: 'Message must be at most 200 characters long' },
            })}
            label="Message"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            error={Boolean(errors.message?.message)}
            helperText={Boolean(errors.message?.message) ? errors.message?.message : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select {...register('status', { required: true })} label="Status">
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="answered">Answered</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" disabled={createNewTicket.isLoading}>
            {createNewTicket.isLoading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TicketForm;
