
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
import { Textarea } from "@/components/ui/textarea";
import { createTransaction, TransactionFormData } from "@/services/transactions";
import { fetchTransactionCategories } from "@/services/transactions";

interface TransactionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultType?: "income" | "expense";
}

const TransactionDialog: React.FC<TransactionDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  defaultType = "expense" 
}) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    amount: 0,
    type: defaultType,
    category_id: null,
    description: null,
    date: new Date().toISOString(),
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const categoriesData = await fetchTransactionCategories();
      setCategories(categoriesData);
      
      // Filter categories based on selected type
      filterCategoriesByType(categoriesData, formData.type);
    };
    
    if (isOpen) {
      loadCategories();
    }
  }, [isOpen]);
  
  useEffect(() => {
    filterCategoriesByType(categories, formData.type);
  }, [formData.type, categories]);
  
  const filterCategoriesByType = (allCategories: any[], type: string) => {
    if (!allCategories.length) return;
    
    const filtered = allCategories.filter(cat => 
      type === 'income' ? cat.type === 'income' : cat.type === 'expense'
    );
    
    setFilteredCategories(filtered);
    
    // Reset category if no matching categories are available
    if (filtered.length > 0 && !filtered.some(cat => cat.id === formData.category_id)) {
      setFormData(prev => ({ ...prev, category_id: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      await createTransaction(formData);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to create transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {formData.type === "income" ? "Add Income" : "Add Expense"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="type">Transaction Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: "income" | "expense") => 
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input 
              id="amount" 
              type="number" 
              value={formData.amount.toString()} 
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })} 
              placeholder="0.00" 
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
                {filteredCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea 
              id="description" 
              value={formData.description || ""} 
              onChange={(e) => setFormData({ ...formData, description: e.target.value || null })} 
              placeholder="Add a description" 
            />
          </div>
          
          <div>
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(new Date(formData.date), "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date ? new Date(formData.date) : undefined}
                  onSelect={(date) => setFormData({ ...formData, date: date ? date.toISOString() : new Date().toISOString() })}
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
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;
