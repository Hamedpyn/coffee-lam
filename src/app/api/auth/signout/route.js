import { NextResponse } from 'next/server'

export async function GET() {

    try {
        const response = NextResponse.json({ message: 'Logged out' })

        response.cookies.set('token', '', {
            path: '/',
            maxAge: 0,
        })
        return response
        
    } catch (err) {
        console.error("Error ->", err);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }

}
