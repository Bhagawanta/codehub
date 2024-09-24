'use client';

import NetWorkFailure from '@/components/shared/network-failure';
import { Button } from '@/components/ui/button';
import useBrowserStatus from '@/hooks/useBrowserStatus';
import Link from 'next/link';

export default function Home() {
  const isOnline = useBrowserStatus();

  if (!isOnline) {
    return <NetWorkFailure/>
  }
  
  return (
    <div className="bg-gray-100 text-center p-10 space-y-5 flex items-center justify-center flex-col">
      <h1>On Root Path</h1>
      <Button variant="outline">
        <Link href="/sign-in">Go to sign in</Link>
      </Button>
    </div>
  );
}
