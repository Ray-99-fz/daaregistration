export interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  overviewUrl: string;
  instructor: string;
  level: string;
  duration: string;
  image: string;
  /** Extra shots for gallery / horizontal scroll */
  trialImages?: string[];
  instructorSocials?: {
    instagram?: string;
    twitter?: string;
    portfolio?: string;
  };
}

export interface Department {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  backgroundImage: string;
  courses: Course[];
  gradient: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Pricing rules for the registration flow.
export const registrationFee = 5000;
export const courseFee = 50000;

export const departments: Department[] = [
  {
    id: "3d-vfx",
    name: "3D & VFX",
    tagline: "Master digital creation and cinematic storytelling",
    icon: "🎬",
    backgroundImage: "https://images.unsplash.com/photo-1709165653909-53ede28812b2",
    gradient: "from-purple-600 via-blue-600 to-indigo-700",
    theme: {
      primary: "#8b5cf6",
      secondary: "#3b82f6",
      accent: "#6366f1",
    },
    courses: [
      {
        id: "intro-blender",
        name: "\"I AM CUBE\" Intro to Blender",
        description:
          "Learn Blender basics from interface navigation to rendering, with weekly feedback and a final cube animation project.",
        price: 50000,
        overviewUrl:
          "https://oxrrvywnqzdfqtugnjyj.supabase.co/storage/v1/object/public/course_outlines/I_AM_CUBE_INTRO_TO_BLENDER.pdf",
        instructor: "Rafiki Nigel Moyo",
        level: "Beginner",
        duration: "6 weeks",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        trialImages: [
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
        ],
        instructorSocials: { instagram: "https://instagram.com", portfolio: "https://www.behance.net" },
      },
      {
        id: "cinematic-vfx",
        name: "Cinematic Product Branding & Commercial VFX",
        description:
          "Industry-facing course on high-end product visualization, studio lighting, complex surfaces, and commercial workflows.",
        price: 50000,
        overviewUrl:
          "https://oxrrvywnqzdfqtugnjyj.supabase.co/storage/v1/object/public/course_outlines/Cinematic%20Product%20Branding%20&%20Commercial%20VFX.pdf",
        instructor: "Matthew Lusayo Chawinga",
        level: "Intermediate - Advanced",
        duration: "8 weeks",
        image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80",
        trialImages: [
          "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80",
        ],
        instructorSocials: { portfolio: "https://www.behance.net" },
      },
      {
        id: "game-art-assets",
        name: "Introduction to 3D Game Art Workflow & Asset Creation",
        description:
          "Translate concept art into game-ready 3D assets using stylized workflows, UV unwrapping, texturing, and Unity integration.",
        price: 50000,
        overviewUrl:
          "https://oxrrvywnqzdfqtugnjyj.supabase.co/storage/v1/object/public/course_outlines/INTRODUCTION%20TO%203D%20GAME%20ART%20%20-%20PROPS,%20WEAPONS%20AND%20ENVIRONMENT%20ASSETS.pdf.pdf",
        instructor: "Mwayiwawo Kamvantope",
        level: "Beginner - Intermediate",
        duration: "8 weeks",
        image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
        trialImages: [
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80",
        ],
      },
    ],
  },
  {
    id: "visual-development",
    name: "Visual Development",
    tagline: "Transform ideas into captivating visual stories",
    icon: "✏️",
    backgroundImage: "https://images.unsplash.com/photo-1758521232708-d738b0eaa94a",
    gradient: "from-orange-500 via-pink-500 to-rose-600",
    theme: {
      primary: "#f97316",
      secondary: "#ec4899",
      accent: "#f43f5e",
    },
    courses: [
      {
        id: "dynamic-sketching",
        name: "Introduction to Dynamic Sketching",
        description:
          "Observational drawing course to build foundational sketching skills, perspective, organic forms, and redesign projects.",
        price: 50000,
        overviewUrl:
          "https://oxrrvywnqzdfqtugnjyj.supabase.co/storage/v1/object/public/course_outlines/CORE__INTRODUCTION_TO_DYNAMIC_SKETCHING.pdf",
        instructor: "Tumpale Chawinga",
        level: "Beginner",
        duration: "8 weeks",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
        trialImages: [
          "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1513475382583-d0067c604b29?auto=format&fit=crop&w=800&q=80",
        ],
        instructorSocials: { instagram: "https://instagram.com" },
      },
      {
        id: "digital-portrait",
        name: "Digital Portrait Painting",
        description:
          "Portrait drawing using the Reilly method, anatomy studies, value work, and final polished portraits.",
        price: 50000,
        overviewUrl:
          "https://oxrrvywnqzdfqtugnjyj.supabase.co/storage/v1/object/public/course_outlines/DIGITAL%20PORTAIT%20DRAWING.pdf",
        instructor: "Tumpale Chawinga",
        level: "Beginner - Intermediate",
        duration: "8 weeks",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
        trialImages: [
          "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
        ],
        instructorSocials: { instagram: "https://instagram.com", portfolio: "https://www.behance.net" },
      },
      {
        id: "character-storytelling",
        name: "Character Design & Visual Storytelling",
        description:
          "Character design and storytelling through composition, gesture, and sequential art, culminating in a final comic or illustration.",
        price: 50000,
        overviewUrl:
          "https://oxrrvywnqzdfqtugnjyj.supabase.co/storage/v1/object/public/course_outlines/CHARACTER%20DESIGN%20&%20VISUAL%20STORYTELLING.pdf",
        instructor: "Ovil Msampha",
        level: "Beginner - Intermediate",
        duration: "8 weeks",
        image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
        trialImages: [
          "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1513475382583-d0067c604b29?auto=format&fit=crop&w=800&q=80",
        ],
        instructorSocials: { twitter: "https://twitter.com", portfolio: "https://www.behance.net" },
      },
    ],
  },
  {
    id: "game-development",
    name: "Game Development",
    tagline: "Build immersive worlds and interactive experiences",
    icon: "🎮",
    backgroundImage: "https://images.unsplash.com/photo-1700412747294-b1bb05b86be4",
    gradient: "from-cyan-500 via-teal-500 to-green-600",
    theme: {
      primary: "#06b6d4",
      secondary: "#14b8a6",
      accent: "#10b981",
    },
    courses: [
      {
        id: "game-fundamentals",
        name: "Game Development Fundamentals",
        description:
          "Introduction to core principles of game creation, player interaction, logic, and building a complete simple game.",
        price: 50000,
        overviewUrl:
          "https://oxrrvywnqzdfqtugnjyj.supabase.co/storage/v1/object/public/course_outlines/CORE%20%20FOUNDATION%20GAME%20DEVELOPMENT%20COURSE%20OUTLINE.pdf",
        instructor: "Nyasha Mpinda",
        level: "Beginner",
        duration: "8 weeks",
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
        trialImages: [
          "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
        ],
      },
      {
        id: "unity-foundations",
        name: "Foundations of Game Development in Unity",
        description:
          "Project-based Unity course covering scripting, mechanics, collisions, UI, and building a playable mini game.",
        price: 50000,
        overviewUrl:
          "https://oxrrvywnqzdfqtugnjyj.supabase.co/storage/v1/object/public/course_outlines/FOUNDATIONS%20OF%20GAME%20DEVELOPMENT%20IN%20UNITY.pdf",
        instructor: "Sangwani Mkandawire",
        level: "Beginner - Intermediate",
        duration: "6 weeks",
        image: "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=800&q=80",
        trialImages: [
          "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
        ],
        instructorSocials: { portfolio: "https://github.com" },
      },
      {
        id: "godot-intermediate",
        name: "Intermediate Game Development with Godot",
        description:
          "Advanced Godot course focusing on complex systems, UI, AI, optimization, and producing a polished portfolio-ready game.",
        price: 50000,
        overviewUrl:
          "https://oxrrvywnqzdfqtugnjyj.supabase.co/storage/v1/object/public/course_outlines/Intermediate_Game_Development_Godot_v2.pdf",
        instructor: "Kevin Thindwa",
        level: "Intermediate",
        duration: "8 weeks",
        image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
        trialImages: [
          "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
        ],
        instructorSocials: { twitter: "https://twitter.com" },
      },
    ],
  },
];


export function getDepartmentById(id: string): Department | undefined {
  return departments.find((dept) => dept.id === id);
}

export function getCourseById(departmentId: string, courseId: string): Course | undefined {
  const department = getDepartmentById(departmentId);
  return department?.courses.find((course) => course.id === courseId);
}
