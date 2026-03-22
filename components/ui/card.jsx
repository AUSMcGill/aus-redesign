import { cn } from "@/lib/utils";

function Card({ className, ...props }) {
  return (
    <article
      className={cn("rounded-2xl border border-zinc-200 bg-white", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return <header className={cn("space-y-2 p-6", className)} {...props} />;
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      className={cn("text-balance text-lg font-semibold text-zinc-950", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-pretty text-sm leading-6 text-zinc-600", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return <div className={cn("space-y-4 px-6 pb-6", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
