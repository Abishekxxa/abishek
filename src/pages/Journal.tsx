import { useState } from "react";
import { User } from "@supabase/supabase-js";
import Auth from "@/components/Auth";
import TradingJournal from "@/components/TradingJournal";

const Journal = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <>
      {!user ? (
        <Auth onAuthSuccess={(user) => setUser(user)} />
      ) : (
        <TradingJournal user={user} onLogout={() => setUser(null)} />
      )}
    </>
  );
};

export default Journal;
