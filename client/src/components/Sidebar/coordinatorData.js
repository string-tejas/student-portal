import { v4 as uuid } from "uuid";
import { AiFillHome } from "react-icons/ai";
import { BiSolidBookBookmark } from "react-icons/bi";
import { GiFirePunch } from "react-icons/gi";
import { TbSquareRoundedLetterH } from "react-icons/tb";
const iconStyle = "text-lg";
const bigIconStyle = "text-xl";

const coordinatorData = [
    {
        id: uuid(),
        title: "Home",
        path: "/dashboard",
        icon: <AiFillHome className={iconStyle} />,
    },
    {
        id: uuid(),
        title: "Seva Satva",
        path: "/dashboard/seva-satva",
        icon: <GiFirePunch className={bigIconStyle} />,
    },
    // {
    //     id: uuid(),
    //     title: "HSS",
    //     path: "/dashboard/hss",
    //     icon: <TbSquareRoundedLetterH className={bigIconStyle} />,
    // },
    {
        id: uuid(),
        title: "Courses",
        path: "/dashboard/courses",
        icon: <BiSolidBookBookmark className={iconStyle} />,
    },
];

export default coordinatorData;
