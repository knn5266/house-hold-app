import { Grid, Paper } from '@mui/material'
import React from 'react'
import MonthSelector from '../components/MonthSelector'
import CategoryChart from '../components/CategoryChart'
import BarChart from '../components/BarChart'
import TransactionTable from '../components/TransactionTable'

interface ReportProps{
  currentMonth: Date
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>
}

function Report({currentMonth,setCurrentMonth}:ReportProps) {
  const commonPeperStyle = {
    height:{xs:'auto', md:'400px'},
    display:'flex',
    flexDirection:'column'
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
      <BarChart />
      </Paper></Grid>
      {/* テーブル*/}
    <Grid item xs={12}>
       <TransactionTable />
       </Grid>
   </Grid>
  )
}

export default Report
