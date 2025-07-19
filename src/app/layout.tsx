
import type { Metadata } from 'next';
import { Roboto_Flex, Roboto_Mono, Roboto_Serif, Roboto_Slab } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper';

const robotoFlex = Roboto_Flex({
  variable: '--font-roboto-flex',
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  display: 'swap',
});

const robotoSerif = Roboto_Serif({
  variable: '--font-roboto-serif',
  subsets: ['latin'],
  display: 'swap',
});

const robotoSlab = Roboto_Slab({
  variable: '--font-roboto-slab',
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'YGDesign',
  description: 'A portfolio and artwork showcase application.',
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/artfolio-lg8he.firebasestorage.app/o/favicon%20(1).ico?alt=media&token=754d888c-a357-4da7-89b1-7bf347fc5562',
  },
  other: {
    'google-adsense-account': 'ca-pub-8169863200727481',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8169863200727481"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={cn(
          robotoFlex.variable,
          robotoMono.variable,
          robotoSerif.variable,
          robotoSlab.variable,
          'font-sans',
          'antialiased min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden'
        )}
      >
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
