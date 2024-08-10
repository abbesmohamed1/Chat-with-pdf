"use client";
import { CircleArrowDown, RocketIcon } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
function FileUploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
    });

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
      <div
        {...getRootProps()}
        className={`p-10 border-indigo-600 text-indigo-600 border-2 border-dashed mt-10 w-[90%] justify-center rounded-lg 
            h-96 flex items-center ${
              isFocused || isDragAccept ? "bg-indigo-300" : "bg-indigo-100"
            }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col justify-center items-center">
          {isDragActive ? (
            <>
              <RocketIcon className="h-20 w-20 animate-ping" />
              <p>Drop The file here ...</p>
            </>
          ) : (
            <>
              {" "}
              <CircleArrowDown className="h-20 w-20 animate-bounce" />
              <p>Drag and drop some files here, or click to select files</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
