import React from 'react'

const InputFormField = ({formField}: {formField: FormFieldInterface}) => {
  return (
    <>
    {
      formField.type === 'text' && <input type="text" />
    }
    {
      formField.type === 'long-text' && <textarea />
    }
     {
      formField.type === 'attachment' && <p>atch</p>
    }
     {
      formField.type === 'avatar' && <p>avt</p>
    }
     {
      formField.type === 'boolean' && <p>bbb</p>
    }
     {
      formField.type === 'color-picker' && <p>cp</p>
    }
     {
      formField.type === 'currency' && <p>currency</p>
    }
     {
      formField.type === 'date' && <p>date</p>
    }
     {
      formField.type === 'date-picker' && <p>date-picker</p>
    }
     {
      formField.type === 'number' && <p>{formField.type}</p>
    }
     {
      formField.type === 'select' &&  <p>{formField.type}</p>
    }
     {
      formField.type === 'static-select' &&  <p>{formField.type}</p>
    }
     

    </>
  )
}

export default InputFormField