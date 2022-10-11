export const Card = ({ timeA, timeB, match }) => (
  <div className='border border-gray-300 rounded-xl p-4 text-center space-y-4'>
    <span className='text-gray-700 font-bold text-sm md:text-base'>{match.time}</span>
    
    <div className='flex justify-center space-x-6 items-center'>
      <span className='uppercase'>{timeA.slug}</span>
      <img src={`./flags/${timeA.slug}.png`}/>
      
      <input className='bg-red-300/[0.2] text-red-300 font-bold text-xl w-14 h-14 text-center' type='number' />
      <span className='text-red-500 font-bold'>X</span>
      <input className='bg-red-300/[0.2] text-red-300 font-bold text-xl w-14 h-14 text-center' type='number' />
      
      <img src={`./flags/${timeB.slug}.png`} />
      <span className='uppercase'>{timeB.slug}</span>
    
    </div>
  </div>
)