import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">The page you’re looking for doesn’t exist.</p>
      <div className="mt-6">
        <Link href="/" className="underline underline-offset-4">
          Go back home
        </Link>
      </div>
    </div>
  );
}

