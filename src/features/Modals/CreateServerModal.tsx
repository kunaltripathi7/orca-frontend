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
import { useCreateServer } from "../server/useCreateServer";
import { ServerData } from "./InitialModal";
import { useModal } from "./useModal";
import { useDispatch } from "react-redux";
import { closeModal } from "./modalSlice";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageFile: z.instanceof(File, { message: "Image is required" }),
});

const CreateServerModal = () => {
  const { createServer, isLoading: isServerLoading } = useCreateServer();
  const { isOpen, type } = useModal();
  const dispatch = useDispatch();

  const isModalOpen = isOpen && type === "createServer";
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
    formData.append("imageFile", values.imageFile);
    formData.append("name", values.name);
    createServer(formData);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="overflow-hidden border-none bg-[#12161B] text-[#EAEBEC]">
        <DialogHeader>
          <DialogTitle className="mb-2 flex gap-24 text-2xl font-bold">
            <FaServer className="text-[#AF79F9]" />
            <span>Create your Server</span>
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
                <MyDropzone isSubmitting={isFormLoading} />
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
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
