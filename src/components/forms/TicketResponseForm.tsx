import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { postTicketResponse } from '@/api'; // Assuming API function is defined
import { TextField, Button, CircularProgress } from '@mui/material';
import { TicketResponseFormProps } from '@/ITypes/component-types';
import { ITicketResponseFormValues } from '@/ITypes/IFormValus';

const TicketResponseForm: FC<TicketResponseFormProps> = ({ ticketId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<ITicketResponseFormValues>();
  const queryClient = useQueryClient();
  const mutation = useMutation(postTicketResponse, {
    onSuccess: () => {
      queryClient.invalidateQueries(['ticket', ticketId]);
    },
  });

  const onSubmit: SubmitHandler<ITicketResponseFormValues> = async (data) => {
    try {
      await mutation.mutateAsync({ ticketId, body: data.response });
      reset();
    } catch (error) {
      console.error('Error posting response:', error);
      setError('response', { type: 'manual', message: 'Failed to submit response' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('response', {
          required: 'Response is required',
          minLength: { value: 3, message: 'Response must be at least 3 characters long' },
          maxLength: { value: 200, message: 'Response must be at most 200 characters long' },
        })}
        label="Your Response"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        error={Boolean(errors.response)}
        helperText={errors.response ? errors.response?.message : ''}
        sx={{ marginBottom: 2 }}
      />
      <Button type="submit" variant="contained" color="primary" disabled={mutation.isLoading}>
        {mutation.isLoading ? <CircularProgress size={24} /> : 'Submit Response'}
      </Button>
    </form>
  );
};

export default TicketResponseForm;
