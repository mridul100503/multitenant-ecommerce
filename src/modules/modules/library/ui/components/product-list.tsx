"use client"
import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
;
import { ProductCard, ProductCardSkeleton } from "./product.card";
import { Button } from "@/components/ui/button";
import { InboxIcon } from "lucide-react";




export const ProductList =  () => {
    
    const trpc = useTRPC();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(trpc.library.getMany.infiniteQueryOptions({

       
        limit: 10
    }, {
        getNextPageParam: (lastPage) => {
            if (!lastPage) return undefined;
            return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
        }
    }))
    if(data.pages?.[0]?.docs.length===0){
        return(
            <div className="border border-black border-dashed flex items-center justify-center p-8 flex-col gap-y-4 bg-white w-full rounded-lg">
                <InboxIcon/>
                <p className="text-base font-medium">No Product Found</p>
            </div>
        )
    }

    return (
        <><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2x1:gri-cols-4 gap-4">
            {data?.pages
                .filter((page): page is NonNullable<typeof page> => page !== undefined)
                .flatMap((page) => page.docs)
                .map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.image?.url}
                        tenantSlug={product.tenant?.slug}
                        tenantImageUrl={product.tenant?.image?.url}
                        reviewRating={product.reviewRating}
                        reviewCount={product.reviewCount}
                        
                    />
                ))}

        </div>
        <div className="flex justify-center pt-8">
            {hasNextPage &&(
                <Button
                    disabled={isFetchingNextPage}
                    onClick={()=>fetchNextPage()}
                    className="font-medium disabled:opacity-50 text-base bg-white"
                    variant="elevated"
                >
                    Load more
                </Button>
            )}
        </div>
        </>)


}
export const ProductListSkeleton = ()=> {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2x1:gri-cols-4 gap-4">
            {Array.from({length:1}).map((_,index)=>(
                <ProductCardSkeleton key={index}/>
            ))}
        </div>
    )
}
