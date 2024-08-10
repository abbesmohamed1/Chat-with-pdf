/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useUpload, { StatusText } from "@/hooks/useUpload";
import {
  CheckCheckIcon,
  CircleArrowDown,
  HammerIcon,
  RocketIcon,
  SaveIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
function FileUploader() {
  const { progress, status, fileId, handleUpload } = useUpload();

  const router = useRouter();

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [fileId, router]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files

    const file = acceptedFiles[0];
    if (file) {
      await handleUpload(file);
    } else {
      // do nothing
      // toast
    }
  }, []);

  const statusIcons: {
    [Key in StatusText]: JSX.Element;
  } = {
    [StatusText.UPLOADING]: <RocketIcon className="h20 w20 text-indigo-600" />,
    [StatusText.UPLOADED]: (
      <CheckCheckIcon className="h20 w20 text-indigo-600" />
    ),
    [StatusText.SAVING]: <SaveIcon className="h20 w20 text-indigo-600" />,
    [StatusText.GENERATING]: (
      <HammerIcon className="h20 w20 text-indigo-600 animate-bounce" />
    ),
  };

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
        "application/pdf": [".pdf"],
      },
    });

  const uploadInProgress = progress != null && progress >= 0 && progress <= 100;

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
      {uploadInProgress && (
        <div className="mt-32 flex flex-col justify-center items-center gap-5">
          <div
            className={`radial-progress bg-indigo-300 text-white border-indigo-600 border-4 ${
              progress === 100 && "hidden"
            }`}
            role="progressbar"
            style={{
              // @ts-ignore
              "--value": progress,
              "--size": "12rem",
              "--thickness": "1.3rem",
            }}
          >
            {progress} %
          </div>

          {/* Render Status Icon */}
          {
            //  @ts-ignore
            statusIcons[status!]
          }

          {/* @ts-ignore */}
          <p className="text-indigo-600 animate-pulse">{status}</p>
        </div>
      )}

      {!uploadInProgress && (<div
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
      </div>)}
    </div>
  );
}

export default FileUploader;
