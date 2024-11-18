'use client'
import { useForm } from "react-hook-form";
import { completeOnboarding, updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea";
import * as z from 'zod'

import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { useUser } from "@clerk/nextjs";
interface Props {
  userData: {
    id: string;
    bio: string
  }
}

const AccountInfo = ({ userData }: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useUser()
  const [showBio, setShowBio] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setShowBio(true)
    }, 1000)
  })

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      bio: userData?.bio ? userData.bio : ''
    }
  })

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    await updateUser({
      userId: userData.id,
      bio: values.bio,
      path: pathname
    })
    const res = await completeOnboarding()
    if (res?.message) {
      // Reloads the user's data from the Clerk API
      await user?.reload()      
    }

    if (pathname === '/profile/edit') {
      router.back()
    } else {
      router.push('/')
    }
  }

  if (!showBio) {
    return (
      <h1 className="text-heading1-bold text-light-1">Loading... please wait</h1>
    )
  }

  return (
    <>
      <section className="mt-9 bg-dark-2 p-10">
        <Form {...form}>
          <form
            className='flex flex-col justify-start gap-10'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className='flex w-full flex-col gap-3'>
                  <FormLabel className='text-base-semibold text-light-2'>
                    Tell people more about yourself
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={10}
                      className='account-form_input no-focus'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-primary-500">
              Save
            </Button>
          </form>
        </Form>
      </section>
    </>
  )
}
export default AccountInfo