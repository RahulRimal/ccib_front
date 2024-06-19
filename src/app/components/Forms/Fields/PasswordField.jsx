import React from 'react'
import InputField from './InputField'
import { FaEye, FaEyeSlash, FaLocationArrow } from 'react-icons/fa6'

const PasswordField = ({ label, name, placeholder }) => {
  const [obscured, setObscured] = React.useState(true)
  return (
    <InputField label={label} name={name} type={obscured ? "password" : "text"} placeholder={placeholder} suffix={obscured ? <FaEyeSlash /> : <FaEye />} onSuffixClick={() => setObscured(!obscured)} />
  )
}

export default PasswordField