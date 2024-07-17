export default {
  title: 'iDive Learn to Dive & Masters Program Cancellation',
  description:
    "Your responses will be used to generate email templates that you can then proof-read and send to folks who can help us restore the schedule for iDive's Learn to Dive and Master's programs",
  sendResultOnPageNext: true,
  pages: [
    {
      name: 'page1',
      elements: [
        {
          type: 'text',
          name: 'First Name',
          title: 'First Name',
          isRequired: true,
        },
        {
          type: 'text',
          name: 'Last Name',
          title: 'Last Name',
          isRequired: true,
        },
        {
          type: 'text',
          name: 'Email',
          title: 'Email',
          isRequired: true,
          inputType: 'email',
        },
      ],
      title: 'Contact Information',
    },
    {
      name: 'page2',
      elements: [
        {
          type: 'checkbox',
          name: 'Which club or organization are you affiliated with? Please select all that apply.',
          title: 'Which club or organization are you affiliated with? Please select all that apply.',
          choices: [
            'iDive Diving Academy',
            'South Surrey White Rock Divers',
            'Boardworks',
            'Fraser Valley Diving Club',
            'Kelowna Springboard and Diving Club',
            'Kamloops Gymnastics, Trampoline and Diving',
            'Prince George Pikes',
            'BC Diving',
            'Diving Plongeon Canada',
          ],
          showOtherItem: true,
          showNoneItem: true,
        },
      ],
    },
    {
      name: 'page3',
      elements: [
        {
          type: 'radiogroup',
          name: 'Which of the following best describes you?',
          title: 'Which of the following best describes you?',
          choices: [
            'I am a diver in a Masters Diving program',
            'I am a diver in a Learn to Dive program',
            'I am the parent of an athlete',
            'I am a coach',
            'I am a club administrator',
            "I am a member of my province's amateur diving association",
            'I am a concerned member of the public who loves diving',
          ],
          showNoneItem: true,
        },
      ],
    },
    {
      name: 'page4',
      elements: [
        {
          type: 'html',
          name: 'question6',
          html: '<p>If you are the parent of an athlete, please fill out the following questions for the athlete that you are representing',
        },
      ],
    },
    {
      name: 'page5',
      elements: [
        {
          type: 'radiogroup',
          name: 'How long have you been involved in the sport of diving?',
          title: 'How long have you been involved in the sport of diving?',
          isRequired: true,
          choices: ['Less than 1 year', '1-2 years', '2-5 years', '5-10 years', '10+ years'],
          showNoneItem: true,
        },
        {
          type: 'boolean',
          name: 'Are you currently training?',
          title: 'Are you currently training?',
          isRequired: true,
        },
      ],
    },
    {
      name: 'page6',
      visibleIf: '{Are you currently training?} = true',
      elements: [
        {
          type: 'radiogroup',
          name: 'How often do you train?',
          title: 'How often do you train?',
          choices: ['Once a week', 'Twice a week', '3+ times a week', 'A few times a month', 'A few times a year'],
        },
      ],
    },
    {
      name: 'page7',
      elements: [
        {
          type: 'boolean',
          name: 'Have you competed?',
          title: 'Have you competed?',
        },
      ],
    },
    {
      name: 'page8',
      visibleIf: '{Have you competed?} = true',
      elements: [
        {
          type: 'checkbox',
          name: 'Select all that apply to you:',
          title: 'Select all that apply to you:',
          choices: [
            'I have competed in my province',
            'I have competed in Canada outside of my province',
            'I have competed internationally',
          ],
        },
      ],
    },
    {
      name: 'page9',
      visibleIf: '{Have you competed?} = true',
      elements: [
        {
          type: 'html',
          name: 'question8',
          html: '<p><i>For the following question, please try to follow this formatting:</i></p><ul>\n<li>2024 / BC / Winter Provincials / 3m / 8th</li>\n<li>2024 / BC / Summer Provincials / Mixed Boards / 1st</li>\n<li>2023 / Japan / World Masters Championships / Platform / 5th place</li>\n<li>2022 / Croatia / Croatian Masters Championchips / 3m / 2nd</li>\n</ul>',
        },
        {
          type: 'comment',
          name: 'Competition Rankings',
          title: 'Please share any rankings that you have achieved while competing',
        },
      ],
    },
    {
      name: 'page10',
      elements: [
        {
          type: 'html',
          name: 'question11',
          html: '<p>For the following questions, please write as much or as little as you like</p>',
        },
        {
          type: 'comment',
          name: 'Why is diving important to you?',
          title: 'Why is diving important to you?',
        },
        {
          type: 'comment',
          name: 'How would losing your masters or learn to dive program impact you?',
          title: 'How would losing your masters or learn to dive program impact you?',
        },
      ],
    },
  ],
};
