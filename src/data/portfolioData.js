// this is the portpolio data
import ProfileImg from "../assets/myimage.jpeg";
import Osctech from "../assets/osctech.png";
import Osctech1 from "../assets/osctech1.png";
import Osctech2 from "../assets/osctech2.png";
import Osctech3 from "../assets/osctech3.png";
import boarding1 from "../assets/boarding1.jpeg";
import boarding2 from "../assets/boarding2.jpeg";
import backgroundremove1 from "../assets/backgroundremove1.png";
import backgroundremove2 from "../assets/backgroundremove2.png";
import res1 from "../assets/res1.png";
import res2 from "../assets/res2.png";
import res3 from "../assets/res3.png";
import res4 from "../assets/res4.png";
import res5 from "../assets/res5.png";
import res6 from "../assets/res6.png";
import res7 from "../assets/res7.png";

export const portfolioData = {
  profile: {
    name: "Kavindu Madhushan",
    title: "Full Stack Developer | Mobile App Developer",
    bio: "Passionate about creating innovative solutions and building scalable web applications and mobile applications. With expertise in modern web technologies, I transform ideas into reality.",
    photo: ProfileImg,
    phone: "+94 72 3767 040",
    email: "agkmadhushan22@gmail.com",
    location: "Galle, Elpitiya."
  },
  skills: [
    { name: "React" },
    { name: "React Native" },
    { name: "Node.js" },
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "Python" },
    { name: "Laravel" },
    { name: "HTML" },
    { name: "CSS" },
    { name: "PHP" },
    { name: "C" },
    { name: "C++" },
    { name: "C#(.net)" },
    { name: "Java" },
    { name: "Springboot" },
    { name: "Kotlin" },
    { name: "Angular" },
    { name: "R" },
    { name: "Electron.js" },
    { name: "MySQL" },
    { name: "MongoDB" },
    { name: "AWS" },
    { name: "Docker" },
    { name: "Git" },
    { name: "REST API" }
  ],
  projects: [
    {
      id: "osc-technology",
      name: "OSC-Technology Inventory Management",
      description: "A full-stack e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics dashboard.",
      details: "Complete inventory management system built with modern technologies. Features include real-time stock tracking, automated reordering, supplier management, and comprehensive reporting.",
      ftech: ["Blade Template Engine","CSS","Boostrap","JavaScript"],
      btech: ["Laravel Framework (PHP)","MySQL","Laravel Migration & Seeder","Laravel Middleware"],
      features: [
        "Role-based inventory management where Super Admins can add, update, and delete inventory items, while Admins are authorized to add and manage items.",
        "Super Admins can create, manage, promote, or remove Admin user accounts.",
        "Comprehensive sales management including sales recording, tracking, and history management.",
        "Admins and Super Admins can view sales reports based on daily, weekly, monthly, or custom time ranges.",
        "All Admin users can monitor daily profit and loss status through a summarized financial dashboard."
        ],

      images: [Osctech, Osctech3, Osctech2, Osctech1]
    },
    {
    id: "boarding-finder-app",
    name: "Boarding Finder Mobile App",
    description:
    "A mobile application that connects boarding house owners and students. Boarding owners can add and manage boarding details, while students can discover nearby boarding places using an interactive map.",

    details:
    "The Boarding Finder Mobile App was developed using React Native to help students easily find boarding houses and enable boarding owners to publish their boarding details. Boarding owners can add information such as location, price, facilities, and availability. Students can view available boarding places through a map-based interface, search nearby locations, and view detailed boarding information in real time.",

    ftech: [
    "React Native",
    "JavaScript",
    "Expo",
    "Google Maps API"
    ],

    btech: [
    "Firebase",
    
    ],

    features: [
    "Boarding owners can add and update boarding details\n",
    "Students can view boarding locations using map view",
    "Search boarding houses by location",
    "View boarding details including price and facilities",
    "Mobile-friendly and user-friendly interface"
    ],

    images: [boarding1,boarding2]

    },
    {
    id: "background-remover-webapp",
    name: "Background Remover Web Application",
    description: "A web-based image editing tool that allows users to remove image backgrounds instantly with AI-powered precision.",
    details: "This web application enables users to upload images and automatically remove backgrounds. It includes features such as batch image processing, download options in multiple formats, and real-time preview. Built with modern web technologies, it ensures fast processing and a user-friendly interface.",
    
    ftech: ["Blade Template Engine ", "HTML5", "CSS", "Tailwind CSS", "JavaScript"],
     btech: ["Laravel Framework (PHP)","MySQL","Laravel Migration & Seeder"],

    features: [
      "Upload images and remove backgrounds instantly using AI algorithms.",
      "Batch processing to handle multiple images simultaneously.",
      "Download processed images in different formats (PNG, JPG).",
      "Real-time preview before downloading the edited image.",
      "User-friendly interface with responsive design for web browsers."
    ],

    images: [backgroundremove1,backgroundremove2]
  },

  {
    id: "hangup-chef-pos",
    name: "Hang-Up Chef POS System",
    description: "A comprehensive point-of-sale system with real-time stock management, sales tracking, automated backups, and an intuitive dashboard for restaurant and retail operations.",
    details: "Hang-Up Chef POS System is a full-featured point-of-sale solution designed for restaurants, cafes, and retail outlets. The system enables efficient order management, real-time inventory tracking with low stock alerts, and complete sales reporting. Built-in backup functionality ensures data safety, while the interactive POS dashboard provides instant visibility into daily transactions, stock levels, and financial performance.",
    
    ftech: ["Blade Template Engine ", "HTML5", "CSS", "Tailwind CSS", "JavaScript"],
     btech: ["Laravel Framework (PHP)","MySQL","Laravel Migration & Seeder","Laravel Middleware", "RESTful API"],

    features: [
    "POS Dashboard with real-time transaction processing, cart management, and instant billing for walk-in customers.",
    "Stock Management system where admins can view inventory categorized as In Stock, Low Stock, and Out of Stock with auto-generated alerts.",
    "Complete product management including adding, editing, deleting, and categorizing menu items or retail products.",
    "Automated database backup feature allowing admins to schedule or manually trigger backups with one-click restore capability.",
    "Sales reporting with daily, weekly, monthly, and custom date range filters to track revenue, profit, and popular items.",
    "Role-based access control where Super Admins manage staff accounts and assign permissions for cashiers, managers, and admins.",
    "Low stock notification system that automatically alerts admins when product quantities fall below the defined threshold.",
    "Order history and transaction logs for complete audit trail and customer purchase tracking."
    ],

    images: [res1,res2,res3,res4,res5,res6,res7]
  }
  ]
};