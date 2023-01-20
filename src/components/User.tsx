/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const UserForm = ({ user }: { user: any }) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username);
      setEmail(user.email);
      setId(user.id);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedUser = {
      id,
      name,
      username,
      email,
    };

    const response = await fetch(`/api/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      console.log(response);
      return;
    }

    console.log(response);

    // router.push('/');
  };

  return (
    <>
      <Title order={2}>Edit User</Title>
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Name"
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextInput
            label="Username"
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextInput
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Group position="right" spacing="lg">
            <Button color="red" variant="outline">
              Delete
            </Button>
            <Button type="submit">Submit</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
};
