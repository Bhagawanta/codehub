'use client';

import Aside from '@/components/shared/aside';
import Navbar from '@/components/ui/navbar';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Import the theme
import 'prismjs/components/prism-javascript'; // Import specific language component
import 'prismjs/components/prism-java'; // Import Java for this example
import 'prismjs/components/prism-python'; // Import Python for this example

import { useEffect } from 'react';

export default function DashboardLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (document) {
      Prism.highlightAll();
    }
  }, []);

  return (
    <section className="m-0 p-0">
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar />
      <div className="flex h-[calc(100vh-3rem)] overflow-auto">
        <div className="min-w-56 border-r-2 p-4 hidden sm:block">
          <Aside />
        </div>
        {children}
      </div>
    </section>
  );
}