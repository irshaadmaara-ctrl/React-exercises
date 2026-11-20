import { useReducer, useState, type FormEvent } from 'react'
import './App.css'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

type FormState = {
  step: 1 | 2 | 3
  data: FormData
}

type FormAction =
  | { type: 'UPDATE_FIELD'; field: keyof FormData; value: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET_FORM' }

const initialState: FormState = {
  step: 1,
  data: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
      }
    case 'NEXT_STEP':
      if (state.step === 1) {
        return { ...state, step: 2 }
      }
      if (state.step === 2) {
        return { ...state, step: 3 }
      }
      return state
    case 'PREV_STEP':
      if (state.step === 3) {
        return { ...state, step: 2 }
      }
      if (state.step === 2) {
        return { ...state, step: 1 }
      }
      return state
    case 'RESET_FORM':
      return initialState
  }
}

function MultiStepForm() {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const [submitted, setSubmitted] = useState(false)

  function handleNext(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(false)
    dispatch({ type: 'NEXT_STEP' })
  }

  function handleConfirm() {
    dispatch({ type: 'RESET_FORM' })
    setSubmitted(true)
  }

  function handleCancel() {
    dispatch({ type: 'RESET_FORM' })
    setSubmitted(false)
  }

  return (
    <main>
      <h1>Multi-Step Registration</h1>

      {submitted ? (
        <>
          <p role="status">Registration complete!</p>
          <button type="button" onClick={() => setSubmitted(false)}>
            Start another registration
          </button>
        </>
      ) : (
        <>
          {state.step === 1 && (
            <form onSubmit={handleNext}>
              <h2>Step 1: Profile</h2>
              <label htmlFor="first-name">First Name:</label>
              <input
                autoFocus
                id="first-name"
                name="firstName"
                value={state.data.firstName}
                onChange={(event) =>
                  dispatch({
                    type: 'UPDATE_FIELD',
                    field: 'firstName',
                    value: event.target.value,
                  })
                }
                required
              />
              <br />
              <label htmlFor="last-name">Last Name:</label>
              <input
                id="last-name"
                name="lastName"
                value={state.data.lastName}
                onChange={(event) =>
                  dispatch({
                    type: 'UPDATE_FIELD',
                    field: 'lastName',
                    value: event.target.value,
                  })
                }
                required
              />
              <br />
              <button type="submit">Next</button>{' '}
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          )}

          {state.step === 2 && (
            <form onSubmit={handleNext}>
              <h2>Step 2: Contact</h2>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                value={state.data.email}
                onChange={(event) =>
                  dispatch({
                    type: 'UPDATE_FIELD',
                    field: 'email',
                    value: event.target.value,
                  })
                }
                required
              />
              <br />
              <label htmlFor="phone">Phone:</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={state.data.phone}
                onChange={(event) =>
                  dispatch({
                    type: 'UPDATE_FIELD',
                    field: 'phone',
                    value: event.target.value,
                  })
                }
                required
              />
              <br />
              <button type="button" onClick={() => dispatch({ type: 'PREV_STEP' })}>
                Back
              </button>{' '}
              <button type="submit">Next</button>{' '}
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          )}

          {state.step === 3 && (
            <section aria-labelledby="review-heading">
              <h2 id="review-heading">Step 3: Review</h2>
              <p>
                <strong>First Name:</strong> {state.data.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {state.data.lastName}
              </p>
              <p>
                <strong>Email:</strong> {state.data.email}
              </p>
              <p>
                <strong>Phone:</strong> {state.data.phone}
              </p>
              <button type="button" onClick={() => dispatch({ type: 'PREV_STEP' })}>
                Back
              </button>{' '}
              <button type="button" onClick={handleConfirm}>
                Confirm
              </button>{' '}
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </section>
          )}
        </>
      )}
    </main>
  )
}

function App() {
  return <MultiStepForm />
}

export default App
