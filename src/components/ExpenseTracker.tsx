import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BellPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCategories, useAddTransaction } from "@/hooks/useFinanceData";

export function ExpenseTracker() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const { toast } = useToast();
  const { data: categories = [] } = useCategories();
  const addTransactionMutation = useAddTransaction();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !description || !categoryId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to add a transaction.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addTransactionMutation.mutateAsync({
        amount: parseFloat(amount),
        description,
        category_id: categoryId,
        type,
        date: new Date().toISOString().split("T")[0],
      });

      toast({
        title: "Transaction Added Successfully!",
        description: `$${amount} ${type} added to ${
          categories.find((c) => c.id === categoryId)?.name
        }`,
      });

      setAmount("");
      setDescription("");
      setCategoryId("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-black backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
          <BellPlus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Add Transaction
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track your spending and income in real-time
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">
              Transaction Type
            </Label>
            <Select
              value={type}
              onValueChange={(value) => setType(value as "income" | "expense")}
            >
              <SelectTrigger className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 dark:text-gray-100">
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="amount"
              className="text-gray-700 dark:text-gray-300"
            >
              Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                $
              </span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 dark:text-gray-300">Category</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 dark:text-gray-100">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 dark:text-gray-100">
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-gray-700 dark:text-gray-300"
          >
            Description
          </Label>
          <Input
            id="description"
            placeholder="What was this transaction for?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
          disabled={addTransactionMutation.isPending}
        >
          {addTransactionMutation.isPending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            `Add ${type === "income" ? "Income" : "Expense"}`
          )}
        </Button>
      </form>
    </Card>
  );
}
