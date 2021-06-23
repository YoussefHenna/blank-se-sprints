import { NavigationItem } from "./NavigationBar";
import MajorInfoIcon from "@material-ui/icons/LibraryBooks";
import GradesIcon from "@material-ui/icons/Spellcheck";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CourseEditIcon from "@material-ui/icons/PostAdd";
import ClassIcon from "@material-ui/icons/Class";

const studentNavigationItems: NavigationItem[] = [
  { label: "Major", icon: MajorInfoIcon, route: "/student/major" },
  { label: "Grades", icon: GradesIcon, route: "/student/grades" },
  { label: "Schedule", icon: ScheduleIcon, route: "/student/schedule" },
];

const adminNavigationItems: NavigationItem[] = [
  { label: "Courses", icon: CourseEditIcon, route: "/admin/courses" },
  { label: "Schedule", icon: ScheduleIcon, route: "/admin/schedule" },
];

const TANavigationItems: NavigationItem[] = [
  { label: "Grades", icon: GradesIcon, route: "/instructor/grades" },
  { label: "Classes", icon: ClassIcon, route: "/instructor/classes" },
];

export function getNavigationItems(
  userType: "student" | "TA" | "admin" | undefined
): NavigationItem[] | undefined {
  switch (userType) {
    case "student":
      return studentNavigationItems;
    case "TA":
      return TANavigationItems;
    case "admin":
      return adminNavigationItems;
    default:
      return undefined;
  }
}
