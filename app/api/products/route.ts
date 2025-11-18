import { products } from '@/lib/data';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, Number(url.searchParams.get('page') ?? '1'));
    const limit = Math.max(1, Number(url.searchParams.get('limit') ?? '12'));

    const start = (page - 1) * limit;
    const end = start + limit;

    const slice = products.slice(start, end);

    return new Response(JSON.stringify({ data: slice, page, limit, total: products.length }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to load products' }), { status: 500 });
  }
}
