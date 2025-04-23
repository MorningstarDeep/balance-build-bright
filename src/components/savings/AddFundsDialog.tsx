
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addToSavingsGoal } from "@/services/savings";

interface AddFundsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  goal: {
    id: string;
    name: string;
    current_amount: number;
    target_amount: number;
  };
}

const AddFundsDialog: React.FC<AddFundsDialogProps> = ({ isOpen, onClose, onSuccess, goal }) => {
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const remaining = goal?.target_amount - goal?.current_amount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount <= 0) {
      alert("Please enter a positive amount");
      return;
    }
    
    try {
      setIsLoading(true);
      await addToSavingsGoal(goal.id, amount);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to add funds to savings goal:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Funds to {goal?.name}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm">
              Current progress: ₹{goal?.current_amount.toLocaleString('en-IN')} of ₹{goal?.target_amount.toLocaleString('en-IN')}
            </p>
            <p className="text-sm">
              Remaining: ₹{remaining.toLocaleString('en-IN')}
            </p>
          </div>
          
          <div>
            <Label htmlFor="amount">Amount to Add (₹)</Label>
            <Input 
              id="amount" 
              type="number" 
              value={amount.toString()} 
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)} 
              placeholder="0.00" 
              required
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            This will deduct the amount from your main balance.
          </p>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding Funds..." : "Add Funds"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFundsDialog;
