import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Auth from "@/components/Auth";
import TradingJournalUpload from "@/components/TradingJournalUpload";
import JournalsList from "@/components/JournalsList";
import { Button } from "@/components/ui/button";

const Journal = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 py-20 text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {!user ? (
            <Auth />
          ) : (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Trading Journal
                </h1>
                <Button onClick={handleLogout} variant="outline">
                  Logout
                </Button>
              </div>
              <TradingJournalUpload />
              <JournalsList />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Journal;
