import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import SlideShow from "@/sections/SlideShow";
import Footer from "@/sections/Footer";
import { fetchPhotos } from "@/lib/fetch"; 

export default async function Home() {
  const photos = await fetchPhotos();
  const projects = photos.slice(0, 5).map((photo) => ({
    id: photo.id,
    src: photo.src,
    alt: photo.alt,
    story: photo.story,
  }));

  return (
    <>
      <Header />
      <Hero />
      <SlideShow />
      <About />
      <Projects projects={projects} />
      <Footer />
    </>
  );
}
