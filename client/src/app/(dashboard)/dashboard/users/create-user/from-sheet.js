import SubmitButton from "@/components/SubmitButton";
import Table from "@/components/Table";
import React from "react";
import Spreadsheet from "react-spreadsheet";

const FromSheet = ({ onChange = () => {}, data }) => {
    const [spreadSheet, setSpreadSheet] = React.useState([]);
    const [labels, setLabels] = React.useState(null);

    React.useEffect(() => {
        if (data) {
            // get keys of first object of data
            const keys = Object.keys(data[0]);
            console.log(keys);
            setLabels(keys);
        }
    }, [data]);

    React.useEffect(() => {
        if (data) {
            const res = data.map((ele) => {
                let mapped = [];
                labels.forEach((label) => {
                    mapped.push({
                        value: ele[label],
                    });
                });
                return mapped;
            });
            setSpreadSheet(res);
        }
    }, [labels]);

    return (
        <>
            <p className="text-sm ml-1 md:text-base mt-2 md:mt-4 font-medium text-gray-400">
                Upload an excel file with the following columns: <br />
            </p>
            <div className="overflow-x-auto w-full md:w-min mt-2 rounded-md">
                <Table.Container>
                    <Table.Body>
                        <Table.Tr>
                            <Table.Td className="border-r border-gray-700">
                                First Name
                            </Table.Td>
                            <Table.Td className="border-r border-gray-700">
                                Last Name
                            </Table.Td>
                            <Table.Td className="border-r border-gray-700">
                                Email
                            </Table.Td>
                            <Table.Td className="border-r border-gray-700">
                                Role
                            </Table.Td>
                            <Table.Td>Roll Number</Table.Td>
                        </Table.Tr>
                    </Table.Body>
                </Table.Container>
            </div>
            <div className="text-sm ml-1 md:text-base mt-2 md:mt-4 font-medium text-gray-400">
                Please take care of the following:{" "}
            </div>
            <ul className="text-sm ml-4 md:ml-12 list-disc text-gray-500 md:space-y-1">
                <li>
                    The <code>Role</code> column should contain one of the
                    following values: <code>admin</code>, <code>dean</code>,{" "}
                    <code>exam-officer</code>, <code>coordinator</code>,{" "}
                    <code>teacher</code> or <code>student</code>
                </li>
                <li>
                    The <code>Roll Number</code> column should be empty for all
                    users except students
                </li>
                <li>
                    The <code>Email</code> and <code>Roll Number</code> column
                    should be unique for all students
                </li>
                <li>
                    A random <code>Password</code> will be generated for all
                    users
                </li>
            </ul>

            <div className="mt-4">
                {data ? (
                    !labels ? (
                        <div>Processing file...</div>
                    ) : (
                        <Spreadsheet data={spreadSheet} columnLabels={labels} />
                    )
                ) : (
                    <DropZone onChange={onChange} />
                )}
            </div>

            <div className="mt-4 mb-3 flex gap-4 items-center">
                <SubmitButton className="bg-red-700 border border-red-700 hover:bg-red-900">
                    Clear
                </SubmitButton>
                <SubmitButton>Create</SubmitButton>
            </div>
        </>
    );
};

const DropZone = ({ onChange }) => (
    <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center max-w-4xl h-64 border-2  border-dashed rounded-lg cursor-pointer  bg-gray-700 border-gray-600 hover:border-gray-500 hover:bg-gray-600"
    >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
                className="w-8 h-8 mb-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
            </svg>
            <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
            </p>
            <p className="text-xs text-gray-400">XLS, XLSX, CSV</p>
        </div>
        <input
            id="dropzone-file"
            type="file"
            onChange={onChange}
            className="hidden"
        />
    </label>
);
export default FromSheet;
