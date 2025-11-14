"use client"

import Dashboard from '@/components/layout/dashboard/Dashboard';
import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from 'next/link';

function page() {
    return (
        <>
            <SignedIn>
                <div className='h-svh'>
                    <Dashboard />
                </div>
            </SignedIn>
            <SignedOut>
                <div className='flex flex-col gap-10 justify-center items-center h-svh'>
                    <h1 className='text-red-600 font-black text-3xl'>ACCES REFUSE</h1>
                    <h2 className='text-cyan-600 font-black text-2xl'>Veuillez vous connecter</h2>
                    <Link href={"/"} className="rounded-lg px-4 py-2 bg-cyan-500 text-white font-bold">Retour à l'accueil</Link>
                </div>
            </SignedOut>
        </>
    )
}

export default page