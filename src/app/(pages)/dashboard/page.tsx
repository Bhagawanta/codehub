'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';

interface LanguageCountInterface {
  _id: string;
  count: number;
}

const page = () => {
  const {
    data,
    error,
    isLoading: isUserNameLoading
  } = useSWR('/api/dashboard/user', fetcher);
  const {
    data: response,
    error: codeBaseCountError,
    isLoading
  } = useSWR('/api/dashboard/codebase/count', fetcher);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 p-5 w-full">
        <div>
          <Skeleton className='h-8 w-full'/>
        </div>
        <section className="flex gap-2 w-full">
          <section className="flex gap-1 flex-wrap">
            {Array.from({ length: 10 })?.map((item, index) => {
              return (
                <Card
                  className="relative cursor-pointer max-h-36 min-w-48"
                  key={index}
                >
                  <CardHeader>
                    <Skeleton className="w-auto h-5"></Skeleton>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="w-auto h-5"></Skeleton>
                    <Skeleton className="absolute h-10 w-10 rounded-full bottom-2 right-2"></Skeleton>
                  </CardContent>
                </Card>
              );
            })}
          </section>
        </section>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 p-5 w-full">
      <div className='flex items-center p-2'>
        {isUserNameLoading ? (
          <Skeleton className="h-10 w-48" />
        ) : (
          data && <h1>Welcome to CodeHub, {data?.data}</h1>
        )}
      </div>
      <Separator />
      <section className="flex gap-2 w-full h-full">
        {response?.data?.length === 0 ? (
          <div className="flex items-center justify-center w-full">
            <Image
              alt="No Data on Dashboard"
              src="/no-record-found.png"
              height={400}
              width={400}
            />
          </div>
        ) : (
          <section className="flex flex-wrap gap-2">
            {response?.data?.map(
              (item: LanguageCountInterface, index: number) => {
                return (
                  <Card
                    className="relative cursor-pointer max-h-36 min-w-48"
                    key={index}
                  >
                    <CardHeader>
                      <CardTitle>{item._id}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{item.count}</p>
                      <Image
                        className="absolute bottom-2 right-2"
                        src={`/${item._id}.png`}
                        alt="logo"
                        height={100}
                        width={50}
                      />
                    </CardContent>
                  </Card>
                );
              }
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default page;
