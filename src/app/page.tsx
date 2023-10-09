'use client'

import Navbar from './components/Navbar/Navbar'
import Button from './components/Button/Button'
import EyeIcon from './components/Icon/Eye'
import SessionList from './components/Session/SessionList'
import AddSessionModal from './components/Session/AddSessionModal'
import { useDisclosure } from "@nextui-org/react";
import styled from 'styled-components'

const StyledEventContainer = styled.div`
  border-radius: 8px;
  border: 1px solid  #DFE5EE;
  background: #FFF;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.12) inset;
  padding: 24px;
`
export default function Home() {

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
    <Navbar />

    <main className='container py-[50px] flex flex-col gap-7'>
      <div className='flex'>
        <div className='flex items-center'>
          <h1 className='font-medium text-[32px]'>
            Belajar dan praktek cinematic videography
          </h1>
          <span className='text-tertiary text-xs ml-[32px] font-medium'>Last edited 18 October 2021 | 13:23</span>
        </div>
        <Button type='outline' onClick={() => {return}} className='ml-auto'  >
          <EyeIcon />
          Preview
        </Button>
      </div>

      <div className=' border-b border-b-[#dfe5ee] z-0'>
        <div className='text-primary font-semibold border-b-2 border-b-primary w-max pb-3 z-10'>
          Curicculum
        </div>
      </div>
      <StyledEventContainer >
        Event Schedule: 24 Oktober 2021, 16:30
      </StyledEventContainer>
      <SessionList onAddSessionClick={onOpen} />
      <AddSessionModal 
        isOpen={isOpen}
        onOpen={onOpen}   
        onClose={onClose}  
        onOpenChange={onOpenChange}
        placement='center'/>    
    </main>
    </>
  )
}
