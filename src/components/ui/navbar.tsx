'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { Loader2, LogOutIcon, MenuIcon, MoonIcon, SunIcon } from 'lucide-react';
import Link from 'next/link';
import Aside from '../shared/aside';
import Image from 'next/image';

const Navbar = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [themeMode, setThemeMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    setIsSubmitted(true);
    try {
      const response = await axios.get('/api/logout');
      if (response.data.success) router.replace('/sign-in');
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Error',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitted(false);
    }
  };

  const handleChangeMode = () => {
    if (!document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
      setThemeMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setThemeMode(false);
    }
  };

  return (
    <nav className="relative flex items-center justify-between h-12 p-5 shadow-md bg-slate-100 dark:bg-slate-950 dark:border-b-2">
      <span className="flex items-center gap-0">
        <MenuIcon
          className="flex sm:hidden cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <Link href="/dashboard" onClick={()=>setShowSidebar(false)}>
        <Image
          alt='App Logo'
          src='/codehublogo.png'
          height={50}
          width={150}
        />
        </Link>
      </span>
      {showSidebar ? (
        <div className="absolute left-0 top-12 p-2 block sm:hidden bg-gray-100 h-[calc(100vh-3rem)] overflow-auto z-10 dark:bg-black">
          <Aside setShowSidebar={setShowSidebar} />
        </div>
      ) : (
        <></>
      )}
      <div className="flex gap-2">
        <section className="flex items-center justify-center">
          {themeMode ? (
            <SunIcon
              className="cursor-pointer"
              onClick={handleChangeMode}
            />
          ) : (
            <MoonIcon
              className="cursor-pointer"
              onClick={handleChangeMode}
            />
          )}
        </section>
        <section className="flex items-center justify-center">
          {isSubmitted ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOutIcon
              className="cursor-pointer"
              onClick={handleLogout}
            />
          )}
        </section>
      </div>
    </nav>
  );
};

export default Navbar;
