import { Grid, Paper } from '@mui/material'
import React from 'react'
import MonthSelector from '../components/MonthSelector'
import CategoryChart from '../components/CategoryChart'
import BarChart from '../components/BarChart'
import TransactionTable from '../components/TransactionTable'
import { Transaction } from '../types'

interface ReportProps{
  currentMonth: Date
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
  monthlyTransactions: Transaction[]
  isLoading: boolean
}

function Report({currentMonth,setCurrentMonth,monthlyTransactions,isLoading}:ReportProps) {
  const commonPeperStyle = {
    height:'400px',
    display:'flex',
    flexDirection:'column',
    p:2
  }
  return (
   <Grid container spacing={2}>
    {/* 日付*/}
    <Grid item xs={12}>
      <MonthSelector currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      </Grid>
    {/* カテゴリグラフ*/}
    <Grid item xs={12} md={4}><Paper sx={commonPeperStyle}>
      <CategoryChart />
      </Paper></Grid>
    {/* 棒グラフ*/}
    <Grid item xs={12} md={8}><Paper sx={commonPeperStyle}>
      <BarChart monthlyTransactions={monthlyTransactions} isLoading={isLoading} />
      </Paper></Grid>
      {/* テーブル*/}
    <Grid item xs={12}>
       <TransactionTable />
       </Grid>
   </Grid>
  )
}

export default Report
