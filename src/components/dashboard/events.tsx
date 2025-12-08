"use client";
import { queryClient } from "@/components/providers/provider";
import {
  Button,
  DialogFooter,
  DialogHeader,
  Input,
  Label,
} from "@/components/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { Item, ItemGroup, ItemTitle } from "@/components/ui/item";
import { Event } from "@/lib/generated/prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import type { Session } from "next-auth";

export default function Events({session} : { session: Session | null }) {
  const [eventName, setEventName] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  
  const { data: events } = useQuery<Event[]>({
    queryKey: [`events:${session?.user.id}`],
    queryFn: async () => {
      const { data } = await axios.get(`api/events/${session?.user.id}`);
      console.log(data);

      return data;
    },
    enabled: !!session?.user?.id
  });

  const insertEvent = useMutation({
    mutationFn: async (data: { name: string }) => {
      return await axios.post(`api/events/${session?.user.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`events:${session?.user.id}`],
      });
    },
  });

  return (
    <div className="bg-red-700">
      <ItemGroup>
        {events?.map((e) => (
          <Item key={e.id} variant="outline" className="w-xl">
            <ItemTitle>{e.name}</ItemTitle>
          </Item>
        ))}
      </ItemGroup>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Event</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Event Name</Label>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Input
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Enter Event Name"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setError("");
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              onClick={async () => {
                if (eventName) {
                  await insertEvent.mutate({ name: eventName });
                  setEventName("");
                  setError("");
                  setOpen(false);
                } else {
                  setError("event name is required");
                }
              }}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
