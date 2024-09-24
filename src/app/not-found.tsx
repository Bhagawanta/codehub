'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-between p-12 flex-wrap">
      <section className='flex flex-col items-center md:items-start gap-2'>
        <h1 className='font-bold text-5xl'>404</h1>
        <p className='font-bold text-1xl'>We couldn't find the page you are looking for.</p>
        <Button variant='outline'><Link href="/dashboard" className='font-bold'>Go back to the homepage</Link></Button>
      </section>
      <Image
        src='/not-found.svg'
        alt='not found'
        width={500}
        height={500}
        priority
      />
    </div>
  );
}
