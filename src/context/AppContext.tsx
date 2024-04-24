import { ReactNode, createContext, useContext, useState } from "react";
import { Transaction } from "../types";
import { useMediaQuery, useTheme } from "@mui/material";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Scheme } from "../components/validations/schema";
import { isFireStoreError } from "../utils/errorHandling";

interface AppContextType{
  transactions: Transaction[]
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
  currentMonth:Date
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
  isLoading:boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  isMobile:boolean
  onSaveTransaction:(transaction: Scheme) => Promise<void>
  onDeleteTransaction:(transactionIds: string | readonly string[]) => Promise<void>
  onUpdateTransaction: (transaction: Scheme, transactionId: string) => Promise<void>
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppContextProvider = ({children}:{children: ReactNode}) =>{
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const theme = useTheme()
 const isMobile = useMediaQuery(theme.breakpoints.down('lg'))
 const onSaveTransaction = async(transaction:Scheme) => {
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
const onDeleteTransaction = async(transactionIds: string | readonly string[]) => {
  try{
  const idsDelete = Array.isArray(transactionIds) ? transactionIds : [transactionIds]

    for(const id of idsDelete){
      await deleteDoc(doc(db, "Transactions", id));
    }

    const filterdTransactions = transactions.filter((transaction) => !idsDelete.includes(transaction.id) )
    setTransactions(filterdTransactions)
  }catch(err){
    if(isFireStoreError(err)){
      console.error('firebaseのエラーは',err)
    }else{
      console.error('一般的なエラーは',err)
  }
  }
}

const onUpdateTransaction = async(transaction:Scheme, transactionId: string) => {
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
    <AppContext.Provider value={{transactions,setTransactions,currentMonth,setCurrentMonth,isLoading,setIsLoading,isMobile,onDeleteTransaction,onSaveTransaction,onUpdateTransaction}}>
      {children}
    </AppContext.Provider>
  )
}
 
export const useAppContext = () =>{
  const context =  useContext(AppContext)
  if(!context){
    //context === undefind
    throw new Error('グローバルなデータはプロバイダーで取得')
  }
  return context
}