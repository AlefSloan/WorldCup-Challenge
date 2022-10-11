import { useState } from 'react'
import { addDays, subDays, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Icon } from '~/components/Icon'

export const DateSelect = () => {
  const [currentDate, setCurrentDate] = useState(new Date('2022-11-20T00:00:00Z'))
  
  const prevDay = () => { 
    const prevDate = subDays(currentDate, 1)
    setCurrentDate(prevDate)
   }
  const nextDay = () => { 
    const nextDate = addDays(currentDate, 1)
    setCurrentDate(nextDate)
   }
  
  return (
    <div className='flex space-x-4 p-6'>
      <Icon name='leftArrow' className='h-8' onClick={prevDay}/>
      <h4 className='text-xl font-bold text-red-700'>{ format(currentDate, "d 'de' MMMM", { locale: ptBR }) }</h4>
      <Icon name='rightArrow' className='h-8' onClick={nextDay}/>
    </div>
  )
}