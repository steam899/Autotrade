// app/layout.tsx
import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'Alpha.Pro // Multi-Platform Quantitative Engine',
  description: 'Hedge fund execution terminal with machine-learning probabilities and arbitrage scanner.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="bg-[#090909] text-white font-sans selection:bg-orange-500 selection:text-black antialiased">
        {children}
      </body>
    </html>
  );
}
