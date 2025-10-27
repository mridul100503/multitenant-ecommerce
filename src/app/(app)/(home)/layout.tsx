
import { Footer } from "./navbar/footer";
import Navbar from "./navbar/navbar";
import { SearchFilterLoading, SearchFilters } from "../../../modules/modules/search-filters";
import { getQueryClient,  trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

// export default function Layout({ children }: Props) {
//     return(

//         <div className="flex flex-col min-h-screen">
//           <Navbar/>
//           <SearchFilters/>
//           <div className="flex-1">
//              {children}
//           </div>

//           <Footer/>
//         </div>

//     )}
const Layout = async ({ children }: Props) => {
 const queryClient=getQueryClient();
 void queryClient.prefetchQuery(
  trpc.categories.getMany.queryOptions()
 )
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFilterLoading/>}>
          <SearchFilters />
        </Suspense>
        
      </HydrationBoundary>
      
      <div className="flex-1 bg-[#F4F4F0]">
        {children}
      </div>
      <Footer />
    </div>
  )
}
export default Layout;
