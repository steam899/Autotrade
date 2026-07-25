// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Menggabungkan kelas Tailwind CSS dengan selamat tanpa konflik spesifikasi.
 * Sangat berguna untuk komponen UI dinamik.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Memformat nombor kepada representasi mata wang USD yang kemas.
 */
export function formatCurrency(value: number, minimumFractionDigits = 2) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
  }).format(value);
}

/**
 * Memformat peratusan dengan satu tempat perpuluhan.
 */
export function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`;
}
