
import { useCallback, useState } from "react";
import styled from "styled-components"
import DragIcon from "../Icon/Drag"
import EditIcon from "../Icon/Edit"
import MaterialItem from "./Material/MaterialItem"
import PlusIcon from "../Icon/Plus"
import Button from "../Button/Button"
import { Session, useSession } from "@/app/context/SessionContext"
import {useSortable} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CustomInput from "../Input/Input"
import AddMaterialModal from "./Material/AddMaterialModal"
import { useDisclosure } from "@nextui-org/react";

import {
    DndContext, 
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
  } from '@dnd-kit/core';

  import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
  } from '@dnd-kit/sortable';
  
import { DragEndEvent } from "@dnd-kit/core/dist/types";

    type SessionItemProps = {
        session: Session
    }

    const StyledSessionItem = styled.div`
    border-radius: 8px;
    border: 1px solid var #DFE5EE;
    background-color: white;
    box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.12) inset;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;` 

export default function SessionItem({session}: SessionItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition ,
        setActivatorNodeRef,
    } = useSortable({id: session.id});

    const { sessions, setSessions } = useSession()

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      );

      const handleDragEnd = useCallback((event: DragEndEvent) => {
        const {active, over} = event;
    
        if (active.id !== over?.id) {
            setSessions((sessions) => {
                return sessions.map(sessionItem => {
                    if (sessionItem.id === session.id) {
                        const oldIndex = sessionItem.materials.findIndex(material => material.id === active.id);
                        const newIndex = sessionItem.materials.findIndex(material => material.id === over?.id);
                        
                        const updatedMaterials = arrayMove(sessionItem.materials, oldIndex, newIndex);
                        console.log(updatedMaterials)
                        return {
                            ...sessionItem,
                            materials: updatedMaterials
                        };
                    }
                    return sessionItem;
                });
            });
        }
    }, [setSessions]);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const [edit, setEdit] = useState(false)
    const [name, setName] = useState(session.name)

    const  { editSessionName, setSelectedSessionId } = useSession()
    
    const handleEdit = () => { 
        editSessionName(session.id, name)
        setEdit(false)
    }

    const handleOpenAddMaterial = () => { 
        onOpen()
        setSelectedSessionId(session.id)
    }

    return (
        <>
       <StyledSessionItem ref={setNodeRef} {...attributes} style={style}>
        <div className="flex items-center gap-[5px]">
            <button ref={setActivatorNodeRef} {...listeners}>
                <DragIcon  />
            </button>
            
            {edit ? <>
                <CustomInput key={session.id} value={name} onChange={(e) => setName(e.target.value)} type="text" label="Session Name" />
                <Button type='fill' className='!p-2 !h-auto' onClick={handleEdit}> Simpan </Button>
            </> : <>
             
                <h2 className="font-medium text-2xl font-medium">{session.name} </h2>
                <button onClick={() => setEdit(true)}>
                    <EditIcon />
                </button>
            </>
            }
         
        </div>
        <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={session.materials}
              strategy={verticalListSortingStrategy}
            >
                <div className="pl-3 flex flex-col gap-[8px]">
                    {session.materials.map((material) => <MaterialItem material={material} key={material.id}  />)}
                </div>
  
            </SortableContext>
          </DndContext>
     
        <div className="flex items-center gap-4">
            <Button type='fill' className='!p-2 !h-auto' onClick={handleOpenAddMaterial}>
                <PlusIcon />
            </Button>
            <span className="font-medium">Add Lesson Material</span>
        </div>
       </StyledSessionItem>    
       <AddMaterialModal  
        isOpen={isOpen}
        onOpen={onOpen}     
        onOpenChange={onOpenChange}
        placement='center' />
       </>
    )
  }
  