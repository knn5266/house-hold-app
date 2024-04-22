import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Report from './pages/Report';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import AppLayout from './components/layout/AppLayout';
import {theme} from './theme/theme'
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Transaction } from './types/index';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { format } from 'date-fns';
import { formatMonth } from './utils/formatting';
import { Scheme } from './components/validations/schema';

function App() {
//firestoreエラーかどうか判定する型ガード
  function isFireStoreError(err: unknown): err is {code: string, message:string}{
    return typeof err === 'object' && err !== null && 'code' in err
  }

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())


  // console.log(currentMonth)
  format(currentMonth,'yyyy-MM')

useEffect(() => {
  const fetchTransactions = async() => {
    try{
      const querySnapshot = await getDocs(collection(db, 'Transactions'))
      const transactionsData = querySnapshot.docs.map((doc) => {
        // // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        return{
          ...doc.data(),
          id:doc.id
        } as Transaction
      });

      setTransactions(transactionsData)
    }catch(err){
      if(isFireStoreError(err)){
        // console.error(JSON.stringify(err,null,2))
        console.error('firebaseのエラーは',err)
      }else{
        console.error('一般的なエラーは',err)
      }
    }
  }
  fetchTransactions()
},[])

const monthlyTransactions = transactions.filter((transaction) => {
  return transaction.date.startsWith(formatMonth(currentMonth))
})

//取引を保存
const handleSaveTransaction = async(transaction:Scheme) => {
  try{
    //firestoreに保存
    const docRef = await addDoc(collection(db, "Transactions"), transaction);
    console.log("Document written with ID: ", docRef.id);

    const newTransaction = {
      id: docRef.id,
      ...transaction,
    } as Transaction
    setTransactions((prevTransaction) => [...transactions, newTransaction])
  }catch(err){
    if(isFireStoreError(err)){
      console.error('firebaseのエラーは',err)
    }else{
      console.error('一般的なエラーは',err)
  }
}
}

const handleDeleteTransaction = async(transactionId: string) => {
  try{
    await deleteDoc(doc(db, "Transactions", transactionId));
    const filterdTransactions = transactions.filter((transaction) => transaction.id !== transactionId )
    setTransactions(filterdTransactions)
  }catch(err){
    if(isFireStoreError(err)){
      console.error('firebaseのエラーは',err)
    }else{
      console.error('一般的なエラーは',err)
  }
  }
}

const handleUpdateTransaction = async(transaction:Scheme, transactionId: string) => {
  try{
    //firebase更新
      const docRef = doc(db, "Transactions", transactionId);
      await updateDoc(docRef, transaction);
      const UpdatedTransactions = transactions.map((t) => t.id === transactionId ? {...t,...transaction} : t) as Transaction[]
      setTransactions(UpdatedTransactions)
  }catch(err){
    if(isFireStoreError(err)){
      console.error('firebaseのエラーは',err)
    }else{
      console.error('一般的なエラーは',err)
  }
  }
}


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} onSaveTransaction={handleSaveTransaction} onDeleteTransaction={handleDeleteTransaction}
            onUpdateTransaction={handleUpdateTransaction} />} />
            <Route path='/report' element={<Report currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
          </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
