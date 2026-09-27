"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
  ReactElement,
  cloneElement,
} from "react";
import { createPortal } from "react-dom";

// Types
interface DropdownProps {
  trigger: ReactElement;
  children: ReactNode;
  placement?:
    | "bottom-left"
    | "bottom-right"
    | "top-left"
    | "top-right"
    | "bottom-center"
    | "top-center";
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  closeOnSelect?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  disabled?: boolean;
  className?: string;
  overlayClassName?: string;
  offset?: { x: number; y: number };
  zIndex?: number;
  matchTriggerWidth?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface Position {
  top: number;
  left: number;
}

// Main Dropdown Component
export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  placement = "bottom-left",
  closeOnOutsideClick = true,
  closeOnEscape = true,
  closeOnSelect = false,
  onOpen,
  onClose,
  disabled = false,
  className = "",
  overlayClassName = "",
  offset = { x: 0, y: 4 },
  zIndex = 50,
  matchTriggerWidth = false,
  open: controlledOpen,
  onOpenChange,
}) => {
  const isControlled = controlledOpen !== undefined;

  // Internal state — only used when uncontrolled
  const [internalOpen, setInternalOpen] = useState(false);

  // Single source of truth: controlled prop wins when provided
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>();
  const triggerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Central setter — syncs internal state and fires external callback
  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
      if (next) onOpen?.();
      else onClose?.();
    },
    [isControlled, onOpenChange, onOpen, onClose],
  );

  const open = useCallback(() => {
    if (!disabled) setOpen(true);
  }, [disabled, setOpen]);
  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  // ---------------------------------------------------------------------------
  // Core position calculation
  // ---------------------------------------------------------------------------
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !dropdownRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const ox = offset.x;
    const oy = offset.y;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "bottom-left":
        top = triggerRect.bottom + oy;
        left = triggerRect.left + ox;
        break;
      case "bottom-right":
        top = triggerRect.bottom + oy;
        left = triggerRect.right - dropdownRect.width - ox;
        break;
      case "bottom-center":
        top = triggerRect.bottom + oy;
        left =
          triggerRect.left +
          triggerRect.width / 2 -
          dropdownRect.width / 2 +
          ox;
        break;
      case "top-left":
        top = triggerRect.top - dropdownRect.height - oy;
        left = triggerRect.left + ox;
        break;
      case "top-right":
        top = triggerRect.top - dropdownRect.height - oy;
        left = triggerRect.right - dropdownRect.width - ox;
        break;
      case "top-center":
        top = triggerRect.top - dropdownRect.height - oy;
        left =
          triggerRect.left +
          triggerRect.width / 2 -
          dropdownRect.width / 2 +
          ox;
        break;
    }

    if (left + dropdownRect.width > vw - 10)
      left = vw - dropdownRect.width - 10;
    if (left < 10) left = 10;
    if (top + dropdownRect.height > vh - 10)
      top = triggerRect.top - dropdownRect.height - oy;
    if (top < 10) top = triggerRect.bottom + oy;

    setPosition({ top, left });
    if (matchTriggerWidth) setTriggerWidth(triggerRect.width);
  }, [placement, offset.x, offset.y, matchTriggerWidth]);

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      calculatePosition();
      rafRef.current = null;
    });
  }, [calculatePosition]);

  // ---------------------------------------------------------------------------
  // Listeners
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;
    scheduleUpdate();

    // Find all scrollable parents
    const scrollableParents: Element[] = [];
    let parent = triggerRef.current?.parentElement;
    while (parent) {
      const hasOverflow =
        getComputedStyle(parent).overflow === "auto" ||
        getComputedStyle(parent).overflow === "scroll" ||
        getComputedStyle(parent).overflowY === "auto" ||
        getComputedStyle(parent).overflowY === "scroll";
      if (hasOverflow) {
        scrollableParents.push(parent);
      }
      parent = parent.parentElement;
    }

    // Add scroll listeners to all scrollable parents
    scrollableParents.forEach((el) => {
      el.addEventListener("scroll", scheduleUpdate, { passive: true });
    });

    document.addEventListener("scroll", scheduleUpdate, {
      capture: true,
      passive: true,
    });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    const ro = new ResizeObserver(scheduleUpdate);
    if (triggerRef.current) ro.observe(triggerRef.current);
    return () => {
      scrollableParents.forEach((el) => {
        el.removeEventListener("scroll", scheduleUpdate);
      });
      document.removeEventListener("scroll", scheduleUpdate, { capture: true });
      window.removeEventListener("resize", scheduleUpdate);
      ro.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isOpen, scheduleUpdate]);

  useEffect(() => {
    if (!closeOnOutsideClick || !isOpen) return;
    const handle = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(t) &&
        triggerRef.current &&
        !triggerRef.current.contains(t)
      )
        close();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [isOpen, closeOnOutsideClick, close]);

  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [isOpen, closeOnEscape, close]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Escape" && closeOnEscape && isOpen) {
        e.preventDefault();
        close();
        triggerRef.current?.focus();
      }
      if ((e.key === "Enter" || e.key === " ") && !isOpen) {
        e.preventDefault();
        open();
      }
    },
    [isOpen, closeOnEscape, close, open, disabled],
  );

  const handleDropdownClick = useCallback(
    (e: React.MouseEvent) => {
      if (!closeOnSelect) return;
      if ((e.target as HTMLElement).closest('a, button, [role="menuitem"]'))
        close();
    },
    [closeOnSelect, close],
  );

  // ---------------------------------------------------------------------------
  // Trigger clone
  // ---------------------------------------------------------------------------
  type TriggerProps = React.HTMLAttributes<HTMLElement> & {disabled: boolean};
  
  const triggerElement = cloneElement(trigger, {
    ref: triggerRef,
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      toggle();
      (trigger.props as TriggerProps).onClick?.(e);
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
      handleKeyDown(e);
      (trigger.props as TriggerProps).onKeyDown?.(e);
    },
    "aria-expanded": isOpen,
    "aria-haspopup": true as const,
    disabled: disabled || (trigger.props as TriggerProps).disabled,
  } as Partial<React.HTMLAttributes<HTMLElement>>);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  const dropdownPanel =
    isOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={dropdownRef}
            role="menu"
            aria-hidden={!isOpen}
            tabIndex={-1}
            className={`fixed bg-white drop-animate rounded-lg shadow-lg border border-gray-200 ${className}`}
            style={{
              top: position.top,
              left: position.left,
              zIndex,
              ...(matchTriggerWidth && triggerWidth
                ? { width: triggerWidth }
                : {}),
            }}
            onClick={handleDropdownClick}
          >
            {children}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {triggerElement}
      {dropdownPanel}
    </>
  );
};

// Pre-built dropdown content components for common use cases
export const DropdownMenu: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`py-1 ${className}`}>{children}</div>
);

export const DropdownItem: React.FC<{
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  variant?: "default" | "danger";
}> = ({
  children,
  onClick,
  href,
  disabled = false,
  className = "",
  variant = "default",
}) => {
  const baseClasses =
    "block w-full text-left px-4 py-2 transition-colors hover:bg-neutral-50";
  const variantClasses = {
    default: "subheadline-medium text-neutral-700",
    danger: "text-warning-600 subheadline-medium",
  };
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const classes = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        role="menuitem"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      role="menuitem"
    >
      {children}
    </button>
  );
};

export const DropdownSeparator: React.FC<{ className?: string }> = ({
  className = "",
}) => <div className={`border-t border-gray-100 my-1 ${className}`} />;

export const DropdownHeader: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={`px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide ${className}`}
  >
    {children}
  </div>
);
