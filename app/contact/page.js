import { redirect } from 'next/navigation';

// /contact is not its own page. The contact section lives on /media.
export default function ContactPage() {
  redirect('/media#contact');
}
