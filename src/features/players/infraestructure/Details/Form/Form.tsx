"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  playerSchema,
  playerUpdateSchema,
} from "@/features/players/domain/player.schema";
import { FulfilledPlayer } from "@/features/players/domain/player.effect.schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { usePlayerDetailsStore } from "@/context/PlayerDetailsCtx";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import DateInput from "@/components/ui/date-input";

const FormSchema = playerUpdateSchema;

interface PlayerDetailsFormProps {
  player: FulfilledPlayer;
}
export function PlayerDetailsForm({ player }: PlayerDetailsFormProps) {
  const { data } = useSession();
  const { updateRequestStatus, putPlayer } = usePlayerDetailsStore(
    (state) => state
  );
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      active: player.active,
      address: player.address ?? "",
      arl: player.arl,
      city: player.city,
      country: player.country,
      dominantFoot: player.dominantFoot,
      eps: player.eps,
      firstName: player.firstName,
      height: player.height,
      lastName: player.lastName,
      phone: player.phone,
      shirtName: player.shirtName,
      shirtNumber: player.shirtNumber,
      shirtSize: player.shirtSize,
      status: player.status,
      weight: player.weight,
      bornDate: player.bornDate,
    },
  });

  async function onSubmit(partialPlayer: z.infer<typeof FormSchema>) {
    console.log(data);
    if (!player.id) return;
    if (!data) return;
    await putPlayer(player.id, partialPlayer, data?.user.access_token);
  }

  useEffect(() => {
    if (updateRequestStatus === "DONE") {
      toast({
        title: "You updated the player successfuly",
        description: "",
      });
    }
  }, [updateRequestStatus]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <Accordion
          type="single"
          collapsible
          className="w-full bg-slate-800 p-5 rounded-lg"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <strong>Basic Info</strong>
            </AccordionTrigger>
            <AccordionContent className="px-2">
              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Email</Label>
                  <span className="bg-background/30 p-2">{player.email}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="font-bold">Document</Label>
                  <span className="bg-background/30 p-2">
                    {player.documentType} {player.documentNumber}
                  </span>
                </div>

                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bornDate"
                  render={({ field }) => (
                    <FormItem>                      
                      <FormControl>
                        <DateInput
                          label="Born Date"
                          setDate={(date) => field.onChange(date)}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <strong>Location</strong>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Address"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="City"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Country</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Country"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <strong>Body</strong>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Height (cm)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Height"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Weight (kg)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Weight"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dominantFoot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Dominant Foot</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Dominant Foot"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              <strong>Shirt</strong>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="shirtName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Shirt Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Shirt Name"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shirtNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Shirt Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Shirt Number"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="shirtSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Shirt Size</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Shirt Size"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>
              <strong>Health & Insurance</strong>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="arl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">ARL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ARL"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">EPS</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="EPS"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <br />
        <Button type="submit" disabled={updateRequestStatus === "IN_PROGRESS"}>
          {updateRequestStatus === "IN_PROGRESS" ? "Wait..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
