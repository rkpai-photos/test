import Header from "@/sections/Nav";
import GalleryGrid from "@/components/GalleryGrid";
import { fetchPhotos } from "@/lib/fetch";
export default async function StoriesPage() {
  const photosData = await fetchPhotos();

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
