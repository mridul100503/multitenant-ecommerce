
import { Category, Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

import type {  Sort, Where } from "payload";
import z from "zod";
import { headers as getHeaders } from "next/headers";
import { sortValues } from "../searchParams";
import { TRPCError } from "@trpc/server";

export const productsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const headers = await getHeaders();
      const session = await ctx.payload.auth({ headers });

      const product = await ctx.payload.findByID({
        collection: "products",
        id: input.id,
        depth: 2,
        select:{
          content:false
        }
      });

      if(product.isArchived){
        throw new TRPCError({
          code:"NOT_FOUND",
          message:"Product not found"
        })
      }

      let isPurchased = false;

      if (session.user) {
        const ordersData = await ctx.payload.find({
          collection: "orders",
          pagination: false,
          limit: 1,
          where: {
            and: [
              { product: { equals: input.id } },
              { user: { equals: session.user.id } },
            ],
          },
        });

        isPurchased = !!ordersData.docs[0];
      }

      // Fetch reviews for the product
      const reviewsData = await ctx.payload.find({
        collection: "reviews",
        pagination: false,
        where: { product: { equals: input.id } },
      });

      const reviewRating =
        reviewsData.docs.length > 0
          ? reviewsData.docs.reduce((acc, review) => acc + review.rating, 0) /
            reviewsData.totalDocs
          : 0;

      const ratingDistribution: Record<number, number> = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      };

      if (reviewsData.totalDocs > 0) {
        reviewsData.docs.forEach((review) => {
          const rating = review.rating;
          if (rating >= 1 && rating <= 5) {
            ratingDistribution[rating] =
              (ratingDistribution[rating] || 0) + 1;
          }
        });

        Object.keys(ratingDistribution).forEach((key) => {
          const rating = Number(key);
          const count = ratingDistribution[rating] || 0;
          ratingDistribution[rating] = Math.round(
            (count / reviewsData.totalDocs) * 100
          );
        });
      }

      return {
        ...product,
        isPurchased,
        image: product.image as Media | null,
        cover: product.image as Media | null,
        tenant: product.tenant as Tenant & { image: Media | null },
        reviewRating,
        reviewCount: reviewsData.totalDocs,
        ratingDistribution,
      };
    }),

  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(10),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {
        isArchived:{
          not_equals:true
        }
      };
      let sort: Sort = "-createdAt";

      if (["trending", "hot_and_new", "curated"].includes(input.sort ?? "")) {
        sort = "-createdAt";
      }

      if (input.minPrice) {
        where.price = { greater_than_equal: input.minPrice };
      }

      if (input.maxPrice) {
        where.price = { less_than_equal: input.maxPrice };
      }

      if (input.tenantSlug) {
        where["tenant.slug"] = { equals: input.tenantSlug };
      }else{
        where["isPrivate"]={
          not_equals:true
        }
      }

      if (input.category) {
        const categoriesData = await ctx.payload.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: { slug: { equals: input.category } },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((subdoc) => ({
            ...(subdoc as Category),
            subcategories: undefined,
          })),
        }));

        const parentCategory = formattedData[0];
        if (parentCategory) {
          const subcategories = parentCategory.subcategories.map(
            (subcategory) => subcategory.slug
          );
          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategories],
          };
        }
      }

      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = { in: input.tags };
      }

      const data = await ctx.payload.find({
        collection: "products",
        depth: 2,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
        select:{
          content:false
        }
      });

      const dataWithSummarizedReviews = await Promise.all(
        data.docs.map(async (doc) => {
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
        ...data,
        docs: dataWithSummarizedReviews.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});

