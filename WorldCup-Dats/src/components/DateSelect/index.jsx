import { addDays, subDays, format, formatISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Icon } from '~/components/Icon'

export const DateSelect = ({ currentDate, onChange }) => {
  const date = new Date(currentDate)
  
  const prevDay = () => { 
    const prevDate = subDays(date, 1)
    onChange(formatISO(prevDate))
   }
  const nextDay = () => { 
    const nextDate = addDays(date, 1)
    onChange(formatISO(nextDate))
   }
  
  return (
    <div className='flex space-x-4 p-6'>
      <Icon name='leftArrow' className='h-8' onClick={prevDay}/>
      <h4 className='text-xl font-bold text-red-700'>{ format(date, "d 'de' MMMM", { locale: ptBR }) }</h4>
      <Icon name='rightArrow' className='h-8' onClick={nextDay}/>
    </div>
  )
}