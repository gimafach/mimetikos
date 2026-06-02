import { useState } from "react";
import { CheckCheck, ArrowRight } from "lucide-react";

type Phase = "idle" | "asking" | "done";

interface DemoButtonProps {
  href: string;
  label: string;
  confirmMessage: string;
  phonePlaceholder?: string;
  phoneButtonLabel?: string;
  className?: string;
}

export function DemoButton({
  href,
  label,
  confirmMessage,
  phonePlaceholder = "Il tuo numero di telefono",
  phoneButtonLabel = "Conferma",
  className = "",
}: DemoButtonProps) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [phone, setPhone] = useState("");

  const spacingClass = className
    .split(" ")
    .filter((c) => /^(mt|mb|ml|mr|mx|my)-/.test(c))
    .join(" ");

  if (phase === "done") {
    return (
      <span className={`${spacingClass} inline-flex items-center gap-2 text-sm font-medium text-primary`}>
        <CheckCheck className="h-4 w-4" />
        {confirmMessage}
      </span>
    );
  }

  if (phase === "asking") {
    return (
      <div className={`${spacingClass} flex flex-wrap items-center justify-center gap-2`}>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setPhase("done")}
          placeholder={phonePlaceholder}
          autoFocus
          className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={() => setPhase("done")}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          {phoneButtonLabel} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        setPhase("asking");
      }}
    >
      {label}
    </a>
  );
}
