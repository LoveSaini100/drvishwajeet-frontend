/**
 * Centralized Data Model for Dr. Vishwajeet's Portfolio
 * Source of Truth: Verified IIT Roorkee Profile Records & Official Academic Portfolio
 */

export const doctorData = {
  personal: {
    name: "Dr. Vishwajeet",
    prefix: "Dr.",
    firstName: "Vishwajeet",
    tagline: "Dedicated to Clean Energy, Sustainable Engineering & Academic Excellence",
    headline: "Ramanujan Fellow & Faculty Member @ IIT Roorkee | Pioneering Sustainable Energy, Waste-to-Energy & Green Hydrogen",
    shortBio: "Dr. Vishwajeet is a Ramanujan Fellow and faculty member in the Department of Mechanical and Industrial Engineering at the Indian Institute of Technology (IIT) Roorkee. With international research experience across Poland, Denmark, and the United Kingdom, his work pioneers breakthrough solutions in thermochemical waste conversion, green hydrogen, and zero-emission energy systems.",
    longBio: "Dr. Vishwajeet is a Ramanujan Fellow and faculty member in the Department of Mechanical & Industrial Engineering at IIT Roorkee specializing in sustainable energy and environmental technologies. His work focuses on thermochemical conversion of waste to energy, hydrothermal carbonization, plasma gasification, biomass conversion, biofuel production, CO₂ conversion technologies, green hydrogen, solar energy, and high-efficiency zero-emission energy systems.",
    designation: "Ramanujan Fellow / Faculty",
    department: "Department of Mechanical & Industrial Engineering",
    institution: "Indian Institute of Technology (IIT) Roorkee",
    office: "Room No. 261, East Block, Department of Mechanical & Industrial Engineering, IIT Roorkee, Uttarakhand 247667, India",
    email: "vishwajeet.rjf@sric.iitr.ac.in",
    phone: "+91 90450 65328",
    phoneRaw: "+919045065328",
    whatsapp: "919045065328",
    status: "Available for Academic Research & Industrial Advisory",
    profileImage: "/images/img1.png",
    heroImage: "/images/img1.png",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/dr-vishwajeet/",
      researchGate: "https://www.researchgate.net/",
      googleScholar: "https://scholar.google.com/",
      facebook: "https://www.facebook.com/",
      iitProfile: "https://www.iitr.ac.in/"
    },
    typingWords: [
      "Ramanujan Fellow @ IIT Roorkee",
      "Thermochemical Waste-to-Energy",
      "Green Hydrogen & Solar Energy",
      "Hydrothermal Carbonization & Plasma Gasification",
      "CO₂ & Biomass Conversion Technologies",
      "Ph.D. Wrocław Univ of Tech, Poland"
    ]
  },

  // Verified Official Research Interests
  researchInterests: [
    {
      title: "Thermochemical Conversion of Waste to Energy",
      desc: "Advanced thermochemical pathways to convert municipal and industrial solid waste into clean electrical and thermal power.",
      icon: "Recycle"
    },
    {
      title: "Hydrothermal Carbonization & Plasma Gasification",
      desc: "High-temperature plasma gasification and hydrothermal carbonization for complete refuse valorization and high-yield syngas.",
      icon: "Flame"
    },
    {
      title: "Biomass Conversion, Biofuels & CO₂ Technologies",
      desc: "Converting organic residues into drop-in biofuels and integrating innovative CO₂ capture and chemical conversion systems.",
      icon: "Leaf"
    },
    {
      title: "Green Hydrogen, Solar Energy & Zero-Emission Systems",
      desc: "Developing catalytic hydrogen production, solar thermal integration, and high-efficiency zero-emission clean energy architectures.",
      icon: "Zap"
    }
  ],

  trustMetrics: [
    { label: "Faculty Position", value: "IIT Roorkee", detail: "Ramanujan Fellow / Faculty" },
    { label: "Doctoral Degree", value: "Ph.D. Poland", detail: "Wrocław Univ of Science & Tech" },
    { label: "Global Research", value: "Denmark & UK", detail: "Aarhus Univ & King's College London" },
    { label: "Prestigious Honors", value: "3+ Fellowships", detail: "Ramanujan, Erasmus & NAWA" }
  ],

  affiliations: [
    {
      name: "IIT Roorkee",
      role: "Ramanujan Fellow / Faculty",
      location: "Roorkee, India",
      badge: "Current Faculty"
    },
    {
      name: "King's College London",
      role: "Former Research Scientist",
      location: "London, United Kingdom",
      badge: "Research Alum"
    },
    {
      name: "Aarhus University",
      role: "Former Research Scientist",
      location: "Aarhus, Denmark",
      badge: "Research Alum"
    },
    {
      name: "Wrocław University of Tech",
      role: "Ph.D. Researcher",
      location: "Wrocław, Poland",
      badge: "Doctorate"
    }
  ],

  expertise: [
    {
      id: "waste-to-energy",
      title: "Thermochemical Conversion of Waste to Energy",
      category: "Waste-to-Energy Engineering",
      image: "/images/img2.png",
      description: "Pioneering research on converting municipal solid waste (MSW) and industrial refuse into clean, renewable power through advanced thermal systems and emissions-free conversion.",
      highlights: [
        "Thermochemical conversion & high-efficiency gasification",
        "Refuse Derived Fuels (RDF) & solid waste valorization",
        "Circular bioeconomy and landfill reduction modeling",
        "Thermal energy recovery optimization"
      ],
      externalUrl: "https://en.wikipedia.org/wiki/Waste-to-energy"
    },
    {
      id: "hydrothermal-plasma",
      title: "Hydrothermal Carbonization & Plasma Gasification",
      category: "Advanced Thermal Technologies",
      image: "/images/img4.png",
      description: "Exploring next-generation high-temperature plasma gasification and hydrothermal carbonization (HTC) to treat hazardous/complex wastes into clean syngas and carbonaceous hydrochar.",
      highlights: [
        "Ultra-high temperature plasma arc waste treatment",
        "Hydrothermal carbonization of high-moisture organic waste",
        "Hydrochar characterization for solid fuels & soil remediation",
        "Tar elimination and gasification cleaning dynamics"
      ],
      externalUrl: "https://en.wikipedia.org/wiki/Plasma_gasification"
    },
    {
      id: "green-hydrogen",
      title: "Green Hydrogen, Solar Energy & Zero-Emission Systems",
      category: "Clean Tech & Decarbonization",
      image: "/images/img3.png",
      description: "Development of clean hydrogen generation technologies, hybrid solar-thermal systems, and high-efficiency zero-emission architectures for heavy industrial decarbonization.",
      highlights: [
        "Thermochemical & catalytic hydrogen production",
        "Solar energy integration for hybrid clean power",
        "High-efficiency zero-emission energy architectures",
        "Clean fuel cell applications & storage networks"
      ],
      externalUrl: "https://en.wikipedia.org/wiki/Green_hydrogen"
    },
    {
      id: "biomass-co2-conversion",
      title: "Biomass Conversion, Biofuel Production & CO₂ Technologies",
      category: "Renewable Energy & Carbon Capture",
      image: "/images/img5.png",
      description: "Converting agricultural and organic biomass into drop-in renewable biofuels, combined with carbon dioxide (CO₂) conversion technologies to create a net-negative carbon loop.",
      highlights: [
        "Agricultural crop residue & stubble valorization",
        "Drop-in biofuel synthesis & catalytic upgrading",
        "CO₂ capture, utilization, and chemical conversion",
        "Life-cycle analysis & carbon footprint mitigation"
      ],
      externalUrl: "https://en.wikipedia.org/wiki/Biomass_conversion"
    }
  ],

  skills: [
    { name: "Thermochemical Waste-to-Energy", percentage: 95, category: "Clean Tech" },
    { name: "Hydrothermal Carbonization & Plasma Gasification", percentage: 92, category: "Thermal Systems" },
    { name: "Green Hydrogen & Solar Energy", percentage: 90, category: "Alternative Fuels" },
    { name: "Biomass Conversion & Biofuel Production", percentage: 90, category: "Renewable Energy" },
    { name: "CO₂ Conversion Technologies", percentage: 88, category: "Carbon Capture" },
    { name: "Academic Mentorship & R&D Leadership", percentage: 95, category: "Leadership" }
  ],

  experience: [
    {
      role: "Ramanujan Fellow / Faculty",
      organization: "Indian Institute of Technology (IIT) Roorkee",
      department: "Department of Mechanical & Industrial Engineering",
      location: "Room No. 261, East Block, IIT Roorkee, Uttarakhand, India",
      period: "Present",
      type: "Faculty / Principal Investigator",
      description: "Leading research on Waste-to-Energy, Hydrothermal Carbonization, Plasma Gasification, Green Hydrogen, and CO₂ Conversion systems. Guiding graduate and postgraduate researchers while fostering national and international collaborations.",
      achievements: [
        "Awarded the prestigious Ramanujan Fellowship by SERB/DST, Government of India",
        "Established state-of-the-art research tracks in thermochemical clean energy conversion",
        "Mentoring Ph.D., Masters, and Undergraduate research cohorts"
      ]
    },
    {
      role: "Research Scientist",
      organization: "Aarhus University",
      department: "Department of Biological and Chemical Engineering",
      location: "Aarhus, Denmark",
      period: "Postdoctoral Research",
      type: "International Research Appointment",
      description: "Conducted advanced experimental and computational investigations into clean biomass conversion, hydrothermal processes, and European green energy directives.",
      achievements: [
        "Pioneered sustainable fuel characterization methodologies",
        "Co-authored research initiatives within Scandinavian clean energy consortia"
      ]
    },
    {
      role: "Research Scientist",
      organization: "King's College London",
      department: "Faculty of Natural, Mathematical & Engineering Sciences",
      location: "London, United Kingdom",
      period: "International Research",
      type: "Research Fellow",
      description: "Collaborated on advanced analytical techniques and sustainable thermal energy systems, enhancing fundamental understanding of clean fuel synthesis.",
      achievements: [
        "Interdisciplinary collaboration on clean energy and thermodynamics",
        "Presented key findings at international energy symposia"
      ]
    },
    {
      role: "Doctoral Researcher (Ph.D. Scholar)",
      organization: "Wrocław University of Science and Technology",
      department: "Faculty of Environmental & Mechanical Engineering",
      location: "Wrocław, Poland",
      period: "Ph.D. Tenure",
      type: "Doctoral Studies",
      description: "Completed comprehensive Ph.D. research on waste-to-energy valorization, solid fuel combustion mechanics, and clean gasification systems under premier European fellowships.",
      achievements: [
        "Recipient of the prestigious NAWA Polish National Agency for Academic Exchange Fellowship",
        "Awarded European Union Erasmus Doctoral Scholarship",
        "Successfully defended doctoral thesis with distinction"
      ]
    }
  ],

  education: [
    {
      degree: "Doctor of Philosophy (Ph.D.)",
      institution: "Wrocław University of Science and Technology",
      location: "Wrocław, Poland",
      year: "Doctoral Studies",
      specialization: "Sustainable Energy, Waste-to-Energy & Thermochemical Conversion",
      honors: "European Erasmus Scholar • NAWA Fellowship Awardee",
      description: "Rigorous doctoral research focused on novel thermochemical processing of waste streams, biomass valorization, and clean combustion diagnostics."
    },
    {
      degree: "Postdoctoral & International Research Appointments",
      institution: "Aarhus University (Denmark) & King's College London (UK)",
      location: "Denmark & United Kingdom",
      year: "International Tenure",
      specialization: "Biofuels, Clean Hydrogen & Advanced Energy Systems",
      honors: "Global Scientific Collaborator",
      description: "Advanced post-doctoral research tenures working alongside European pioneers in renewable hydrogen production and sustainable bio-refinery engineering."
    }
  ],

  achievements: [
    {
      title: "Ramanujan Fellowship",
      organization: "Science and Engineering Research Board (SERB), DST, Govt. of India",
      category: "National Honor",
      year: "Prestigious Fellowship",
      description: "Awarded to extraordinarily brilliant Indian scientists and engineers from outside India who wish to return and take up scientific research positions in India."
    },
    {
      title: "European Erasmus+ Scholarship",
      organization: "European Commission",
      category: "International Fellowship",
      year: "Doctoral Award",
      description: "Highly competitive scholarship granted for academic excellence and collaborative research throughout European Union institutions."
    },
    {
      title: "NAWA Doctoral Fellowship",
      organization: "Polish National Agency for Academic Exchange",
      category: "Government Fellowship",
      year: "Doctoral Grant",
      description: "Prestigious fellowship supporting premier international scientists for doctoral research in Poland."
    },
    {
      title: "Keynote & Motivational Speaker",
      organization: "Delhi Public School (DPS) & Academic Forums",
      category: "Youth Inspiration & Outreach",
      year: "July 2026",
      description: "Invited speaker for Grade XII Science students on resilience, research pathways, overcoming setbacks, and the frontier of clean energy."
    }
  ],

  services: [
    {
      icon: "FlaskConical",
      title: "Research & Development",
      description: "Conducting high-impact research in sustainable energy, waste-to-energy technologies, catalytic gasification, and clean decarbonization systems.",
      tags: ["Thermochemical Analysis", "R&D Roadmaps", "Clean Tech"]
    },
    {
      icon: "Recycle",
      title: "Waste-to-Energy Solutions",
      description: "Engineering scalable conversion pathways to turn municipal solid waste and agricultural biomass into high-efficiency power and clean fuels.",
      tags: ["MSW Gasification", "RDF Processing", "Circular Economy"]
    },
    {
      icon: "Flame",
      title: "Plasma Gasification & HTC Consulting",
      description: "Providing specialized technical consultancy on high-temperature plasma waste conversion, hydrothermal carbonization, and hydrochar applications.",
      tags: ["Plasma Gasification", "Hydrothermal Carbonization", "Hydrochar"]
    },
    {
      icon: "Leaf",
      title: "Green Hydrogen & CO₂ Technologies",
      description: "Designing efficient thermochemical and catalytic hydrogen production pathways, solar integration, and CO₂ conversion systems.",
      tags: ["Hydrogen Synthesis", "CO₂ Valorization", "Zero-Emission Systems"]
    },
    {
      icon: "Handshake",
      title: "Research Collaboration",
      description: "Partnering with national and global universities, government research laboratories, and industry leaders on high-impact sponsored initiatives.",
      tags: ["Consortia Grants", "Joint Publications", "International Ties"]
    },
    {
      icon: "GraduationCap",
      title: "Academic Mentorship",
      description: "Guiding Ph.D., Postgraduate, and Undergraduate scholars in fundamental research, thesis preparation, and high-impact scientific publications.",
      tags: ["Ph.D. Guidance", "Research Methodology", "Career Mentoring"]
    }
  ],

  recentActivities: [
    {
      id: "dps-bopal-talk",
      title: "Motivational & Scientific Talk for Grade XII Science Students",
      venue: "Delhi Public School (DPS) - Bopal",
      date: "1 July 2026",
      category: "Keynote & Outreach",
      summary: "Dr. Vishwajeet conducted an inspiring, high-impact interactive session for Grade XII science students, sharing his personal journey from school through Poland, Denmark, King's College London, to IIT Roorkee.",
      description: "Delhi Public School - Bopal organized an inspiring and interactive session for Grade XII Science students with Dr. Vishwajeet, Ramanujan Faculty in the Department of Mechanical and Industrial Engineering at IIT Roorkee. Dr. Vishwajeet shared his inspiring life journey, reminiscing about his school days and emphasizing the vital importance of resilience, self-discipline, and consistent effort. He encouraged students to distinguish between dreams and goals, highlighting that dreams become achievable only when supported by clear short-term goals and dedicated action. The session concluded with an engaging Q&A segment where students enthusiastically sought guidance on competitive examinations and career pathways in clean technology.",
      images: [
        { src: "/images/a6.jpeg", caption: "Dr. Vishwajeet delivering the keynote address at DPS Bopal" },
        { src: "/images/a2.jpeg", caption: "Interactive discussion on clean energy and academic perseverance" },
        { src: "/images/a3.jpeg", caption: "Q&A session with Grade XII science students" },
        { src: "/images/a4.jpeg", caption: "Dr. Vishwajeet interacting with students and faculty members" },
        { src: "/images/a5.jpeg", caption: "Sharing insights into international research opportunities" },
        { src: "/images/a1.jpeg", caption: "Felicitation and memento presentation at DPS Bopal" }
      ]
    }
  ],

  gallery: [
    { src: "/images/a2.jpeg", caption: "Interactive Session on Research & Resilience", category: "Outreach" },
    { src: "/images/a3.jpeg", caption: "Student Mentorship & Q&A Discussion", category: "Mentorship" },
    { src: "/images/a4.jpeg", caption: "Engaging with High School Science Aspirants", category: "Outreach" },
    { src: "/images/a5.jpeg", caption: "Discussion on Global Fellowships & Higher Education", category: "Academic" },
    { src: "/images/a1.jpeg", caption: "Felicitation by School Leadership", category: "Honors" },
    { src: "/images/a6.png", caption: "Keynote Address at Delhi Public School, Bopal", category: "Speaking" },

  ],

  insights: [
    {
      id: "waste-valorization-india",
      title: "Waste-to-Energy in India: Bridging Municipal Challenges with Clean Energy",
      date: "August 2026",
      category: "Research Insight",
      readTime: "5 min read",
      excerpt: "An overview of how modern gasification and refuse-derived fuel technologies can transform municipal solid waste into reliable, decentralized electrical and thermal energy.",
      content: "Rapid urbanization in India generates millions of tonnes of municipal solid waste every year. By adopting advanced thermochemical conversion techniques such as controlled gasification and high-efficiency pyrolysis, we can convert municipal waste into clean synthetic gas and heat, simultaneously addressing landfill overflow and providing decentralized energy."
    },
    {
      id: "green-hydrogen-transition",
      title: "The Role of Green Hydrogen & Solar in Decarbonizing Heavy Industry",
      date: "July 2026",
      category: "Clean Tech",
      readTime: "6 min read",
      excerpt: "Examining catalytic production pathways, solar integration, and biomass-derived hydrogen as cost-competitive zero-emission energy vectors.",
      content: "Hard-to-abate sectors such as steel, cement, and chemical fertilizers require high-temperature process heat and chemical feedstocks that battery electric systems cannot readily supply. Green hydrogen derived from renewable water electrolysis and biomass thermochemical routes provides the most promising route to true net-zero manufacturing."
    },
    {
      id: "academic-resilience",
      title: "Transforming Dreams into Goals: A Blueprint for Young Researchers",
      date: "July 2026",
      category: "Mentorship",
      readTime: "4 min read",
      excerpt: "Key takeaways from our interaction with Grade XII students on navigating setbacks, seeking international fellowships, and cultivating scientific curiosity.",
      content: "A dream remains just a wish without clear, structured milestones. In research as in life, consistent daily progress, learning from failed experiments, and seeking mentorship from global pioneers are the true catalysts of breakthrough accomplishments."
    }
  ],

  testimonials: [
    {
      quote: "Dr. Vishwajeet's insightful talk at DPS Bopal deeply motivated our Grade XII science students. His honest narration of setbacks and his journey across Europe and IIT Roorkee showed students what genuine scientific discipline looks like.",
      author: "School Leadership & Science Faculty",
      role: "Delhi Public School (DPS) - Bopal",
      organization: "Academic Outreach Host"
    },
    {
      quote: "Dr. Vishwajeet brings a rare blend of international postdoctoral rigor from Denmark and the UK into his laboratory at IIT Roorkee, providing extraordinary mentorship in sustainable energy technologies.",
      author: "Collaborative Academic Peer",
      role: "Department of Mechanical & Industrial Engineering",
      organization: "IIT Roorkee"
    },
    {
      quote: "His research methodologies in waste-to-energy thermochemical systems, hydrothermal carbonization, and zero-emission energy represent the exact kind of circular engineering needed today.",
      author: "Clean Energy Research Collaborator",
      role: "European Clean Energy Consortia",
      organization: "International Research Network"
    },
    {
      quote: "Under Dr. Vishwajeet's guidance, our research on hydrothermal carbonization and green hydrogen synthesis gained immense clarity. His emphasis on deep analytical rigor and experimental precision prepares scholars to publish in top-tier journals.",
      author: "Doctoral Research Scholar",
      role: "Thermochemical Energy Lab, Department of Mechanical & Industrial Engineering",
      organization: "IIT Roorkee"
    },
    {
      quote: "Collaborating with Dr. Vishwajeet across international renewable energy projects demonstrated his deep command of biomass valorization and plasma gasification dynamics. He seamlessly bridges foundational science with scalable industrial impact.",
      author: "Senior Research Fellow & Project Lead",
      role: "Department of Biological and Chemical Engineering",
      organization: "Aarhus University, Denmark"
    },
    {
      quote: "Dr. Vishwajeet provided invaluable technical consulting for municipal solid waste gasification and RDF energy recovery models. His insights into carbon emissions reduction and clean fuel synthesis are exceptionally practical and forward-looking.",
      author: "Chief Sustainability & Technology Advisor",
      role: "Industrial Renewable Energy Advisory",
      organization: "CleanTech Decarbonization Consortia"
    }
  ]
};
