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
    downloadable: boolean
}

export type Session = {
    id: string
    name: string,
    materials: Material[] | []
}

type SessionContextType = {
    sessions: Session[] | [],
    addSession: (_session: Session) => void,
    editSession: (sessionId : Session["id"], _newName: Session["name"]) => void,
    setSessions: Dispatch<SetStateAction<Session[]>>,
    deleteSession: (sessionId : Session["id"]) => void,
    addMaterial: (sessionId : Session["id"], _material: Material) => void,
    deleteMaterial: (sessionId : Session["id"], _material: Material['id']) => void
}
function noop(..._args: any[]): any {}

const INITIAL_DATA = {
    sessions: [],
    addSession: noop,
    editSession: noop,
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
                time: '24 Oktober 2021, 16:30',
                duration: '06.30 min',
                downloadable: true
            }]
        },
        {
            id: 'b',
            name: 'Session 2',
            materials: [{
                id: '1',
                name: 'Judul Video',
                type: 'on_site',
                required: true,
                previewable: false,
                time: '24 Oktober 2021, 16:30',
                duration: '06.30 min',
                downloadable: false
            },
            {
                id: '2',
                name: 'Judul Video 2',
                type: 'on_site',
                required: true,
                previewable: false,
                time: '24 Oktober 2021, 16:30',
                duration: '06.30 min',
                downloadable: false
            }]
        }
    ])

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
        sessions, setSessions,  addSession, editSessionName, deleteSession, addMaterial, deleteMaterial
    }

    return (
        <SessionContext.Provider value={value}>
            {children}
        </SessionContext.Provider>
    ) 

}