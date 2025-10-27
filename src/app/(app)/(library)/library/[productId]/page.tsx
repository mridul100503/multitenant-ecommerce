import { ProductView, ProductViewSkeleton } from "@/modules/modules/library/ui/views/product-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"


// ✅ Use Next.js standard PageProps interface
interface PageProps {
  params: Promise<{ productId: string }>
}

export default async function Page({ params }: Awaited<PageProps>) {
  const { productId } = await params
  const queryClient = getQueryClient()

  // Prefetch both queries before hydration
  await Promise.all([
    queryClient.prefetchQuery(trpc.library.getOne.queryOptions({ productId })),
    queryClient.prefetchQuery(trpc.reviews.getOne.queryOptions({ productId })),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ProductViewSkeleton />}>
        <ProductView productId={productId} />
      </Suspense>
    </HydrationBoundary>
  )
}



