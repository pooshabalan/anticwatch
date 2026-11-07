import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // We are no longer loading from data/watches.json!
    // Now we cross the bridge to the Express Backend running on Port 5000
    const response = await fetch('http://localhost:5000/api/watches', { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error("Bridge connection failed!");
    }

    const watches = await response.json();
    return NextResponse.json(watches);
    
  } catch (error) {
    console.error("Backend Proxy Error:", error);
    // If the backend is off, fail gracefully with an empty array so UI doesn't crash
    return NextResponse.json([]);
  }
}
