import {
  BarChart3,
  CreditCard,
  HelpCircle,
  Home,
  Sparkles,
  Code,
} from "lucide-react";

export const navItems = [
  { id: "my-progress", label: "My Progress", icon: Home },
  { id: "code-playground", label: "Code Playground", icon: Code },
  { id: "system-design", label: "System Design", icon: Sparkles },
  { id: "challenges", label: "Challenges", icon: BarChart3 },
  {
    id: "recruiter-assessments",
    label: "Recruiter Assessments",
    icon: CreditCard,
  },
  { id: "settings", label: "Settings", icon: HelpCircle },
];
