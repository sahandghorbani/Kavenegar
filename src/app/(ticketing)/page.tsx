import TicketList from '@/components/pages/TicketList';
import Link from 'next/link';

export default function Home() {
  return <Link href={'/list'}>Ticket list</Link>;
}
