
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Download, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useTransactions } from "@/hooks/useFinanceData";
import { useBudgets } from "@/hooks/useBudgets";
import { useSavingsGoals } from "@/hooks/useBudgets";
import { useAuth } from "@/hooks/useAuth";
import jsPDF from 'jspdf';

const Reports = () => {
  const { user } = useAuth();
  const { data: transactions = [] } = useTransactions();
  const { data: budgets = [] } = useBudgets();
  const { data: goals = [] } = useSavingsGoals();

  // Calculate real-time financial metrics
  const calculateMetrics = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
    });

    const totalIncome = currentMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const netSavings = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, netSavings };
  };

  const { totalIncome, totalExpenses, netSavings } = calculateMetrics();

  // Generate monthly data for the last 6 months
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === date.getMonth() && 
               transactionDate.getFullYear() === date.getFullYear();
      });

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0);

      data.push({
        month: months[date.getMonth()],
        income,
        expenses
      });
    }
    return data;
  };

  // Generate category spending data
  const generateCategoryData = () => {
    const categorySpending = {};
    const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#6366F1', '#14B8A6'];
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        const category = transaction.category_id || 'Other';
        categorySpending[category] = (categorySpending[category] || 0) + Number(transaction.amount);
      });

    return Object.entries(categorySpending).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length]
    }));
  };

  const monthlyData = generateMonthlyData();
  const categoryData = generateCategoryData();

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add WalletWise header
    doc.setFontSize(20);
    doc.text('WalletWise Financial Report', 20, 20);
    
    // Add user info
    doc.setFontSize(12);
    doc.text(`Generated for: ${user?.email || 'User'}`, 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 45);
    
    // Add financial summary
    doc.setFontSize(16);
    doc.text('Financial Summary', 20, 65);
    
    doc.setFontSize(12);
    doc.text(`Total Income: $${totalIncome.toLocaleString()}`, 20, 80);
    doc.text(`Total Expenses: $${totalExpenses.toLocaleString()}`, 20, 90);
    doc.text(`Net Savings: $${netSavings.toLocaleString()}`, 20, 100);
    
    // Add budget information
    if (budgets.length > 0) {
      doc.text('Active Budgets', 20, 120);
      let yPos = 135;
      budgets.forEach((budget, index) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(`${budget.categories?.name || 'Category'}: $${budget.amount}`, 20, yPos);
        yPos += 10;
      });
    }
    
    // Add savings goals
    if (goals.length > 0) {
      doc.text('Savings Goals', 20, yPos + 20);
      yPos += 35;
      goals.forEach((goal) => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        const progress = (Number(goal.current_amount) / Number(goal.target_amount)) * 100;
        doc.text(`${goal.title}: ${progress.toFixed(1)}% complete`, 20, yPos);
        doc.text(`  Current: $${Number(goal.current_amount).toLocaleString()}`, 20, yPos + 10);
        doc.text(`  Target: $${Number(goal.target_amount).toLocaleString()}`, 20, yPos + 20);
        yPos += 35;
      });
    }
    
    doc.save(`walletwise-report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-black">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <DashboardHeader />
          <div className="flex-1 p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports</h1>
                <p className="text-gray-600 dark:text-gray-400">Analyze your financial patterns and trends</p>
              </div>
              <Button 
                onClick={exportToPDF}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Income</CardDescription>
                  <CardTitle className="text-2xl text-green-600 dark:text-green-400">
                    ${totalIncome.toLocaleString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Current month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Expenses</CardDescription>
                  <CardTitle className="text-2xl text-red-600 dark:text-red-400">
                    ${totalExpenses.toLocaleString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-red-600 dark:text-red-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Current month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Net Savings</CardDescription>
                  <CardTitle className={`text-2xl ${netSavings >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}`}>
                    ${netSavings.toLocaleString()}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`flex items-center text-sm ${netSavings >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {netSavings >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    Current month
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Income vs Expenses</CardTitle>
                  <CardDescription>Monthly comparison over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="income" fill="#10B981" />
                      <Bar dataKey="expenses" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                  <CardDescription>Current period breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  {categoryData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
                      <div className="text-center">
                        <Wallet className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No expense data available</p>
                      </div>
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

export default Reports;
