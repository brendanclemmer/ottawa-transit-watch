import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function AdminPage() {
  const [pendingReports, setPendingReports] = useState([])
  const [activeReports, setActiveReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadReports() {
      const pendingResponse = await fetch('/api/admin/reports')
      const pendingData = await pendingResponse.json()

      const activeResponse = await fetch('/api/admin/active-reports')
      const activeData = await activeResponse.json()

      setPendingReports(pendingData)
      setActiveReports(activeData)
      setLoading(false)
    }

    loadReports()
  }, [])

  async function updateModerationStatus(id, newStatus) {
    const response = await fetch(`/api/admin/reports/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        moderationStatus: newStatus,
      }),
    })

    if (!response.ok) {
      console.error('Failed to update moderation status')
      return
    }

    const report = pendingReports.find((item) => item.id === id)

    setPendingReports((currentReports) =>
      currentReports.filter((item) => item.id !== id)
    )

    if (newStatus === 'approved' && report) {
      setActiveReports((currentReports) => [
        report,
        ...currentReports,
      ])
    }
  }

  async function updateReportStatus(id, newStatus) {
    const response = await fetch(`/api/admin/reports/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    })

    if (!response.ok) {
      console.error('Failed to update report status')
      return
    }

    setActiveReports((currentReports) =>
      currentReports.filter((report) => report.id !== id)
    )
  }

  if (loading) {
    return (
      <main className="app-shell">
        <p>Loading reports...</p>
      </main>
    )
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">Admin moderation</p>

        <h1>Report Management</h1>

        <p className="intro">
          Review new reports and manage incidents currently shown
          in the public live feed.
        </p>
      </section>

      <section>
        <h2>Pending Reports</h2>

        {pendingReports.length === 0 ? (
          <p>No pending reports.</p>
        ) : (
          <div className="live-feed">
            {pendingReports.map((report) => (
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

                <div className="admin-actions">
                  <button
                    className="admin-button approve"
                    onClick={() =>
                      updateModerationStatus(report.id, 'approved')
                    }
                  >
                    Approve
                  </button>

                  <button
                    className="admin-button reject"
                    onClick={() =>
                      updateModerationStatus(report.id, 'rejected')
                    }
                  >
                    Reject
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="admin-section">
        <h2>Active Approved Reports</h2>

        {activeReports.length === 0 ? (
          <p>No active approved reports.</p>
        ) : (
          <div className="live-feed">
            {activeReports.map((report) => (
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

                <div className="admin-actions">
                  <button
                    className="admin-button resolve"
                    onClick={() =>
                      updateReportStatus(report.id, 'resolved')
                    }
                  >
                    Resolve
                  </button>

                  <button
                    className="admin-button reject"
                    onClick={() =>
                      updateReportStatus(report.id, 'hidden')
                    }
                  >
                    Hide
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Link className="back-link live-back-link" to="/">
        Back to Home
      </Link>
    </main>
  )
}

export default AdminPage