
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AnalyticsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <Select defaultValue="thisMonth">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="last3Months">Last 3 Months</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="spending" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
            <TabsTrigger value="budgets">Budget vs Actual</TabsTrigger>
            <TabsTrigger value="income">Income Analysis</TabsTrigger>
            <TabsTrigger value="savings">Savings Progress</TabsTrigger>
          </TabsList>
          
          <TabsContent value="spending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Spending by Category</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Placeholder for Pie Chart */}
                  <div className="aspect-square max-w-md mx-auto bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-600">Category Pie Chart will appear here</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-sm">Food & Drinks (30%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm">Shopping (25%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm">Groceries (20%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-sm">Utilities (15%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      <span className="text-sm">Transportation (10%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Month over Month Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Placeholder for Line Chart */}
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-600">Spending Trend Chart will appear here</p>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>January</span>
                      <span>February</span>
                      <span>March</span>
                      <span>April</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Top Spending Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Category 1 */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="font-medium">Food & Drinks</span>
                      </div>
                      <span className="font-medium">₹12,500</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                        <span className="font-medium">Shopping</span>
                      </div>
                      <span className="font-medium">₹8,750</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="font-medium">Groceries</span>
                      </div>
                      <span className="font-medium">₹6,200</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Budget vs Actual Spending</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for chart */}
                <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-600">Budget Comparison Chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Income Sources</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for chart */}
                <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-600">Income Analysis Chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="savings" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Savings Goals Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Placeholder for chart */}
                <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-600">Savings Progress Chart will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;
