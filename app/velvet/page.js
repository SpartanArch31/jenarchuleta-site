import VelvetClient from './VelvetClient';
import { getVelvetLetters } from '../sanity/queries';

export const metadata = {
  title: 'The Velvet Pages',
  description: 'Exclusive content for readers of Beyond the Velvet Ropes.',
  robots: { index: false, follow: false },
};

export default async function VelvetPage() {
  const letters = await getVelvetLetters().catch(() => []);
  return <VelvetClient letters={letters} />;
}
