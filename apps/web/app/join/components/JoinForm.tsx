'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { User } from '../../../@types/User';
import { Button } from '../../../components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { UserCursorElement } from '../../../components/UserCursor';
import { useUser } from '../../../contexts/UserContext';

import { ColorPicker } from './ColorPicker';

const joinFormSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(16, 'Username must be at most 16 characters'),
  color: z
    .string()
    .refine((color) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color), { message: 'Invalid color code' }),
});

type JoinFormData = z.infer<typeof joinFormSchema>;

export function JoinForm() {
  const { saveUser } = useUser();

  const { push } = useRouter();

  const form = useForm<JoinFormData>({
    resolver: zodResolver(joinFormSchema),
    defaultValues: {
      username: '',
      color: '#f0f0f0',
    },
  });

  const username = form.watch('username');
  const color = form.watch('color');

  const user = useMemo(() => (username && color ? ({ username, color } as User) : null), [username, color]);

  function join(data: JoinFormData) {
    saveUser({ username: data.username, color: data.color });

    push('/');
  }

  return (
    <Form {...form}>
      <form noValidate className="space-y-4" onSubmit={form.handleSubmit(join)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>

              <FormControl>
                <Input placeholder="Put your name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="color"
            render={({ field: { ref, ...field } }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>

                <FormControl>
                  <ColorPicker {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {user && (
            <div className="flex items-center gap-6">
              <Label className="text-xs">Output:</Label>

              <UserCursorElement user={user} />
            </div>
          )}
        </div>

        <footer className="mt-4 flex justify-end">
          <Button type="submit">Join</Button>
        </footer>
      </form>
    </Form>
  );
}
