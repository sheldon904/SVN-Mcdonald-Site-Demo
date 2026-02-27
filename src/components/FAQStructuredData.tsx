import { Helmet } from 'react-helmet-async';
import type { FAQItem } from '../data/faqData';

interface FAQStructuredDataProps {
  faqs: FAQItem[];
}

export default function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
}
