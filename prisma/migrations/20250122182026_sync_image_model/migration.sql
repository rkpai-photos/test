-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "cameraSpecsId" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CameraSpecs" (
    "id" TEXT NOT NULL,
    "camera" TEXT NOT NULL,
    "lens" TEXT NOT NULL,
    "focalLength" TEXT NOT NULL,
    "aperture" TEXT NOT NULL,
    "shutterSpeed" TEXT NOT NULL,
    "iso" TEXT NOT NULL,

    CONSTRAINT "CameraSpecs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_cameraSpecsId_key" ON "Image"("cameraSpecsId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_cameraSpecsId_fkey" FOREIGN KEY ("cameraSpecsId") REFERENCES "CameraSpecs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
