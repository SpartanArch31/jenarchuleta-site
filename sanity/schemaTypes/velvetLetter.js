import { defineType, defineField } from 'sanity';

/*
 * Velvet Letter — reader-exclusive updates shown ONLY on the private,
 * password-gated /velvet page. Kept as a separate type from the public
 * "Journal Post" so these never leak to /journal, search, or the sitemap.
 * Jen creates these in /studio like a journal post: title, date, photo,
 * message — then Publish. The next load of /velvet shows the new letter.
 */
export default defineType({
  name: 'velvetLetter',
  title: 'Velvet Letters',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: 'Optional. Upload the photo for this update.',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'body',
      title: 'Message',
      type: 'blockContent',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'image' },
  },
});
