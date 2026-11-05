// Full Velvet Circle discussion guide, kept here so it can be emailed to new
// members. The shop shows only the title, the intro, and questions 1 and 2.

export const BOOK_CLUB_GUIDE = {
  title: 'Beyond the Velvet Ropes: A Book Club Discussion Guide by Jennifer Walcott Archuleta',
  intro: 'Beyond the Velvet Ropes is Jennifer Walcott Archuleta\'s memoir of growing up in Youngstown, Ohio, chasing a dream of California, and finding her way through the bright and hard seasons that followed. She writes about grit, faith, family, forgiveness, and the long road back to herself. These questions are meant to help your group talk about the book and about your own stories.',
  questions: [
    'As a girl, Jen watched the Weather Channel and waited for Los Angeles to come up on the map. What did California stand for in her mind, and did the real place match the dream?',
    'Lying in the snow behind the restaurant at twelve, she thought, "there\'s got to be more than this." Have you had a moment like that? What did you do with it?',
    'She says your first hometown "fits in your pocket." How does Youngstown, a steel town with closing mills, shape who she becomes, even after she leaves?',
    'The book often sets the life people see against the life being lived. Where do you notice the biggest gap between the two, and why do you think she kept smiling through it?',
    'Jen describes the Playboy world, including being named Miss August 2001, as a place that gave her sisterhood and stability. How did that chapter of her life surprise you?',
    'In Chapter Sixteen she writes, "The Bel-Air gates were beautiful, but at the end of the day, they were still gates." What does she mean by the velvet ropes, and what do they cost?',
    'Faith runs through the whole book. How does her relationship with God change from her early years to the end of the story?',
    'She writes about forgiving people "without ever getting an apology," and says accountability and forgiveness "go hand in hand." Do you agree? Is forgiving yourself harder than forgiving others?',
    'Family, from her parents and siblings to her husband Adam, is a steady thread. Who showed up for her, and how did those people help her rise?',
    'By the last chapter, what she craves most is stillness: grass under her feet and her children\'s laughter. How does motherhood change her idea of a full life?',
    'The epilogue says this book "isn\'t a highlight reel." Why do you think she chose to share the messy parts, and what did that honesty mean to you as a reader?',
  ],
  closing: 'We would love to hear what this book stirred in you. Please share your thoughts with the book club.',
};

export const BOOK_CLUB_SNEAK_PEEK = {
  title: BOOK_CLUB_GUIDE.title,
  intro: BOOK_CLUB_GUIDE.intro,
  questions: BOOK_CLUB_GUIDE.questions.slice(0, 2),
};

// Plain text for emailing the full guide to a new member.
export function bookClubGuidePlainText() {
  const numbered = BOOK_CLUB_GUIDE.questions.map((question, index) => `${index + 1}) ${question}`);
  return [
    BOOK_CLUB_GUIDE.title,
    '',
    BOOK_CLUB_GUIDE.intro,
    '',
    ...numbered,
    '',
    BOOK_CLUB_GUIDE.closing,
  ].join('\n');
}
