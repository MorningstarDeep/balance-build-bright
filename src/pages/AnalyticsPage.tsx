
import React, { useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import { 
  getExpensesByCategory,
  getMonthlyTotals,
  getBudgetVsActual,
  getSavingsProgress
} from "@/services/analytics";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, 
  LineChart, Line, 
  TooltipProps
} from "recharts";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const AnalyticsPage: React.FC = () => {
  const [period, setPeriod] = useState("thisMonth");
  
  // Calculate date range based on selected period
  const getDateRange = () => {
    const now = new Date();
    let startDate, endDate;
    
    switch(period) {
      case "thisMonth":
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      case "lastMonth":
        startDate = startOfMonth(subMonths(now, 1));
        endDate = endOfMonth(subMonths(now, 1));
        break;
      case "last3Months":
        startDate = startOfMonth(subMonths(now, 3));
        endDate = endOfMonth(now);
        break;
      case "thisYear":
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;
      default:
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
    }
    
    return {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd')
    };
  };
  
  const dateRange = getDateRange();
  
  // Get category expenses
  const { data: categoryData = [], isLoading: categoryLoading } = useQuery({
    queryKey: ['expenses-by-category', dateRange.startDate, dateRange.endDate],
    queryFn: () => getExpensesByCategory(dateRange.startDate, dateRange.endDate)
  });
  
  // Get monthly totals
  const { data: monthlyData = [], isLoading: monthlyLoading } = useQuery({
    queryKey: ['monthly-totals', new Date().getFullYear()],
    queryFn: () => getMonthlyTotals(new Date().getFullYear())
  });
  
  // Get budget vs actual
  const { data: budgetData = [], isLoading: budgetLoading } = useQuery({
    queryKey: ['budget-vs-actual'],
    queryFn: getBudgetVsActual
  });
  
  // Get savings progress
  const { data: savingsData = [], isLoading: savingsLoading } = useQuery({
    queryKey: ['savings-progress'],
    queryFn: getSavingsProgress
  });
  
  // Format the pie chart data
  const totalExpense = categoryData.reduce((sum, item) => sum + item.amount, 0);
  const pieData = categoryData.map(item => ({
    name: item.category,
    value: item.amount,
    percentage: totalExpense > 0 ? ((item.amount / totalExpense) * 100).toFixed(0) : 0,
    icon: item.icon
  }));

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="last3Months">Last 3 Months</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
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
                  {categoryLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                    </div>
                  ) : pieData.length === 0 ? (
                    <div className="aspect-square max-w-md mx-auto bg-gray-100 rounded-md flex items-center justify-center">
                      <p className="text-gray-600">No spending data available</p>
                    </div>
                  ) : (
                    <>
                      <div className="aspect-square max-w-md mx-auto">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Amount']}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {pieData.map((entry, index) => (
                          <div className="flex items-center" key={`legend-${index}`}>
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="text-sm">{entry.name} ({entry.percentage}%)</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Month over Month Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  {monthlyLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                    </div>
                  ) : monthlyData.length === 0 ? (
                    <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                      <p className="text-gray-600">No spending trend data available</p>
                    </div>
                  ) : (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="expense" stroke="#ff7300" name="Expenses" />
                          <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Income" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Top Spending Categories</CardTitle>
              </CardHeader>
              <CardContent>
                {categoryLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                  </div>
                ) : pieData.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No spending data available</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pieData.slice(0, 3).map((category, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <span className="font-medium">₹{Number(category.value).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${category.percentage}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Budget vs Actual Spending</CardTitle>
              </CardHeader>
              <CardContent>
                {budgetLoading ? (
                  <div className="flex justify-center items-center h-80">
                    <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                  </div>
                ) : budgetData.length === 0 ? (
                  <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-600">No budget data available</p>
                  </div>
                ) : (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={budgetData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                        />
                        <Legend />
                        <Bar dataKey="budget" fill="#8884d8" name="Budget" />
                        <Bar dataKey="spent" fill="#82ca9d" name="Actual" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Income Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                  <p className="text-gray-600">Income analysis coming soon!</p>
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
                {savingsLoading ? (
                  <div className="flex justify-center items-center h-80">
                    <div className="w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                  </div>
                ) : savingsData.length === 0 ? (
                  <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-600">No savings goals data available</p>
                  </div>
                ) : (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={savingsData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip 
                          formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
                        />
                        <Legend />
                        <Bar dataKey="current" stackId="a" fill="#82ca9d" name="Saved" />
                        <Bar dataKey="remaining" stackId="a" fill="#ffc658" name="Remaining" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AnalyticsPage;
