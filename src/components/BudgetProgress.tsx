
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { useBudgets } from "@/hooks/useBudgets";
import { useTransactions } from "@/hooks/useFinanceData";
import { useAuth } from "@/hooks/useAuth";

export function BudgetProgress() {
  const { user } = useAuth();
  const { data: budgets = [], isLoading: budgetsLoading } = useBudgets();
  const { data: transactions = [], isLoading: transactionsLoading } = useTransactions();

  const calculateBudgetProgress = () => {
    if (!budgets.length || !transactions.length) return [];

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return budgets.map((budget: any) => {
      const categoryExpenses = transactions
        .filter((txn) => {
          const txnDate = new Date(txn.date);
          return (
            txn.category_id === budget.category_id &&
            txn.type === 'expense' &&
            txnDate.getMonth() === currentMonth &&
            txnDate.getFullYear() === currentYear
          );
        })
        .reduce((sum, txn) => sum + Number(txn.amount), 0);

      const percentage = (categoryExpenses / Number(budget.amount)) * 100;
      const status = percentage >= 100 ? 'over' : percentage >= 80 ? 'warning' : 'good';

      return {
        id: budget.id,
        categoryName: budget.categories?.name || 'Unknown Category',
        spent: categoryExpenses,
        budget: Number(budget.amount),
        status,
      };
    });
  };

  const budgetsWithSpent = calculateBudgetProgress();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700";
      case "warning":
        return "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700";
      case "over":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-700";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600";
    }
  };

  if (budgetsLoading || transactionsLoading) {
    return (
      <Card className="p-6 bg-card text-card-foreground border border-border shadow-lg">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-32"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
            </div>
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 bg-muted rounded w-20"></div>
                <div className="h-6 bg-muted rounded w-16"></div>
              </div>
              <div className="h-3 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Please log in to view your budget progress.</p>
      </Card>
    );
  }

  if (!budgetsWithSpent.length) {
    return (
      <Card className="p-6 text-center">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Budgets Yet</h3>
        <p className="text-muted-foreground">Create your first budget to track your spending.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-card text-card-foreground border border-border shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Budget Progress</h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {budgetsWithSpent.map(({ id, categoryName, spent, budget, status }) => {
          const percentage = (spent / budget) * 100;

          return (
            <div key={id} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{categoryName}</h3>
                <Badge variant="outline" className={getStatusColor(status)}>
                  {status === "over"
                    ? "Over Budget"
                    : status === "warning"
                    ? "Close to Limit"
                    : "On Track"}
                </Badge>
              </div>

              <div className="space-y-2">
                <Progress value={Math.min(percentage, 100)} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${spent.toFixed(2)} spent</span>
                  <span>${budget.toFixed(2)} budget</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
