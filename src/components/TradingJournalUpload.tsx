import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const journalSchema = z.object({
  journalDate: z.string().trim().min(1, "Date is required"),
  notes: z.string().trim().max(1000, "Notes must be less than 1000 characters").optional(),
  image: z.any()
    .refine((files) => files?.length === 1, "Image is required")
    .refine((files) => files?.[0]?.size <= 5242880, "Max file size is 5MB")
    .refine(
      (files) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    )
});

type JournalFormData = z.infer<typeof journalSchema>;

const TradingJournalUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<JournalFormData>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      journalDate: new Date().toISOString().split('T')[0],
      notes: ""
    }
  });

  const handleUpload = async (data: JournalFormData) => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const file = data.image[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload image to storage
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('trading-journals')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('trading-journals')
        .getPublicUrl(fileName);

      // Save journal entry to database
      const { error: dbError } = await supabase
        .from('trading_journals')
        .insert({
          user_id: user.id,
          journal_date: data.journalDate,
          image_url: publicUrl,
          notes: data.notes || null
        });

      if (dbError) throw dbError;

      toast({
        title: "Journal Uploaded!",
        description: "Your trading journal has been saved successfully."
      });

      form.reset();
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-primary">Upload Daily Trading Journal</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpload)} className="space-y-6">
          <FormField
            control={form.control}
            name="journalDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Journal Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Trading Journal Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={(e) => onChange(e.target.files)}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any notes about your trading day..."
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Journal"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default TradingJournalUpload;
