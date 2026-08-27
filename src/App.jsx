import { Link } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Independent Ottawa transit tool</p>

        <h1 id="page-title">Ottawa Transit Watch</h1>

        <p className="intro">
          Fast access to transit safety help, official incident reporting,
          and live community transit updates.
        </p>
      </section>

      <section className="actions" aria-label="Transit reporting options">
        <a
          className="action-card emergency"
          href="tel:6137412478"
        >
          <span className="action-title">
            Call Transit Special Constables
          </span>

          <span className="action-description">
            For immediate safety or security concerns
          </span>
        </a>

        <a
          className="action-card official"
          href="https://secure.coplogic.com/dors/en/filing/submitreport?dynparam=1787171989494"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="action-title">
            Report an Incident to OC Transpo
          </span>

          <span className="action-description">
            Official anonymous incident reporting
          </span>
        </a>

        <Link
          className="action-card community"
          to="/report"
        >
          <span className="action-title">
            Report a Live Transit Issue
          </span>

          <span className="action-description">
            Crowdsourced delays, cleaning, crowding, or other non-emergency issues
          </span>
        </Link>
      </section>

      <p className="disclaimer">
        Independent service. Not affiliated with OC Transpo or the City of Ottawa.
      </p>
    </main>
  )
}

export default App