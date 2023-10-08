import styled from "styled-components"
import DragIcon from "../../Icon/Drag"
import VideoIcon from "../../Icon/Video"
import TimeIcon from "../../Icon/Time"
import DownloadIcon from "../../Icon/Download"
import ExpandIcon from "../../Icon/Expand"
import { Material } from "@/app/context/SessionContext"
import LocationIcon from "../../Icon/Location"

type MaterialItemProps = {
    material: Material
}

export default function MaterialItem({material}: MaterialItemProps) {
    const StyledIconContainer = styled.div`
        padding: 8px;
        border-radius: 8px;
        background-color: #F6F8FC;
        width: 48px;
        height: 48px;
    `

    const StyledDividerDot = styled.div`
        width: 7px;
        height: 7px;
        background-color: #BCC0D0;
        border-radius: 50%;
        margin: 0 5px;
    `

    const StyledDivider = styled.div`
    width: 1px;
    height: 20px;
    background-color: #DFE5EE;
    `
 
    return (
       <div className="flex items-center">
            <div className="flex gap-4 items-center">
                <DragIcon />
                <StyledIconContainer>
                 {material.type === 'video' ? <VideoIcon /> : <LocationIcon/>}   
                </StyledIconContainer>
                <div className="flex gap-2 items-center">
                    <span className="font-medium">{material.name}</span>
                    {material.required && <>
                        <StyledDivider />
                        <span className="font-medium text-primary">Required</span>
                    </>}
                    {material.previewable && <>
                        <StyledDividerDot />
                        <span className="text-tertiary font-medium">Previewable</span>
                    </>}
                </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <TimeIcon /> 
                    <span className="font-medium">
                        {material.time}
                    </span>
                </div>
                <StyledDividerDot />
                <div className="flex items-center gap-2">
                    <TimeIcon /> 
                    <span className="font-medium">
                        {material.duration}                
                    </span>
                </div>
                <StyledDividerDot />
                {material.downloadable && <>
                    <div className="flex items-center gap-2">
                        <DownloadIcon /> 
                        <span className="font-medium">
                            Downloadable                
                        </span>
                    </div>
                    </>}
                
                <div className="ml-5">
                    <ExpandIcon />
                </div>
            </div>
       </div>
    )
  }
  