"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";

const partners = ["Logoipsum", "LOCO", "Logo-M", "Logoipsum", "Logois"];

function PartnerItem({ name }) {
  return (
    <li className="w-44 shrink-0 rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <Image
          src="/file.svg"
          alt={`${name} placeholder mark`}
          width={32}
          height={32}
          className="size-8"
        />
        <span className="truncate text-sm font-medium text-zinc-700">{name}</span>
      </div>
    </li>
  );
}

export function PartnersCarousel() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = isInView && !prefersReducedMotion;
  const loopedPartners = [...partners, ...partners];

  return (
    <section aria-labelledby="partners-heading" className="space-y-4">
      <h2
        id="partners-heading"
        className="text-balance text-2xl font-semibold text-zinc-950 sm:text-3xl"
      >
        We&apos;ve partnered with:
      </h2>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 p-3"
      >
        <motion.ul
          className="flex w-max gap-3"
          animate={shouldAnimate ? { x: ["0%", "-50%"] } : { x: "0%" }}
          transition={
            shouldAnimate
              ? { duration: 20, ease: "linear", repeat: Infinity }
              : { duration: 0 }
          }
        >
          {loopedPartners.map((name, index) => (
            <PartnerItem key={`${name}-${index}`} name={name} />
          ))}
        </motion.ul>
      </div>
      <p className="text-pretty text-sm text-zinc-500">
        Placeholder marks are temporary while final partner assets are being
        prepared.
      </p>
    </section>
  );
}
