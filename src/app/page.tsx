'use client'

import Navbar from './components/Navbar/Navbar'
import Button from './components/Button/Button'
import EyeIcon from './components/Icon/Eye'
import SessionList from './components/Session/SessionList'
import AddSessionModal from './components/Session/AddSessionModal'
import { useDisclosure } from "@nextui-org/react";

export default function Home() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
    <Navbar />

    <main className='container py-[50px]'>
      <div className='flex'>
        <div className='flex items-center'>
          <h1 className='font-medium text-[32px]'>
            Belajar dan praktek cinematic videography
=          </h1>
          <span className='text-tertiary text-xs ml-[32px] font-medium'>Last edited 18 October 2021 | 13:23</span>
        </div>
        <Button type='outline' onClick={() => {alert ('a')}} className='ml-auto'  >
          <EyeIcon />
          Preview
        </Button>
      </div>
      <SessionList onAddSessionClick={onOpen} />
      <AddSessionModal 
        isOpen={isOpen}
        onOpen={onOpen}     
        onOpenChange={onOpenChange}
        placement='center'/>    
    </main>
    </>
  )
}
