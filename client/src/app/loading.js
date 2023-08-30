import Spinner from "@/components/Spinner";

const Loading = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm md:text-base">Loading</span>
                <Spinner />
            </div>
        </div>
    );
};

export default Loading;
