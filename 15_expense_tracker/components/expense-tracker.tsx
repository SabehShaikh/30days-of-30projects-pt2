"use client"; // Enables client-side rendering for this component

import React, { useState, useEffect, ChangeEvent } from "react"; // Import React hooks and types
import { Button } from "@/components/ui/button"; // Import custom Button component
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Import custom Dialog components
import { Label } from "@/components/ui/label"; // Import custom Label component
import { Input } from "@/components/ui/input"; // Import custom Input component
import { FilePenIcon, PlusIcon, TrashIcon } from "lucide-react"; // Import icons from lucide-react
import { format } from "date-fns"; // Import date formatting utility

// Define the Expense type
type Expense = {
  id: number;
  name: string;
  amount: number;
  date: Date;
};

// Initial expenses to populate the tracker
const initialExpenses: Expense[] = [
  {
    id: 1,
    name: "Groceries",
    amount: 250,
    date: new Date("2024-05-15"),
  },
  {
    id: 2,
    name: "Rent",
    amount: 250,
    date: new Date("2024-06-01"),
  },
  {
    id: 3,
    name: "Utilities",
    amount: 250,
    date: new Date("2024-06-05"),
  },
  {
    id: 4,
    name: "Dining Out",
    amount: 250,
    date: new Date("2024-06-10"),
  },
];

export default function ExpenseTrackerComponent() {
  // State to manage the list of expenses
  const [expenses, setExpenses] = useState<Expense[]>([]);
  // State to manage the visibility of the modal
  const [showModal, setShowModal] = useState<boolean>(false);
  // State to track if an expense is being edited
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // State to track the current expense being edited
  const [currentExpenseId, setCurrentExpenseId] = useState<number | null>(null);
  // State to manage the new expense input form
  const [newExpense, setNewExpense] = useState<{
    name: string;
    amount: string;
    date: Date;
  }>({
    name: "",
    amount: "",
    date: new Date(),
  });

  // useEffect to load expenses from local storage or set initial expenses
  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(
        JSON.parse(storedExpenses).map((expense: Expense) => ({
          ...expense,
          date: new Date(expense.date),
        }))
      );
    } else {
      setExpenses(initialExpenses);
    }
  }, []);

  // useEffect to store expenses in local storage whenever they change
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses]);

  // Function to handle adding a new expense
}
