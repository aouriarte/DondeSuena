import ReactLoading from "react-loading";

const Loading = () => {
    return (
        <div className="flex justify-center my-[20%]">
            <ReactLoading
                type="spin"
                color={"black"}
                height={"15%"}
                width={"15%"}
            />
        </div>
    );
};

export default Loading;
