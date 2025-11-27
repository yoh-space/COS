"use client";

import { FAQJsonLd } from 'next-seo';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSEOProps {
  faqs: FAQItem[];
}

export default function FAQSEO({ faqs }: FAQSEOProps) {
  return (
    <FAQJsonLd
      questions={faqs.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
      }))}
    />
  );
}
