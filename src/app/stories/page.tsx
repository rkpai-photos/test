
export const dynamic = "force-dynamic"; // Force dynamic rendering

/* eslint-disable */
// @ts-nocheck

import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import Header from "@/sections/Nav";
import GalleryGrid from "@/components/GalleryGrid";

// Initialize DynamoDB client
const dynamoDb = DynamoDBDocument.from(
  new DynamoDB({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_REGION,
  }),
);

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME!;

async function fetchPhotos() {
  try {
    let items: any[] = [];
    let lastEvaluatedKey: Record<string, any> | undefined = undefined;

    do {
      // Explicitly annotate the result as 'any' (or a proper type if available)
      const result: any = await dynamoDb.scan({
        TableName: TABLE_NAME,
        FilterExpression: "#type = :type",
        ExpressionAttributeNames: { "#type": "type" },
        ExpressionAttributeValues: { ":type": "image" },
        ...(lastEvaluatedKey && { ExclusiveStartKey: lastEvaluatedKey }),
      });

      if (result.Items) {
        items = [...items, ...result.Items];
      }
      lastEvaluatedKey = result.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    const processedPhotos = await Promise.all(
      items.map(async (item) => {
        if (item.src?.B) {
          const binary = item.src.B;
          const base64 = Buffer.from(binary).toString("base64");
          const mimeType = item.mimeType || "image/jpeg";
          item.src = `data:${mimeType};base64,${base64}`;
        }

        return {
          id: item.rkpai,
          src: item.src,
          alt: item.alt,
          width: item.width,
          height: item.height,
          cameraSpecs: item.cameraSpecs,
          story: item.story,
          createdAt: item.createdAt,
        };
      })
    );

    console.log(`Total photos fetched: ${processedPhotos.length}`);
    return processedPhotos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
}


export default async function StoriesPage() {
  const photosData = await fetchPhotos();

  if (!photosData || photosData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="mb-10 pb-10">
          <Header />
        </div>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            No photos available
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="mb-10 pb-10">
        <Header />
      </div>
      <div className="container mx-auto px-4 py-12">
        <GalleryGrid images={photosData} />
      </div>
    </div>
  );
}
