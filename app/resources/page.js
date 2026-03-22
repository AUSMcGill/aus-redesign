import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getResources } from "@/lib/resources";

export default async function ResourcesPage() {
  const resourceGroups = await getResources();

  return (
    <div className="min-h-dvh bg-zinc-50 font-sans">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-base font-semibold text-zinc-950">
            Arts Undergraduate Society
          </Link>
          <Button asChild variant="outline" className="h-10 px-4">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section className="space-y-4">
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl">
            Resources for students and affiliated clubs.
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-7 text-zinc-600 sm:text-lg">
            Choose the area that matches your current need and we will point you
            to the right templates, contacts, and timelines.
          </p>
        </section>

        <section aria-label="Resource groups" className="grid gap-4 md:grid-cols-2">
          {resourceGroups.map((resource) => (
            <Card key={resource.title}>
              <CardHeader>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full sm:w-auto">
                  <a href={resource.href} aria-label={`${resource.cta} via email`}>
                    {resource.cta}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h2 className="text-balance text-2xl font-semibold text-zinc-950">
            Cannot find what you need?
          </h2>
          <p className="mt-2 max-w-prose text-pretty text-sm leading-6 text-zinc-600">
            Send one message with your student number, course, and a short
            description of your request. Our team will route you to the best
            support channel.
          </p>
          <div className="mt-4">
            <Button asChild>
              <a
                href="mailto:contact@aus.org.au?subject=General%20support%20request"
                aria-label="Email AUS for general support"
              >
                Contact AUS support
              </a>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
