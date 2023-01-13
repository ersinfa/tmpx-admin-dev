import { Button, Stack, TextInput, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../../lib/fetcher';

const SessionEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`/api/sessions/${id}`, fetcher);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Title order={1}>Edit Session</Title>
      <Stack>
        <TextInput
          label="Name"
          type="text"
          id="name"
          placeholder="Name"
          value={data.name}
        />
        <TextInput
          label="Description"
          type="text"
          id="description"
          placeholder="Description"
          value={data.description}
        />
        <TextInput
          label="Type"
          type="text"
          id="type"
          placeholder="Type"
          value={data.type}
        />
        <TextInput
          label="Code"
          type="text"
          id="code"
          placeholder="Code"
          value={data.code}
        />
        <Button variant="outline" color="blue" fullWidth>
          Update
        </Button>
      </Stack>
    </>
  );
};

export default SessionEdit;

// id: 1,
// name: "Life Mastery",
// description: "Noah shares his vision for life mastery and the tools you will need to progress",
// type: "THE MASTERS PROGRAM",
// code: "P.01",
// price: "$295",
