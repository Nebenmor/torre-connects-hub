// src/services/mockData.js

/**
 * Mock data service for development and fallback scenarios
 * Provides realistic sample data when Torre.ai API is unavailable
 */

// Mock search results for demonstration - fallback if API fails
export const mockSearchResults = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahchen",
    headline: "Senior Full Stack Developer at Meta",
    location: "San Francisco, CA",
    avatar: null,
    skills: ["React", "Node.js", "Python", "AWS"],
    experience: "5+ years",
    rating: 4.9,
    verified: true,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    username: "marcusdev",
    headline: "DevOps Engineer & Cloud Architect",
    location: "Austin, TX",
    avatar: null,
    skills: ["Kubernetes", "Docker", "Terraform", "Azure"],
    experience: "7+ years",
    rating: 4.8,
    verified: true,
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    username: "elenarodriguez",
    headline: "Product Designer at Stripe",
    location: "New York, NY",
    avatar: null,
    skills: ["Figma", "UX Research", "Prototyping", "Design Systems"],
    experience: "4+ years",
    rating: 4.9,
    verified: false,
  },
  {
    id: "4",
    name: "David Kim",
    username: "davidkim",
    headline: "Machine Learning Engineer at OpenAI",
    location: "Seattle, WA",
    avatar: null,
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
    experience: "6+ years",
    rating: 4.7,
    verified: true,
  },
  {
    id: "5",
    name: "Priya Patel",
    username: "priyapatel",
    headline: "Frontend Architect & Design System Lead",
    location: "London, UK",
    avatar: null,
    skills: ["Vue.js", "TypeScript", "CSS Architecture", "Storybook"],
    experience: "8+ years",
    rating: 4.8,
    verified: true,
  },
];

// Mock genome data generator
export const mockGenomeData = (username = "sampleuser") => ({
  username,
  person: {
    name: "Sample User",
    professionalHeadline: "Professional Developer",
    picture: null,
    location: "Global",
  },
  strengths: [
    "Problem Solving",
    "Team Leadership",
    "Innovation",
    "Communication",
    "Adaptability",
    "Technical Excellence",
  ],
  personality: {
    openness: 85,
    conscientiousness: 78,
    extraversion: 72,
    agreeableness: 88,
    neuroticism: 25,
  },
  skills: [
    { name: "JavaScript", proficiency: 95, experience: "5 years" },
    { name: "React", proficiency: 92, experience: "4 years" },
    { name: "Node.js", proficiency: 88, experience: "3 years" },
    { name: "Python", proficiency: 85, experience: "4 years" },
    { name: "AWS", proficiency: 80, experience: "3 years" },
    { name: "TypeScript", proficiency: 90, experience: "3 years" },
  ],
  interests: [
    "Technology",
    "Innovation",
    "Team Building",
    "Open Source",
    "Continuous Learning",
  ],
  experiences: [
    {
      name: "Software Development",
      category: "Professional",
      organizations: ["Tech Corp", "Innovation Inc"],
    },
    {
      name: "Team Leadership",
      category: "Management",
      organizations: ["Current Company"],
    },
  ],
  awards: [
    {
      name: "Employee of the Year",
      year: 2023,
      organization: "Tech Corp",
    },
  ],
});

// Additional mock profiles for variety
export const mockProfiles = {
  sarahchen: {
    username: "sarahchen",
    person: {
      name: "Sarah Chen",
      professionalHeadline: "Senior Full Stack Developer at Meta",
      picture: null,
      location: "San Francisco, CA",
    },
    strengths: [
      "Full Stack Development",
      "System Architecture",
      "Code Review",
      "Mentoring",
      "Agile Development",
    ],
    personality: {
      openness: 90,
      conscientiousness: 85,
      extraversion: 70,
      agreeableness: 82,
      neuroticism: 20,
    },
    skills: [
      { name: "React", proficiency: 96, experience: "6 years" },
      { name: "Node.js", proficiency: 94, experience: "5 years" },
      { name: "Python", proficiency: 88, experience: "4 years" },
      { name: "AWS", proficiency: 85, experience: "4 years" },
      { name: "GraphQL", proficiency: 90, experience: "3 years" },
    ],
    interests: [
      "Web Technologies",
      "System Design",
      "Open Source",
      "Tech Communities",
    ],
  },

  marcusdev: {
    username: "marcusdev",
    person: {
      name: "Marcus Johnson",
      professionalHeadline: "DevOps Engineer & Cloud Architect",
      picture: null,
      location: "Austin, TX",
    },
    strengths: [
      "Cloud Architecture",
      "Infrastructure as Code",
      "CI/CD",
      "Monitoring",
      "Security",
    ],
    personality: {
      openness: 75,
      conscientiousness: 92,
      extraversion: 65,
      agreeableness: 78,
      neuroticism: 15,
    },
    skills: [
      { name: "Kubernetes", proficiency: 95, experience: "5 years" },
      { name: "Docker", proficiency: 98, experience: "7 years" },
      { name: "Terraform", proficiency: 92, experience: "4 years" },
      { name: "Azure", proficiency: 89, experience: "6 years" },
      { name: "Jenkins", proficiency: 87, experience: "5 years" },
    ],
    interests: [
      "Cloud Computing",
      "DevOps Culture",
      "Automation",
      "Infrastructure",
    ],
  },
};

// Function to get filtered mock results
export const getFilteredMockResults = (query) => {
  if (!query.trim()) return [];

  return mockSearchResults.filter(
    (person) =>
      person.name.toLowerCase().includes(query.toLowerCase()) ||
      person.headline.toLowerCase().includes(query.toLowerCase()) ||
      person.skills.some((skill) =>
        skill.toLowerCase().includes(query.toLowerCase())
      )
  );
};

// Generate random mock data for testing
export const generateMockPerson = (id) => {
  const firstNames = [
    "Alex",
    "Jordan",
    "Casey",
    "Riley",
    "Morgan",
    "Avery",
    "Quinn",
    "Sage",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Wilson",
    "Garcia",
    "Martinez",
    "Anderson",
    "Taylor",
  ];
  const roles = [
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "UX Designer",
    "DevOps Engineer",
  ];
  const companies = [
    "Google",
    "Microsoft",
    "Apple",
    "Amazon",
    "Netflix",
    "Spotify",
    "Uber",
    "Airbnb",
  ];
  const locations = [
    "San Francisco, CA",
    "New York, NY",
    "Seattle, WA",
    "Austin, TX",
    "Boston, MA",
  ];
  const skillSets = [
    ["JavaScript", "React", "Node.js", "MongoDB"],
    ["Python", "Django", "PostgreSQL", "Redis"],
    ["Java", "Spring", "MySQL", "Kafka"],
    ["Go", "Docker", "Kubernetes", "AWS"],
    ["C#", ".NET", "Azure", "SQL Server"],
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const role = roles[Math.floor(Math.random() * roles.length)];
  const company = companies[Math.floor(Math.random() * companies.length)];
  const skills = skillSets[Math.floor(Math.random() * skillSets.length)];

  return {
    id: id.toString(),
    name: `${firstName} ${lastName}`,
    username: `${firstName.toLowerCase()}${lastName.toLowerCase()}`,
    headline: `${role} at ${company}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    avatar: null,
    skills,
    experience: `${Math.floor(Math.random() * 8) + 2}+ years`,
    rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10, // 3.5-5.0 range
    verified: Math.random() > 0.3, // 70% chance of being verified
  };
};
