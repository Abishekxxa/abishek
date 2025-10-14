import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Auth from "@/components/Auth";
import TradingJournal from "@/components/TradingJournal";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Journal {
  id: string;
  journal_date: string;
  image_url: string;
  notes: string | null;
  created_at: string;
}

const Journal = () => {
  const [user, setUser] = useState<User | null>(null);
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);

  useEffect(() => {
    fetchJournals();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      setUser(session.user);
    }
  };

  const fetchJournals = async () => {
    const { data } = await supabase
      .from("trading_journals")
      .select("*")
      .order("journal_date", { ascending: false });

    if (data) {
      // Generate signed URLs for images
      const journalsWithSignedUrls = await Promise.all(
        data.map(async (journal) => {
          const { data: signedUrlData } = await supabase.storage
            .from("trading-journals")
            .createSignedUrl(journal.image_url.split("/").pop() || "", 3600);
          
          return {
            ...journal,
            image_url: signedUrlData?.signedUrl || journal.image_url,
          };
        })
      );
      setJournals(journalsWithSignedUrls);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar />
      
      {/* Header Section */}
      <header className="bg-gradient-primary py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Daily Trading Journal
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Track your trading journey with detailed entries and insights
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-8 sm:py-12">

        {/* Public Journal Display */}
        <section className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-primary">Recent Entries</h2>
          {loading ? (
            <p className="text-center text-muted-foreground">Loading journals...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {journals.map((journal) => (
                <Card 
                  key={journal.id} 
                  className="p-4 shadow-card hover:shadow-elegant transition-all cursor-pointer"
                  onClick={() => setSelectedJournal(journal)}
                >
                  <div className="mb-3">
                    <img
                      src={journal.image_url}
                      alt={`Journal from ${journal.journal_date}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-primary text-sm sm:text-base">
                      {new Date(journal.journal_date).toLocaleDateString()}
                    </p>
                    {journal.notes && (
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{journal.notes}</p>
                    )}
                  </div>
                </Card>
              ))}
              {journals.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No journal entries yet.
                </div>
              )}
            </div>
          )}
        </section>

        {/* Admin Section at Bottom */}
        <section className="border-t pt-8 sm:pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-primary">Admin Section</h2>
          {!user ? (
            <Auth onAuthSuccess={(user) => setUser(user)} />
          ) : (
            <TradingJournal user={user} onLogout={() => setUser(null)} />
          )}
        </section>
      </div>

      {/* Journal Detail Modal */}
      <Dialog open={!!selectedJournal} onOpenChange={() => setSelectedJournal(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-3xl md:max-w-4xl lg:max-w-5xl p-0 overflow-hidden">
          <DialogHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
            <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold">
              {selectedJournal && new Date(selectedJournal.journal_date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Trading journal entry details
            </DialogDescription>
          </DialogHeader>
          {selectedJournal && (
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
              <div className="w-full bg-muted rounded-lg overflow-hidden">
                <img
                  src={selectedJournal.image_url}
                  alt={`Journal from ${selectedJournal.journal_date}`}
                  className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-contain"
                  onError={(e) => {
                    console.error('Image failed to load:', selectedJournal.image_url);
                  }}
                />
              </div>
              {selectedJournal.notes && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-base sm:text-lg">Notes</h3>
                  <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-wrap">{selectedJournal.notes}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Journal;
