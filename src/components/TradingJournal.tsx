import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

interface TradingJournalProps {
  user: User;
  onLogout: () => void;
}

const TradingJournal = ({ user, onLogout }: TradingJournalProps) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [journalDate, setJournalDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();

    setIsAdmin(!!data);
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

  if (!isAdmin) {
    return (
      <div className="text-center py-8 px-4">
        <p className="text-sm sm:text-base text-muted-foreground mb-4">
          You don't have admin access to upload journals.
        </p>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <p className="text-xs sm:text-sm text-muted-foreground">Logged in as admin</p>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Upload Form */}
      <Card className="p-4 sm:p-6 md:p-8 shadow-elegant">
        <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-primary">Upload New Journal Entry</h3>
        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2">Date</label>
            <Input
              type="date"
              value={journalDate}
              onChange={(e) => setJournalDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2">
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
            <label className="block text-xs sm:text-sm font-medium mb-2">
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
    </div>
  );
};

export default TradingJournal;
