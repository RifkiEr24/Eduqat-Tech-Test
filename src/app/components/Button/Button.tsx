import styled from "styled-components"
import { poppins } from "@/app/font"

export default function Button({  type, onClick, className, children }) {
    const StyledButton = styled.button`
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 10px 16px;
        color: ${type === 'outline' ? '#6F32D2' : 'white'};
        background-color:  ${type === 'outline' ? 'white' : '#6F32D2' };
        border: 1px solid #6F32D2;
        border-radius: 8px;
        height: 44px;
    `

    return (
        <StyledButton
        onClick={onClick}
        className={`${poppins.className}  ${className}`}
      >
        {children}
      </StyledButton>     
    )
  }
  