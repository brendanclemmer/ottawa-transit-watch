import { useState } from 'react'
import { Link } from 'react-router-dom'

function AdminPage() {
  const [reports, setReports] = useState([
    {
      id: 1,
      issueType: 'Safety / Welfare',
      route: 'Line 1',
      location: 'Rideau Station',
      description: 'Person reportedly on the tracks.',
      createdAt: '2 min ago',
      moderationStatus: 'pending',
    },
    {
      id: 2,
      issueType: 'Accessibility / Equipment',
      route: 'Route 85',
      location: 'Bayshore Station',
      description: 'Elevator reported out of service.',
      createdAt: '8 min ago',
      moderationStatus: 'pending',
    },
  ])

  function updateStatus(id, newStatus) {
    setReports((currentReports) =>
      currentReports.map((report) =>
        report.id === id
          ? { ...report, moderationStatus: newStatus }
          : report
      )
    )
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Admin moderation</p>

        <h1>Pending Reports</h1>

        <p className="intro">
          Review community reports before they appear in the public live feed.
        </p>
      </section>

      <section className="live-feed" aria-label="Pending reports">
        {reports.map((report) => (
          <article className="report-card" key={report.id}>
            <div className="report-card-header">
              <span className="report-location">
                {report.route}
              </span>

              <span className="report-time">
                {report.createdAt}
              </span>
            </div>

            <p className="report-type">
              {report.issueType}
            </p>

            <p className="report-description">
              {report.description}
            </p>

            <p className="report-type">
              {report.location}
            </p>

            {report.moderationStatus === 'pending' ? (
              <div className="admin-actions">
                <button
                  className="admin-button approve"
                  onClick={() => updateStatus(report.id, 'approved')}
                >
                  Approve
                </button>

                <button
                  className="admin-button reject"
                  onClick={() => updateStatus(report.id, 'rejected')}
                >
                  Reject
                </button>
              </div>
            ) : (
              <p className="moderation-result">
                {report.moderationStatus === 'approved'
                  ? 'Approved'
                  : 'Rejected'}
              </p>
            )}
          </article>
        ))}
      </section>

      <Link className="back-link live-back-link" to="/">
        Back to Home
      </Link>
    </main>
  )
}

export default AdminPage