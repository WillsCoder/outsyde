"use client";

import { useRef, useState, KeyboardEvent, ClipboardEvent } from "react";

type Props = {
  name: string;
  onChange?: (value: string) => void;
};

const OTPInput = ({ name, onChange }: Props) => {
  const [values, setValues] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const combined = values.join("");

  const update = (index: number, val: string) => {
    const next = [...values];
    next[index] = val.slice(-1); // only last char
    setValues(next);
    onChange?.(next.join(""));

    // Move forward
    if (val && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const next = [...values];
    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });
    setValues(next);
    onChange?.(next.join(""));
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={combined} />

      <div className="flex gap-2 justify-center">
        {values.map((val, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={val}
            onChange={(e) => update(i, e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all
              ${
                val
                  ? "border-brand-orange text-brand-night bg-brand-orange/5"
                  : "border-brand-night/15 text-brand-night bg-white"
              }
              focus:border-brand-orange focus:bg-brand-orange/5
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default OTPInput;
