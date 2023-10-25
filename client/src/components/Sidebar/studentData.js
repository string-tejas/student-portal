import { v4 as uuid } from "uuid";
import { AiFillHome } from "react-icons/ai";
import { BiNews, BiSolidBookBookmark } from "react-icons/bi";
const iconStyle = "text-lg";

const studentData = [
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
    {
        id: uuid(),
        title: "News and Feed",
        path: "/dashboard/news",
        icon: <BiNews className={iconStyle} />,
    },
];

export default studentData;
