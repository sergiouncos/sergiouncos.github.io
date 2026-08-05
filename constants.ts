
import { Project, SkillCategory, SkillData, ToolCategory } from "./types";

export const NAV_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'Experience', id: 'experience' },
  { name: 'About', id: 'about' },
  { name: 'Tools', id: 'tools' },
  { name: 'Contact', id: 'contact' },
];

export const EXPERIENCE: Project[] = [
  {
    id: 'cloudflare',
    title: 'Third Party Risk Management Specialist',
    role: 'Third Party Risk Management Specialist',
    company: 'Cloudflare',
    period: 'Feb 2025 - Present',
    description: 'Managing the vendor risk lifecycle to protect the organization\'s ecosystem and ensure compliance.',
    details: [
      'Vendor Risk Assessment: Lead vendor risk reviews using internal tools to determine risk levels and initiate the appropriate due diligence process.',
      'SaaS Onboarding & IAM: Manage the end-to-end SaaS onboarding lifecycle, enforcing SSO with SAML/OIDC and administering robust IAM/RBAC controls.',
      'Security & Compliance Gap Analysis: Review vendor security documentation to identify control gaps and collaborate with vendors to develop and implement remediation plans.',
      'Cross-Functional Collaboration: Partner with Legal, GRC, Product Security, and Enterprise Security teams to address contractual requirements and compliance concerns.',
      'Policy Enforcement: Enforce key security policies for all vendors, including least-privilege access, managed device requirements, and strict MFA/password standards.'
    ],
    techStack: ['TPRM', 'GRC', 'SAML/OIDC', 'IAM', 'Vendor Risk'],
    link: 'https://www.cloudflare.com'
  },
  {
    id: 'latch',
    title: 'Information Security Specialist',
    role: 'Information Security Specialist',
    company: 'Latch',
    period: 'Dec 2023 - Aug 2026',
    description: 'Managing security infrastructure, access controls, and leading incident response in a fast-paced environment.',
    details: [
      'Security Infrastructure Management: Configuring and overseeing IDS/IPS and endpoint protection solutions.',
      'Access Control Administration: Implementing authentication mechanisms to protect sensitive resources.',
      'Risk Assessment & Vulnerability Management: Identifying and evaluating potential security risks.',
      'Incident Response Leadership: Developing IR plans and coordinating rapid mitigation actions.',
      'Compliance & Audit Collaboration: Facilitating audits to ensure regulatory compliance.'
    ],
    techStack: ['IDS/IPS', 'Endpoint Protection', 'Incident Response', 'Risk Mgmt', 'Compliance'],
    link: 'https://www.latch.com'
  },
  {
    id: 'docubark',
    title: 'Vendor Security Reviewer',
    role: 'Vendor Security Reviewer',
    company: 'DocuBark',
    period: 'Nov 2022 - Present',
    description: 'Specializing in third-party risk management and SOC 2 compliance, ensuring vendors meet the highest security and data protection standards.',
    details: [
      'SOC 2 Type 2 Compliance Audits: Conduct comprehensive reviews of vendor policies, procedures, and systems to perform gap analysis and identify areas of non-compliance.',
      'Risk Remediation & Collaboration: Recommend improvements to security controls and processes, collaborating directly with IT, security, and compliance teams to resolve compliance issues and mitigate risks.',
      'Audit Trail & Documentation: Maintain meticulous records of all compliance activities, including audit plans, findings, and recommendations, to ensure a clear audit trail for stakeholders.',
      'Building Stakeholder Trust: Assessments help organizations protect their systems and data, building trust with customers by demonstrating a strong commitment to security and compliance.'
    ],
    techStack: ['TPRM', 'SOC 2', 'Compliance', 'Gap Analysis', 'Risk Remediation'],
    link: 'https://docubark.com'
  },
  {
    id: 'wazuh',
    title: 'IT Security Engineer',
    role: 'IT Security Engineer',
    company: 'Wazuh',
    period: 'Jul 2022 - Dec 2022',
    description: 'Implemented and managed Wazuh SIEM solutions for global customers.',
    details: [
      'Successfully implemented and tailored the software product for global customers.',
      'Collected user feedback to recognize demands for mechanization and coordination.',
      'Delivered detailed advanced technological demonstrations for clients.',
      'Guided and instructed security engineers and operations teams.'
    ],
    techStack: ['Wazuh', 'SIEM', 'ELK Stack', 'Customer Success'],
    link: 'https://wazuh.com'
  },
  {
    id: 'edgeuno',
    title: 'Security Engineer',
    role: 'Security Engineer',
    company: 'EdgeUno',
    period: 'Jul 2021 - Jul 2022',
    description: 'Enforced NIST/CIS policies, conducted pen-testing, and automated security tasks.',
    details: [
      'Implemented and refined information security policies using NIST and CIS frameworks.',
      'Conducted vulnerability management and regular penetration testing using Nessus, Nmap, and Burp Suite.',
      'Operated the SIEM platform and ensured compliance with GDPR.',
      'Responded to incidents and improved security through Python automation.',
      'Deployed firewalls, VPNs, and IDS/IPS infrastructure.'
    ],
    techStack: ['Python', 'AWS', 'Terraform', 'Nessus', 'Burp Suite', 'NIST'],
    link: 'https://edgeuno.com'
  },
  {
    id: 'novared',
    title: 'Information Security Analyst',
    role: 'Information Security Analyst',
    company: 'Novared',
    period: 'Nov 2020 - Jul 2021',
    description: 'Managed McAfee platforms and Tenable for incident reports and vulnerability discovery.',
    details: [
      'Managed and supported McAfee platforms (ePO, DLP, ATD, ENS) and Tenable.',
      'Escalated product issues to vendors for swift resolution.',
      'Developed performance reports for installed products.',
      'Conducted root cause analysis of incidents within labs.'
    ],
    techStack: ['McAfee ePO', 'DLP', 'Tenable', 'Incident Analysis'],
    link: 'https://novared.cl'
  }
];

export const TOOLS_DATA: ToolCategory[] = [
  {
    category: 'IP & URL Reputation',
    tools: [
      { name: 'URL Scan', url: 'https://urlscan.io/' },
      { name: 'AbuseIPDB', url: 'https://www.abuseipdb.com/' },
      { name: 'Cisco Talos', url: 'https://www.talosintelligence.com/' },
      { name: 'Palo Alto URL Filtering', url: 'https://urlfiltering.paloaltonetworks.com/' },
      { name: 'Symantec Site Review', url: 'https://sitereview.bluecoat.com/' },
      { name: 'IP Void', url: 'https://www.ipvoid.com/' },
      { name: 'Inquest Labs', url: 'https://labs.inquest.net/' }
    ]
  },
  {
    category: 'Malware Analysis',
    tools: [
      { name: 'VirusTotal', url: 'https://www.virustotal.com' },
      { name: 'Hybrid Analysis', url: 'https://www.hybrid-analysis.com/' },
      { name: 'ANY.RUN', url: 'https://app.any.run/' },
      { name: 'Joe Sandbox', url: 'https://www.joesecurity.org/' },
      { name: 'Cuckoo Sandbox', url: 'https://cuckoosandbox.org/' },
      { name: 'Intezer Analyze', url: 'https://analyze.intezer.com/' }
    ]
  },
  {
    category: 'SAST / DAST / IaC',
    tools: [
      { name: 'Snyk', url: 'https://app.snyk.io/', description: 'Opensource scanning & VSC extension' },
      { name: 'HostedScan', url: 'https://hostedscan.com/', description: 'Online OWASP Zap for DAST' },
      { name: 'Checkov', url: 'https://www.checkov.io/', description: 'IaC scanner' },
      { name: 'SonarCloud', url: 'https://sonarcloud.io/', description: 'SAST and SCA analysis' }
    ]
  },
  {
    category: 'Browser Simulation',
    tools: [
      { name: 'Wannabrowser', url: 'https://wannabrowser.net' },
      { name: 'Browserling', url: 'https://www.browserling.com/' }
    ]
  }
];

export const BOOKS = [
  "Atomic Habits - James Clear",
  "The Power of Habits - Charles Duhigg",
  "Make Your Bed - William H. McRaven",
  "Enfócate - Cal Newport",
  "The Four Agreements - Miguel Ángel Ruiz Macías",
  "The Life-Changing Magic of Tidying Up - Marie Kondo",
  "Limitless - Jim Kwik"
];

export const CERTIFICATIONS = [
  { name: "AWS Certified Cloud Practitioner", url: "https://www.credly.com/badges/cde9e7cc-454b-4bbd-acb8-ed77011d156d/linked_in?t=rlrc6q" },
  { name: "Open Source Vulnerability Management", url: "https://www.linkedin.com/posts/activity-6855258356576251904-a8-k" },
  { name: "EFSET C1 English Level", url: "https://www.efset.org/cert/2EYSoT" }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Security Domains",
    items: [
      "Security Assessments",
      "OSINT",
      "Networking / TCP-IP",
      "OWASP Web",
      "SAST / DAST",
      "Vulnerability Management",
      "SIEM / ELK",
      "Hardening / CIS Benchmarks"
    ]
  },
  {
    title: "Infrastructure",
    items: [
      "Windows & Linux",
      "Active Directory",
      "Policy Enforcement",
      "VirtualBox / VMware",
      "AWS IAM, VPC, EC2",
      "Security Groups",
      "Terraform",
      "Docker"
    ]
  },
  {
    title: "Tools",
    items: [
      "Wazuh",
      "Wireshark",
      "Burp Suite",
      "OWASP ZAP",
      "Nmap",
      "Nessus",
      "Rapid7 Nexpose",
      "OpenVAS",
      "Metasploit",
      "Fortify",
      "Snyk",
      "SonarQube / SonarCloud"
    ]
  },
  {
    title: "AI, Automation & Identity",
    items: [
      "AI-assisted Workflows",
      "Prompt Engineering",
      "LLM Research Support",
      "ChatGPT / Gemini / Copilot",
      "Python",
      "Bash",
      "Okta",
      "Google Workspace",
      "Google Authenticator",
      "Jira",
      "Windows Firewall",
      "iptables"
    ]
  }
];

export const SKILLS_DATA: SkillData[] = [
  { subject: 'NetSec', A: 95, fullMark: 100 },
  { subject: 'Cloud Sec', A: 90, fullMark: 100 },
  { subject: 'AppSec', A: 85, fullMark: 100 },
  { subject: 'Compliance', A: 95, fullMark: 100 },
  { subject: 'Forensics', A: 88, fullMark: 100 },
  { subject: 'Automation', A: 80, fullMark: 100 },
];

export const TERMINAL_INTRO = [
  'Initializing Sergio Uncos Portfolio...',
  'Loading Modules: [VULN_MGMT, INCIDENT_RESP, COMPLIANCE]',
  'Connection Established.',
  'Welcome to the secure terminal.',
  'Type "help" for available commands.'
];
