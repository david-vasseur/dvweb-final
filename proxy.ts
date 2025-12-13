import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';



export default clerkMiddleware(
  (auth, req) => {
    console.log('=========================')
    console.log('Request Headers')
    console.log('x-forwarded-host', req.headers.get('x-forwarded-host'))
    console.log('x-forwarded-proto', req.headers.get('x-forwarded-proto'))
    console.log('=========================')
  },
  { debug: debugStatus },
)

