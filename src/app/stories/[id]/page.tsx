import { fetchPhotos } from "./fetch";
import Image from "next/image";
import { Camera, BookOpen } from "lucide-react";
import TypeWriter from "./TypeWriter";
import PhotoDetailClient from "./PhotoClinet";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const photos = await fetchPhotos();
  const photo = photos.find((p) => p.id === params.id);
  return {
    title: photo ? `Photo ${photo.id}` : "Photo Not Found",
    description: photo?.story || "Photo details",
  };
}

export default async function PhotoDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const photos = await fetchPhotos();
  const photo = photos.find((p) => p.id === params.id);

  if (!photo) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4 md:p-8 font-sans overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Photo Not Found
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            The requested photo does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 p-4 md:p-8 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-3xl p-4 md:p-8 mb-6 border border-white/30 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <TypeWriter
              text={photo.alt}
              delay={80}
              className="font-playfair text-2xl md:text-4xl tracking-tight text-gray-800 dark:text-gray-100 mb-4 md:mb-0"
            />

            <PhotoDetailClient initialCreatedAt={photo.createdAt} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 w-full">
            <div className="relative group">
              <div className="relative rounded-3xl overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  layout="responsive"
                  className="w-full h-auto object-cover transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {photo.cameraSpecs && Object.keys(photo.cameraSpecs).length > 0 && (
              <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-3xl p-4 md:p-6 border border-white/30 shadow-lg">
                <div className="flex items-center mb-4">
                  <Camera className="w-5 h-5 md:w-6 md:h-6 mr-3 text-blue-500" />
                  <TypeWriter
                    className="text-xl md:text-2xl text-gray-800 dark:text-gray-100"
                    text="Camera Settings"
                    delay={80}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  {Object.entries(photo.cameraSpecs).map(
                    ([key, value]) =>
                      value && (
                        <div
                          key={key}
                          className="backdrop-blur-sm bg-white/20 dark:bg-gray-700/20 rounded-xl p-2 md:p-4 hover:bg-white/30 transition-colors"
                        >
                          <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 block mb-1 font-mont uppercase tracking-wider">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </span>
                          <span className="text-sm md:text-lg font-medium text-gray-800 dark:text-gray-200 font-roboto">
                            {value}
                          </span>
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}

            {photo.story && (
              <div className="backdrop-blur-md bg-white/40 dark:bg-gray-800/40 rounded-3xl p-4 md:p-6 border border-white/30 shadow-lg">
                <div className="flex items-center mb-4">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 mr-3 text-green-500" />
                  <TypeWriter
                    className="text-xl md:text-2xl text-gray-800 dark:text-gray-100"
                    text="Photo Story"
                    delay={80}
                  />
                </div>
                <div className="prose prose-sm md:prose-lg dark:prose-invert max-w-none">
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-libre">
                    {photo.story}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
