export async function POST(req) {
  const { name, title, portrait, result_data } = await req.json();

  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": process.env.SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      "Prefer": "return=minimal",
    },
    body: JSON.stringify({ name, title, portrait, result_data }),
  });

  if (!res.ok) {
    const err = await res.text();
    return Response.json({ error: err }, { status: 500 });
  }

  return Response.json({ success: true });
}
