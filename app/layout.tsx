import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/ClientProviders';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Nano Banana | Future of Freshness',
    description: 'Premium, cold-pressed, completely natural juices.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={outfit.className}>
                <ClientProviders>{children}</ClientProviders>
            </body>
        </html>
    );
}
