'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { useEffect } from 'react';
import Prism from 'prismjs';
import { ArrowLeftIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/lib/utils';
import ErrorPage from '@/app/error';

const ViewBlog = ({ params }: { params: { blogID: string } }) => {

  const {
    data,
    error,
    isLoading
  } = useSWR(`/api/dashboard/codebase/${params.blogID}`, fetcher);

  const router = useRouter();

  useEffect(()=> {
    Prism.highlightAll();
  }, [isLoading])

  if(error) return <ErrorPage/>

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-5">
        <Card className="max-h-36 min-w-48">
          <CardHeader>
            <Skeleton className="w-[100px] h-[20px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-[200px] h-[40px]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleCopyToClipBoard = async () => {
    if (data?.data[0].programe_code) {
      await navigator.clipboard.writeText(data?.data[0].programe_code);
      toast({
        title: 'Success',
        description: 'Copied to clipboard'
      });
    }
  };

  const handleDeleteCodebase = async () => {
    try {
      const { data } = await axios.delete(`/api/dashboard/codebase?id=${params.blogID}`)
      if(data.success) {
        router.push('/dashboard')
        mutate('/api/dashboard/codebase')
        toast({
          title: 'Success',
          description: 'Codebase deleted'
        });
      }
    } catch (error) {
      toast({
        title: 'Failed',
        description: 'Delete codebase'
      });
    }
  };

  return (
    <section className="flex flex-col gap-1 flex-1 p-2 overflow-auto">
      <div className="flex items-center justify-between p-2">
        <Link href="/dashboard">
          <ArrowLeftIcon />
        </Link>
        <h1>{data?.data[0].language_name}</h1>
        <section className="flex gap-1">
          <Button disabled>
            <PencilIcon className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button><Trash2Icon className="h-4 w-4" /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your code and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteCodebase}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      </div>
      <Separator />
      <div className="flex items-center justify-center p-2">
        {!isLoading && (
          <Card>
            <CardHeader>
              <CardDescription>
                Program - {data?.data[0].programe_name}
              </CardDescription>
            </CardHeader>
            <CardContent className="cursor-pointer">
              <pre
                title="click to copy"
                onClick={handleCopyToClipBoard}
              >
                <code className="language-java">
                  {data?.data[0].programe_code}
                </code>
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ViewBlog;
