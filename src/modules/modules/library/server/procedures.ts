
import {  Media, Tenant } from "@/payload-types";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

import z from "zod";

import { TRPCError } from "@trpc/server";

export const libraryRouter = createTRPCRouter({
  // getOne: baseProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
  //   const headers = await getHeaders();
  //   const session = await ctx.payload.auth({ headers });
  //   const product = await ctx.payload.findByID({
  //     collection: "products",
  //     id: input.id,
  //     depth: 2,
  //   });
  //
  //   let isPurchased = false;
  //   if (session.user) {
  //     const ordersData = await ctx.payload.find({
  //       collection: "orders",
  //       pagination: false,
  //       limit: 1,
  //       where: {
  //         and: [
  //           { product: { equals: input.id } },
  //           { user: { equals: session.user.id } },
  //         ],
  //       },
  //     });
  //     isPurchased = !!ordersData.docs[0];
  //   }
  //
  //   return {
  //     ...product,
  //     isPurchased,
  //     image: product.image as Media | null,
  //     cover: product.image as Media | null,
  //     tenant: product.tenant as Tenant & { image: Media | null },
  //   };
  // }),
  getOne: protectedProcedure
    .input(
      z.object({
        productId:z.string()
      })
    )
    .query(async ({ ctx, input }) => {
      const ordersData = await ctx.payload.find({
        collection: "orders",
        limit:1,
        pagination: false,
        depth: 0,
        
        where: {
          and:[{
            product: { equals: input.productId }
          },{
            user: { equals: ctx.session.user?.id }
          }]
        
        },
      });

     const order=ordersData.docs[0]
     if(!order){
      throw new TRPCError({
        code:"NOT_FOUND",
        message:"Order not found"

      })
     }
      const product = await ctx.payload.findByID({
        collection: "products",
     
        
          id: input.productId  ,
       
      });
      if(!product){
        throw new TRPCError({
          code:"NOT_FOUND",
          message:"Product not found"
        })
      }
      return product
        
      ;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const ordersData = await ctx.payload.find({
        collection: "orders",
        depth: 0,
        page: input.cursor,
        limit: input.limit,
        where: {
          user: {
            equals: ctx.session.user?.id,
          },
        },
      });

      const productIds = ordersData.docs.map((doc) => doc.product);
      const productsData = await ctx.payload.find({
        collection: "products",
        pagination: false,
        where: {
          id: { in: productIds },
        },
      });
      const dataWithSummarizedReviews = await Promise.all(
        productsData.docs.map(async (doc) => {
          const reviewsData = await ctx.payload.find({
            collection: "reviews",
            pagination: false,
            where: { product: { equals: doc.id } },
          });

          const totalReviews = reviewsData.totalDocs;
          const reviewRating =
            totalReviews === 0
              ? 0
              : reviewsData.docs.reduce(
                  (acc, review) => acc + review.rating,
                  0
                ) / totalReviews;

          return {
            ...doc,
            reviewCount: totalReviews,
            reviewRating,
          };
        })
      );

      return {
        ...productsData,
        docs: dataWithSummarizedReviews.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
      
    }),
});
