import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { FinancialOverview } from "@/components/FinancialOverview";
import { ExpenseTracker } from "@/components/ExpenseTracker";
import { BudgetProgress } from "@/components/BudgetProgress";
import { RecentTransactions } from "@/components/RecentTransactions";
import { SavingsGoals } from "@/components/SavingsGoals";

const Index = () => {
  return (
    <SidebarProvider>
      <div
        className="min-h-screen flex w-full 
                      bg-gradient-to-br from-slate-50 to-blue-50 
                      dark:from-gray-900 dark:to-black"
      >
        <AppSidebar />

        <main className="flex-1 flex flex-col">
          <DashboardHeader />

          <div className="flex-1 p-6 space-y-6 animate-fade-in">
            <FinancialOverview />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpenseTracker />
              <BudgetProgress />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RecentTransactions />
              </div>
              <SavingsGoals />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
