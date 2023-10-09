import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";
import Button from "../Button/Button";
import { useSession } from "@/app/context/SessionContext";
import { useState } from "react";
import CustomInput from "../Input/Input";
import { v4 as uuidv4 } from "uuid";

type SessionModalProps = {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  placement:
    | "center"
    | "auto"
    | "top"
    | "top-center"
    | "bottom"
    | "bottom-center"
    | undefined;
};


export default function AddSessionModal({
  isOpen,
  onOpen,
  onClose,
  onOpenChange,
  placement,
}: SessionModalProps) {

   const  { addSession } = useSession()

   const [name, setName] = useState('')

   const [error, setError] = useState(false)



   const handleClick = () => {
      if (name) {
        const newSession = {
            id: uuidv4(),
            name: name,
            materials: []
        }
        
        addSession(newSession)
        setError(false)
        onClose()
        setName('')
      } else {
        setError(true)
      }

  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        placement={placement}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Session</ModalHeader>
              <ModalBody>
                <CustomInput
                type="text"
                value={name}     label="Session Name"
                    key="Add Session"
                    onChange={(e) => setName(e.target.value)}
                 
                    className="w-full"
                  />
                  {error && <>
                  <span className="text-red-500 text-sm">Fill All Input!</span>
                  </>}
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