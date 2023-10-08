import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

import Button from "../Button/Button";
import { useSession } from "@/app/context/SessionContext";
import { useState } from "react";

export default function AddSessionModal({ ...props }) {

   const  { addSession } = useSession()
   const [name, setname] = useState('')

   const handleClick = () => {
    const newSession = {
        id: 'mmk',
        name: name,
        materials: []
    }
    
    addSession(newSession)
   }
  return (
    <>
      <Modal {...props}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Session</ModalHeader>
              <ModalBody>
                <Input value={name} onChange={(e) => setname(e.target.value)} type="text" label="Session Name" />
              </ModalBody>
              <ModalFooter>
                <Button type='outline' className='' onClick={onClose}>
                  Close
                </Button>
                <Button type="fill" className=''  onClick={handleClick}>
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}