import React, { useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { BookOpen, LifeBuoy, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I access a campus?",
    answer: "Navigate to the 'Campus' link in the sidebar menu. In the campus panel, identify RGU or your target center, and click 'Open Console' to access campus-level stats, rosters, and collections.",
  },
  {
    question: "Where can I view placement records?",
    answer: "Select the RGU campus from the overview, and click the 'Placement Records' card. You will find overall rates, department ratios, course breakdowns, and recruiter matrices.",
  },
  {
    question: "How is fee collection calculated?",
    answer: "Fee collection rate represents the percentage efficiency calculated by dividing actual collections by targets for the current academic session (Overall Collection Progress FY 2023-24).",
  },
];

export const Help: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <AppShell>
      {/* Header Context */}
      <div className="text-left pb-4 border-b border-border-color">
        <h1 className="text-2xl font-bold text-primary-text tracking-tight m-0">
          Help & Support
        </h1>
        <p className="text-sm text-secondary-text mt-1">
          Find information and assistance for RegionOS.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* Card: Documentation */}
        <Card className="flex flex-col justify-between p-6">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-blue/10 text-primary-blue flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-primary-text m-0">Documentation</h3>
              <p className="text-xs text-secondary-text mt-2 leading-relaxed">
                Access RegionOS documentation, platform updates, and user guides designed for regional operators and deans.
              </p>
            </div>
          </div>
          <div className="mt-6 border-t border-border-color pt-4">
            <Button variant="secondary" size="sm" className="w-full">
              View Documentation
            </Button>
          </div>
        </Card>

        {/* Card: Support */}
        <Card className="flex flex-col justify-between p-6">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-blue/10 text-primary-blue flex items-center justify-center">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-primary-text m-0">Support</h3>
              <p className="text-xs text-secondary-text mt-2 leading-relaxed">
                Need assistance with the platform? Contact central administration or submit tickets for regional workspace inquiries.
              </p>
            </div>
          </div>
          <div className="mt-6 border-t border-border-color pt-4">
            <Button variant="secondary" size="sm" className="w-full">
              Contact Support
            </Button>
          </div>
        </Card>
      </div>

      {/* Card: Expandable FAQs Accordion */}
      <Card className="text-left mt-4">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 mt-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="border border-border-color rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-4 text-sm font-bold text-primary-text hover:bg-muted-bg/30 text-left focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isOpen && (
                  <div className="p-4 bg-muted-bg/10 border-t border-border-color text-xs text-secondary-text leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </AppShell>
  );
};
