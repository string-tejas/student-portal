import { Worker, parentPort, workerData } from "worker_threads";

const allocateSevaPreferences = (sevaPreferences, sevaCourses) => {
    const seatAllocated = {};
    const maxSeat = {};
    const batches = {};

    for (let course of sevaCourses) {
        seatAllocated[course._id] = 0;
        maxSeat[course._id] = course.intake * course.batches;
        batches[course._id] = course.batches;
    }

    const sevaAllocation = [];
    const unAllocated = [];

    for (let preference of sevaPreferences) {
        let allocated = false;
        for (let course of preference.preference) {
            if (seatAllocated[course.id] < maxSeat[course.id]) {
                seatAllocated[course.id] += 1;

                sevaAllocation.push({
                    student: preference.student,
                    course: course.id,
                    batch: seatAllocated[course.id] % batches[course.id],
                });
                allocated = true;
                break;
            }
        }
        if (!allocated) {
            unAllocated.push(preference);
        }
    }

    return { sevaAllocation, unAllocated };
};

const { sevaPreferences, sevaCourses } = workerData;
const allocationResult = allocateSevaPreferences(sevaPreferences, sevaCourses);
parentPort.postMessage(allocationResult);
