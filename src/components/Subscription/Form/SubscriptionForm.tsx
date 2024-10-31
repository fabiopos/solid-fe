"use client";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SubscriptionInput } from "@/features/Subscription/domain/subscription.schema";
import { Loader } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface SubscriptionFormProps {
  form: UseFormReturn<SubscriptionInput>;
  onSubmit: (values: SubscriptionInput) => void;
  content?: {
    title?: string;
    description?: string;
    lastNameLabel?: string;
    firstNameLabel?: string;
    emailLabel?: string;
    passwordLabel?: string;
    documentTypeLabel?: string;
    documentNumberLabel?: string;
    teamNameLabel?: string;
    policyLabel?: string;
  };
  isSubmitting: boolean;
  error: string | null;
}

export default function SubscriptionForm(props: SubscriptionFormProps) {
  const { form, onSubmit, content, isSubmitting, error } = props;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex gap-5">
              {content?.title ?? "Create Subscription"}{" "}
              {isSubmitting && <Loader className="animate-spin" />}
            </div>
          </CardTitle>
          <CardDescription>
            {content?.description ?? "Please fill the form."}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="teamName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {content?.teamNameLabel ?? "Team Name"}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <Separator className="my-4" /> */}

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {content?.firstNameLabel ?? "First Name"}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>
                          {content?.lastNameLabel ?? "Last Name"}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="documentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {content?.emailLabel ?? "Document Type"}
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              <SelectItem value="CC">CC</SelectItem>
                              <SelectItem value="PT">PT</SelectItem>
                              <SelectItem value="NIT">NIT</SelectItem>
                              <SelectItem value="CE">CE</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="documentNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {content?.documentNumberLabel ?? "Document Number"}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{content?.emailLabel ?? "Email"}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {content?.passwordLabel ?? "Password"}
                      </FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator className="my-4" />

                <FormField
                  control={form.control}
                  name="policy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Accept terms and conditions</FormLabel>
                        <FormDescription>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Id atque iusto recusandae.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      {error && <Alert className="mt-5 text-red-400">{error}</Alert>}
    </>
  );
}
