import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { FaFileUpload } from "react-icons/fa";
import { Button } from "./button";
import { Separator } from "./separator";
import { MdCancel } from "react-icons/md";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./form";
import { Input } from "./input";

type Props = {
  isSubmitting: boolean;
  imageUrl?: string;
};

function MyDropzone({ isSubmitting, imageUrl }: Props) {
  const [filePreview, setFilePreview] = useState<string>(() =>
    imageUrl ? imageUrl : "",
  );
  const [isRejected, setIsRejected] = useState<boolean>(false);

  const { control, setValue } = useFormContext();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[acceptedFiles.length - 1];
        setValue("imageFile", file);
        const previewUrl = URL.createObjectURL(file);
        setFilePreview(previewUrl);
        return () => URL.revokeObjectURL(previewUrl);
      }
    },
    [setValue],
  );

  const onDropRejected = (fileRejections: Array<FileRejection>) => {
    setIsRejected(true);
    const lastFile = fileRejections[fileRejections.length - 1];
    const lastFileLastError = lastFile.errors.length - 1;
    setFilePreview(lastFile.errors[lastFileLastError].message);
  };

  const onDropAccepted = () => setIsRejected(false);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    onDropRejected,
    onDropAccepted,
    noClick: true,
    disabled: isSubmitting,
    noKeyboard: true,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 10,
  });

  const handleRemove = () => {
    setFilePreview("");
    setValue("imageFile", null);
  };

  return (
    <div className="flex flex-col">
      {filePreview && !isRejected ? (
        <div className="relative">
          <MdCancel
            className="absolute right-2 cursor-pointer rounded-full bg-white text-2xl text-red-500"
            onClick={handleRemove}
          />
          <img
            src={filePreview}
            alt="File preview"
            className="h-28 w-28 rounded-full"
          />
        </div>
      ) : (
        <div className="rounded-xl bg-[#5b618f]">
          <div
            {...getRootProps({ className: "dropzone" })}
            className={`m-4 rounded-lg border-2 border-dashed border-zinc-400 bg-[#414568] px-2 py-10 ${isDragActive && "border-3 border-[#7F56D9]"} ${
              isRejected && "border-red-500"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center px-8">
                <FaFileUpload className="text-3xl text-[#7F56D9]" />
                {isDragActive ? (
                  <p className="text-zinc-100">Drop the file here ...</p>
                ) : (
                  <p className="text-zinc-100">Drag & drop the file here</p>
                )}
              </div>
              <Separator className="w-64 bg-zinc-300 py-[0.8px]" />
              <Button asChild variant="primary" onClick={open}>
                <span className="cursor-pointer">Browse</span>
              </Button>
            </div>
          </div>
          {isRejected && (
            <span className="mb-3 inline-block text-red-600">
              {filePreview}
            </span>
          )}
        </div>
      )}
      <FormField
        control={control}
        name="imageFile"
        render={() => (
          <FormItem>
            <FormControl>
              <Input className="hidden" type="file" />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </div>
  );
}

export default MyDropzone;
