import users from "@/utils/users";
import { v4 as uuid } from "uuid";

export const filterUserDropdown = [
    {
        id: uuid(),
        name: "All",
        value: "all",
    },
    {
        id: uuid(),
        name: "Admin",
        value: users.ADMIN,
    },
    {
        id: uuid(),
        name: "Dean",
        value: users.DEAN,
    },
    {
        id: uuid(),
        name: "Exam Officer",
        value: users.EXAM_OFFICER,
    },
    {
        id: uuid(),
        name: "Co-ordinator",
        value: users.COORDINATOR,
    },
    {
        id: uuid(),
        name: "Teacher",
        value: users.TEACHER,
    },
    {
        id: uuid(),
        name: "Student",
        value: users.STUDENT,
    },
];
