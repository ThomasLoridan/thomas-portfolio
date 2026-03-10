import type { Profile } from '@/types';

export const profile: Profile = {
  name: 'Thomas Loridan',
  title: 'Technical Program Manager · Builder',
  tagline: "I don't just write specs. I ship them.",
  bio: 'TPM at Amazon EU Transportation, leading cross-functional programs across 26 countries with a €30M+ portfolio. MSc from École Centrale Lille. Co-founder of Familyad (ad-tech). Passionate about automation, data-driven decisions, and building products that create measurable impact.',
  location: 'Luxembourg',
  email: 'thomas.loridan@outlook.com',
  linkedin: 'https://linkedin.com/in/thomas-loridan',
  github: 'https://github.com/ThomasLoridan',
  photo: '/images/profile.png',
  stats: [
    { value: '26', label: 'Countries' },
    { value: '€30M+', label: 'Portfolio' },
    { value: '19mo', label: '@ Amazon' },
  ],
};
