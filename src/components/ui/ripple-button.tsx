"use client";

import React, { useMemo, useState } from "react";

import type { CSSProperties, MouseEvent, ReactNode } from "react";

interface RippleState {
  key: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface RippleButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  rippleColor?: string;
  rippleDuration?: number;
}

const JS_RIPPLE_KEYFRAMES = `
  @keyframes js-ripple-animation {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }
  .animate-js-ripple-effect {
    animation: js-ripple-animation var(--ripple-duration) ease-out forwards;
  }
`;

const RippleButton = ({
  children,
  href,
  onClick,
  className = "",
  disabled = false,
  rippleColor,
  rippleDuration = 600,
}: RippleButtonProps) => {
  const [jsRipples, setJsRipples] = useState<RippleState[]>([]);

  const determinedJsRippleColor = useMemo(() => {
    return (
      rippleColor ??
      "var(--button-ripple-color, rgba(0, 0, 0, 0.1))"
    );
  }, [rippleColor]);

  const createJsRipple = (event: MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: RippleState = {
      key: Date.now() + Math.floor(Math.random() * 1000),
      x,
      y,
      size,
      color: determinedJsRippleColor,
    };

    setJsRipples((prev) => [...prev, newRipple]);
    window.setTimeout(() => {
      setJsRipples((current) => current.filter((r) => r.key !== newRipple.key));
    }, rippleDuration);
  };

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    createJsRipple(event);

    if (onClick) onClick(event);

    if (href) {
      // Open in a new tab and avoid opener access for safety.
      const w = window.open(href, "_blank", "noopener,noreferrer");
      if (w) w.opener = null;
    }
  };

  const buttonClasses = [
    "relative border-none overflow-hidden isolate transition-all duration-200 cursor-pointer px-4 py-2 bg-blue-600 hover:opacity-90 text-white rounded-lg",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: JS_RIPPLE_KEYFRAMES }} />
      <button
        type="button"
        className={buttonClasses}
        onClick={handleButtonClick}
        disabled={disabled}
      >
        <span className="relative z-10 pointer-events-none">{children}</span>
        <div className="absolute inset-0 pointer-events-none z-0">
          {jsRipples.map((ripple) => (
            <span
              key={ripple.key}
              className="absolute rounded-full animate-js-ripple-effect"
              style={
                {
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                  backgroundColor: ripple.color,
                  ["--ripple-duration" as string]: `${rippleDuration}ms`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </button>
    </>
  );
};

export { RippleButton };

