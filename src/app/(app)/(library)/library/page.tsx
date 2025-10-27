import { LibraryView } from "@/modules/modules/library/ui/views/library-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export const dynamic = "force-dynamic";

const Page=async()=>{
    const queryClient=getQueryClient()
    void queryClient.prefetchInfiniteQuery(trpc.library.getMany.infiniteQueryOptions({
        limit:10
    }))
return (
<HydrationBoundary state={dehydrate(queryClient)}><LibraryView/></HydrationBoundary>


)
}
export default Page
