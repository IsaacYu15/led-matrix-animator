import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export async function GET() {
  try {
    const result = await query("SELECT * FROM states");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to Retrieve States" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, animation_id, name, x, y } = await request.json();
    const result = await query(
      "UPDATE states SET name = $1, animation_id = $2, x = $3, y = $4 WHERE id = $5 RETURNING *",
      [name, animation_id, x, y, id]
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to Update Module" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { animation_id, name, x, y } = await request.json();
    const result = await query(
      "INSERT INTO states (name, animation_id, x, y) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, animation_id, x, y]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to Add New State" },
      { status: 400 }
    );
  }
}
