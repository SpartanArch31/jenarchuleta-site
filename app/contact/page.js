import { redirect } from 'next/navigation';

// /contact is not its own page. Contact lives on Thank You.
export default function ContactPage() {
  redirect('/thank-you#contact');
}
