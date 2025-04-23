
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AccountOverview: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Account Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold">₹24,500.00</h2>
            <p className="text-sm text-muted-foreground">Available Balance</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <ArrowDown className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">Income</span>
              </div>
              <span className="text-sm font-medium">₹8,500.00</span>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <ArrowUp className="w-4 h-4 text-red-600" />
                </div>
                <span className="text-sm text-gray-600">Expenses</span>
              </div>
              <span className="text-sm font-medium">₹4,200.00</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
