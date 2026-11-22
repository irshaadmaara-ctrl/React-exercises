import { useState, type ChangeEvent, type FormEvent } from 'react'

function useTextInput() {
  const [value, setValue] = useState('')

  function onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValue(event.target.value)
  }

  return { value, onChange }
}

function App() {
  const name = useTextInput()
  const phone = useTextInput()
  const email = useTextInput()
  const message = useTextInput()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      message: message.value,
    }
    const errors: string[] = []
    const phoneDigits = phone.value.replace(/\D/g, '')

    if (!name.value.trim()) errors.push('Name is required')
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      errors.push('Phone must contain 7 to 15 digits')
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      errors.push('Enter a valid email address')
    }
    if (!message.value.trim()) errors.push('Message is required')

    console.log('Form Data:', formData)
    if (errors.length === 0) {
      console.log('Form Status: valid')
    } else {
      console.error('Form Status: invalid', errors)
    }
  }

  return (
    <main>
      <h2>Custom Hook</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" value={name.value} onChange={name.onChange} />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input id="phone" type="tel" value={phone.value} onChange={phone.onChange} />
        <br />
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" value={email.value} onChange={email.onChange} />
        <br />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          rows={3}
          value={message.value}
          onChange={message.onChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default App
