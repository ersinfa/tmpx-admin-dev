import { Divider, Flex, Image, Table, Title } from '@mantine/core';
import { type NextPage } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';

const Home: NextPage = () => {
  const { data, isLoading } = useSWR('/api/users', fetcher);
  const [search, setSearch] = useState<string>('');

  const rows = data?.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.username}</td>
      <td>
        <Image withPlaceholder src={user.profileImage} height="50px" width="50px" />
      </td>
      <td>
        <Link href={`/users/${user.id}`}>Edit</Link>
      </td>
    </tr>
  ));

  return (
    <>
      <Title order={1}>TMPx Admin</Title>
      <Divider my="lg" />
      <Flex direction="column">
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Profile Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Flex>
    </>
  );
};

export default Home;
