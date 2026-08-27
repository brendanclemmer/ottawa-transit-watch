export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // Health check
    if (url.pathname === '/api/health') {
      return Response.json({
        status: 'ok',
        service: 'ottawa-transit-watch-api',
      })
    }

    // Public live reports
    if (url.pathname === '/api/reports' && request.method === 'GET') {
      const { results } = await env.DB
        .prepare(`
          SELECT *
          FROM reports
          WHERE moderation_status = 'approved'
          AND status = 'active'
          ORDER BY created_at DESC
        `)
        .all()

      return Response.json(results)
    }

    // Submit new community report
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
        { status: 201 }
      )
    }

    // Pending reports for moderation
    if (
      url.pathname === '/api/admin/reports' &&
      request.method === 'GET'
    ) {
      const { results } = await env.DB
        .prepare(`
          SELECT *
          FROM reports
          WHERE moderation_status = 'pending'
          ORDER BY created_at DESC
        `)
        .all()

      return Response.json(results)
    }

    // Approved reports that are currently live
    if (
      url.pathname === '/api/admin/active-reports' &&
      request.method === 'GET'
    ) {
      const { results } = await env.DB
        .prepare(`
          SELECT *
          FROM reports
          WHERE moderation_status = 'approved'
          AND status = 'active'
          ORDER BY created_at DESC
        `)
        .all()

      return Response.json(results)
    }

    // Update moderation or incident status
    if (
      url.pathname.startsWith('/api/admin/reports/') &&
      request.method === 'PATCH'
    ) {
      const id = url.pathname.split('/').pop()
      const body = await request.json()

      if (body.moderationStatus) {
        if (!['approved', 'rejected'].includes(body.moderationStatus)) {
          return Response.json(
            { error: 'Invalid moderation status' },
            { status: 400 }
          )
        }

        await env.DB
          .prepare(`
            UPDATE reports
            SET moderation_status = ?
            WHERE id = ?
          `)
          .bind(body.moderationStatus, id)
          .run()

        return Response.json({ success: true })
      }

      if (body.status) {
        if (!['active', 'resolved', 'hidden'].includes(body.status)) {
          return Response.json(
            { error: 'Invalid report status' },
            { status: 400 }
          )
        }

        await env.DB
          .prepare(`
            UPDATE reports
            SET status = ?
            WHERE id = ?
          `)
          .bind(body.status, id)
          .run()

        return Response.json({ success: true })
      }

      return Response.json(
        { error: 'No valid update supplied' },
        { status: 400 }
      )
    }

    return new Response('Not found', {
      status: 404,
    })
  },
}