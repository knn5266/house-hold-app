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
// import { Transaction } from './types/index';
// import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
// import { db } from './firebase';
// import { format } from 'date-fns';
// import { formatMonth } from './utils/formatting';
// import { Scheme } from './components/validations/schema';
import { AppContextProvider } from './context/AppContext';

function App() {

  // const [transactions, setTransactions] = useState<Transaction[]>([])
  // const [currentMonth, setCurrentMonth] = useState(new Date())
  // const [isLoading, setIsLoading] = useState(true)

   //firestoreエラーかどうか判定する型ガード
  // function isFireStoreError(err: unknown): err is {code: string, message:string}{
  //   return typeof err === 'object' && err !== null && 'code' in err
  // }



// const monthlyTransactions = transactions.filter((transaction) => {
//   return transaction.date.startsWith(formatMonth(currentMonth))
// })

//取引を保存
// const handleSaveTransaction = async(transaction:Scheme) => {
//   try{
//     //firestoreに保存
//     const docRef = await addDoc(collection(db, "Transactions"), transaction);
//     console.log("Document written with ID: ", docRef.id);

//     const newTransaction = {
//       id: docRef.id,
//       ...transaction,
//     } as Transaction
//     setTransactions((prevTransaction) => [...transactions, newTransaction])
//   }catch(err){
//     if(isFireStoreError(err)){
//       console.error('firebaseのエラーは',err)
//     }else{
//       console.error('一般的なエラーは',err)
//   }
// }
// }

// const handleDeleteTransaction = async(transactionIds: string | readonly string[]) => {
//   try{
//   const idsDelete = Array.isArray(transactionIds) ? transactionIds : [transactionIds]

//     for(const id of idsDelete){
//       await deleteDoc(doc(db, "Transactions", id));
//     }

//     const filterdTransactions = transactions.filter((transaction) => !idsDelete.includes(transaction.id) )
//     setTransactions(filterdTransactions)
//   }catch(err){
//     if(isFireStoreError(err)){
//       console.error('firebaseのエラーは',err)
//     }else{
//       console.error('一般的なエラーは',err)
//   }
//   }
// }

// const handleUpdateTransaction = async(transaction:Scheme, transactionId: string) => {
//   try{
//     //firebase更新
//       const docRef = doc(db, "Transactions", transactionId);
//       await updateDoc(docRef, transaction);
//       const UpdatedTransactions = transactions.map((t) => t.id === transactionId ? {...t,...transaction} : t) as Transaction[]
//       setTransactions(UpdatedTransactions)
//   }catch(err){
//     if(isFireStoreError(err)){
//       console.error('firebaseのエラーは',err)
//     }else{
//       console.error('一般的なエラーは',err)
//   }
//   }
// }


  return (
    <AppContextProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Router>
          <Routes>
          <Route path='/' element={<AppLayout />}>
              <Route index element={<Home  />} />
              {/* // monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} onSaveTransaction={handleSaveTransaction} onDeleteTransaction={handleDeleteTransaction}
              // onUpdateTransaction={handleUpdateTransaction}  */}
              <Route path='/report' element={<Report
              //  currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} monthlyTransactions={monthlyTransactions} isLoading={isLoading} onDeleteTransaction={handleDeleteTransaction}
                />} />
              <Route path='*' element={<NoMatch />} />
          </Route>
          </Routes>
        </Router>
    </ThemeProvider>
  </AppContextProvider>
  );
}

export default App;
