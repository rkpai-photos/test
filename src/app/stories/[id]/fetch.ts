/* eslint-disable */
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

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

// Function to fetch photos
export const fetchPhotos = async () => {
  try {
    const result = await dynamoDb.scan({
      TableName: TABLE_NAME,
      FilterExpression: "#type = :type",
      ExpressionAttributeNames: {
        "#type": "type",
      },
      ExpressionAttributeValues: {
        ":type": "image",
      },
    });

    if (!result.Items) {
      return [];
    }

    // Process each item to handle binary image data
    const processedPhotos = await Promise.all(
      result.Items.map(async (item) => {
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
      }),
    );
    return processedPhotos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};

// Initialize an empty array to hold the photos data
let photosData: any[] = [];

try {
  const processedPhotos = await fetchPhotos();

  // Add the processed photos to the photosData array
  photosData = processedPhotos;
  // console.log("Photos data fetched successfully.", photosData);
  if (photosData.length === 0) {
    console.log("No photos data available.");
  }
} catch (error) {
  console.error("Error fetching photos data:", error);
}

export { photosData };
