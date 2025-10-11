import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

interface Journal {
  id: string;
  journal_date: string;
  image_url: string;
  notes: string | null;
  created_at: string;
}

interface TradingJournalProps {
  user: User;
  onLogout: () => void;
}

const TradingJournal = ({ user, onLogout }: TradingJournalProps) => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [journalDate, setJournalDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { toast } = useToast();

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    const { data, error } = await supabase
      .from("trading_journals")
      .select("*")
      .order("journal_date", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load journals",
        variant: "destructive",
      });
      return;
    }

    setJournals(data || []);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid File",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5242880) {
      toast({
        title: "File Too Large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Upload image to storage
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("trading-journals")
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("trading-journals")
        .getPublicUrl(fileName);

      // Create journal entry
      const { error: dbError } = await supabase
        .from("trading_journals")
        .insert({
          user_id: user.id,
          journal_date: journalDate,
          image_url: publicUrl,
          notes: notes || null,
        });

      if (dbError) throw dbError;

      toast({
        title: "Success!",
        description: "Trading journal uploaded successfully",
      });

      // Reset form
      setSelectedFile(null);
      setNotes("");
      setJournalDate(new Date().toISOString().split("T")[0]);
      
      // Refresh journals
      fetchJournals();
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Daily Trading Journal
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Upload Form */}
        <Card className="p-8 shadow-elegant mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary">Upload New Journal Entry</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <Input
                type="date"
                value={journalDate}
                onChange={(e) => setJournalDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Screenshot/Photo
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Notes (Optional)
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about your trades, strategies, or observations..."
                rows={4}
              />
            </div>

            <Button
              onClick={handleUpload}
              disabled={uploading || !selectedFile}
              variant="hero"
              className="w-full"
            >
              {uploading ? "Uploading..." : "Upload Journal Entry"}
            </Button>
          </div>
        </Card>

        {/* Journal Entries */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-primary">Your Journal Entries</h2>
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
                No journal entries yet. Upload your first one!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingJournal;
