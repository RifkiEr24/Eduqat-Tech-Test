import { useCallback, useState } from "react";
import Button from "../Button/Button";
import PlusIcon from "../Icon/Plus";
import SessionItem from "./SessionItem";
import { useSession } from '@/app/context/SessionContext';
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

type SessionListProps = {
  onAddSessionClick: () => void
}

export default function SessionList({ onAddSessionClick }: SessionListProps) {

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
                const oldIndex = sessions.findIndex(session => session.id === active.id);
                const newIndex = sessions.findIndex(session => session.id === over?.id);

                return arrayMove(sessions, oldIndex, newIndex);
            });
        }
    }, [setSessions]);

    
    return (
        <div className="h-[100vh]">
            <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={sessions}
              strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-4">
                    {sessions.map((session) => <SessionItem session={session} key={session.id}  />)}

                </div>
            <div className="flex mt-7 justify-end">
                <Button type='fill' onClick={onAddSessionClick} className='!py-3 !px-[23px]'>
                    <PlusIcon />
                    Add Session
                </Button>
            </div>
            </SortableContext>
          </DndContext>
        </div>
    )
  }
  