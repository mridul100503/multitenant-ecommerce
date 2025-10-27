import type { SearchParams } from "nuqs";

import {  getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { loadProductFilters } from "@/modules/modules/products/searchParams"

import { ProductListView } from "@/modules/modules/products/ui/views/product-list-view";

interface Props {
    params: Promise<{
        category: string;
    }>;searchParams:Promise<SearchParams>
}

const Page = async ({ params,searchParams }: Props) => {
    const { category } = await params;
    const filters=await loadProductFilters(searchParams)
    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        category,
        ...filters,
        limit:1
    }))
    return (<div>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={category}/>
        </HydrationBoundary>
    </div>)
}
export default Page;
