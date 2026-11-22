import { useState, type FormEvent } from 'react'
import './App.css'

type Contact = {
  id: number
  name: string
  email: string
  phone: string
  favorite: boolean
}

type ContactFields = Pick<Contact, 'name' | 'email' | 'phone'>
type FieldErrors = Partial<Record<keyof ContactFields, string>>

const emptyFields: ContactFields = { name: '', email: '', phone: '' }

function validate(fields: ContactFields): FieldErrors {
  const errors: FieldErrors = {}
  const digits = fields.phone.replace(/\D/g, '')

  if (!fields.name.trim()) {
    errors.name = 'Enter a name.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }
  if (!/^[+()\d\s.-]+$/.test(fields.phone.trim()) || digits.length < 7 || digits.length > 15) {
    errors.phone = 'Enter a valid phone number (7–15 digits).'
  }

  return errors
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [fields, setFields] = useState<ContactFields>(emptyFields)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [editingId, setEditingId] = useState<number | null>(null)
  const [nextId, setNextId] = useState(1)

  function resetForm() {
    setFields(emptyFields)
    setErrors({})
    setEditingId(null)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationErrors = validate(fields)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    const contactFields = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      phone: fields.phone.trim(),
    }

    if (editingId !== null) {
      const previousContact = contacts.find((contact) => contact.id === editingId)
      const updatedContact = previousContact
        ? { ...previousContact, ...contactFields }
        : { id: editingId, ...contactFields, favorite: false }
      console.log(
        'Contact updated:',
        JSON.stringify({ before: previousContact, after: updatedContact }),
      )
      setContacts((current) =>
        current.map((contact) =>
          contact.id === editingId ? { ...contact, ...contactFields } : contact,
        ),
      )
    } else {
      const newContact = { id: nextId, ...contactFields, favorite: false }
      console.log('Contact added:', newContact)
      setContacts((current) => [...current, newContact])
      setNextId((id) => id + 1)
    }

    resetForm()
  }

  function startEditing(contact: Contact) {
    console.log('Edit contact:', contact)
    setEditingId(contact.id)
    setFields({ name: contact.name, email: contact.email, phone: contact.phone })
    setErrors({})
  }

  function deleteContact(id: number) {
    const contact = contacts.find((item) => item.id === id)
    if (contact) console.log('Contact deleted:', contact)
    setContacts((current) => current.filter((contact) => contact.id !== id))
    if (editingId === id) resetForm()
  }

  function toggleFavorite(id: number) {
    const contact = contacts.find((item) => item.id === id)
    if (!contact) return

    const updatedContact = { ...contact, favorite: !contact.favorite }
    console.log('Contact favorite toggled:', updatedContact)
    setContacts((current) =>
      current.map((item) => (item.id === id ? updatedContact : item)),
    )
  }

  function updateField(field: keyof ContactFields, value: string) {
    setFields((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  return (
    <main className="app">
      <h1>Contact Management App</h1>

      <section aria-labelledby="form-title">
        <h2 id="form-title">{editingId === null ? 'Add New Contact' : 'Edit Contact'}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-fields">
            <label>
              Name:{' '}
              <input
                autoComplete="name"
                value={fields.name}
                onChange={(event) => updateField('name', event.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <span className="field-error" id="name-error">{errors.name}</span>}
            </label>
            <br />
            <label>
              Email:{' '}
              <input
                type="email"
                autoComplete="email"
                value={fields.email}
                onChange={(event) => updateField('email', event.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && <span className="field-error" id="email-error">{errors.email}</span>}
            </label>
            <br />
            <label>
              Phone:{' '}
              <input
                type="tel"
                autoComplete="tel"
                value={fields.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}
            </label>
            <br />
          </div>
          <div className="form-actions">
            <button type="submit">{editingId === null ? 'Add' : 'Update'}</button>
            {editingId !== null && (
              <button className="secondary-button" type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="contacts-section" aria-labelledby="contacts-title">
        <h2 id="contacts-title">Contacts</h2>
        {contacts.length === 0 ? (
          <p>No contacts available.</p>
        ) : (
          <ul className="contact-list">
            {contacts.map((contact) => (
              <li className="contact-row" key={contact.id}>
                <div className="contact-details">
                  <strong>{contact.name}</strong>
                  <br />
                  Email: {contact.email}
                  <br />
                  Phone: {contact.phone}
                </div>
                <div className="contact-actions">
                  <button
                    type="button"
                    aria-pressed={contact.favorite}
                    onClick={() => toggleFavorite(contact.id)}
                  >
                    {contact.favorite ? 'Unfavorite' : 'Favorite'}
                  </button>{' '}
                  <button type="button" onClick={() => startEditing(contact)}>
                    Edit
                  </button>{' '}
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => deleteContact(contact.id)}
                    aria-label={`Delete ${contact.name}`}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
