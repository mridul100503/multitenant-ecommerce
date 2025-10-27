import type { SearchParams } from "nuqs";

import {  getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { loadProductFilters } from "@/modules/modules/products/searchParams"

import { ProductListView } from "@/modules/modules/products/ui/views/product-list-view";

interface Props {
    searchParams: Promise<SearchParams>
}

const Page = async ({ searchParams }: Props) => {
    
    const filters=await loadProductFilters(searchParams)
    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        
        ...filters,
        limit:1
    }))
    return (<div>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView />
        </HydrationBoundary>
    </div>)
}
export default Page;
