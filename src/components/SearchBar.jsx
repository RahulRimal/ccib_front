import React from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai'; // Import search icon from react-icons library
import { AiOutlineClose } from 'react-icons/ai';


// Spacing system (px)
// 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128

//Sizing system (px)
// 10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.palette.border.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  padding: 8px;
`;

const SearchIcon = styled(AiOutlineSearch)`
  color: ${({ theme }) => theme.palette.icon};
  margin-right: 4px;
`;

const ClearIcon = styled(AiOutlineClose)`
  color: ${({ theme }) => theme.palette.icon};
  margin-left: 4px;
  cursor: pointer;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: none;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.text.secondary};

  &::placeholder {
    /* color: ${({ theme }) => theme.palette.text.primary}; */
    color: ${({ theme }) => theme.palette.text.secondary};
    font-weight: 400;
  }
`;




const SearchBar = ({ placeholder, value, setValue, style, inputStyle }) => {
    const searchBarStyle = { ...style };
    const inputStyles = { ...inputStyle };
    return (
        <Wrapper style={searchBarStyle}>
            <SearchIcon />
            <Input type="text" style={inputStyles} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
            {value && <ClearIcon onClick={() => setValue("")} />}
        </Wrapper>
    );
};
export default SearchBar;
