"use client"

import { motion } from 'framer-motion';
import { useForm } from "@tanstack/react-form"
import { User } from "lucide-react";
import { ISignIn, SignInSchema } from '@/schema/signInSchema';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/app/lib/store/modalStore';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const SignInForm = () => {

    const { openModal } = useModalStore();
    const { signIn } = useSignIn();
    const router = useRouter();
    const fied1Ref = useRef(null);
    const fied2Ref = useRef(null);
    const buttonRef = useRef(null);

    const form = useForm({
        defaultValues: {
            userName: "",
            password: "",
        } as ISignIn,
        validators: {
            onChange: SignInSchema,
        },
        onSubmit: async ({ value }) => {
            
            console.log(value);

            try {
                const result = await signIn?.create({
                    identifier: value.userName, 
                    password: value.password
                })

                if (result?.status === "complete") {
                    openModal('Connexion reussi');
                    window.location.href= "/dashboard";
                } 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.errors && error.errors[0]?.longMessage) {
                    openModal("Identifiant ou Mot de passe incorrect");
                } else if (error.message) {
                    openModal("Identifiant ou Mot de passe incorrect");
                } else {
                    openModal("Identifiant ou Mot de passe incorrect");
                }
            }
        },
    });

    useGSAP(() => {
        const tl = gsap.timeline({ 
            defaults: { ease: 'power3.out' },
            onComplete: () => {
                gsap.set([fied1Ref.current, fied2Ref.current, buttonRef.current], {
                    clearProps: 'all'
                });
            }
        }); 
        
        tl.fromTo(fied1Ref.current, 
            {y: 50, opacity: 0}, 
            {y: 1, opacity: 1, duration: .3, delay: .5}
        )
        .fromTo(fied2Ref.current, 
            {y: 50, opacity: 0}, 
            {y: 1, opacity: 1, duration: .3}
        )
        .fromTo(buttonRef.current,
            {y: 30, opacity: 0}, 
            {y: 1, opacity: 1, duration: .05}
        )
    })

    return (
        <form 
            className="space-y-4 px-2 lg:px-10 py-10 rounded-lg"
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
        >
            
            <form.Field
                name="userName">
                {({ state, handleBlur, handleChange }) => (
                    <motion.div
                        ref={fied1Ref}
                    >
                        <label className="sr-only">Nom d&apos;utilisateur</label>
                        <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full rounded-md border border-cyan-700 bg-transparent py-2 px-3 text-cyan-700 placeholder-gray-500 focus:border-zinc-100 focus:outline-none transition"
                            placeholder="Nom d'utilisateur"
                            value={state.value}
                            onBlur={handleBlur}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        {state.meta.errors.length > 0 && state.meta.isTouched ? (
                            <p 
                                className="text-red-500 font-semibold text-xs">
                                    {state.meta.errors[0]?.message}
                            </p>
                        ) : null
                        }
                    </motion.div> 
                )}
            </form.Field>

            <form.Field 
                name="password">
                {({ state, handleBlur, handleChange }) => (
                    <motion.div
                    ref={fied2Ref}
                    >
                        <label className="sr-only">Mot de passe</label>
                        <input 
                            aria-invalid={
                                state.meta.errors.length > 0 && state.meta.isTouched
                            }
                            className="w-full rounded-md border border-cyan-700 bg-transparent py-2 px-3 text-cyan-700 placeholder-gray-500 focus:border-zinc-100 focus:outline-none transition"
                            placeholder="Mot de passe"
                            type='password'
                            value={state.value}
                            onBlur={handleBlur}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        {state.meta.errors.length > 0 && state.meta.isTouched ? (
                            <p 
                                className="text-red-500 font-semibold text-xs">
                                    {state.meta.errors[0]?.message}
                            </p>
                        ) : null
                        }
                    </motion.div>
                )}
            </form.Field>

            <div className='flex flex-col items-center mt-10'>
                <form.Subscribe 
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    // eslint-disable-next-line react/no-children-prop
                    children={([canSubmit, isSubmitting]) => (
                        <motion.button 
                            ref={buttonRef}
                            type="submit" 
                            disabled={!canSubmit || isSubmitting}
                            className="inline-flex items-center justify-center space-x-2 rounded-md bg-cyan-400/60 px-6 py-3 font-semibold text-black hover:text-white hover:bg-cyan-700/30 transition cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}    
                        >
                        {isSubmitting ? "..." : (
                            <span className="flex items-center">
                                <User className="mr-2" />
                                Se connecter
                            </span>
                        )}
                    </motion.button>
                    )}            
                >    
                </form.Subscribe>
            </div>
            
        </form>
    )
}