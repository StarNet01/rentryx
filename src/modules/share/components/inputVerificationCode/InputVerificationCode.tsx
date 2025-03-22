import { Stack } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { CodeInput } from '../styled'

interface IInputVerificationCode {
  length: number
  onCompleted: (data: string) => void
}

const InputVerificationCode = ({
  length,
  onCompleted = () => {}
}: IInputVerificationCode) => {
  const [values, setValues] = useState(new Array(length).fill(''))
  const codeInputsRef = useRef(new Array(length))

  useEffect(() => {
    clearInputsVal()
    codeInputsRef.current[0].focus()
  }, [])

  useEffect(() => {
    const codeInput = codeInputsRef.current[0] as HTMLInputElement
    if (!codeInput) return
    codeInput.addEventListener('paste', onPaste)
    return () => codeInput.removeEventListener('paste', onPaste)
  }, [])

  useEffect(() => {
    const stringValue = values.join('')
    if (stringValue.length === length) return onCompleted(stringValue)
  }, [values, length])

  const onPaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const pastedString = e.clipboardData?.getData('text')
    if (!pastedString) return
    const isNumber = !Number.isNaN(+pastedString)
    if (isNumber) {
      setValues(pastedString.split('').slice(0, length))
      codeInputsRef.current[length - 1].focus()
    }
  }

  const clearInputsVal = () => {
    setValues(Array(length).fill(''))
  }

  const handleChange = (e: any) => {
    const index = parseInt(e.target.dataset.id)
    const vals = [...values]
    e.target.value = e.target.value.replace(/[^0-9۰-۹]/gi, '')
    if (e.target.value === '') return
    vals[index] = e.target.value
    const nextIndex = index + 1
    const next = codeInputsRef.current[nextIndex]
    setValues([...vals])
    if (next) {
      next.focus()
    }
  }

  const handleKeyDown = (e: any) => {
    e.target.value !== null && (e.target.value = null)
    const index = parseInt(e.target.dataset.id)
    const prevIndex = index - 1
    const nextIndex = index + 1
    const prev = codeInputsRef.current[prevIndex]
    const next = codeInputsRef.current[nextIndex]
    const vals = [...values]
    switch (e.code) {
      case 'Backspace':
        if (values[index]) {
          vals[index] = ''
          setValues([...vals])
        } else if (prev) {
          vals[prevIndex] = ''
          setValues([...vals])
          prev.focus()
        }
        break
      case 'ArrowLeft':
        if (prev) {
          prev.focus()
        }
        break
      case 'ArrowRight':
        if (next) {
          next.focus()
        }
        break
      default:
        break
    }
  }

  return (
    <Stack direction="row" spacing={1}>
      {values.map((value, index) => {
        return (
          <CodeInput
            required
            autoComplete="off"
            key={index}
            id={`code-${index}`}
            inputRef={el => (codeInputsRef.current[index] = el)}
            type="numeric"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={value}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 1,
              'data-id': index
            }}
          />
        )
      })}
    </Stack>
  )
}

export default InputVerificationCode
