'use client'

import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react"

export type Material = {
    id: string,
    name: string,
    type: string,
    required: boolean,
    previewable: boolean,
    time: string,
    duration: string,
    durationType: string,
    downloadable: boolean
}

export type Session = {
    id: string
    name: string,
    materials: Material[] | []
}

type SessionContextType = {
    sessions: Session[] | [],
    selectedSessionId: Session["id"] | '',
    addSession: (_session: Session) => void,
    editSessionName: (sessionId : Session["id"], _newName: Session["name"]) => void,
    setSessions: Dispatch<SetStateAction<Session[]>>,
    setSelectedSessionId: Dispatch<SetStateAction<Session["id"]>>,
    deleteSession: (sessionId : Session["id"]) => void,
    addMaterial: (sessionId : Session["id"], _material: Material) => void,
    deleteMaterial: (sessionId : Session["id"], _material: Material['id']) => void
}
function noop(..._args: any[]): any {}

const INITIAL_DATA = {
    sessions: [],
    selectedSessionId: '',
    addSession: noop,
    editSessionName: noop,
    setSessions: noop,
    deleteSession: noop,
    addMaterial: noop,
    deleteMaterial: noop
}


const SessionContext = createContext<SessionContextType>(INITIAL_DATA);

export function useSession() {
    const context = useContext(SessionContext)
    return context
}

export default function SessionProvider({ children }: PropsWithChildren<{}>) {

    const [sessions, setSessions] = useState<Session[]>([
        {
            id: 'a',
            name: 'Session 1',
            materials: [{
                id: '1',
                name: 'Judul Video',
                type: 'video',
                required: false,
                previewable: true,
                time: '2023-10-05T19:45',
                duration: '09:10',
                downloadable: true,
                durationType: 'min'
            }]
        },
        {
            id: 'b',
            name: 'Session 2',
            materials: [{
                id: '1a',
                name: 'Judul Video',
                type: 'on_site',
                required: true,
                previewable: false,
                time: '2023-10-05T19:45',
                duration: '07:20',
                downloadable: false,
                durationType: 'hour'
            },
            {
                id: '2b',
                name: 'Judul Video 2',
                type: 'on_site',
                required: true,
                previewable: false,
                time: '2023-10-05T19:45',
                duration: '06:30',
                downloadable: false,
                durationType: 'hour'
            }]
        }
    ])

    const [selectedSessionId, setSelectedSessionId] = useState<Session['id']>('')


    const addSession = (newSession: Session) => {
        setSessions((currSession) => [...currSession, newSession ])
    }

    
    const editSessionName = ((sessionId: Session["id"], newName: Session["name"]) => {
        setSessions((currSessions) => {
            return currSessions.map(session => {
                if(session.id !== sessionId) return session
                return {
                    ...session,
                    name: newName
                }
            })
        })
    })

    const deleteSession = (id: Session["id"]) => {
        setSessions((currSession) => {
            return  currSession.filter((session) => session.id !== id)
        })
    }

    const addMaterial = (sessionId: Session["id"], newMaterial: Material) => {
        setSessions((currSessions) => {
            return currSessions.map(session => {
                if(session.id !== sessionId) return session
                return {
                    ...session,
                    materials: [...session.materials, newMaterial]
                }
            })
        })
    }

    const deleteMaterial = (sessionId: Session["id"], materialId: Material["id"]) => {
        setSessions((currSessions) => {
            return currSessions.map(session => {
                if(session.id !== sessionId) return session
                return {
                    ...session,
                    materials: session.materials.filter((material) => material.id !== materialId)
                }
            })
        })
    }

    const value ={
        sessions,selectedSessionId, setSessions,  addSession, editSessionName, setSelectedSessionId, deleteSession, addMaterial, deleteMaterial
    }

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    ) 

}