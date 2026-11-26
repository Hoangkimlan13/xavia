
"use client";

import styles from "./Toast.module.css";

export default function Toast({ toast }) {
  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div
      className={`${styles.toast} ${
        isError ? styles.toastError : styles.toastSuccess
      }`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.icon} aria-hidden="true">
        {isError ? "!" : "✓"}
      </span>

      <span className={styles.message}>{toast.message}</span>
    </div>
  );
}
