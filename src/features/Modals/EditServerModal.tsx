import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { FaServer } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import MyDropzone from "@/components/ui/dropzone";
import { ServerData } from "./InitialModal";
import { useModal } from "./useModal";
import { useDispatch } from "react-redux";
import { closeModal } from "./modalSlice";
import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { useEditServer } from "../server/useEditServer";

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: "Server name is required",
    }),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
    imageUrl: z.string().optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either imageUrl or imageFile must be provided",
    path: ["imageFile"],
  });

const EditServerModal = () => {
  const { editServer, isLoading: isServerLoading } = useEditServer();
  const { isOpen, type, server } = useModal();
  const dispatch = useDispatch();
  const location = useLocation();
  const match = matchPath({ path: "/server/:serverId" }, location.pathname);

  const isModalOpen = isOpen && type === "editServer";
  const handleClose = () => {
    form.reset();
    dispatch(closeModal());
  };

  const form = useForm<ServerData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isFormLoading = form.formState.isSubmitting || isServerLoading;

  const onSubmit = (values: ServerData) => {
    const formData = new FormData();
    if (values.imageFile) formData.append("imageFile", values.imageFile);
    formData.append("name", values.name);
    editServer({ serverId: match?.params.serverId, serverData: formData });
  };

  useEffect(() => {
    if (server) {
      form.setValue("name", server.name);
    }
  }, [server, form]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="scale-90 transform overflow-hidden border-none bg-[#12161B] text-[#EAEBEC] transition-transform duration-500 ease-out">
        <DialogHeader>
          <DialogTitle className="mb-2 flex items-center gap-[135px] text-2xl font-bold">
            <FaServer className="h-6 w-6 text-[#AF79F9]" />
            <span>Edit Server</span>
          </DialogTitle>
          <DialogDescription className="text-balance text-center tracking-wide text-zinc-300">
            Give your server a personality with a name and an image. You can
            always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <MyDropzone
                  isSubmitting={isFormLoading}
                  imageUrl={server?.imageUrl}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase text-zinc-200">
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isFormLoading}
                        className="bg-[#504665] text-zinc-100 shadow-xl focus-visible:border-[#AF79F9]"
                        placeholder="Enter server name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="primary" disabled={isFormLoading}>
                Edit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditServerModal;
