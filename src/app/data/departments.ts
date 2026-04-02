export interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  overviewUrl: string;
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
    id: "3d-blender-film",
    name: "3D Blender & Film Fundamentals",
    tagline: "Master the art of 3D creation and cinematic storytelling",
    icon: "🎬",
    backgroundImage: "https://images.unsplash.com/photo-1709165653909-53ede28812b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzRCUyMGRpZ2l0YWwlMjBhcnQlMjByZW5kZXIlMjBmdXR1cmlzdGljfGVufDF8fHx8MTc3NDc2OTQwMnww&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "from-purple-600 via-blue-600 to-indigo-700",
    theme: {
      primary: "#8b5cf6",
      secondary: "#3b82f6",
      accent: "#6366f1",
    },
    courses: [
      {
        id: "intro-3d-modeling",
        name: "Introduction to 3D Modeling",
        description: "Learn the fundamentals of 3D modeling with Blender. Create stunning 3D objects from scratch and understand the basics of mesh manipulation.",
        price: 50000,
        overviewUrl: "#",
      },
      {
        id: "character-animation",
        name: "Character Animation & Rigging",
        description: "Bring your characters to life! Master rigging, weight painting, and animation techniques to create professional character animations.",
        price: 50000,
        overviewUrl: "#",
      },
      {
        id: "cinematic-rendering",
        name: "Cinematic Rendering & Lighting",
        description: "Discover the secrets of cinematic lighting and rendering. Learn to create photorealistic scenes with professional lighting techniques.",
        price: 50000,
        overviewUrl: "#",
      },
    ],
  },
  {
    id: "dynamic-sketching",
    name: "Dynamic Sketching",
    tagline: "Transform your ideas into captivating visual stories",
    icon: "✏️",
    backgroundImage: "https://images.unsplash.com/photo-1758521232708-d738b0eaa94a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMHBlbmNpbCUyMHNrZXRjaCUyMGRyYXdpbmd8ZW58MXx8fHwxNzc0NzY5NDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "from-orange-500 via-pink-500 to-rose-600",
    theme: {
      primary: "#f97316",
      secondary: "#ec4899",
      accent: "#f43f5e",
    },
    courses: [
      {
        id: "gesture-drawing",
        name: "Gesture Drawing & Figure Studies",
        description: "Capture the essence of movement and form. Learn dynamic gesture drawing techniques to create expressive character poses.",
        price: 50000,
        overviewUrl: "#",
      },
      {
        id: "concept-art",
        name: "Concept Art & Visual Development",
        description: "Transform ideas into compelling visual concepts. Master the art of creating concept art for games, films, and animation.",
        price: 50000,
        overviewUrl: "#",
      },
      {
        id: "digital-illustration",
        name: "Digital Illustration Mastery",
        description: "Elevate your digital art skills. Learn professional illustration techniques, color theory, and composition for stunning artwork.",
        price: 50000,
        overviewUrl: "#",
      },
    ],
  },
  {
    id: "game-development",
    name: "Game Development",
    tagline: "Build immersive worlds and interactive experiences",
    icon: "🎮",
    backgroundImage: "https://images.unsplash.com/photo-1700412747294-b1bb05b86be4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwZ2FtaW5nJTIwY3liZXJwdW5rJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzc0NzY5NDAzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    gradient: "from-cyan-500 via-teal-500 to-green-600",
    theme: {
      primary: "#06b6d4",
      secondary: "#14b8a6",
      accent: "#10b981",
    },
    courses: [
      {
        id: "game-design-fundamentals",
        name: "Game Design Fundamentals",
        description: "Learn the core principles of game design. Understand mechanics, player psychology, and how to create engaging gameplay experiences.",
        price: 50000,
        overviewUrl: "#",
      },
      {
        id: "unity-development",
        name: "Unity Game Development",
        description: "Build your first game with Unity! Master C# programming, physics, and game mechanics to create professional 2D and 3D games.",
        price: 50000,
        overviewUrl: "#",
      },
      {
        id: "game-art-ui",
        name: "Game Art & UI Design",
        description: "Create stunning game visuals and interfaces. Learn pixel art, UI/UX design, and asset creation for games.",
        price: 50000,
        overviewUrl: "#",
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
