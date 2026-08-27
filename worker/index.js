export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === '/api/health') {
      return Response.json({
        status: 'ok',
        service: 'ottawa-transit-watch-api',
      })
    }

    return new Response('Not found', {
      status: 404,
    })
  },
}