import ReactQuill from "react-quill";

const SendComment = () => {
  return (
    <div className="mt-3">
      <ReactQuill />
      <div className="flex items-center justify-end mt-2">
        <button className="ring-0 bg-emerald-600 text-white hover:bg-emerald-600/70 rounded-md px-3 py-1 w-fit">
          Comment
        </button>
      </div>
    </div>
  );
};

export default SendComment;
