const getRandomIndexAsFunctionOfDate = (date = new Date(), length) => {
    const dateArray = date.toISOString().split("T")[0].split("-");
    const sum = dateArray.reduce((acc, curr) => acc + parseInt(curr), 0);
    return sum % length;
};

export default getRandomIndexAsFunctionOfDate;
