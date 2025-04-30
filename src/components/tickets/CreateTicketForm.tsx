
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MessageSquare } from 'lucide-react';
import { useTickets } from '@/hooks/use-tickets';

interface TicketFormValues {
  subject: string;
  message: string;
}

export function CreateTicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createTicket } = useTickets();
  
  const form = useForm<TicketFormValues>({
    defaultValues: {
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: TicketFormValues) => {
    setIsSubmitting(true);
    
    try {
      await createTicket({
        subject: data.subject,
        message: data.message
      });
      
      form.reset();
      toast.success('Destek talebiniz başarıyla oluşturuldu');
    } catch (error) {
      toast.error('Destek talebi oluşturulurken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass-card h-full">
      <CardHeader>
        <CardTitle className="font-minecraft text-minecraft-primary flex items-center gap-2">
          <MessageSquare size={20} />
          Yeni Destek Talebi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konu</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Destek talebinizin konusu" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mesaj</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Lütfen sorununuzu detaylı bir şekilde açıklayın" 
                      rows={6}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="minecraft-btn w-full" 
              disabled={isSubmitting}
            >
              <span className="btn-content">
                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
              </span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
