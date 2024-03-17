import React, { FC } from 'react';
import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TicketListTableProps } from '@/ITypes/component-types';

const TicketListTable: FC<TicketListTableProps> = ({ data, handleClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="ticket table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Displaying items from newest to oldest */}
          {[...data].reverse().map((ticket: any) => (
            <TableRow key={ticket.id} style={{ cursor: 'pointer' }} hover onClick={() => handleClick(ticket.id)}>
              <TableCell>{ticket.title}</TableCell>
              <TableCell>{ticket.message}</TableCell>
              <TableCell>
                <Chip
                  label={ticket.status}
                  color={ticket.status === 'pending' ? 'default' : ticket.status === 'answered' ? 'primary' : 'secondary'}
                />
              </TableCell>
              <TableCell>{new Date(ticket.Date).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketListTable;
