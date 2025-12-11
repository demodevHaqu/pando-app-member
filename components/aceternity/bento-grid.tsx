"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-xl border border-white/[0.08] bg-cyber-mid p-4 transition duration-200 hover:border-electric-blue/50 hover:shadow-xl hover:shadow-electric-blue/10",
        onClick && "cursor-pointer",
        className
      )}
    >
      {header}
      <div className="z-10 transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mb-2 mt-2 font-bold text-white">{title}</div>
        <div className="text-sm text-white/60">{description}</div>
      </div>
    </motion.div>
  );
};

export const BentoGridItemGlow = ({
  className,
  title,
  description,
  header,
  icon,
  glowColor = "rgba(0, 217, 255, 0.3)",
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  glowColor?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-xl border border-white/[0.08] bg-cyber-mid p-4 transition duration-200",
        onClick && "cursor-pointer",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/bento:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
      />
      {header}
      <div className="z-10 transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mb-2 mt-2 font-bold text-white">{title}</div>
        <div className="text-sm text-white/60">{description}</div>
      </div>
    </motion.div>
  );
};
