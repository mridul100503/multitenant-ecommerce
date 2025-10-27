import { loadProductFilters } from "@/modules/modules/products/searchParams";

import { ProductListView } from "@/modules/modules/products/ui/views/product-list-view";
import {  getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";


interface Props{
    params: Promise<{
        subcategory: string;
    }>;
    searchParams:Promise<SearchParams>
}

const Page = async ({ params,searchParams }: Props) => {
    const { subcategory } = await params;
    const filters=await loadProductFilters(searchParams)
    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        category:subcategory,
        ...filters,
        limit:1,
    }))
    return (<div>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView category={subcategory}/>
        </HydrationBoundary>
    </div>)
}
export default Page

