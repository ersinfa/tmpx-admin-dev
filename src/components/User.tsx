/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { useState } from 'react';

export const UserForm = ({ user }: { user: any }) => {
  if (!user) {
    return null;
  }

  console.log(user);

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [id, setId] = useState(user.id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedUser = {
      id,
      name,
      username,
      email,
      password,
    };
  };

  return (
    <>
      <Title order={2}>Edit User</Title>
      <form className="flex flex-col">
        <Stack>
          <TextInput
            label="Name"
            type="text"
            id="name"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextInput
            label="Username"
            type="text"
            id="username"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <TextInput
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextInput
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setPassword(e.target.value)}
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
