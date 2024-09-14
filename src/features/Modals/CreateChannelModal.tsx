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
import { RiWechatChannelsLine } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateChannel } from "../channels/useCreateChannel";
import { matchPath, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

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

const CreateChannelModal = () => {
  const { createChannel, isChannelLoading } = useCreateChannel();
  const { isOpen, type, channelType } = useModal();
  const dispatch = useDispatch();
  const location = useLocation();
  const match = matchPath({ path: "/server/:serverId" }, location.pathname);

  const isModalOpen = isOpen && type === "createChannel";

  const handleClose = () => {
    form.reset();
    dispatch(closeModal());
  };

  const form = useForm<ChannelData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: ChannelModeType.TEXT,
    },
  });

  const isFormLoading = form.formState.isSubmitting || isChannelLoading;

  const onSubmit = (values: ChannelData) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", values.type);
    createChannel({ serverId: match?.params.serverId, channelData: formData });
  };

  useEffect(() => {
    if (channelType) form.setValue("type", channelType);
    else form.setValue("type", ChannelModeType.TEXT);
  }, [channelType, form]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent
        className="overflow-hidden border-none bg-[#12161B] text-[#EAEBEC]"
        aria-describedby="Create-Channel-Modal"
        aria-description="Create-Channel"
      >
        <DialogHeader>
          <DialogTitle className="mb-2 flex items-center gap-4 text-2xl font-bold">
            <RiWechatChannelsLine className="h-7 w-7 text-[#AF79F9]" />
            <span>Create a channel</span>
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

export default CreateChannelModal;
