import { Ticket, TicketData } from '@/ITypes/IGeneral';

export interface ITicketItemProps {
  params: Record<string, number>;
}

export interface ITicketListTableProps {
  data: Ticket[];
  handleClick: (ticketId: string) => void;
}

export interface ITicketFormProps {
  onSubmitSuccess: () => void;
}
export interface TicketResponseFormProps {
  ticketId: string;
}
