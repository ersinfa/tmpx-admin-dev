import { Button, Card, Divider, Grid, Group, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../../lib/constants';

const Sessions = () => {
  const { data, isLoading } = useSWR('api/sessions', fetcher);
  const router = useRouter();

  return (
    <>
      <Group position="apart">
        <Title order={1}>Sessions</Title>
        <Button
          onClick={() => router.push('/sessions/new')}
          variant="outline"
          color="blue"
        >
          New Session
        </Button>
      </Group>
      <Divider my="lg" />
      <Grid>
        {data?.map((session) => (
          <Grid.Col key={session.id} sm={12} md={4}>
            <Card shadow="sm" p="lg" withBorder>
              <Card.Section p="md">
                <Title order={3}>{session.name}</Title>
                <Text>{session.description}</Text>
              </Card.Section>
              {/* <Stack>
                <Text>{session.type}</Text>
                <Text>{session.code}</Text> */}
              <Button
                onClick={() => router.push(`/sessions/${session.id}`)}
                variant="outline"
                color="blue"
                fullWidth
              >
                Edit
              </Button>
              {/* </Stack> */}
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
};

export default Sessions;
