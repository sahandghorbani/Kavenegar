export interface TicketItemProps {
  params: Record<string, number>;
}

export interface TicketListTableProps {
  data: any[];
  handleClick: (ticketId: number) => void;
}

export interface TicketFormProps {
  onSubmitSuccess: () => void;
}
