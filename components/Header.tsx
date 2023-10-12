"use client"

import { useRouter } from 'next/navigation';
import React from 'react'
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import Button from './Button';
import useAuthModal from '@/hooks/useAuthModel';
import { useUser } from '@/hooks/useUser';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import usePlayer from '@/hooks/usePlayer';

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {

    const player = usePlayer()
    const router = useRouter()
    const authModal = useAuthModal()

    const supabaseClient = useSupabaseClient()
    const { user } = useUser()

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut()

        player.reset()
        router.refresh()

        if (error) {
            toast.error(error.message)
        } else {
            toast.success('Log Out Successful')
        }
    }

    return (
        <div className={twMerge(`
        h-fit bg-gradient-to-b from-sky-800 p-6
        `, className)}
        >
            <div className='w-full mb-4 flex items-center justify-between'>
                <div className='hidden md:flex gap-x-2 items-center'>
                    <button onClick={() => router.back()}
                        className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
                        <RxCaretLeft className="text-white" size={35} />
                    </button>
                    <button onClick={() => router.forward()}
                        className='rounded-full bg-black flex items-center justify-center hover:opacity-75 transition'>
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>
                <div className='flex md:hidden gap-x-2 items-center'>
                    <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
                        <HiHome className="text-black" size={26} />
                    </button>
                    <button className='rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition'>
                        <BiSearch className="text-black" size={26} />
                    </button>
                </div>
                <div className='flex justify-between items-center gap-x-4'>
                    {user ? (
                        <div className='flex gap-x-4 items-center'>
                            <Button onClick={handleLogout}>
                                Logout
                            </Button>
                            <Button onClick={() => router.push('/account')}>
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (


                        <>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className='bg-transparent text-neutral-300'>
                                    Sign Up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className='bg-white px-6 py-2 text-black'>
                                    Log In
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header