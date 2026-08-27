import { useState } from 'react'
import { Link } from 'react-router-dom'

function ReportPage() {
  const [issueType, setIssueType] = useState('')
  const [route, setRoute] = useState('')
  const [direction, setDirection] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event) {
  event.preventDefault()

  const newReport = {
    issueType,
    route,
    direction,
    location,
    description,
    verificationLevel: 'reported',
    moderationStatus: 'pending',
    confirmations: 0,
    createdAt: new Date().toISOString(),
  }

  console.log(newReport)

  setSubmitted(true)
}

  if (submitted) {
    return (
      <main className="app-shell">
        <section className="hero">
          <p className="eyebrow">Community reporting</p>
          <h1>Report submitted</h1>
          <p className="intro">
            Thanks. Your report has been submitted for review before it appears
in the public live feed.
          </p>
        </section>

        <Link className="action-card community" to="/">
          Back to Home
        </Link>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Community reporting</p>
        <h1>Report a Live Transit Issue</h1>
        <p className="intro">
          Share a non-emergency issue happening right now.
        </p>
      </section>

      <form className="report-form" onSubmit={handleSubmit}>
        <label>
          Issue type
          <select
            value={issueType}
            onChange={(event) => setIssueType(event.target.value)}
            required
          >
            <option value="">Select an issue</option>
            <option value="service">Service Disruption</option>
            <option value="accessibility">Accessibility / Equipment</option>
            <option value="cleaning">Cleaning / Damage</option>
            <option value="safety">Safety / Welfare</option>
            <option value="other">Other</option>
          </select>
        </label>

        {issueType === 'safety' && (
          <div className="warning-box">
            For immediate danger or an emergency, call 911 or Transit Special
            Constables.
          </div>
        )}

        <label>
          Route or Line
          <input
            type="text"
            value={route}
            onChange={(event) => setRoute(event.target.value)}
            placeholder="e.g. 88 or Line 1"
            required
          />
        </label>

        <label>
          Direction
          <input
            type="text"
            value={direction}
            onChange={(event) => setDirection(event.target.value)}
            placeholder="e.g. Hurdman"
          />
        </label>

        <label>
          Vehicle number or station
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="e.g. Bus 6621 or Rideau Station"
          />
        </label>

        <label>
          What is happening?
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Keep it short and factual."
            rows="4"
            required
          />
        </label>

        <button className="action-card official" type="submit">
          Submit Community Report
        </button>

        <Link className="back-link" to="/">
          Cancel and go back
        </Link>
      </form>
    </main>
  )
}

export default ReportPage