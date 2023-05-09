import React from 'react'
import Location from './Location'

const Details = () => {
  return (
    <div className='mx-auto max-w-5xl my-14 space-y-6'>
      <h1 className='text-center mb-12 font-semibold text-2xl'>Detail Tracker History Report</h1>
      <div className='flex gap-5'>
        <div className='w-72 h-48'>
          <img className='w-full h-full' src="https://images.prismic.io/moreapp/0556644b-3d4b-45e5-8cc1-a74d45288673_EN+visit+report.png?auto=compress,format" alt="Avatar Tailwind CSS Component" />
        </div>
        <div className='space-y-5 flex-grow'>
          <div>
            <p>Name :</p>
            <p className='font-semibold text-lg'>Muhammad Jawahiruzzaman</p>
          </div>
          <div>
            <p>Ages :</p>
            <p className='font-semibold text-lg'>18 years old</p>
          </div>
          <div>
            <p>Description :</p>
            <p className='font-semibold text-lg'>Tolong bantu akuu</p>
          </div>
          <div className='!mt-10'>
            <Location />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details
