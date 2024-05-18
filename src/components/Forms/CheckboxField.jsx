import React from 'react'
import InputField from './InputField'
import { useTheme } from 'styled-components'
const CheckboxField = ({ required = false, onChecked }) => {
    const theme = useTheme();
    return (
        <InputField type="checkbox" required={required} style={{
            cursor: "pointer",
            height: theme.sizing.s16,
            width: theme.sizing.s16,
        }}
            onClick={(e) => {
                if (e.currentTarget.checked) onChecked()
            }}
        />
    )
}

export default CheckboxField