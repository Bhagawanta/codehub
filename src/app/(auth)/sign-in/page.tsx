'use client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { signInSchema } from '@/schemas/signInSchema';
import { APIResponse } from '@/types/APIResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setLocalStorage } = useLocalStorage();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      mobile: '',
      pin: ''
    }
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      const { data: response } = await axios.post('/api/sign-in', data);
      setLocalStorage('uid',response.data?._id)
      toast({
        title: 'success',
        description: response.data.message
      });
      return router.replace('/dashboard');
    } catch (error) {
      console.error('Error in sign up of user', error);
      const axiosError = error as AxiosError<APIResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: 'User sign in failed',
        description: errorMessage,
        variant: 'destructive'
      });
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-700 shadow-md rounded-lg">
        <div className="text-center dark:text-white">CodeHub</div>
        <div className="text-center">Sign In</div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your mobile number"
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                      inputMode='numeric'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </Form>
        <div className='text-center text-gray-500 dark:text-white'>
          Don't have an account? <Link href='/sign-up' className='text-blue-800 dark:text-blue-500'>Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default page;
