export interface Ticket {
  id: string;
  title: string;
  message: string;
  status: string;
  Date: number;
  responses: string[];
}

export interface TicketData {
  tickets: Ticket[];
}
