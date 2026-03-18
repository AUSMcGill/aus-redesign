import { ReactNode } from 'react';

interface TimelineItem {
  title: string;
  period: string;
  description: ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative border-l border-border pl-6 space-y-8">
      {items.map((item, index) => (
        <div key={`${item.title}-${item.period}-${index}`} className="relative">
          <div className="absolute -left-[11px] mt-1 h-3 w-3 rounded-full bg-primary shadow-sm" />
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{item.period}</p>
            <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
            <div className="text-sm text-muted-foreground">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

