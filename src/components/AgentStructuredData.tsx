import { Helmet } from 'react-helmet-async';
import type { TeamMember } from '../data/teamMembers';

const BASE_URL = 'https://svnmcdonald.com';

interface AgentStructuredDataProps {
  member: TeamMember;
}

export default function AgentStructuredData({ member }: AgentStructuredDataProps) {
  const bioParagraphs = member.bio.split('\n\n');
  const description = bioParagraphs[0];

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': ['Person', 'RealEstateAgent'],
    '@id': `${BASE_URL}/team/${member.slug}#person`,
    name: member.name,
    jobTitle: member.role,
    email: member.email,
    ...(member.phone ? { telephone: `+1-${member.phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}` } : {}),
    image: `${BASE_URL}${member.image}`,
    description,
    url: `${BASE_URL}/team/${member.slug}`,
    worksFor: {
      '@id': `${BASE_URL}/#organization`,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '217 SE First AVE Unit 200',
      addressLocality: 'Ocala',
      addressRegion: 'FL',
      postalCode: '34471',
      addressCountry: 'US',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Ocala',
        sameAs: 'https://en.wikipedia.org/wiki/Ocala,_Florida',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Marion County, Florida',
      },
      {
        '@type': 'State',
        name: 'Florida',
        sameAs: 'https://en.wikipedia.org/wiki/Florida',
      },
    ],
    knowsAbout: member.specialties,
    ...(member.education
      ? {
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: member.education,
          },
        }
      : {}),
    sameAs: member.sameAs,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Team',
        item: `${BASE_URL}/team`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: member.name,
        item: `${BASE_URL}/team/${member.slug}`,
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}
