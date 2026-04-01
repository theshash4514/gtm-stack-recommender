import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <footer className="text-center py-8 text-[#444141]/40 text-sm bg-white border-t border-[#efefef]">
        <a
          href="https://crescendo.so"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#e45337] transition-colors font-semibold"
        >
          Powered by Crescendo
        </a>
      </footer>
    </main>
  );
}
