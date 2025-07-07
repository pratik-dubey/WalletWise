
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target, Calendar, DollarSign, Plus } from "lucide-react";
import { useSavingsGoals } from "@/hooks/useBudgets";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

export function SavingsGoals() {
  const { user } = useAuth();
  const { data: goals = [], isLoading } = useSavingsGoals();

  if (isLoading) {
    return (
      <Card className="p-6 bg-card text-card-foreground border border-border shadow-lg transition-colors">
        <div className="animate-pulse space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-32"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
            </div>
            <div className="h-8 w-20 bg-muted rounded"></div>
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-4 bg-muted rounded w-8"></div>
              </div>
              <div className="h-3 bg-muted rounded"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-muted rounded w-16"></div>
                <div className="h-3 bg-muted rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Please log in to view your savings goals.</p>
      </Card>
    );
  }

  if (!goals.length) {
    return (
      <Card className="p-6 text-center">
        <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Savings Goals Yet</h3>
        <p className="text-muted-foreground mb-4">Set your first savings goal to start tracking your progress.</p>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Goal
        </Button>
      </Card>
    );
  }

  const getGoalIcon = (index: number) => {
    const icons = [Target, Calendar, DollarSign];
    return icons[index % icons.length];
  };

  const getGoalColor = (index: number) => {
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500", 
      "from-purple-500 to-pink-500"
    ];
    return colors[index % colors.length];
  };

  return (
    <Card className="p-6 bg-card text-card-foreground border border-border shadow-lg transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold">Savings Goals</h2>
          <p className="text-sm text-muted-foreground">Track your progress</p>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-blue-50 dark:hover:bg-blue-900 hover:border-blue-300 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="space-y-6">
        {goals.map((goal: any, index: number) => {
          const percentage = (Number(goal.current_amount) / Number(goal.target_amount)) * 100;
          const remaining = Number(goal.target_amount) - Number(goal.current_amount);
          const Icon = getGoalIcon(index);
          const gradientColor = getGoalColor(index);

          return (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${gradientColor} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-medium">{goal.title}</h3>
                </div>
                <span className="text-sm text-muted-foreground">
                  {percentage.toFixed(0)}%
                </span>
              </div>

              <Progress value={percentage} className="h-3" />

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${Number(goal.current_amount).toLocaleString()}</span>
                <span className="font-medium text-card-foreground">
                  ${Number(goal.target_amount).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">
                  ${remaining.toLocaleString()} remaining
                </span>
                {goal.target_date && (
                  <span className="text-muted-foreground">
                    Due {formatDistanceToNow(new Date(goal.target_date), { addSuffix: true })}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-lg border border-purple-100 dark:border-purple-800">
        <h4 className="font-semibold mb-1 text-card-foreground">Keep it up!</h4>
        <p className="text-sm text-muted-foreground">
          {goals.length > 0 
            ? `You're making progress on ${goals.length} goal${goals.length > 1 ? 's' : ''}. Stay consistent!`
            : "Set your first savings goal to start your financial journey."
          }
        </p>
      </div>
    </Card>
  );
}
