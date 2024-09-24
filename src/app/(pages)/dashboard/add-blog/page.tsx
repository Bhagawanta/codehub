'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { APIResponse } from '@/types/APIResponse';
import { codeBaseSchema } from '@/schemas/codeBaseSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import AceEditor from 'react-ace';
import { mutate } from 'swr'

const AddBlog = () => {

  const router = useRouter();
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof codeBaseSchema>>({
    resolver: zodResolver(codeBaseSchema),
    defaultValues: {
      language_name: "",
      language_category: "",
      programe_name: "",
      programe_code: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof codeBaseSchema>) => {
    setIsSubmitting(true);
    try {      
      const { data: response } = await axios.post('/api/dashboard/codebase', data);
      toast({
        title: 'success',
        description: response.data.message
      });
      mutate('/api/dashboard/codebase')
      return router.push('/dashboard');
    } catch (error) {
      console.error('Error in creating codebase', error);
      const axiosError = error as AxiosError<APIResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast({
        title: 'Codebase creation failed',
        description: errorMessage,
        variant: 'destructive'
      });
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col gap-2 flex-1'>
      <div className='flex items-center justify-center p-5 shadow-md relative' title='Back'>
          <div className='absolute left-4'>
          <ArrowLeft onClick={()=>router.back()} className='text-black h-5 w-5 cursor-pointer' />
          </div>
          <div className='text-center'>
          <h1>Add New Code Block</h1>
          </div>
      </div>
      <div aria-label='add code block form' className='overflow-auto p-5'>
      <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className='flex space-x-1 flex-col sm:flex-row flex-wrap'>
              <div className='flex space-x-1 flex-col sm:flex-row'>
              <FormField
                control={form.control}
                name="language_name"
                render={({ field }) => (
                  <FormItem>
                  <FormLabel>Language Name</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language name" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Javascript">Javascript</SelectItem>
                        <SelectItem value="Java">Java</SelectItem>
                        <SelectItem value="Python">Python</SelectItem>
                      </SelectContent>
                    </Select>
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter language category"
                        {...field}
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <div className='flex'>
                  <FormField
                  control={form.control}
                  name="programe_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Program Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter program name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
             <FormField
              control={form.control}
              name="programe_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Code</FormLabel>
                  <FormControl>
                  <AceEditor
                      className='max-w-56 sm:w-full sm:max-w-full'
                      placeholder="Write your own code"
                      onChange={field.onChange}
                      fontSize={14}
                      lineHeight={19}
                      showPrintMargin={true}
                      showGutter={true}
                      highlightActiveLine={true}
                      value={field.value}
                      setOptions={{
                      enableBasicAutocompletion: false,
                      enableLiveAutocompletion: false,
                      enableSnippets: false,
                      showLineNumbers: true,
                      tabSize: 2,
                      }}/>
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
                'Save'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default AddBlog