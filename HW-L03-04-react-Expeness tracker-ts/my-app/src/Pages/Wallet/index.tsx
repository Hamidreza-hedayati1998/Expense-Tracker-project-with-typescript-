import React, { useState, useEffect } from 'react';
import CustomInput from '../../component/inputCustom';

interface Transaction {
    id: number;
    amount: string;
    date: string;
    type: 'deposit' | 'expense';
    title?: string;
    value?: string;
}

const Wallet: React.FC = () => {
    const [inputAmount, setInputAmount] = useState<string>('');
    const [deposits, setDeposits] = useState<Transaction[]>(() => {
        try {
            const deps = localStorage.getItem('walletDeposits');
            return deps ? JSON.parse(deps) : [];
        } catch {
            return [];
        }
    });
    const [currentBalance, setCurrentBalance] = useState<number>(() => {
        try {
            const balance = localStorage.getItem('walletBalance');
            return balance ? JSON.parse(balance) : 0;
        } catch {
            return 0;
        }
    });
    const [expenses, setExpenses] = useState<Transaction[]>(() => {
        try {
            const exps = localStorage.getItem('walletExpenses');
            return exps ? JSON.parse(exps) : [];
        } catch {
            return [];
        }
    });
   
    useEffect(() => {
        const loadWalletData = () => {
            try {
                const balance = localStorage.getItem('walletBalance');
                const deps = localStorage.getItem('walletDeposits');
                const exps = localStorage.getItem('walletExpenses');
               
                if (balance) setCurrentBalance(parseFloat(balance));
                if (deps) setDeposits(JSON.parse(deps));
                if (exps) setExpenses(JSON.parse(exps));
            } catch (error) {
                console.error('Failed to load wallet data:', error);
            }
        };

        loadWalletData();
    }, []);

    useEffect(() => {
        const saveWalletData = () => {
            try {
                localStorage.setItem('walletBalance', currentBalance.toString());
                localStorage.setItem('walletDeposits', JSON.stringify(deposits));
                localStorage.setItem('walletExpenses', JSON.stringify(expenses));
                const allTransactions = [...deposits, ...expenses];
                localStorage.setItem('walletTransactions', JSON.stringify(allTransactions));
            } catch (error) {
                console.error('Error saving wallet data:', error);
            }
        };

        if (currentBalance >= 0 && Array.isArray(deposits) && Array.isArray(expenses)) {
            saveWalletData();
        }
    }, [currentBalance, deposits, expenses]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
            setInputAmount(value);
        }
    };

    const handleAddFunds = () => {
        if (!inputAmount || parseFloat(inputAmount) <= 0) return;
        const amount = parseFloat(inputAmount);
        const newDeposit: Transaction = {
            id: Date.now(),
            amount: amount.toFixed(2),
            date: new Date().toLocaleString('en-US'),
            type: 'deposit'
        };

        const updatedDeposits = [newDeposit, ...deposits];
        const updatedBalance = currentBalance + amount;
        
        setDeposits(updatedDeposits);
        setCurrentBalance(updatedBalance);
        setInputAmount('');
        localStorage.setItem('walletBalance', updatedBalance.toString());
        localStorage.setItem('walletDeposits', JSON.stringify(updatedDeposits));
        const allTransactions = [...updatedDeposits, ...expenses];
        localStorage.setItem('walletTransactions', JSON.stringify(allTransactions));
    };

    const allTransactions = [...deposits, ...expenses].sort((a, b) => b.id - a.id);

    return (
        <div className='min-h-screen flex flex-col items-center justify-center -mt-20 p-4'>
          <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-xl max-h-[600px]'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-800'>Wallet</h2>
              <div className='mt-4 p-4 bg-blue-50 rounded-lg'>
                <p className='text-4xl font-bold text-blue-600'>{currentBalance.toFixed(2)}$</p>
              </div>
            </div>
            
            <div className='space-y-6'>
              <div className='flex flex-col items-center text-2xl rounded-md text-gray-700'>
                 <label className='text-sm font-medium text-gray-700 mb-1'>
                    Add Money to Wallet
                 </label>
                  <div className='flex items-center border-2 border-blue-200 w-full rounded-md'>
                    <span className='px-3 bg-blue-50 text-blue-600'>$</span>
                    <CustomInput type='text'
  placeholder='0.00'
  value={inputAmount}
  onChange={handleInputChange}
  className='w-full px-4 py-3 text-lg focus:outline-none' 
/>
                   </div>
              </div>
              
              <button 
                onClick={handleAddFunds}
                className={`w-full py-3 px-4 rounded-md font-semibold text-lg transition duration-200
                    ${inputAmount ? 
                    'bg-blue-600 text-white hover:bg-blue-700' :
                    'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                disabled={!inputAmount}
              >
                Confirm
              </button>
              
              <h3 className='text-xl font-semibold text-gray-700 mb-4'>Transaction History</h3>
              <div className='border rounded-lg overflow-hidden'>
                {allTransactions.length > 0 ? (
                    <ul className='divide-y divide-gray-200 max-h-20 overflow-y-scroll'>
                        {allTransactions.map((transaction) => (
                            <li key={transaction.id} className='p-3 hover:bg-gray-50'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <p className={`font-medium ${transaction.type === 'deposit' ?
                                             'text-green-600' : 'text-red-600'}`}>
                                            {transaction.type === 'deposit' ? `+${transaction.amount}$` : `-${transaction.value}$`}
                                        </p>
                                        {transaction.title && (
                                            <p className='text-xs text-red-600'>({transaction.title})</p>
                                        )}
                                    </div>
                                    <p className='text-sm text-gray-600'>
                                        {transaction.date}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className='p-6 text-center text-gray-500'>
                        No transactions yet
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
    );
};

export default Wallet;