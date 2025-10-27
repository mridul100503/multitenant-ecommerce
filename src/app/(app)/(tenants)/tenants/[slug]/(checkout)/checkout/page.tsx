import { CheckoutView } from "@/modules/modules/checkout/ui/view/checkout-view";

interface PageProps{
    params:Promise<{slug:string}>
}


const Page=async({params}:PageProps)=>{
    const {slug}=await params;
    return(
       <CheckoutView tenantSlug={slug}/>
    )
}
export default Page

