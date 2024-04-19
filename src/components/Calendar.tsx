import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import '../calendar.css'
import { EventContentArg } from '@fullcalendar/core'
import { Balance, CalendarContent, Transaction } from '../types'
import { calculateDailyBalances } from '../utils/financeCalculations'
import { formatCurrency } from '../utils/formatting'

interface CalendarProps {
  monthlyTransactions: Transaction[]
}


const Calendar = ({monthlyTransactions}: CalendarProps) => {

  const renderEventContent =(eventInfo: EventContentArg) => {
    console.log(eventInfo)
    return (
      <div>
        <div className='money' id='event-income'>
          {eventInfo.event.extendedProps.income}</div>

        <div className='money' id='event-expense'>
          {eventInfo.event.extendedProps.income}</div>
      

        <div className='money' id='event-balan'>
          {eventInfo.event.extendedProps.income}</div>
      </div>
    )
  }

 const dailyBalances = calculateDailyBalances(monthlyTransactions)
 console.log(dailyBalances)

 const createCalendarEvents= (dailyBalances: Record<string, Balance>): CalendarContent[] => {
  return  Object.keys(dailyBalances).map((date)=>{
    const {income,expense,balance} = dailyBalances[date]
    return{
      start:date,
      income: formatCurrency(income),
      expense: formatCurrency(expense),
      balance: formatCurrency(balance)
    }
  })
 }

 const calenderEvents = createCalendarEvents(dailyBalances)
 console.log(calenderEvents)

  return (
    <FullCalendar
    locale={jaLocale} 
    plugins={[dayGridPlugin]}
    initialView='dayGridMonth'
    events={calenderEvents}
    eventContent={renderEventContent}
    />
  )
}

export default Calendar