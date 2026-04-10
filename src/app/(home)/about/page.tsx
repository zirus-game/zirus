export default function AboutPage() {
    return (
        <main className="flex w-full max-w-3xl flex-col gap-8 px-6 py-10 text-start">
            <header className="space-y-3">
                <h1>About Zirus</h1>
                <p className="body text-lg leading-8 text-blue-100/85">
                    Zirus is a web game built around a simple fantasy: you are
                    the virus. Your job is to spread across a computer, solve
                    obstacles, and steadily take control without getting caught.
                </p>
            </header>

            <section className="space-y-3">
                <h2>Core Goal</h2>
                <p className="body leading-8 text-blue-100/80">
                    The current design target is to infect documents until you
                    reach 50% disk occupation. That goal is not just about raw
                    expansion. Every move is meant to balance growth, timing,
                    and risk.
                </p>
            </section>

            <section className="space-y-3">
                <h2>What Makes It Interesting</h2>
                <p className="body leading-8 text-blue-100/80">
                    Zirus is planned as more than a clicker or idle sim. The
                    game is being shaped around puzzle-solving, stealth, and
                    system control. You are not only infecting files, but also
                    managing the danger of being discovered by the
                    computer&apos;s imaginary user before they can wipe you out.
                </p>
            </section>

            <section className="space-y-3">
                <h2>Current Direction</h2>
                <p className="body leading-8 text-blue-100/80">
                    The project has been under active development since March
                    2026. The foundation already includes account flows and
                    persistent game runs, with the larger gameplay loop still
                    being expanded. The aim is to turn that foundation into a
                    tense progression game where every infected file pushes you
                    closer to total dominance.
                </p>
            </section>
        </main>
    );
}
