import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './home.module.scss';
import Card from '../../component/card';
import CustomInput from '../../component/inputcustum';
import Buttoncustom from '../../component/Buttoncustum';
import PiCharts from '../../component/Reports/Picharts';
import CustomSelected from '../../component/customSeleted';
import { IoMdClose } from "react-icons/io";

interface Transaction {
  id: number;
  selectedcategory: string;
  category: string;
  title: string;
  value: number;
  date: string;
  type: string;
}

interface ChartData {
  name: string;
  value: number;
}

const HomePage: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [value, setValue] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [selectedcategory, setSelectedcategory] = useState<string>('');
    const [showCustomInput, setShowCustomInput] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        try {
            const storedTransactions = localStorage.getItem('transactions');
            return storedTransactions ? JSON.parse(storedTransactions) as Transaction[] : [];
        } catch (error) {
            console.error('Error parsing transactions:', error);
            return [];
        }
    });
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';
    
    useEffect(() => {
        const loadData = () => {
            try {
                const savedTransactions: Transaction[] = JSON.parse(
                    localStorage.getItem('transactions') || '[]'
                ) as Transaction[];
                
                const walletExpenses: Transaction[] = JSON.parse(
                    localStorage.getItem('walletExpenses') || '[]'
                ) as Transaction[];
                
                if (savedTransactions.length > walletExpenses.length) {
                    localStorage.setItem('walletExpenses', JSON.stringify(savedTransactions));
                } else if (walletExpenses.length > savedTransactions.length) {
                    localStorage.setItem('transactions', JSON.stringify(walletExpenses));
                    setTransactions(walletExpenses);
                } else {
                    setTransactions(savedTransactions);
                }
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
        
        loadData();
    }, []);
  
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const filteredTransactions = transactions.filter((transaction) => {
        const titleMatch = transaction.title.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = transaction.selectedcategory.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch || categoryMatch;
    });

    const getTimeDifference = (trDate: string): string => {
        const transactionDate = new Date(trDate);
        const now = new Date();
        const timeDifference = now.getTime() - transactionDate.getTime(); 
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const weeksDifference = Math.floor(daysDifference / 7);
    
        if (weeksDifference === 0) {
            return daysDifference === 0 
                ? 'Today' 
                : `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
        } 
        return `${weeksDifference} ${weeksDifference === 1 ? 'week' : 'weeks'} ago`;
    };

    const handleAddTransaction = (): void => {
        if (!title.trim() || !value.trim() || !date || !selectedcategory) {
            return;
        }

        try {
            const expenseValue = parseFloat(value);
            const currentBalance = parseFloat(localStorage.getItem('walletBalance') || '0');
            
            if (expenseValue > currentBalance) {
                alert(`Insufficient funds! You have ${currentBalance}$ in wallet`);
                return;
            }

            const newTransaction: Transaction = {
                id: Date.now(),
                selectedcategory: selectedcategory === "other" ? category : selectedcategory,
                category,
                title,
                value: expenseValue,
                date: date || new Date().toISOString(),
                type: 'expense'
            };
            
            const updatedTransactions = [...transactions, newTransaction];
            setTransactions(updatedTransactions);
            
            const newBalance = currentBalance - expenseValue;
            localStorage.setItem('walletBalance', newBalance.toString());
            
            const currentExpenses: Transaction[] = JSON.parse(
                localStorage.getItem('walletExpenses') || '[]'
            );
            const updatedExpenses = [...currentExpenses, newTransaction];
            localStorage.setItem('walletExpenses', JSON.stringify(updatedExpenses));
            
            // Reset form
            setTitle('');
            setValue('');
            setDate('');
            setCategory('');
            setSelectedcategory('');
            setShowCustomInput(false);

        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { value } = e.target;
        setSelectedcategory(value);
        setShowCustomInput(value === 'other');
        if (value !== 'other') setCategory('');
    };
    
    const sortedTransactions = [...filteredTransactions].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const removeTransaction = (id: number): void => {
        const transactionToRemove = transactions.find(t => t.id === id);
        if (!transactionToRemove) return;
    
        try {
            const currentBalance = parseFloat(localStorage.getItem('walletBalance') || '0');
            const newBalance = currentBalance + transactionToRemove.value;
            localStorage.setItem('walletBalance', newBalance.toString());
    
            const updatedTransactions = transactions.filter(t => t.id !== id);
            setTransactions(updatedTransactions);
    
            const updatedExpenses: Transaction[] = JSON.parse(
                localStorage.getItem('walletExpenses') || '[]'
            ).filter((t: Transaction) => t.id !== id);
            
            localStorage.setItem('walletExpenses', JSON.stringify(updatedExpenses));
        } catch (error) {
            console.error('Error removing transaction:', error);
        }
    };

    const chartData: ChartData[] = transactions.map((transaction) => ({
        name: transaction.title,
        value: transaction.value,
    }));
    
    const totalValue = transactions.reduce((sum, transaction) => sum + transaction.value, 0);

    return (
        <div className={styles.container}>
            <div className={styles['home-content']}>
                <div className={styles['card-container']}>
                    <Card>
                        <h2 className={`${styles['text-lg']} ${styles['font-bold']} ${styles['mb-4']}`}>
                            Add Expense
                        </h2>
                        <CustomSelected 
                            option1='food'
                            label1='Food'
                            option2='university' 
                            label2='University'
                            option3='travel' 
                            label3='Travel'
                            option4='other'
                            label4='Other'
                            value={selectedcategory} 
                            onChange={handleSelectChange}
                        />
                        {showCustomInput && (
                            <CustomInput 
                                placeholder='Enter custom category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        )}
                        <CustomInput 
                            placeholder='Expense title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <CustomInput 
                            type='number' 
                            placeholder='Amount'
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <CustomInput 
                            type='date' 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <Buttoncustom 
                            label='Add Expense' 
                            onClick={handleAddTransaction}
                        />
                    </Card>
                </div>

                <div className={styles['card-container']}>
                    <Card>
                        <h2 className={`${styles['text-lg']} ${styles['font-bold']} ${styles['mb-4']}`}>
                            Recent Expenses
                        </h2>
                        <div className={styles['scroll-container']}>
                            <ul>
                                {sortedTransactions.map((transaction) => (
                                    <li key={transaction.id} className={styles['transaction-item']}>
                                        <div className={styles['transaction-content']}>
                                            <div className={styles['transaction-title']}>
                                                
                                                <strong>{transaction.title}</strong>
                                                <span className={styles['transaction-amount']}>
                                                    {transaction.value}$
                                                   
                                                </span>
                                            </div>
                                            <p className={styles['transaction-date']}>
                                                {getTimeDifference(transaction.date)}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => removeTransaction(transaction.id)}
                                            className={styles['text-red']}
                                            aria-label="Remove transaction"
                                        >
                                            <IoMdClose />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                </div>

                <div className={styles['card-container']}>
                    <Card>
                        <h2 className={`${styles['text-lg']} ${styles['font-bold']}`}>
                            Expenses Chart
                        </h2>
                        <div className={styles['chart-container']}>
                            <PiCharts data={chartData} totalValue={totalValue} />
                            <div className={styles['total-expenses']}>
                                <span className={styles['text-xl']}>Total Expenses: </span>
                                <span className={styles['font-bold']}>${totalValue.toFixed(2)}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HomePage;