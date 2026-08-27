export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/health') {
      return Response.json({
        status: 'ok',
        service: 'ottawa-transit-watch-api',
      })
    }

    if (url.pathname === '/api/reports' && request.method === 'GET') {
      const { results } = await env.DB
        .prepare('SELECT * FROM reports ORDER BY created_at DESC')
        .all()

      return Response.json(results)
    }

    if (url.pathname === '/api/reports' && request.method === 'POST') {
      const report = await request.json()

      const result = await env.DB
        .prepare(`
          INSERT INTO reports (
            issue_type,
            route,
            direction,
            location,
            description
          )
          VALUES (?, ?, ?, ?, ?)
        `)
        .bind(
          report.issueType,
          report.route,
          report.direction || null,
          report.location || null,
          report.description
        )
        .run()

      return Response.json(
        {
          success: true,
          id: result.meta.last_row_id,
        },
        {
          status: 201,
        }
      )
    }

    return new Response('Not found', {
      status: 404,
    })
  },
}