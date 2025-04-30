
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define types
export interface TicketResponse {
  id: string;
  message: string;
  createdAt: string;
  isAdmin: boolean;
}

export interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: 'open' | 'answered' | 'closed';
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
}

interface CreateTicketData {
  subject: string;
  message: string;
}

interface TicketsContextType {
  tickets: Ticket[];
  createTicket: (data: CreateTicketData) => Promise<void>;
  respondToTicket: (ticketId: string, message: string) => Promise<void>;
  closeTicket: (ticketId: string) => Promise<void>;
}

// Create context
const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

// Storage key
const TICKETS_STORAGE_KEY = 'trinova_tickets';

// Provider component
export function TicketsProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Load tickets from localStorage
  useEffect(() => {
    const storedTickets = localStorage.getItem(TICKETS_STORAGE_KEY);
    if (storedTickets) {
      try {
        setTickets(JSON.parse(storedTickets));
      } catch (error) {
        console.error('Failed to parse tickets from localStorage');
        localStorage.removeItem(TICKETS_STORAGE_KEY);
      }
    } else {
      // Set demo tickets if none exist
      const demoTickets: Ticket[] = [
        {
          id: '1',
          subject: 'Nasıl VIP satın alabilirim?',
          message: 'Merhaba, web sitesi üzerinden VIP satın almak istiyorum fakat ödeme seçeneklerini göremiyorum. Yardımcı olabilir misiniz?',
          status: 'answered',
          createdAt: '2024-04-25T10:30:00Z',
          updatedAt: '2024-04-25T14:45:00Z',
          responses: [
            {
              id: 'r1',
              message: 'Merhaba, VIP satın almak için mağaza sayfasından istediğiniz VIP paketini sepete ekleyip ödeme adımına geçebilirsiniz. Herhangi bir sorun yaşıyorsanız lütfen bildiriniz.',
              createdAt: '2024-04-25T14:45:00Z',
              isAdmin: true
            }
          ]
        },
        {
          id: '2',
          subject: 'Sunucuya bağlanamıyorum',
          message: 'Sunucuya bağlanmaya çalışırken "Connection timed out" hatası alıyorum. Ne yapmalıyım?',
          status: 'open',
          createdAt: '2024-04-28T16:20:00Z',
          updatedAt: '2024-04-28T16:20:00Z',
          responses: []
        }
      ];
      setTickets(demoTickets);
      localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(demoTickets));
    }
  }, []);

  // Update localStorage when tickets change
  useEffect(() => {
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(tickets));
  }, [tickets]);

  // Create a new ticket
  const createTicket = async (data: CreateTicketData) => {
    const newTicket: Ticket = {
      id: `ticket_${Date.now()}`,
      subject: data.subject,
      message: data.message,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: []
    };

    setTickets(prev => [...prev, newTicket]);
  };

  // Add a response to a ticket
  const respondToTicket = async (ticketId: string, message: string) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id === ticketId) {
        const newResponse: TicketResponse = {
          id: `resp_${Date.now()}`,
          message,
          createdAt: new Date().toISOString(),
          isAdmin: false
        };
        
        return {
          ...ticket,
          responses: [...ticket.responses, newResponse],
          updatedAt: new Date().toISOString()
        };
      }
      
      return ticket;
    }));
  };

  // Close a ticket
  const closeTicket = async (ticketId: string) => {
    setTickets(prev => prev.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: 'closed',
          updatedAt: new Date().toISOString()
        };
      }
      
      return ticket;
    }));
  };

  return (
    <TicketsContext.Provider value={{ tickets, createTicket, respondToTicket, closeTicket }}>
      {children}
    </TicketsContext.Provider>
  );
}

// Hook to use the tickets context
export function useTickets() {
  const context = useContext(TicketsContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketsProvider');
  }
  return context;
}
