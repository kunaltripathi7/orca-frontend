import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
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
import { Button } from "@/components/ui/button";
import { useModal } from "./useModal";
import { useDispatch } from "react-redux";
import { closeModal } from "./modalSlice";
import { ChannelModeType } from "@/utils/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useEditChannel } from "../channels/useEditChannel";
import { FaEdit } from "react-icons/fa";

export type ChannelData = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Channel name is required",
    })
    .max(10, {
      message: "Channel name can't be longer than 10 characters",
    })
    .refine((name) => name !== "general", {
      message: "Channel name can't be 'general",
    }),
  type: z.nativeEnum(ChannelModeType),
});

const EditChannelModal = () => {
  const { editChannel, isChannelLoading } = useEditChannel();
  const { isOpen, type, server, channel } = useModal();
  const dispatch = useDispatch();
  const isModalOpen = isOpen && type === "editChannel";
  const handleClose = () => {
    form.reset();
    dispatch(closeModal());
  };

  const form = useForm<ChannelData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: channel?.name,
      type: channel?.type,
    },
  });

  const isFormLoading = form.formState.isSubmitting || isChannelLoading;

  const onSubmit = (values: ChannelData) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    editChannel({
      serverId: server?.id,
      channelData: formData,
      channelId: channel?.id,
    });
  };

  useEffect(() => {
    if (channel) {
      form.setValue("name", channel?.name);
      form.setValue("type", channel?.type);
    }
  }, [form, channel]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className="overflow-hidden border-none bg-[#12161B] text-[#EAEBEC]"
        aria-describedby="Edit-Channel-Modal"
        aria-description="Edit-Channel"
      >
        <DialogHeader>
          <DialogTitle className="mb-2 flex items-center gap-4 text-2xl font-bold">
            <FaEdit className="h-5 w-5 text-[#AF79F9]" />
            <span>Edit channel</span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={cn("text-xs font-semibold uppercase", {
                        "text-red-500": fieldState.invalid,
                      })}
                    >
                      Channel name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isFormLoading}
                        className="border-[0.5px] border-zinc-600 bg-[#151A1F] text-zinc-100 shadow-xl focus-visible:ring-[#AF79F9]"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase">
                      Channel type
                    </FormLabel>
                    <Select
                      disabled={isFormLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-[0.5px] border-zinc-600 bg-[#151A1F] capitalize ring-offset-0 focus:ring-[#AF79F9] focus:ring-offset-0">
                          <SelectValue
                            placeholder="Select a channel type"
                            className="placeholder-white"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelModeType).map((type) => (
                          <SelectItem
                            value={type}
                            key={type}
                            className="capitalize"
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                variant="primary"
                className="mr-6"
                disabled={isFormLoading}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditChannelModal;
