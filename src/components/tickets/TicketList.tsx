
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTickets } from '@/hooks/use-tickets';
import { MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

export function TicketList() {
  const { tickets } = useTickets();
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  const toggleTicket = (id: string) => {
    if (expandedTicket === id) {
      setExpandedTicket(null);
    } else {
      setExpandedTicket(id);
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="font-minecraft text-minecraft-primary flex items-center gap-2">
          <MessageSquare size={20} />
          Destek Taleplerim
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 divide-y divide-white/10">
        {tickets.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Henüz bir destek talebiniz bulunmuyor</p>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} className="py-3">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleTicket(ticket.id)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{ticket.subject}</h3>
                    <Badge variant={
                      ticket.status === "open" ? "default" :
                      ticket.status === "answered" ? "secondary" : "outline"
                    }>
                      {ticket.status === "open" ? "Açık" :
                      ticket.status === "answered" ? "Yanıtlandı" : "Kapalı"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(ticket.createdAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <Button variant="ghost" size="icon">
                  {expandedTicket === ticket.id ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>

              {expandedTicket === ticket.id && (
                <div className="mt-3 space-y-4">
                  <div className="bg-black/20 p-3 rounded">
                    <p className="text-sm text-white">{ticket.message}</p>
                  </div>

                  {ticket.responses.map((response, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded ${response.isAdmin ? 'bg-minecraft-primary/20' : 'bg-black/20'}`}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium">
                          {response.isAdmin ? 'Yetkili' : 'Siz'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(response.createdAt).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                      <p className="text-sm">{response.message}</p>
                    </div>
                  ))}

                  {ticket.status !== "closed" && (
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Yanıtınızı yazın..." 
                        className="flex-grow"
                      />
                      <Button className="minecraft-btn">
                        <span className="btn-content">Yanıtla</span>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

// For components that are referred to but not imported
import { Input } from "@/components/ui/input";
