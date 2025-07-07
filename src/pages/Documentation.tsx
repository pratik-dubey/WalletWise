
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartPie, ArrowLeft, BookOpen, Shield, TrendingUp, Target, CreditCard, BarChart3 } from "lucide-react";

const Documentation = () => {
  const sections = [
    {
      title: "Getting Started",
      icon: BookOpen,
      items: [
        "Quick Start Guide",
        "Setting Up Your Account",
        "Connecting Bank Accounts",
        "First Transaction"
      ]
    },
    {
      title: "Features",
      icon: TrendingUp,
      items: [
        "Dashboard Overview",
        "Transaction Management",
        "Budget Planning",
        "Goal Setting",
        "Financial Reports"
      ]
    },
    {
      title: "Security",
      icon: Shield,
      items: [
        "Data Protection",
        "Privacy Policy",
        "Two-Factor Authentication",
        "Account Security"
      ]
    },
    {
      title: "API Reference",
      icon: BarChart3,
      items: [
        "Authentication",
        "Endpoints",
        "Rate Limits",
        "Response Formats"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <ChartPie className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">WalletWise Docs</span>
              </div>
            </div>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about WalletWise - your personal finance minister.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-12 bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
            <p className="text-blue-100 mb-6">
              Get up and running with WalletWise in just a few minutes. Follow our step-by-step guide to set up your account and start managing your finances.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">1</div>
                <h3 className="font-semibold mb-2">Create Account</h3>
                <p className="text-sm text-blue-100">Sign up with email or social login</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">2</div>
                <h3 className="font-semibold mb-2">Add Transactions</h3>
                <p className="text-sm text-blue-100">Start tracking your income and expenses</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-2xl font-bold mb-2">3</div>
                <h3 className="font-semibold mb-2">Set Goals</h3>
                <p className="text-sm text-blue-100">Create budgets and savings targets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Button variant="ghost" className="w-full justify-start p-2 h-auto">
                          {item}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Overview */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Core Features</CardTitle>
            <CardDescription>
              WalletWise provides comprehensive financial management tools to help you take control of your money.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <ChartPie className="w-8 h-8 text-blue-600" />
                <h3 className="font-semibold">Smart Dashboard</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get a complete overview of your financial health with intuitive charts and real-time data.
                </p>
              </div>
              <div className="space-y-2">
                <CreditCard className="w-8 h-8 text-green-600" />
                <h3 className="font-semibold">Transaction Tracking</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Automatically categorize and track all your expenses and income across multiple accounts.
                </p>
              </div>
              <div className="space-y-2">
                <Target className="w-8 h-8 text-purple-600" />
                <h3 className="font-semibold">Goal Management</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Set and achieve your financial goals with our intelligent planning and tracking tools.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Need Help?</CardTitle>
            <CardDescription>
              Our support team is here to help you make the most of WalletWise.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <BookOpen className="w-6 h-6" />
                <span>Tutorials</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Shield className="w-6 h-6" />
                <span>Security Guide</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <BarChart3 className="w-6 h-6" />
                <span>API Docs</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documentation;
