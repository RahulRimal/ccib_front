import React from 'react'
import styled, { useTheme } from 'styled-components'


const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s4};
  margin:${({ theme }) => theme.spacing.s8} 0;
  position: relative;

  label {
    position: absolute;
    left: ${({ theme }) => theme.spacing.s12};
    top: -${({ theme }) => theme.spacing.s8};
    padding: 0 ${({ theme }) => theme.spacing.s4};
    display: inline-block;
    background: ${({ theme }) => theme.palette.background.default};
    border-radius: ${({ theme }) => theme.borderRadius.input};
    font-size: ${({ theme }) => theme.typography.fontSize.f14};
    color: ${({ theme }) => theme.palette.primary.main};
    transition: opacity 0.3s ease;
    visibility: hidden;
    opacity: 0;

  }

  input {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.palette.border.primary};
    height: ${({ theme }) => theme.sizing.s44};
    padding: ${({ theme }) => theme.spacing.s8} ${({ theme }) => theme.spacing.s16};
    box-sizing: border-box;
    border-radius: ${({ theme }) => theme.borderRadius.input};
    overflow: hidden;
    font-size: ${({ theme }) => theme.typography.fontSize.f16};
    &:focus {
      outline-color: ${({ theme }) => theme.palette.border.focused};
      &::placeholder {
        visibility: hidden;
      }

    }
  }
  input:focus + label {
    visibility: visible;
    opacity: 1;
  }
`;

const Prefix = styled.div`
position: absolute;
left: ${({ theme }) => theme.spacing.s12};
`;

const Suffix = styled.div`
position: absolute;
right: ${({ theme }) => theme.spacing.s12};
`;


const InputField = ({ name, placeholder, type, label, required = true, editable = true, prefix, suffix, onClick, onPrefixClick, onSuffixClick, style }) => {
  const theme = useTheme();
  const textStyles = { ...style }

  return (
    <FormGroup >
      {prefix && <Prefix onClick={onPrefixClick}>{prefix}</Prefix>}
      <input
        style={{ ...(prefix && { paddingLeft: theme.spacing.s32 }), ...textStyles }}
        name={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
        required={required}
        readOnly={!editable && "readonly"}
        onClick={onClick}
      />
      {suffix && <Suffix onClick={onSuffixClick} style={{ cursor: `${onSuffixClick && 'pointer'}` }}>{suffix}</Suffix>}

      <label htmlFor={name} style={{ textTransform: 'capitalize' }}>{label}</label>
    </FormGroup>
  )
}

export default InputField