'use client';

import { SetStateAction, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { CodeBaseInterface } from '@/models/Codebase';
import { Card, CardDescription } from '../ui/card';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import useSWR from 'swr';
import { Skeleton } from '../ui/skeleton';
import { fetcher } from '@/lib/utils';
import PageError from './error';

const Aside = ({ setShowSidebar }: any) => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const {
    data: response,
    error,
    isLoading
  } = useSWR('/api/dashboard/codebase', fetcher);

  const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
    setSearch(e.target.value);
  };

  const loader = () =>
    Array.from({ length: 10 }).map((_: any, index: number) => {
      return (
        <Skeleton
          key={index}
          className="h-12 w-auto"
        />
      );
    });

  if (error) return <PageError />;

  return (
    <div className='flex flex-col gap-2'>
      <div className="flex space-x-2">
        <Input
          onChange={handleSearch}
          value={search}
          placeholder="Search"
        />
        <Button onClick={() => {
          setShowSidebar?.(false);
          router.push('/dashboard/add-blog')
        }}>Add</Button>
      </div>
      <Separator className="bg-slate-100" />
      {isLoading ? (
        <div className="flex flex-col gap-2 overflow-auto">{loader()}</div>
      ) : (
        <section className="flex flex-col gap-2 overflow-auto">
          {response.data?.length === 0 ? (
            <div className="flex flex-col gap-5 items-center">
              <Image
                src="/no-data.svg"
                alt="no data found"
                height={250}
                width={250}
              />
              <h1>No records found !</h1>
            </div>
          ) : (
            response.data?.length > 0 &&
            response.data?.map((item: CodeBaseInterface, index: number) => {
              return (
                <Card
                  className="cursor-pointer h-12 flex items-center justify-start p-2 relative"
                  key={index}
                >
                  <Link href={`/dashboard/view-blog/${item._id}`} onClick={()=> setShowSidebar?.(false)}>
                    <CardDescription>{item.programe_name}</CardDescription>
                  </Link>
                  <Image
                    src={`/${item.language_name}.png`}
                    alt={`${item.language_name} logo`}
                    height={25}
                    width={25}
                    className="absolute right-1 rounded-full"
                  />
                </Card>
              );
            })
          )}
        </section>
      )}
    </div>
  );
};

export default Aside;