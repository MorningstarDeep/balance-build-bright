
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { createSavingsGoal, SavingsGoalFormData } from "@/services/savings";

interface SavingsGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SavingsGoalDialog: React.FC<SavingsGoalDialogProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<SavingsGoalFormData>({
    name: "",
    target_amount: 0,
    target_date: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString() // Default to 6 months from now
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      await createSavingsGoal(formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create savings goal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Savings Goal</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Goal Name</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              placeholder="e.g., Vacation" 
              required
            />
          </div>
          
          <div>
            <Label htmlFor="target_amount">Target Amount (₹)</Label>
            <Input 
              id="target_amount" 
              type="number" 
              value={formData.target_amount.toString()} 
              onChange={(e) => setFormData({ ...formData, target_amount: parseFloat(e.target.value) || 0 })} 
              placeholder="0.00" 
              required
            />
          </div>
          
          <div>
            <Label htmlFor="target_date">Target Date (Optional)</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.target_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.target_date ? format(new Date(formData.target_date), "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.target_date ? new Date(formData.target_date) : undefined}
                  onSelect={(date) => setFormData({ ...formData, target_date: date ? date.toISOString() : null })}
                  initialFocus
                  fromDate={new Date()} // Can't pick dates in the past
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Goal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SavingsGoalDialog;
