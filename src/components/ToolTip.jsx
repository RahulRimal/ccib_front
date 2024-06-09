import React, { useRef } from 'react';
import styled from 'styled-components';


const Wrapper = styled.p`
width: fit-content;
padding: ${({ theme }) => theme.spacing.s4} ${({ theme }) => theme.spacing.s8};
cursor: pointer;
`;

const ToolTipWrapper = styled.div`
    position: absolute;
    background-color: ${({ theme }) => `${theme.palette.primary.main}E9`};
    color: ${({ theme }) => theme.palette.common.white};
    border-radius: ${({ theme }) => theme.borderRadius.container};
    padding: ${({ theme }) => theme.spacing.s8} ;
`;

const ToolTip = ({ tooltip, style, children }) => {
    const chipStyles = { ...style };

    const [tooltipPosition, setTooltipPosition] = React.useState({ top: 0, left: 0 });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const tooltipRef = useRef(null)

    React.useEffect(() => {
        if (anchorEl) {
            const { bottom, right, left } = anchorEl.getBoundingClientRect();
            const tooltipWidth = tooltipRef.current.offsetWidth;
            const windowWidth = window.innerWidth;
            const windowScrollX = window.scrollX;

            let adjustedLeft = left - 20;
            if (right + tooltipWidth > windowWidth + windowScrollX) {
                adjustedLeft = Math.max(0, right + windowScrollX - tooltipWidth + 40); // Added 16px as margin on right
            }

            // setTooltipPosition({ top: bottom, left: adjustedLeft });
            setTooltipPosition({ left: adjustedLeft });
        }
    }, [anchorEl]);


    return (
        <Wrapper
            id='test'
            style={chipStyles}
            onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
            onMouseLeave={() => setAnchorEl(null)}
        >
            {children}
            {tooltip && (
                <ToolTipWrapper
                    ref={tooltipRef}
                    style={{ ...tooltipPosition }}
                    className={anchorEl ? 'show' : 'hide'}
                >
                    {tooltip}
                </ToolTipWrapper>
            )}
        </Wrapper>
    );
};

export default ToolTip;