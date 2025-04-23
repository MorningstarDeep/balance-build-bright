
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { createBudget, BudgetFormData } from "@/services/budgets";
import { fetchTransactionCategories } from "@/services/transactions";

interface BudgetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const BudgetDialog: React.FC<BudgetDialogProps> = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState<BudgetFormData>({
    name: "",
    category_id: null,
    limit_amount: 0,
    period: "monthly",
    start_date: new Date().toISOString()
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<any[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await fetchTransactionCategories();
      setCategories(categoriesData);
      
      // Filter to expense categories only
      const expenseCats = categoriesData.filter(cat => cat.type === 'expense');
      setExpenseCategories(expenseCats);
    };
    
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      await createBudget(formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create budget:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Budget Name</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              placeholder="e.g., Groceries" 
              required
            />
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.category_id || ""} 
              onValueChange={(value) => 
                setFormData({ ...formData, category_id: value || null })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {expenseCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="limit_amount">Budget Amount (₹)</Label>
            <Input 
              id="limit_amount" 
              type="number" 
              value={formData.limit_amount.toString()} 
              onChange={(e) => setFormData({ ...formData, limit_amount: parseFloat(e.target.value) || 0 })} 
              placeholder="0.00" 
              required
            />
          </div>
          
          <div>
            <Label htmlFor="period">Period</Label>
            <Select 
              value={formData.period} 
              onValueChange={(value: "weekly" | "monthly" | "yearly") => 
                setFormData({ ...formData, period: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="start_date">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.start_date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.start_date ? format(new Date(formData.start_date), "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.start_date ? new Date(formData.start_date) : undefined}
                  onSelect={(date) => setFormData({ ...formData, start_date: date ? date.toISOString() : new Date().toISOString() })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Budget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetDialog;
