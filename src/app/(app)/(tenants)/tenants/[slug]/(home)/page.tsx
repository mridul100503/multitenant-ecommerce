import type{ SearchParams } from "nuqs/server";
import{getQueryClient,trpc} from"@/trpc/server"
import { ProductListView } from "@/modules/modules/products/ui/views/product-list-view";
import { loadProductFilters } from "@/modules/modules/products/searchParams";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
interface PageProps{
    searchParams:Promise<SearchParams>
    params:Promise<{slug:string}>
}
const Page=async({params,searchParams}:PageProps)=>{
    const{slug}=await params;
    const filters=await loadProductFilters(searchParams)
    const queryClient = getQueryClient();
        void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
            
            ...filters,
            tenantSlug:slug,
            limit:2
        }))
    return(<div>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView tenantSlug={slug} narrowView/>
        </HydrationBoundary>
    </div>)
}
export default Page
