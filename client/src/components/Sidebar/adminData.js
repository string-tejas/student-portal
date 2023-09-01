import { v4 as uuid } from "uuid";
import { AiFillHome } from "react-icons/ai";
import { BiSolidUser } from "react-icons/bi";
const iconStyle = "text-lg";

const adminData = [
    {
        id: uuid(),
        title: "Home",
        path: "/dashboard",
        icon: <AiFillHome className={iconStyle} />,
    },
    {
        id: uuid(),
        title: "Users",
        path: "/dashboard/users",
        icon: <BiSolidUser className={iconStyle} />,
    },
];

export default adminData;
