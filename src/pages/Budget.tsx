
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useBudgets, useCategories } from "@/hooks/useBudgets";
import { useAddBudget } from "@/hooks/useBudgets";
import { useToast } from "@/hooks/use-toast";

const Budget = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [period, setPeriod] = useState("monthly");

  const { data: budgets, isLoading: budgetsLoading } = useBudgets();
  const { data: categories } = useCategories();
  const addBudgetMutation = useAddBudget();
  const { toast } = useToast();

  const handleCreateBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !categoryId) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await addBudgetMutation.mutateAsync({
        amount: parseFloat(amount),
        category_id: categoryId,
        period,
      });

      toast({
        title: "Success",
        description: "Budget created successfully!",
      });

      // Reset form and close dialog
      setAmount("");
      setCategoryId("");
      setPeriod("monthly");
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create budget. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (budgetsLoading) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-black">
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            <DashboardHeader />
            <div className="flex-1 p-6 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-black">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <DashboardHeader />
          <div className="flex-1 p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Budget</h1>
                <p className="text-gray-600 dark:text-gray-400">Plan and track your spending</p>
              </div>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Budget
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Budget</DialogTitle>
                    <DialogDescription>
                      Set up a new budget to track your spending in a specific category.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateBudget} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={categoryId} onValueChange={setCategoryId} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories?.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="amount">Budget Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter budget amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="period">Period</Label>
                      <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCreateDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={addBudgetMutation.isPending}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {addBudgetMutation.isPending ? "Creating..." : "Create Budget"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Budgets</CardTitle>
                  <CardDescription>Track your spending across different categories</CardDescription>
                </CardHeader>
                <CardContent>
                  {budgets && budgets.length > 0 ? (
                    <div className="space-y-6">
                      {budgets.map((budget) => {
                        // Mock spent amount for now - you can integrate with transactions later
                        const spentAmount = Math.random() * budget.amount;
                        const percentage = (spentAmount / budget.amount) * 100;
                        const isOverBudget = percentage > 100;
                        
                        return (
                          <div key={budget.id} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {budget.categories?.name || 'Unknown Category'}
                              </h3>
                              <span className={`text-sm font-medium ${isOverBudget ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'}`}>
                                ${spentAmount.toFixed(2)} / ${budget.amount}
                              </span>
                            </div>
                            <Progress 
                              value={Math.min(percentage, 100)} 
                              className="h-2"
                            />
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                              <span>{percentage.toFixed(0)}% used</span>
                              <span>${(budget.amount - spentAmount).toFixed(2)} remaining</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        No budgets created yet. Create your first budget to start tracking your spending.
                      </p>
                      <Button
                        onClick={() => setIsCreateDialogOpen(true)}
                        variant="outline"
                      >
                        Create Your First Budget
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Budget;
