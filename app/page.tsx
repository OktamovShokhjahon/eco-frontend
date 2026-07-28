import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { TasksSection } from "@/components/tasks-section"
import { LeaderboardSection } from "@/components/leaderboard-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <TasksSection />
        <LeaderboardSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
