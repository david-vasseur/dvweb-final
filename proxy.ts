import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  	'/dashboard(.*)',
])

export default clerkMiddleware(async (auth, request) => {
	const { userId } = await auth()

	if (isProtectedRoute(request) && !userId) {
		const url = request.nextUrl.clone()
		url.pathname = '/'
		url.search = ''
		return NextResponse.redirect(url)
	}
  	return NextResponse.next();
})

export const config = {
	matcher: [
		'/dashboard(.*)',
		'/api/(.*)',
	],
}