'use client';
// Client boundary: keeps `sanity` (which uses React context) out of the
// server component graph so the build can collect the /studio route.
import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export default function Studio() {
  return <NextStudio config={config} />;
}
