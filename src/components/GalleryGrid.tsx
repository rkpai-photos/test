"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Masonry from "react-masonry-css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Image {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryGridProps {
  images: Image[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const items = gsap.utils.toArray(".gallery-item");
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top bottom-=100",
                end: "bottom top+=100",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      }
    }, gridRef);

    return () => ctx.revert();
  }, []);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div ref={gridRef}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.map((image) => (
          <Link
            href={`/stories/${image.id}`}
            key={image.id}
            className="block mb-4 gallery-item"
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <span className="text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">
                  View Story
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Masonry>
    </div>
  );
}
