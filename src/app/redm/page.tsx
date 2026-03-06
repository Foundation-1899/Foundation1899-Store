import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RedMStore from './components/RedMStore';

export const metadata: Metadata = {
  title: 'RedM Store — Foundation 1899 Scripts',
  description:
    'Browse and purchase Foundation 1899 RedM scripts. Economy systems, jobs, RP mechanics, UI packs, and more — all powered by Tebex.',
  keywords: [
    'RedM scripts',
    'Foundation 1899 store',
    'RedM Tebex store',
    'Red Dead Roleplay scripts',
    'RedM economy script',
    'RedM jobs script',
  ],
};

export default function RedMPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-obsidian)' }}>
      <Header />
      <RedMStore />
      <Footer />
    </main>
  );
}
