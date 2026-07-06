import VelvetClient from './VelvetClient';

export const metadata = {
  title: 'The Velvet Pages',
  description: 'Exclusive content for readers of Beyond the Velvet Ropes.',
  robots: { index: false, follow: false },
};

export default function VelvetPage() {
  return <VelvetClient />;
}
