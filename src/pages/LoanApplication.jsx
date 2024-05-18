import React from 'react'
import styled, { useTheme } from 'styled-components'
import Button from '../components/Button';

const Wrapper = styled.main`
padding: ${({ theme }) => theme.spacing.s16};
background-color: white;

`;

const LoanApplication = () => {
    const theme = useTheme();
    const [isPersonal, setIsPersonal] = React.useState(true);
    return (
        <Wrapper>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <Button style={{width: '100%', backgroundColor: !isPersonal && theme.palette.disabled.button, color: !isPersonal && theme.palette.text.primary, transition: "background-color 0.3s ease" }} text="Personal Loan" onClick={() => setIsPersonal(true) } />
            <Button style={{width: '100%', backgroundColor: isPersonal && theme.palette.disabled.button, color: isPersonal && theme.palette.text.primary, transition: "background-color 0.3s ease" }} text="Company Loan" onClick={() => setIsPersonal(false) } />
            </div>
        </Wrapper>
    )
}

export default LoanApplication


