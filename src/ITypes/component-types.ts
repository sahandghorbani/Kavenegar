import { TicketData } from '@/ITypes/IGeneral';

export interface ITicketItemProps {
  params: Record<string, number>;
}

export interface ITicketListTableProps {
  data: TicketData;
  handleClick: (ticketId: number) => void;
}

export interface ITicketFormProps {
  onSubmitSuccess: () => void;
}
export interface TicketResponseFormProps {
  ticketId: string;
}
