import { useState, type FormEvent } from 'react'
import './App.css'

const skillOptions = [
  'React',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Python',
  'Java',
  'UI Design',
  'API Development',
]

type ApplicationForm = {
  fullName: string
  email: string
  role: string
  experience: string
  skills: string[]
  agreedToTerms: boolean
  receiveNotifications: boolean
}

type FormErrors = Partial<Record<keyof ApplicationForm, string>>

const initialForm: ApplicationForm = {
  fullName: '',
  email: '',
  role: '',
  experience: '',
  skills: [],
  agreedToTerms: false,
  receiveNotifications: false,
}

function validateForm(form: ApplicationForm): FormErrors {
  const errors: FormErrors = {}
  const fullName = form.fullName.trim()

  if (!fullName) {
    errors.fullName = 'Full name is required'
  } else if (!/^[\p{L} ]{2,30}$/u.test(fullName)) {
    errors.fullName =
      'Please enter a valid name (2-30 characters, letters only)'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address'
  }
  if (!form.role) {
    errors.role = 'Please select a role'
  }
  if (
    form.experience === '' ||
    !Number.isInteger(Number(form.experience)) ||
    Number(form.experience) < 0
  ) {
    errors.experience = 'Experience is required'
  }
  if (form.skills.length === 0) {
    errors.skills = 'Please select at least one skill'
  }
  if (!form.agreedToTerms) {
    errors.agreedToTerms = 'You must agree to the terms'
  }

  return errors
}

function App() {
  const [form, setForm] = useState<ApplicationForm>(initialForm)
  const [touchedFields, setTouchedFields] = useState<
    Set<keyof ApplicationForm>
  >(() => new Set())
  const [showErrors, setShowErrors] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validationErrors = validateForm(form)

  function getVisibleError(field: keyof ApplicationForm) {
    return showErrors || touchedFields.has(field)
      ? validationErrors[field]
      : undefined
  }

  function updateField<K extends keyof ApplicationForm>(
    field: K,
    value: ApplicationForm[K],
  ) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }))
    setTouchedFields((currentFields) => new Set(currentFields).add(field))
    setSubmitted(false)
  }

  function toggleSkill(skill: string) {
    const skills = form.skills.includes(skill)
      ? form.skills.filter((selectedSkill) => selectedSkill !== skill)
      : [...form.skills, skill]

    updateField('skills', skills)
  }

  const fullNameError = getVisibleError('fullName')
  const emailError = getVisibleError('email')
  const roleError = getVisibleError('role')
  const experienceError = getVisibleError('experience')
  const skillsError = getVisibleError('skills')
  const termsError = getVisibleError('agreedToTerms')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setShowErrors(true)

    const formErrors = validateForm(form)
    if (Object.keys(formErrors).length > 0) {
      setSubmitted(false)
      return
    }

    const application = {
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      yearsOfExperience: Number(form.experience),
    }

    console.log('Developer application submitted:', application)
    setSubmitted(true)
  }

  return (
    <main className="page">
      <form className="application-card" onSubmit={handleSubmit} noValidate>
        <h1>Developer Application Form</h1>

        <div className="field-group">
          <label htmlFor="full-name">Full Name</label>
          <input
            id="full-name"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            aria-invalid={Boolean(fullNameError)}
            aria-describedby={fullNameError ? 'full-name-error' : undefined}
          />
          {fullNameError && (
            <p className="field-error" id="full-name-error">
              {fullNameError}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          {emailError && (
            <p className="field-error" id="email-error">
              {emailError}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={(event) => updateField('role', event.target.value)}
            aria-invalid={Boolean(roleError)}
            aria-describedby={roleError ? 'role-error' : undefined}
          >
            <option value="">Select a role</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Full-Stack Developer">Full-Stack Developer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
          </select>
          {roleError && (
            <p className="field-error" id="role-error">
              {roleError}
            </p>
          )}
        </div>

        <div className="field-group">
          <label htmlFor="experience">Years of Experience</label>
          <input
            id="experience"
            name="experience"
            type="number"
            min="0"
            step="1"
            value={form.experience}
            onChange={(event) => updateField('experience', event.target.value)}
            aria-invalid={Boolean(experienceError)}
            aria-describedby={
              experienceError ? 'experience-error' : undefined
            }
          />
          {experienceError && (
            <p className="field-error" id="experience-error">
              {experienceError}
            </p>
          )}
        </div>

        <fieldset
          className="skills-group"
          aria-describedby={skillsError ? 'skills-error' : undefined}
        >
          <legend>Skills</legend>
          <div className="skills-grid">
            {skillOptions.map((skill) => (
              <label className="checkbox-option" key={skill}>
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={form.skills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
          {skillsError && (
            <p className="field-error" id="skills-error">
              {skillsError}
            </p>
          )}
        </fieldset>

        <div className="consent-group">
          <label className="checkbox-option">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={form.agreedToTerms}
              aria-describedby={
                termsError ? 'terms-error' : undefined
              }
              onChange={(event) =>
                updateField('agreedToTerms', event.target.checked)
              }
            />
            <span>I agree to the terms and conditions</span>
          </label>
          {termsError && (
            <p className="field-error" id="terms-error">
              {termsError}
            </p>
          )}
        </div>

        <label className="checkbox-option notifications-option">
          <input
            type="checkbox"
            name="receiveNotifications"
            checked={form.receiveNotifications}
            onChange={(event) =>
              updateField('receiveNotifications', event.target.checked)
            }
          />
          <span>Receive notifications about new opportunities</span>
        </label>

        <button className="submit-button" type="submit">
          Submit Application
        </button>
        {submitted && (
          <p className="success-message" role="status">
            Application submitted successfully!
          </p>
        )}
      </form>
    </main>
  )
}

export default App
