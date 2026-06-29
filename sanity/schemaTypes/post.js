import { defineType, defineField } from 'sanity';

export const CATEGORIES = [
  'Podcast',
  'Faith',
  'Family',
  'Advocacy',
  'Health & Wellness',
  'Behind the Book',
  'Journal',
];

export default defineType({
  name: 'post',
  title: 'Journal Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: CATEGORIES.map((c) => ({ title: c, value: c })), layout: 'dropdown' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (feed + SEO fallback)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'affiliateLinks',
      title: 'Affiliate links',
      description: 'Renders a list + an FTC disclosure line automatically.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        },
      ],
    }),
    defineField({
      name: 'sponsor',
      title: 'Sponsor',
      description: 'Fill in for a “Sponsored by” post; leave empty otherwise.',
      type: 'object',
      fields: [
        { name: 'name', title: 'Sponsor name', type: 'string' },
        { name: 'url', title: 'Sponsor URL', type: 'url' },
        { name: 'disclosure', title: 'Disclosure line', type: 'string' },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 2,
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
    select: { title: 'title', subtitle: 'category', media: 'heroImage' },
  },
});
