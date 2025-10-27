import configPromise from "@payload-config";
import { getPayload } from "payload";

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const categories = await payload.find({
    collection: "categories",
  });

  // ✅ Actually use the data and request
  return Response.json({
    message: "Fetched categories successfully.",
    count: categories.totalDocs,
    categories: categories.docs,
    method: request.method,
  });
};
