import React, { useState, useEffect } from 'react';
import CustomInput from '../../component/inputcustum';
import styles from './wallet.module.scss';

interface Transaction {
  id: number;
  amount?: string;
  value?: number;
  date: string;
  type: 'deposit' | 'expense';
  title?: string;
}

const Wallet: React.FC = () => {
  const [inputAmount, setInputAmount] = useState<string>('');
  const [deposits, setDeposits] = useState<Transaction[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('walletDeposits') || '[]') as Transaction[];
    } catch {
      return [];
    }
  });
  const [currentBalance, setCurrentBalance] = useState<number>(() => {
    try {
      return parseFloat(localStorage.getItem('walletBalance') || '0');
    } catch {
      return 0;
    }
  });
  const [expenses, setExpenses] = useState<Transaction[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('walletExpenses') || '[]') as Transaction[];
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
        if (deps) setDeposits(JSON.parse(deps) as Transaction[]);
        if (exps) setExpenses(JSON.parse(exps) as Transaction[]);
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
  };

  const allTransactions = [...deposits, ...expenses].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={styles.walletWrapper}>
      <div className={styles.walletContainer}>
        <div className={styles.walletHeader}>
          <h2>Wallet</h2>
          <div className={styles.balanceBox}>
            <p>{currentBalance.toFixed(2)}$</p>
          </div>
        </div>

        <div className={styles.walletControls}>
          <div className={styles.addMoney}>
            <label>Add Money to Wallet</label>
            <div className={styles.inputContainer}>
              <span>$</span>
              <CustomInput
                type='text'
                placeholder='0.00'
                value={inputAmount}
                onChange={handleInputChange}
                className={styles.customInput}
              />
            </div>
          </div>

          <button
            onClick={handleAddFunds}
            disabled={!inputAmount}
            className={`${styles.confirmButton} ${!inputAmount ? `${styles.disabled}` : ''}`}
          >
            Confirm
          </button>

          <h3>Transaction History</h3>
          <div className={styles.transactionHistory}>
            {allTransactions.length > 0 ? (
              <ul>
                {allTransactions.map((transaction) => (
                  <li key={transaction.id}>
                    <div className={styles.transactionItem}>
                      <div className={styles.transactionInfo}>
                        <p className={transaction.type === 'deposit' ? `${styles.deposit}` : `${styles.expense}`}>
                          {transaction.type === 'deposit' ? `+${transaction.amount}$` : `-${transaction.value?.toFixed(2)}$`}
                        </p>
                        {transaction.title && <p className={styles.title}>({transaction.title})</p>}
                      </div>
                      <p className={styles.date}>{transaction.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.notransactions}>No transactions yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
