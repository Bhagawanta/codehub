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
import { CodeBaseInterface } from '@/models/Codebase';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Prism from 'prismjs';
import { ArrowLeftIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { mutate } from 'swr';
import { useRouter } from 'next/navigation';

const ViewBlog = ({ params }: { params: { blogID: string } }) => {

  const router = useRouter();

  const [blogInformation, setBlogInformation] = useState<CodeBaseInterface>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBlogInformation();
  }, [blogInformation]);

  const getBlogInformation = async () => {
    setIsLoading(true);
    try {
      const { data: response } = await axios.get(
        `/api/dashboard/codebase/${params.blogID}`
      );
      setBlogInformation(response.data[0]);
      Prism.highlightAll();
    } catch (error) {
      toast({
        title: 'Failed',
        description: 'Retrieval for blog information',
        variant: 'destructive'
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

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
    if (blogInformation?.programe_code) {
      await navigator.clipboard.writeText(blogInformation.programe_code);
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
        <h1>{blogInformation?.language_name}</h1>
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
                Program - {blogInformation?.programe_name}
              </CardDescription>
            </CardHeader>
            <CardContent className="cursor-pointer">
              <pre
                title="click to copy"
                onClick={handleCopyToClipBoard}
              >
                <code className="language-java">
                  {blogInformation?.programe_code}
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
