import { NextResponse } from 'next/server';
import { query } from '@/app/lib/db';
import { ModuleDetails } from '@/types';

export async function GET() {
  try {
    const result = await query('SELECT * FROM modules');
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to Retrieve Module' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { address, name, id } = await request.json();
    const result = await query(
      'UPDATE modules SET address = $1, name = $2 WHERE id = $3 RETURNING *',
       [address, name, id]
    );
    return NextResponse.json(result.rows);
  } catch (error)
  {
    console.log(error);
    return NextResponse.json({ error: 'Failed to Update Module' }, { status: 500 });
  }
}

// export async function POST(request: Request) {
//   try {
//     const { address } = await request.json();
//     const result = await query(
//       'INSERT INTO modules (address) VALUES ($1) RETURNING *',
//       [address]
//     );
//     return NextResponse.json(result.rows[0], { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to Add New Module' }, { status: 400 });
//   }
// }