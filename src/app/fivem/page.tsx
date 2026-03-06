import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FiveMStore from './components/FiveMStore';

export const metadata: Metadata = {
  title: 'FiveM Store — Foundation 1899 Scripts',
  description:
    'Foundation 1899 FiveM scripts — coming soon. Premium scripts for immersive FiveM roleplay, powered by Tebex.',
  keywords: [
    'FiveM scripts',
    'Foundation 1899 FiveM store',
    'FiveM Tebex store',
    'FiveM roleplay scripts',
    'FiveM economy script',
  ],
};

export default function FiveMPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-obsidian)' }}>
      <Header />
      <FiveMStore />
      <Footer />
    </main>
  );
}
