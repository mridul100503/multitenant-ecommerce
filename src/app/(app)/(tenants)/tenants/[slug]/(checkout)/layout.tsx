import { Footer } from "@/modules/modules/tenants/ui/components/footer"
import { Navbar } from "@/modules/modules/checkout/ui/components/navbar"
import { getQueryClient, trpc } from "@/trpc/server"

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export default async function Layout({ children, params }: LayoutProps) {
  const { slug } = await params

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({ slug }))

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex flex-col">
      <Navbar slug={slug} />

      <div className="flex-1">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>

      <Footer />
    </div>
  )
}



