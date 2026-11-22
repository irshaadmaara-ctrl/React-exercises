import { useState, type FormEvent } from 'react'
import './App.css'

const subjects = ['Mathematics', 'Science', 'English']

type Registration = {
  studentName: string
  email: string
  grade: string
  subjects: string[]
}

type FormErrors = {
  studentName?: string
  email?: string
  subjects?: string
}

function App() {
  const [registration, setRegistration] = useState<Registration>({
    studentName: '',
    email: '',
    grade: 'Grade 9',
    subjects: [],
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const nameLength = registration.studentName.trim().length
  const studentNameError =
    registration.studentName.length > 0 && (nameLength < 10 || nameLength >= 30)
      ? 'Name must contain 10 to 29 characters'
      : errors.studentName

  function updateField(field: 'studentName' | 'email' | 'grade', value: string) {
    setRegistration((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSubmitted(false)
  }

  function toggleSubject(subject: string) {
    setRegistration((current) => ({
      ...current,
      subjects: current.subjects.includes(subject)
        ? current.subjects.filter((item) => item !== subject)
        : [...current.subjects, subject],
    }))
    setErrors((current) => ({ ...current, subjects: undefined }))
    setSubmitted(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: FormErrors = {}
    if (nameLength < 10 || nameLength >= 30) {
      nextErrors.studentName = 'Name must contain 10 to 29 characters'
    }
    if (!registration.email.trim()) {
      nextErrors.email = 'Enter an email address'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registration.email)) {
      nextErrors.email = 'Enter a valid email address'
    }
    if (registration.subjects.length === 0) {
      nextErrors.subjects = 'Select at least one subject'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    console.log('Student Registration:', registration)
    setSubmitted(true)
  }

  return (
    <main className="registration-page">
      <section className="registration-card" aria-labelledby="registration-title">
        <h1 id="registration-title">Student Registration</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="student-name">Student Name</label>
            <input
              id="student-name"
              type="text"
              value={registration.studentName}
              aria-invalid={Boolean(studentNameError)}
              aria-describedby={studentNameError ? 'student-name-error' : undefined}
              onChange={(event) => updateField('studentName', event.target.value)}
            />
            {studentNameError && (
              <p className="field-error" id="student-name-error">{studentNameError}</p>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="student-email">Email</label>
            <input
              id="student-email"
              type="email"
              value={registration.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'student-email-error' : undefined}
              onChange={(event) => updateField('email', event.target.value)}
            />
            {errors.email && (
              <p className="field-error" id="student-email-error">{errors.email}</p>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="grade-level">Grade Level</label>
            <select
              id="grade-level"
              value={registration.grade}
              onChange={(event) => updateField('grade', event.target.value)}
            >
              <option>Grade 9</option>
              <option>Grade 10</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>
          </div>

          <fieldset className="subjects-field">
            <legend>Subjects Interest</legend>
            <div className="subject-options">
              {subjects.map((subject) => (
                <label className="subject-option" key={subject}>
                  <input
                    type="checkbox"
                    checked={registration.subjects.includes(subject)}
                    onChange={() => toggleSubject(subject)}
                  />
                  {subject}
                </label>
              ))}
            </div>
            {errors.subjects && (
              <p className="field-error" role="alert">{errors.subjects}</p>
            )}
          </fieldset>

          <button className="register-button" type="submit">Register</button>
          {submitted && (
            <p className="success-message" role="status">
              Registration submitted successfully.
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default App
