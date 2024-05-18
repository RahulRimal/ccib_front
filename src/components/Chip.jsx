import React from 'react'
import ToolTip from './ToolTip'
import { useTheme } from 'styled-components'

const Chip = ({text, tooltip}) => {
  const theme = useTheme();
  return (
    <ToolTip tooltip={tooltip} style={{ border: `2px solid ${theme.palette.primary.main}`, borderRadius: theme.borderRadius.chip }} >
      <p>{text}</p>
    </ToolTip>
  )
}

export default Chip