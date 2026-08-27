import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function LiveReportsPage() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadReports() {
      const response = await fetch('/api/reports')
      const data = await response.json()

      setReports(data)
      setLoading(false)
    }

    loadReports()
  }, [])

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
          Recent approved transit incidents reported around Ottawa.
        </p>
      </section>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No active reports right now.</p>
      ) : (
        <section className="live-feed" aria-label="Live transit reports">
          {reports.map((report) => (
            <article className="report-card" key={report.id}>
              <div className="report-card-header">
                <span className="report-location">
                  {report.route}
                </span>

                <span className="report-time">
                  {report.created_at}
                </span>
              </div>

              <p className="report-type">
                {report.issue_type}
              </p>

              <p className="report-description">
                {report.description}
              </p>

              {report.location && (
                <p className="report-type">
                  {report.location}
                </p>
              )}

              <div className="report-meta">
                <span>
                  {report.confirmations} confirmations
                </span>

                <span
                  className={`verification-badge ${report.verification_level}`}
                >
                  {getVerificationLabel(report.verification_level)}
                </span>
              </div>
            </article>
          ))}
        </section>
      )}

      <Link className="back-link live-back-link" to="/">
        Back to Home
      </Link>
    </main>
  )
}

export default LiveReportsPage