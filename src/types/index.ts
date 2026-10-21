export interface InquiryFormData {
  fullName: string;
  businessName: string;
  email: string;
  country: string;
  service: string;
  budget: string;
  details: string;
}

export interface InquiryRecord extends InquiryFormData {
  id: string;
  submittedAt: string;
  formattedDate: string;
  emailDelivered: boolean;
  deliveryError?: string | null;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Website Development' | 'AI Call Agent' | 'AI Automation';
  categoryLabel: string;
  description: string;
  tag: string;
  features: string[];
  demoType: 'live_interactive' | 'workflow_visualizer' | 'call_simulator';
  accentColor: string;
  techStack: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
