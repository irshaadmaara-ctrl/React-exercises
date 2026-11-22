import { useState, type FormEvent } from 'react'
import './App.css'

type FormData = {
  username: string
  email: string
  password: string
  subscribed: boolean
  role: string
}

const initialFormData: FormData = {
  username: '',
  email: '',
  password: '',
  subscribed: false,
  role: '',
}

function App() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const submittedForm = { ...formData }
    console.log('Submitted form data:', submittedForm)
    setSubmittedData(submittedForm)
  }

  function handleReset() {
    setFormData(initialFormData)
    setSubmittedData(null)
  }

  return (
    <main className="page">
      <section className="form-card" aria-labelledby="form-title">
        <h1 id="form-title">Create your account</h1>
        <p className="form-description">
          Enter your details below to complete the form.
        </p>

        <form className="account-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              autoComplete="username"
              id="username"
              name="username"
              type="text"
              placeholder="Your username"
              value={formData.username}
              onChange={(event) =>
                setFormData({ ...formData, username: event.target.value })
              }
              required
            />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              autoComplete="email"
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              autoComplete="new-password"
              id="password"
              name="password"
              type="password"
              placeholder="At least 8 characters"
              minLength={8}
              value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
              required
            />
          </div>

          <div className="field">
            <label htmlFor="role">Account type</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={(event) =>
                setFormData({ ...formData, role: event.target.value })
              }
              required
            >
              <option value="" disabled>
                Select an account type
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="developer">Developer</option>
            </select>
          </div>

          <label className="checkbox-field" htmlFor="subscribed">
            <input
              id="subscribed"
              name="subscribed"
              type="checkbox"
              checked={formData.subscribed}
              onChange={(event) =>
                setFormData({ ...formData, subscribed: event.target.checked })
              }
            />
            <span>Send me product updates</span>
          </label>

          <div className="form-actions">
            <button className="submit-button" type="submit">
              Submit
            </button>
            <button className="reset-button" type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>

        {submittedData && (
          <section className="submission" aria-labelledby="submission-title">
            <h2 id="submission-title">Submitted data</h2>
            <dl>
              <div>
                <dt>Username</dt>
                <dd>{submittedData.username}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{submittedData.email}</dd>
              </div>
              <div>
                <dt>Password</dt>
                <dd>{'•'.repeat(submittedData.password.length)}</dd>
              </div>
              <div>
                <dt>Account type</dt>
                <dd>{submittedData.role}</dd>
              </div>
              <div>
                <dt>Product updates</dt>
                <dd>{submittedData.subscribed ? 'Yes' : 'No'}</dd>
              </div>
            </dl>
          </section>
        )}
      </section>
    </main>
  )
}

export default App
