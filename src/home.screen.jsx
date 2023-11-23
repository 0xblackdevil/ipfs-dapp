import React, { useState } from "react";
import IPFSclient from "./ipfs.service";

export default function HomeScreen() {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  function handleFileChange(e) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    console.log(e.target.files);
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    const ipfsFile = await IPFSclient.add(file);
    setFileURL(ipfsFile);
    console.log(ipfsFile);

    setFile(null);
    event.target.reset();
  }

  async function viewFile() {
    console.log(`/ipfs/${fileURL.path}`);
    const respose = await IPFSclient.cat(`/ipfs/${fileURL.path}`);
    console.log(respose);
  }

  return (
    <div className="mx-auto max-w-xs mt-5  flex items-center justify-center">
      <div className="flex-none">
        <form onSubmit={onSubmitHandler}>
          <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
            <div className="space-y-1 text-center">
              <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </div>
              <div className="text-gray-600">
                <a
                  href="#"
                  className="font-medium text-primary-500 hover:text-primary-700"
                >
                  Click to upload
                </a>{" "}
                or drag and drop
              </div>
              <p className="text-sm text-gray-500">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
            <input
              id="example5"
              onChange={handleFileChange}
              type="file"
              className="sr-only"
            />
          </label>
          <label className="flex w-full cursor-pointer items-center justify-center pt-1 pb-1">
            {file !== null ? (
              <p className="text-sm text-gray-500">{file.name}</p>
            ) : (
              <></>
            )}
          </label>
          <label className="flex w-full cursor-pointer items-center justify-center p-3">
            {file !== null ? (
              <button
                className="bg-green-100 w-full hover:bg-green-300 text-black py-2 px-4 rounded"
                type="submit"
              >
                Upload file
              </button>
            ) : (
              <></>
            )}
          </label>
        </form>

        {fileURL !== null ? <>Upload Status: {String(fileURL.path)}</> : <></>}

        {fileURL !== null ? (
          <a
            className="bg-green-100 w-full hover:bg-green-300 text-black py-2 px-4 rounded"
            href="ipfs://QmdX4RzMCA2yuUT2rdQAdeSg5ekzVi4VNH6RZT5V72AKw5"
          >
            View file
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
