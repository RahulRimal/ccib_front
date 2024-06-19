import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

const MenuWrapper = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.palette.background.default};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.container};
  padding: 4px;
  z-index: 1;
`;

const MenuItemWrapper = styled.div`
  min-width: 100px;
  cursor: pointer;
  padding: 8px 16px;

:hover {
  background-color: ${({ theme }) => theme.palette.primary.dark};
}

`;



const Menu = ({ anchorEl, setAnchorEl, style, children }) => {
    const menuStyles = { ...style }
    const menuRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setAnchorEl(null);
            }
        };


        if (anchorEl) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [anchorEl, setAnchorEl]);

    useEffect(() => {
        if (anchorEl) {
            const { bottom, right, left } = anchorEl.getBoundingClientRect();
            const menuWidth = menuRef.current.offsetWidth;
            const windowWidth = window.innerWidth;
            const windowScrollX = window.scrollX;

            let adjustedLeft = left;
            if (right + menuWidth > windowWidth + windowScrollX) {
                adjustedLeft = Math.max(0, right + windowScrollX - menuWidth - 16); // Added 16px as margin on right
            }

            setMenuPosition({ top: bottom, left: adjustedLeft });
        }
    }, [anchorEl]);

    return (
        <>
            {anchorEl && (
                <MenuWrapper
                    ref={menuRef}
                    style={{ top: menuPosition.top, left: menuPosition.left, ...menuStyles }}
                >
                    {children}
                </MenuWrapper>
            )}
        </>
    );
};

export const MenuItem = ({ onClick, children }) => {
    return <MenuItemWrapper onClick={onClick}>{children}</MenuItemWrapper>;
};
export default Menu;
