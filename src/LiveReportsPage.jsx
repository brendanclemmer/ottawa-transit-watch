import { Link } from 'react-router-dom'

function LiveReportsPage() {
  const reports = [
  {
    id: 1,
    location: 'Route 88',
    type: 'Service Disruption',
    description: 'Bus reported stationary near Hurdman for an extended period.',
    time: '4 min ago',
    confirmations: 1,
    verificationLevel: 'reported',
  },
  {
    id: 2,
    location: 'Rideau Station',
    type: 'Accessibility / Equipment',
    description: 'Elevator reported unavailable.',
    time: '11 min ago',
    confirmations: 4,
    verificationLevel: 'corroborated',
  },
  {
    id: 3,
    location: 'Line 1',
    type: 'Service Disruption',
    description: 'Train stopped longer than expected near uOttawa.',
    time: '16 min ago',
    confirmations: 3,
    verificationLevel: 'official',
  },
]

function getVerificationLabel(level) {
  if (level === 'corroborated') {
    return 'Community corroborated'
  }

  if (level === 'official') {
    return 'Official'
  }

  return 'Community reported'
}

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Community updates</p>

        <h1>Live Transit Reports</h1>

        <p className="intro">
          Recent rider-reported transit issues around Ottawa.
        </p>
      </section>

      <section className="live-feed" aria-label="Live transit reports">
        {reports.map((report) => (
          <article className="report-card" key={report.id}>
            <div className="report-card-header">
              <span className="report-location">
                {report.location}
              </span>

              <span className="report-time">
                {report.time}
              </span>
            </div>

            <p className="report-type">
              {report.type}
            </p>

            <p className="report-description">
              {report.description}
            </p>

            <div className="report-meta">
              <span>
                {report.confirmations} confirmations
              </span>

              <span className={`verification-badge ${report.verificationLevel}`}>
              {getVerificationLabel(report.verificationLevel)}
              </span>
            </div>
          </article>
        ))}
      </section>

      <Link className="back-link live-back-link" to="/">
        Back to Home
      </Link>
    </main>
  )
}

export default LiveReportsPage