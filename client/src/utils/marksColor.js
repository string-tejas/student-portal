export function getMarkColor(mark) {
    if (mark < 0 || mark > 10) {
        throw new Error("Mark must be between 0 and 10");
    } else if (mark < 4) {
        return "#FF0000"; // red
    } else if (mark < 7) {
        const r = Math.floor(((mark - 4) * 255) / 3);
        const g = Math.floor(((3 - (mark - 4)) * 255) / 3);
        return `#${r.toString(16).padStart(2, "0")}${g
            .toString(16)
            .padStart(2, "0")}00`; // gradual change from red to yellow
    } else if (mark < 9) {
        const g = Math.floor(((mark - 7) * 255) / 2);
        const r = Math.floor(((2 - (mark - 7)) * 255) / 2);
        return `#00${g.toString(16).padStart(2, "0")}${r
            .toString(16)
            .padStart(2, "0")}`; // gradual change from yellow to green
    } else {
        return "lightgreen"; // darkgreen
    }
}
