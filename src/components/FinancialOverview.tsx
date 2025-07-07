
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown, ChartPie, TrendingUp } from "lucide-react";
import { useTransactions } from "@/hooks/useFinanceData";
import { useAuth } from "@/hooks/useAuth";

export function FinancialOverview() {
  const { user } = useAuth();
  const { data: transactions = [], isLoading } = useTransactions();

  // Calculate metrics from real transaction data
  const calculateMetrics = () => {
    if (!transactions.length) {
      return {
        totalBalance: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        savingsRate: 0,
      };
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let totalIncome = 0;
    let totalExpenses = 0;
    let monthlyIncome = 0;
    let monthlyExpenses = 0;

    transactions.forEach((txn) => {
      const amount = Number(txn.amount);
      const txnDate = new Date(txn.date);

      if (txn.type === "income") {
        totalIncome += amount;
        if (txnDate.getMonth() === currentMonth && txnDate.getFullYear() === currentYear) {
          monthlyIncome += amount;
        }
      } else if (txn.type === "expense") {
        totalExpenses += amount;
        if (txnDate.getMonth() === currentMonth && txnDate.getFullYear() === currentYear) {
          monthlyExpenses += amount;
        }
      }
    });

    const totalBalance = totalIncome - totalExpenses;
    const savingsRate = monthlyIncome > 0 ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 : 0;

    return {
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      savingsRate,
    };
  };

  const metrics = calculateMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-muted rounded-xl"></div>
              <div className="w-16 h-4 bg-muted rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-20 h-3 bg-muted rounded"></div>
              <div className="w-24 h-6 bg-muted rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">Please log in to view your financial overview.</p>
      </Card>
    );
  }

  const metricData = [
    {
      title: "Total Balance",
      value: `$${metrics.totalBalance.toFixed(2)}`,
      change: metrics.totalBalance >= 0 ? "+12.5%" : "-5.2%",
      isPositive: metrics.totalBalance >= 0,
      icon: ChartPie,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Monthly Income",
      value: `$${metrics.monthlyIncome.toFixed(2)}`,
      change: "+8.2%",
      isPositive: true,
      icon: ArrowUp,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Monthly Expenses",
      value: `$${metrics.monthlyExpenses.toFixed(2)}`,
      change: "-3.1%",
      isPositive: false,
      icon: ArrowDown,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Savings Rate",
      value: `${Math.max(0, metrics.savingsRate).toFixed(1)}%`,
      change: "+2.4%",
      isPositive: true,
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricData.map((metric) => (
        <Card
          key={metric.title}
          className="p-6 bg-card text-card-foreground border border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${metric.gradient} rounded-xl flex items-center justify-center shadow-lg`}
            >
              <metric.icon className="w-6 h-6 text-white" />
            </div>
            <div
              className={`flex items-center gap-1 text-sm ${
                metric.isPositive
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              <ArrowUp
                className={`w-4 h-4 ${metric.isPositive ? "" : "rotate-180"}`}
              />
              <span className="font-semibold">{metric.change}</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              {metric.title}
            </h3>
            <p className="text-2xl font-bold">{metric.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
