import { Box } from '@mui/material'
import React, { useState } from 'react'
import MonthlySummary from '../components/MonthlySummary'
import Calendar from '../components/Calendar'
import TransactionMenu from '../components/TransactionMenu'
import TransactionForm from '../components/TransactionForm'
import { Transaction } from '../types'
import { format } from 'date-fns'
import { Scheme } from '../components/validations/schema'


interface HomeProps{
  monthlyTransactions:Transaction[]
  setCurrentMonth:React.Dispatch<React.SetStateAction<Date>>
  onSaveTransaction:(transaction: Scheme) => Promise<void>
}

const Home = ({monthlyTransactions,setCurrentMonth,onSaveTransaction}:HomeProps) => {
 const today = format (new Date(), 'yyyy-MM-dd')
  const [currentDay, setCurrentDay] = useState(today)
  const [isEntryDrawerOpen, setIsEntryDrawerOpen] = useState(false)

  const dailyTransactions = monthlyTransactions.filter((Transaction) => {
    return Transaction.date === currentDay
  })

  const closeForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen)
  }

  //フォーム開閉処理
  const handleAddTransactionForm = () => {
    setIsEntryDrawerOpen(!isEntryDrawerOpen)
  }
  
  return (
    <Box sx={{display:'flex'}}>
      {/*左側コンテンツ*/}
      <Box sx={{flexGrow: 1}}>
        <MonthlySummary monthlyTransactions={monthlyTransactions}/>
        <Calendar monthlyTransactions={monthlyTransactions} setCurrentMonth={setCurrentMonth} setCurrentDay={setCurrentDay} currentDay={currentDay} today={today}/>
      </Box>
      {/*右側コンテンツ*/}
      <Box>
        <TransactionMenu dailyTransactions={dailyTransactions} currentDay={currentDay} onAddTransactionForm={handleAddTransactionForm}/>
        <TransactionForm onCloseForm={closeForm} isEntryDrawerOpen={isEntryDrawerOpen} currentDay={currentDay} onSaveTransaction={onSaveTransaction}/>
      </Box>
    </Box>
  )
}

export default Home
