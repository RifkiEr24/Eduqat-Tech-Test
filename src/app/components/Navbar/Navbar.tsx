import styled from 'styled-components';
import LeftArrowIcon from '../Icon/LeftArrow';
import { poppins } from '@/app/font';

const StyledNav = styled.nav`
    box-shadow: 0px 4px 34px 0px rgba(39, 26, 73, 0.05);
    padding: 34px 0;
`;

const StyledDivider = styled.div`
    background-color: #BCC0D0;
    width: 1px;
    height: 40px;
`;

export default function Navbar() {
  return (
    <StyledNav>
        <div className='container'>
                <div className='flex gap-6 items-center'>
                    <LeftArrowIcon />
                    <StyledDivider />
                    <h3 className={poppins.className + ' font-semibold'}>Event</h3>
                </div>
        </div>
     
    </StyledNav>
  )
}
