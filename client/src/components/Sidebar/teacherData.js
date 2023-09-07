import { v4 as uuid } from "uuid";
import { AiFillHome } from "react-icons/ai";
import { BiSolidBookBookmark } from "react-icons/bi";
const iconStyle = "text-lg";

const teacherData = [
    {
        id: uuid(),
        title: "Home",
        path: "/dashboard",
        icon: <AiFillHome className={iconStyle} />,
    },
    {
        id: uuid(),
        title: "Courses",
        path: "/dashboard/courses",
        icon: <BiSolidBookBookmark className={iconStyle} />,
    },
];

export default teacherData;
