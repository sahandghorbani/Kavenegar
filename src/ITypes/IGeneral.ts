export interface Ticket {
  id: string;
  title: string;
  message: string;
  status: string;
  Date: number;
}

export interface TicketData {
  tickets: Ticket[];
}