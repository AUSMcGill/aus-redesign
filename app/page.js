import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PartnersCarousel } from "@/components/partners-carousel";
import { getResources } from "@/lib/resources";
import siteHero from "@/public/site-hero.svg";

export default async function Home() {
  const resources = await getResources();
  const highlights = resources.slice(0, 3).map((resource) => ({
    title: resource.title,
    description: resource.description,
  }));

  return (
    <div className="min-h-dvh bg-zinc-50 font-sans">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-base font-semibold text-zinc-950">
            Arts Undergraduate Society
          </Link>
          <nav className="flex items-center gap-3">
            <Button asChild variant="outline" className="h-10 px-4">
              <Link href="/resources">Resources</Link>
            </Button>
            <Button asChild className="h-10 px-4">
              <a
                href="mailto:contact@aus.org.au"
                aria-label="Contact the Arts Undergraduate Society"
              >
                Contact us
              </a>
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-medium text-zinc-500">AUS at UNSW</p>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
              Support, resources, and community for Arts students.
            </h1>
            <p className="max-w-prose text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
              Use the updated resources hub to find funding documents, policy
              guides, event support, and practical next steps for students and
              club leaders.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/resources">Explore resources</Link>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a
                  href="mailto:contact@aus.org.au"
                  aria-label="Email AUS for support"
                >
                  Ask for support
                </a>
              </Button>
            </div>
          </div>
          <Image
            src={siteHero}
            alt="Students representing the Arts Undergraduate Society community"
            width={1200}
            height={675}
            className="h-auto w-full rounded-2xl border border-zinc-200 object-cover"
            priority
          />
        </section>

        <section aria-labelledby="highlights-heading" className="space-y-5">
          <h2
            id="highlights-heading"
            className="text-balance text-2xl font-semibold text-zinc-950 sm:text-3xl"
          >
            What you can do from here
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/resources">Open resources</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <PartnersCarousel />
      </main>
    </div>
  );
}
