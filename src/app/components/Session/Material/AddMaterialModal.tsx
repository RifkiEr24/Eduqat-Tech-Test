import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Switch} from "@nextui-org/react";

import { useSession } from "@/app/context/SessionContext";
import { useState } from "react";
import CustomInput from "../../Input/Input";
import Button from "../../Button/Button";
import {Select, SelectItem} from "@nextui-org/react";
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";

const StyledInputDateTime = styled.input`
  padding: 0.5rem;
  border-radius: 12px;
  outline: none;
`

export default function AddMaterialModal({ ...props }) {

   const  { addMaterial, selectedSessionId } = useSession()
   const [name, setName] = useState('')
   const [type, setType] = useState(new Set([]))
   const [required, setRequired] = useState(true)
   const [previewable, setPreviewable] = useState(true)
   const [time, setTime] = useState('')
   const [duration, setDuration] = useState('')
   const [durationType, setDurationType] = useState<Selection | null>(null)
   const [downloadable, setDownloadable] = useState(true)


   const [typeSelections, setTypeSelections] = useState([
    { label: 'On Site', value: 'on_site' },
    { label: 'Video', value: 'video' }
  ])

  const [durationSelections, setDurationSelections] = useState([
    { label: 'Hour', value: 'hour' },
    { label: 'Minutes', value: 'min' },
  ])

  
   const handleClickAdd = () => {
    const newSession = {
        id: uuidv4(),
        name: name,
        type: type.currentKey,
        required: required,
        previewable: previewable,
        time: time,
        duration : duration,
        durationType: durationType.currentKey,
        downloadable: downloadable
    }
    console.log(newSession)
    addMaterial(selectedSessionId, newSession)
   }
  return (
    <>
      <Modal {...props}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Material</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4 w-full">
                    <CustomInput key='Add Material' value={name} onChange={(e) => setName(e.target.value)} type="text" label="Material Name" className='w-full' />
                    <Select
                    label="Select Material Type" 
                    selectedKeys={type}
                    onSelectionChange={(keys) => setType(keys)}
                    classNames={{
                      label: 'text-tertiary',
                      trigger: "!bg-white border border-tertiary",
                      listboxWrapper: "!bg-white",
                    }}

                  >
                    {typeSelections.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}

                  </Select>
                  <Switch defaultSelected isSelected={required} onValueChange={setRequired}>
                    Required
                  </Switch>
                  <Switch defaultSelected isSelected={previewable} onValueChange={setPreviewable}>
                     Previewable
                  </Switch>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="time" className="text-tertiary">Time</label> 
                    <StyledInputDateTime value={time} onChange={(e) => setTime(e.target.value)} type="datetime-local" id="time" name="time" className="border border-tertiary text-sm" />

                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="duration" className="text-tertiary">Duration</label> 
                    <div className="grid grid-cols-2 gap-2">
                      <StyledInputDateTime value={duration} onChange={(e) => setDuration(e.target.value)} type="time" id="duration" name="duration" className="border border-tertiary text-sm " />
                      <Select 
                        label="Select Duration" 
                        size="sm"
                        selectedKeys={durationType}
                        onSelectionChange={setDurationType}
                        classNames={{
                          label: 'text-tertiary',
                          trigger: " !bg-white border border-tertiary",
                          listboxWrapper: "!bg-white",
                        }}
                      >
                        {durationSelections.map((duration) => (
                          <SelectItem key={duration.value} value={duration.value}>
                            {duration.label}
                          </SelectItem>
                        ))}

                      </Select>
                    </div>
                    <Switch defaultSelected className="mt-3" isSelected={downloadable} onValueChange={setDownloadable}>
                      Downloadable
                    </Switch>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type='outline' className='' onClick={onClose}>
                  Close
                </Button>
                <Button type="fill" className=''  onClick={handleClickAdd}>
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