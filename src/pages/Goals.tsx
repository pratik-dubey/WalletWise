
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
import { Plus, Target, Calendar, DollarSign, Wallet } from "lucide-react";
import { useSavingsGoals, useAddSavingsGoal, useUpdateSavingsGoal } from "@/hooks/useBudgets";
import { useToast } from "@/hooks/use-toast";

const Goals = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [addFundsGoalId, setAddFundsGoalId] = useState<string | null>(null);
  const [addFundsAmount, setAddFundsAmount] = useState("");

  const { data: savingsGoals = [], isLoading } = useSavingsGoals();
  const addGoalMutation = useAddSavingsGoal();
  const updateGoalMutation = useUpdateSavingsGoal();
  const { toast } = useToast();

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !targetAmount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await addGoalMutation.mutateAsync({
        title,
        target_amount: parseFloat(targetAmount),
        target_date: targetDate || null,
      });

      toast({
        title: "Success",
        description: "Savings goal created successfully!",
      });

      setTitle("");
      setTargetAmount("");
      setTargetDate("");
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create savings goal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddFunds = async (goalId: string) => {
    if (!addFundsAmount) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }

    const goal = savingsGoals.find(g => g.id === goalId);
    if (!goal) return;

    try {
      const newAmount = Number(goal.current_amount) + parseFloat(addFundsAmount);
      
      await updateGoalMutation.mutateAsync({
        id: goalId,
        current_amount: newAmount,
      });

      toast({
        title: "Success",
        description: `Added $${addFundsAmount} to ${goal.title}!`,
      });

      setAddFundsGoalId(null);
      setAddFundsAmount("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add funds. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getGoalIcon = (index: number) => {
    const icons = [Target, Calendar, DollarSign];
    return icons[index % icons.length];
  };

  const getGoalColor = (index: number) => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500"];
    return colors[index % colors.length];
  };

  if (isLoading) {
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
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Goals</h1>
                <p className="text-gray-600 dark:text-gray-400">Track your savings and financial goals</p>
              </div>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Savings Goal</DialogTitle>
                    <DialogDescription>
                      Set up a new savings goal to track your financial progress.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateGoal} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Goal Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Emergency Fund, Vacation"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetAmount">Target Amount</Label>
                      <Input
                        id="targetAmount"
                        type="number"
                        placeholder="Enter target amount"
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetDate">Target Date (Optional)</Label>
                      <Input
                        id="targetDate"
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                      />
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
                        disabled={addGoalMutation.isPending}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {addGoalMutation.isPending ? "Creating..." : "Create Goal"}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {savingsGoals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savingsGoals.map((goal, index) => {
                  const percentage = (Number(goal.current_amount) / Number(goal.target_amount)) * 100;
                  const Icon = getGoalIcon(index);
                  const colorClass = getGoalColor(index);
                  
                  return (
                    <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className={`p-2 rounded-lg ${colorClass}`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          {goal.target_date && (
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(goal.target_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-xl">{goal.title}</CardTitle>
                        <CardDescription>
                          ${Number(goal.current_amount).toLocaleString()} of ${Number(goal.target_amount).toLocaleString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Progress value={Math.min(percentage, 100)} className="h-3" />
                        <div className="flex justify-between text-sm">
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {percentage.toFixed(0)}% Complete
                          </span>
                          <span className="text-gray-500 dark:text-gray-400">
                            ${(Number(goal.target_amount) - Number(goal.current_amount)).toLocaleString()} to go
                          </span>
                        </div>
                        
                        <Dialog open={addFundsGoalId === goal.id} onOpenChange={(open) => {
                          if (!open) {
                            setAddFundsGoalId(null);
                            setAddFundsAmount("");
                          }
                        }}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => setAddFundsGoalId(goal.id)}
                            >
                              Add Funds
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add Funds to {goal.title}</DialogTitle>
                              <DialogDescription>
                                How much would you like to add to this goal?
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="addAmount">Amount</Label>
                                <Input
                                  id="addAmount"
                                  type="number"
                                  placeholder="Enter amount to add"
                                  value={addFundsAmount}
                                  onChange={(e) => setAddFundsAmount(e.target.value)}
                                  min="0"
                                  step="0.01"
                                />
                              </div>
                              <div className="flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setAddFundsGoalId(null);
                                    setAddFundsAmount("");
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => handleAddFunds(goal.id)}
                                  disabled={updateGoalMutation.isPending}
                                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                >
                                  {updateGoalMutation.isPending ? "Adding..." : "Add Funds"}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No Savings Goals Yet
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                    Start your financial journey by creating your first savings goal. Set targets and track your progress!
                  </p>
                  <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Goal
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Goals;
