import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import MessagePagination from './MessagePagination';

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const MESSAGES_PER_PAGE = 3;

const MessageSender: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const { toast } = useToast();
  
  const getRandomColor = () => {
    const colors = [
      'bg-birthday-pink',
      'bg-birthday-lavender',
      'bg-birthday-blue',
      'bg-birthday-yellow',
      'bg-birthday-peach'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      // First get the total count
      const { count, error: countError } = await supabase
        .from('birthday_messages')
        .select('*', { count: 'exact', head: true });
        
      if (countError) throw countError;
      
      const total = count || 0;
      setTotalCount(total);
      setTotalPages(Math.ceil(total / MESSAGES_PER_PAGE));
      
      // Then fetch paginated data
      const from = (currentPage - 1) * MESSAGES_PER_PAGE;
      const to = from + MESSAGES_PER_PAGE - 1;
      
      const { data, error } = await supabase
        .from('birthday_messages')
        .select('*')
        .order('timestamp', { ascending: false })
        .range(from, to);
        
      if (error) throw error;
      
      if (data) {
        setMessages(data as Message[]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Couldn't load messages",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMessages();
  }, [currentPage]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast({
        title: "Oops!",
        description: "Please fill out both name and message fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);
    
    try {
      const { error } = await supabase
        .from('birthday_messages')
        .insert([
          { name, message }
        ]);
        
      if (error) throw error;
      
      // Clear form
      setName('');
      setMessage('');
      
      toast({
        title: "Message Sent!",
        description: "Your birthday wish has been delivered with love! 💕",
      });
      
      // Refresh messages and go to first page
      setCurrentPage(1);
      fetchMessages();
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Message couldn't be sent",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // No scrolling behavior here
  };
  
  return (
    <section id="messages" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bubbly text-center mb-3 text-birthday-lavender">Send Birthday Wishes</h2>
        <p className="text-xl font-handwritten text-center mb-10 text-gray-600">
          Leave a sweet message to make Manjiri's day even more special!
        </p>
        
        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block font-cute text-gray-700 mb-2">Your Name</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="font-cute border-birthday-pink focus:ring-birthday-pink"
                placeholder="Your name"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block font-cute text-gray-700 mb-2">Your Birthday Message</label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="font-cute border-birthday-pink focus:ring-birthday-pink"
                placeholder="Write your sweet birthday message for Manjiri here..."
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSending}
              className="w-full bg-gradient-to-r from-birthday-pink to-birthday-lavender hover:from-birthday-lavender hover:to-birthday-pink font-bubbly text-lg py-6"
            >
              {isSending ? "Sending..." : "Send Birthday Love to Manjiri 💌"}
            </Button>
          </form>
        </div>
        
        <div id="messages-list" className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bubbly text-center mb-8 text-birthday-pink">Birthday Wishes for Manjiri</h3>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-birthday-pink"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-handwritten text-xl text-gray-600">No messages yet. Be the first to send love to Manjiri! 💕</p>
            </div>
          ) : (
            <div className="space-y-6 min-h-[400px]">
              {messages.map((msg) => {
                const bgColor = getRandomColor();
                const rotationDeg = Math.floor(Math.random() * 5) - 2;
                
                return (
                  <div 
                    key={msg.id} 
                    className={`love-note p-4 rounded-lg shadow-md ${bgColor} bg-opacity-20`}
                    style={{ transform: `rotate(${rotationDeg}deg)` }}
                  >
                    <p className="font-handwritten text-lg mb-2">{msg.message}</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bubbly text-sm">❤️ {msg.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(msg.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {totalPages > 1 && (
            <MessagePagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 text-5xl animate-float" style={{animationDelay: '0.8s'}}>💌</div>
      <div className="absolute bottom-10 left-10 text-5xl animate-float" style={{animationDelay: '1.5s'}}>💝</div>
    </section>
  );
};

export default MessageSender;
