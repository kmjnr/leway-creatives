"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqListItem {
  question: string;
  answer: string;
}

interface FaqListProps {
  items: readonly FaqListItem[];
  /**
   * Namespaces the button/panel ids so two accordions can live on one page
   * without their aria-controls colliding.
   */
  idPrefix: string;
  /** Closed-state surface. The open state is always mint. */
  closedTone?: "paper-2" | "paper";
  className?: string;
}

function FaqRow({
  item,
  index,
  idPrefix,
  closedTone,
}: {
  item: FaqListItem;
  index: number;
  idPrefix: string;
  closedTone: "paper-2" | "paper";
}) {
  const [open, setOpen] = useState(false);
  const uid = useId();
  const panelId = `${idPrefix}-panel-${index}-${uid}`;
  const buttonId = `${idPrefix}-button-${index}-${uid}`;

  return (
    <div
      className={cn(
        "rounded-card transition-colors",
        open ? "bg-leway-mint" : closedTone === "paper" ? "bg-leway-paper" : "bg-leway-paper-2",
      )}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full flex items-center justify-between gap-6 text-left px-6 py-5 min-h-[64px]"
        >
          <span className="font-display text-lg md:text-xl text-leway-dark leading-snug">
            {item.question}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300",
              open ? "bg-leway-green text-leway-dark rotate-45" : "bg-leway-dark/10 text-leway-dark",
            )}
          >
            <Plus size={16} strokeWidth={2.25} />
          </span>
        </button>
      </h3>
      {/* Kept in the DOM so aria-controls always resolves; `hidden` does the work. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
      >
        <p className="font-body text-base text-leway-dark/70 px-6 pb-6 max-w-[64ch]">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

/** The site's only disclosure pattern — FAQ sections and service Q&A. */
export default function FaqList({
  items,
  idPrefix,
  closedTone = "paper-2",
  className,
}: FaqListProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => (
        <FaqRow
          key={item.question}
          item={item}
          index={i}
          idPrefix={idPrefix}
          closedTone={closedTone}
        />
      ))}
    </div>
  );
}
