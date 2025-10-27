
import {  createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/modules/server/procedures';
import { authRouter } from '@/modules/modules/auth/server/procedure';
import { productsRouter } from '@/modules/modules/products/server/procedures';
import { tagsRouter } from '@/modules/modules/tags/server/procedure';
import { tenantsRouter } from '@/modules/modules/tenants/server/procedures';
import { checkoutRouter } from '@/modules/modules/checkout/server/procedures';
import { libraryRouter } from '@/modules/modules/library/server/procedures';
import { reviewsRouter } from '@/modules/modules/reviews/server/procedures';
export const appRouter = createTRPCRouter({
    auth: authRouter,
    categories: categoriesRouter,
    products:productsRouter,
    tags:tagsRouter,
    tenants:tenantsRouter,
    checkout:checkoutRouter,
    library:libraryRouter,
    reviews:reviewsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
