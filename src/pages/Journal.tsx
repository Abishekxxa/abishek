import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import Auth from "@/components/Auth";
import TradingJournal from "@/components/TradingJournal";
import { Card } from "@/components/ui/card";

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

    setJournals(data || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-12 text-center">
          Daily Trading Journal
        </h1>

        {/* Public Journal Display */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-6 text-primary">Recent Entries</h2>
          {loading ? (
            <p className="text-center text-muted-foreground">Loading journals...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {journals.map((journal) => (
                <Card key={journal.id} className="p-4 shadow-card hover:shadow-elegant transition-all">
                  <div className="mb-3">
                    <img
                      src={journal.image_url}
                      alt={`Journal from ${journal.journal_date}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-primary">
                      {new Date(journal.journal_date).toLocaleDateString()}
                    </p>
                    {journal.notes && (
                      <p className="text-sm text-muted-foreground">{journal.notes}</p>
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
        </div>

        {/* Admin Section at Bottom */}
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-primary">Admin Section</h2>
          {!user ? (
            <Auth onAuthSuccess={(user) => setUser(user)} />
          ) : (
            <TradingJournal user={user} onLogout={() => setUser(null)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;
