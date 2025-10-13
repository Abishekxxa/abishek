import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

interface Journal {
  id: string;
  journal_date: string;
  image_url: string;
  notes: string | null;
  created_at: string;
}

const JournalsList = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchJournals = async () => {
    try {
      const { data, error } = await supabase
        .from('trading_journals')
        .select('*')
        .order('journal_date', { ascending: false });

      if (error) throw error;
      setJournals(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/');
      const filePath = urlParts.slice(-2).join('/');

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('trading-journals')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('trading_journals')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;

      toast({
        title: "Deleted",
        description: "Journal entry deleted successfully"
      });

      fetchJournals();
    } catch (error: any) {
      toast({
        title: "Delete Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchJournals();

    // Set up realtime subscription
    const channel = supabase
      .channel('trading_journals_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trading_journals'
        },
        () => {
          fetchJournals();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading journals...</div>;
  }

  if (journals.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No journals uploaded yet. Start by uploading your first trading journal!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-primary">Your Trading Journals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {journals.map((journal) => (
          <Card key={journal.id} className="overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300">
            <img
              src={journal.image_url}
              alt={`Journal from ${journal.journal_date}`}
              className="w-full h-40 sm:h-48 object-cover"
            />
            <div className="p-3 sm:p-4">
              <p className="text-sm sm:text-base font-semibold text-primary mb-2">
                {new Date(journal.journal_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              {journal.notes && (
                <p className="text-muted-foreground text-sm mb-4">{journal.notes}</p>
              )}
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(journal.id, journal.image_url)}
                className="w-full"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JournalsList;
