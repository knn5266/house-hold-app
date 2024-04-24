import React, { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import { formatMonth } from '../utils/formatting'
import { Transaction } from '../types'

export const useMonthlyTransactions = (): Transaction[] => {
const {transactions,currentMonth} = useAppContext()
  const monthlyTransactions = useMemo(() => 
   transactions.filter((transaction) => transaction.date.startsWith(formatMonth(currentMonth))
  )
,[transactions,currentMonth]);
  return monthlyTransactions
}

