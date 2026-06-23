import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      project: search.project as string | undefined,
      experience: search.experience as string | undefined,
    }
  },
  head: () => ({
    meta: [
      { title: "Simon Rödig — Human-Centric Design Accelerated by AI" },
      {
        name: "description",
        content:
          "Portfolio of Simon Rödig, HCI graduate and UX/Product Designer based in Germany. Combining design craft with engineering to ship human-centric, AI-augmented products.",
      },
      { property: "og:title", content: "Simon Rödig — Human-Centric Design Accelerated by AI" },
      {
        property: "og:description",
        content:
          "Portfolio of Simon Rödig, HCI graduate and UX/Product Designer based in Germany.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="md:snap-y md:snap-proximity md:h-screen md:overflow-y-scroll bg-paper text-ink no-scrollbar">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
    </main>
  );
}
