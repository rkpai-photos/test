/* eslint-disable */
import { prisma } from "../app/utils/prisma";

// Fetch and parse the photo data
export async function fetchPhotos() {
  try {
    const photos = await prisma.image.findMany({
      include: {
        cameraSpecs: true, // Include related camera specs
      },
    });

    // If no photos are found, log and return an empty array
    if (photos.length === 0) {
      console.log("No photos found in the database.");
      return [];
    }

    // Parse the fetched data
    const parsedPhotos = photos.map((photo) => ({
      id: photo.id,
      src: photo.src,
      alt: photo.alt,
      width: photo.width,
      height: photo.height,
      cameraSpecs: {
        camera: photo.cameraSpecs?.camera,
        lens: photo.cameraSpecs?.lens,
        focalLength: photo.cameraSpecs?.focalLength,
        aperture: photo.cameraSpecs?.aperture,
        shutterSpeed: photo.cameraSpecs?.shutterSpeed,
        iso: photo.cameraSpecs?.iso,
      },
      story: photo.story,
      createdAt: photo.createdAt,
      updatedAt: photo.updatedAt,
    }));

    // Log the parsed photos for debugging
    // console.log("Fetched photos:", parsedPhotos);

    return parsedPhotos;
  } catch (error) {
    // Handle any errors during the fetch
    console.error("Error fetching photos:", error);
    return [];
  }
}

// Fetch data and store it in a variable
let photosData: any[] = [];
try {
  photosData = await fetchPhotos();
  if (photosData.length === 0) {
    console.log("No photos data available.");
  }
} catch (error) {
  console.error("Error fetching photos data:", error);
}

export { photosData };
