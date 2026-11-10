import { redirect } from 'next/navigation';

// Pups of the Podcast live on the podcast page. This path stays so old links work.
export default function PupsPage() {
  redirect('/podcast#pups');
}
