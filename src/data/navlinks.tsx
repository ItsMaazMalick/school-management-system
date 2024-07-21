import {
  BookPlus,
  BookUser,
  CandlestickChart,
  CircleDollarSign,
  CirclePercent,
  CreditCard,
  FileLineChart,
  GraduationCap,
  HousePlus,
  Landmark,
  LayoutDashboard,
  LibraryBig,
  List,
  Mails,
  Scale,
  School,
  Settings,
  ShieldPlus,
  UserPen,
  UserSearch,
} from "lucide-react";
// Define the type for a basic navigation link

type NavlinkWithoutOptions = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

// Define the type for a navigation link that has sub-options
type NavLinkWithOptions = {
  name: string;
  options: NavlinkWithoutOptions[];
};

// Create a type that can be either a basic link or a link with options
export type NavLink = NavlinkWithoutOptions | NavLinkWithOptions;

// Define the array with the proper type
export const adminNavlinks: NavLink[] = [
  {
    name: "Dashboard",
    url: "/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: "General Setting",
    options: [
      {
        name: "Institute Profile",
        url: "/admin/dashboard/institute-setting",
        icon: <UserPen size={18} />,
      },
      {
        name: "Fee Particulars",
        url: "/admin/dashboard/fee-particulars",
        icon: <CircleDollarSign size={18} />,
      },
      {
        name: "Fee Structure",
        url: "/admin/dashboard/fee-structure",
        icon: <CircleDollarSign size={18} />,
      },
      {
        name: "Discount Type",
        url: "/admin/dashboard/discount-type",
        icon: <CirclePercent size={18} />,
      },
      {
        name: "Details for Fee Challan",
        url: "/admin/dashboard/bank-details",
        icon: <Landmark size={18} />,
      },
      // {
      //   name: "Marks Grading",
      //   url: "/admin/dashboard/grading",
      //   icon: <CandlestickChart size={18} />,
      // },
      {
        name: "Account Setting",
        url: "/admin/dashboard/account-setting",
        icon: <Settings size={18} />,
      },
    ],
  },
  {
    name: "Classes",
    options: [
      {
        name: "All Classes",
        url: "/admin/dashboard/classes",
        icon: <School size={18} />,
      },
      {
        name: "New Class",
        url: "/admin/dashboard/classes/add-class",
        icon: <HousePlus size={18} />,
      },
    ],
  },
  {
    name: "Sections",
    options: [
      {
        name: "All Sections",
        url: "/admin/dashboard/sections",
        icon: <HousePlus size={18} />,
      },
      {
        name: "New Section",
        url: "/admin/dashboard/sections/add-section",
        icon: <School size={18} />,
      },
    ],
  },
  {
    name: "Subjects",
    options: [
      {
        name: "All Subjects",
        url: "/admin/dashboard/subjects",
        icon: <LibraryBig size={18} />,
      },
      {
        name: "Assign Subjects",
        url: "/admin/dashboard/subjects/assign-subjects",
        icon: <BookPlus size={18} />,
      },
    ],
  },
  {
    name: "Students",
    options: [
      {
        name: "All Students",
        url: "/admin/dashboard/students",
        icon: <BookUser size={18} />,
      },
      {
        name: "Add New Student",
        url: "/admin/dashboard/students/add-student",
        icon: <UserPen size={18} />,
      },
      {
        name: "Manage Families",
        url: "/admin/dashboard/students/manage-families",
        icon: <BookUser size={18} />,
      },
      {
        name: "Admission Letter",
        url: "/admin/dashboard/students/admission-letter",
        icon: <Mails size={18} />,
      },
      {
        name: "Student ID Cards",
        url: "/admin/dashboard/students/student-cards",
        icon: <CreditCard size={18} />,
      },
      {
        name: "Print Basic List",
        url: "/admin/dashboard/students/basic-list",
        icon: <List size={18} />,
      },
      {
        name: "Promote Students",
        url: "/admin/dashboard/students/promote-students",
        icon: <UserSearch size={18} />,
      },
    ],
  },
  {
    name: "Teachers",
    options: [
      {
        name: "All Teachers",
        url: "/admin/dashboard/teachers",
        icon: <GraduationCap size={18} />,
      },
      {
        name: "Add New Teacher",
        url: "/admin/dashboard/teachers/add-teacher",
        icon: <UserPen size={18} />,
      },
      {
        name: "Teacher ID Cards",
        url: "/admin/dashboard/teachers/teacher-cards",
        icon: <CreditCard size={18} />,
      },
      {
        name: "Job Letter",
        url: "/admin/dashboard/teachers/job-letter",
        icon: <Mails size={18} />,
      },
    ],
  },
  // {
  //   name: "Accounts",
  //   options: [
  //     {
  //       name: "Chart of Account",
  //       url: "/admin/dashboard/account-chart",
  //     },
  //     {
  //       name: "Add Income",
  //       url: "/admin/dashboard/add-income",
  //     },
  //     {
  //       name: "Add Expense",
  //       url: "/admin/dashboard/add-expense",
  //     },
  //     {
  //       name: "Account Statement",
  //       url: "/admin/dashboard/account-statement",
  //     },
  //   ],
  // },
  // {
  //   name: "Fees",
  //   options: [
  //     {
  //       name: "Generate Bank Challan",
  //       url: "/admin/dashboard/generate-bank-challan",
  //     },
  //     {
  //       name: "Collect Fee",
  //       url: "/admin/dashboard/collect-fee",
  //     },
  //     {
  //       name: "Fee Slip",
  //       url: "/admin/dashboard/fee-slip",
  //     },
  //     {
  //       name: "Fee Defaulters",
  //       url: "/admin/dashboard/fee-defaulters",
  //     },
  //     {
  //       name: "Fees Report",
  //       url: "/admin/dashboard/fees-report",
  //     },
  //     {
  //       name: "Delete Fee",
  //       url: "/admin/dashboard/delete-fee",
  //     },
  //   ],
  // },
  // {
  //   name: "Salary",
  //   options: [
  //     {
  //       name: "Pay Salery",
  //       url: "/admin/dashboard/pay-salary",
  //     },
  //     {
  //       name: "Salary Slip",
  //       url: "/admin/dashboard/salary-slip",
  //     },
  //     {
  //       name: "Salary Sheet",
  //       url: "/admin/dashboard/salary-sheet",
  //     },
  //   ],
  // },
  // {
  //   name: "Attendance",
  //   options: [
  //     {
  //       name: "Mark Students Attendance",
  //       url: "/admin/dashboard/mark-students-attendance",
  //       icon: <ShieldPlus size={18} />,
  //     },
  //     {
  //       name: "Mark Teacherss Attendance",
  //       url: "/admin/dashboard/mark-teachers-attendance",
  //       icon: <ShieldPlus size={18} />,
  //     },
  //     {
  //       name: "Class Wise Report",
  //       url: "/admin/dashboard/class-wise-report",
  //       icon: <FileLineChart size={18} />,
  //     },
  //     {
  //       name: "Students Attendance Report",
  //       url: "/admin/dashboard/students-attendance-report",
  //       icon: <FileLineChart size={18} />,
  //     },
  //     {
  //       name: "Teachers Attendance Report",
  //       url: "/admin/dashboard/teachers-attendance-report",
  //       icon: <FileLineChart size={18} />,
  //     },
  //   ],
  // },
  //   {
  //     name:"Time Table",
  //     options:[
  //         {
  //             name:"",
  //             url:""
  //         }
  //     ]
  //   }
];
