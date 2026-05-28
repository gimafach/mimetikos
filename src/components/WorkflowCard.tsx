import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface Step {
  icon?: LucideIcon;
  isBrain?: boolean;
  system: string;
  action: string;
  detail?: string;
}

export interface Workflow {
  tag: string;
  title: string;
  scenario: string;
  steps: Step[];
}

const STEP_MS = 1600;
const PAUSE_MS = 2400;

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function WorkflowCard({ wf }: { wf: Workflow }) {
  const [active, setActive] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px 0px" });
  const stop = useRef(false);

  useEffect(() => {
    if (!inView) {
      stop.current = true;
      return;
    }
    stop.current = false;

    (async () => {
      await sleep(600);
      while (!stop.current) {
        for (let i = 0; i < wf.steps.length; i++) {
          if (stop.current) return;
          setActive(i);
          await sleep(STEP_MS);
        }
        if (stop.current) return;
        await sleep(PAUSE_MS);
        setActive(-1);
        await sleep(400);
      }
    })();

    return () => {
      stop.current = true;
      setActive(-1);
    };
  }, [inView, wf.steps.length]);

  return (
    <div ref={ref} className="w-full rounded-2xl bg-card px-6 py-8 md:px-10">
      <span className="inline-block rounded-full border border-primary/40 px-3 py-0.5 text-xs font-medium text-primary">
        {wf.tag}
      </span>
      <h3 className="mt-3 text-xl font-semibold">{wf.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{wf.scenario}</p>

      <div className="mt-8 flex flex-col items-center">
        {wf.steps.map((step, i) => {
          const Icon = step.icon;
          const isActive = active === i;
          const isDone = active > i && active !== -1;
          return (
            <div key={i} className="flex w-full flex-col items-center">
              {/* Node */}
              <motion.div
                animate={{
                  opacity: active === -1 ? 1 : isActive ? 1 : isDone ? 0.42 : 0.28,
                }}
                transition={{ duration: 0.35 }}
                className={`flex w-full items-start gap-4 rounded-xl border-2 p-4 transition-colors duration-300 ${
                  isActive ? "border-primary" : "border-border"
                }`}
              >
                {/* Icon */}
                <div
                  className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                    step.isBrain
                      ? "border-2 border-primary bg-primary/10"
                      : isActive
                        ? "border border-primary/50 bg-primary/5"
                        : "border border-border bg-background"
                  }`}
                >
                  {step.isBrain ? (
                    <span className="text-base font-semibold leading-none text-primary">
                      M
                    </span>
                  ) : Icon ? (
                    <Icon
                      className={`h-5 w-5 transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                      strokeWidth={1.5}
                    />
                  ) : null}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-muted-foreground">{step.system}</div>
                  <div className="mt-0.5 text-sm font-medium">{step.action}</div>
                  <AnimatePresence>
                    {isActive && step.detail && (
                      <motion.p
                        key="detail"
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 4 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs leading-relaxed text-muted-foreground"
                      >
                        {step.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Connector + packet */}
              {i < wf.steps.length - 1 && (
                <div className="relative h-10 w-px bg-border/40">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key={`pk${i}`}
                        className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary"
                        initial={{ top: -6 }}
                        animate={{ top: "calc(100% - 6px)" }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: (STEP_MS / 1000) * 0.62,
                          ease: "easeIn",
                        }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
