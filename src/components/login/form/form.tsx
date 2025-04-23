"use client";
import {UseFormReturn} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {LoginInput} from "@/features/auth/domain/login.schema";

interface LoginFormProps {
    form: UseFormReturn<LoginInput>;
    onSubmit: (values: LoginInput) => void;
    content?: {
        emailLabel?: string;
        passwordLabel?: string;
        formDescription?: string;
    };
}

export function LoginForm(props: LoginFormProps) {
    const {form, onSubmit, content} = props;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{content?.emailLabel ?? "Email"}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{content?.passwordLabel ?? 'Password'}</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormDescription>
                    Enter your email associated with your subscription
                </FormDescription>
                <Button className="bg-cyan-700 dark:bg-cyan-500" type="submit">Submit</Button>
            </form>
        </Form>
    );
}
