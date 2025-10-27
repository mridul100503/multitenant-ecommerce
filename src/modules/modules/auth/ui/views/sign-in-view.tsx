"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import z from "zod"
import { loginSchema} from "../../schema"
import Link from "next/link"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"]
})

export const SignInView = () => {
  const router = useRouter();
  const queryClient = useQueryClient()
  const trpc = useTRPC();
  const loginMutation = useMutation(trpc.auth.login.mutationOptions({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.auth.session.queryFilter())
      router.push("/")
    }
  }))
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",

    }
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate(values)
    console.log(values)
  }
  //   const username = form.watch("username");
  //   const usernameErrors = form.formState.errors.username;
  //   const showPreview = username && !username

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      {/* Left section */}
      <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16"
          >
            <div className="flex items-center justify-between mb-8">
              <Link href="/">
                <span
                  className={cn("text-2xl font-semibold", poppins.className)}
                >
                  Tavya
                </span>
              </Link>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-base border-none underline"
              >
                <Link prefetch href="/sign-up">
                  Sign Up
                </Link>
              </Button>
            </div>
            <h1 className="text-4x1 font medium">Welcome BACK  Mmart.com</h1>

            {/* Example field (add others as needed) */}
            {/* /* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormDescription className={cn("hidden", showPreview && "block")}>
                    Your store will be available at &nbsp
                  </FormDescription>
                  <strong>{username}</strong>.shop.xom
                  <FormMessage />
                </FormItem>
              )}
            /> */ }
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormDescription className={cn("hidden",  "block")}>
                    Your store will be available at &nbsp
                  </FormDescription>
                  
                  <FormMessage />
                </FormItem>
              )}
            /><FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormDescription className={cn("hidden", "block")}>
                    Use at least 8 characters with letters and numbers.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={loginMutation.isPending} type="submit" size="lg" variant="elevated" className="bg-black text-white hover:bg-pink-400 hover:text-primary">Log In</Button>
          </form>
        </Form>
      </div>

      {/* Right background section */}
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
    </div>
  )
}
