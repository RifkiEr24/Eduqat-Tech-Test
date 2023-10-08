import styled from "styled-components"
import DragIcon from "../Icon/Drag"
import EditIcon from "../Icon/Edit"
import MaterialItem from "./Material/MaterialItem"
import PlusIcon from "../Icon/Plus"
import Button from "../Button/Button"
import { Session, useSession } from "@/app/context/SessionContext"
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { useState } from "react"
import { Input } from "@nextui-org/react"

type SessionItemProps = {
    session: Session
}

export default function SessionItem({session}: SessionItemProps) {

    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(session.name)

    const  { editSession } = useSession()

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        setActivatorNodeRef,
    } = useSortable({id: session.id});
    
    const StyledSessionItem = styled.div`
        border-radius: 8px;
        border: 1px solid var #DFE5EE;
        background-color: white;
        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.12) inset;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        transform: ${CSS.Transform.toString(transform)};
        ${transition}
    ` 
    return (
       <StyledSessionItem ref={setNodeRef} {...attributes}>
        <div className="flex items-center gap-[5px]">
            <button ref={setActivatorNodeRef} {...listeners}>
                <DragIcon  />
            </button>
            <Input value={name} onChange={(e) => setName(e.target.value)} type="text" label="Session Name" className="w-max" />
            <h2 className="font-medium text-2xl font-medium">{session.name} </h2>
            <button onClick={() => setEdit(true)}>
                <EditIcon />
            </button>
        </div>
        <div className="pl-3 flex flex-col gap-[8px]">
            {session.materials.map((material) => <MaterialItem material={material} key={material.id}  />)}
        </div>
  
        <div className="flex items-center gap-4">
            <Button type='fill' className='!p-2 !h-auto' onClick={() => {
                alert('bc')
            }}>
                <PlusIcon />
            </Button>
            <span className="font-medium">Add Lesson Material</span>
        </div>
       </StyledSessionItem>    
    )
  }
  