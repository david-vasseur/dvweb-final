import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';



export default clerkMiddleware({
  authorizedParties: ['https://dvweb-agency.fr'],
})

