import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export async function GET() {
  try {
    const result = await query("SELECT * FROM transitions ORDER BY id ASC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to Retrieve Transitions" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { from_id, to_id, condition } = await request.json();
    const result = await query(
      "INSERT INTO transitions (from_id, to_id, condition) VALUES ($1, $2, $3) RETURNING *",
      [from_id, to_id, condition]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to Add New Transition" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const result = await query("DELETE FROM transitions WHERE id = $1", [id]);
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to Add New Module" },
      { status: 400 }
    );
  }
}
