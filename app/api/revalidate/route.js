// app/api/revalidate/route.js
// On-demand ISR revalidation
// POST /api/revalidate?secret=xxx&path=/
// Call this from the CMS admin after content changes for instant updates

import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path') || '/';

  // Verify secret
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, path, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { error: 'Revalidation failed', details: err.message },
      { status: 500 }
    );
  }
}
