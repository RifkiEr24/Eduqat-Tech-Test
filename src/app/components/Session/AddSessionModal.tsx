import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

import Button from "../Button/Button";
import { useSession } from "@/app/context/SessionContext";
import { useState } from "react";
import {Select, SelectItem} from "@nextui-org/react";
import { randomUUID } from "crypto";

export default function AddSessionModal({ ...props }) {

   const  { addSession } = useSession()

   const [name, setname] = useState('')


   const [typeSelections, setTypeSelections] = useState([
    { label: 'On Site', value: 'on_site' },
    { label: 'Video', value: 'video' }
  ])


   const handleClick = () => {
    const newSession = {
        id: randomUUID().toString().slice(0, 8) + '-session',
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
                <Input value={name}   onValueChange={setname} type="text" label="Session Name" />
                  <Select 
                    label="Select an animal" 
                    className="max-w-xs" 
                  >
                    {typeSelections.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select>
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