import { Button, Divider, Group, Stack, TextInput, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '../../../lib/constants';
import { Session } from '../../../lib/types';

const SessionEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(`/api/sessions/${id}`, fetcher);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (data) {
      data.modules.sort((a, b) => a.id - b.id);

      setSession(data);
    }
  }, [data]);

  const handleUpdate = async (values) => {
    const response = await fetch(`/api/sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }

    setSession(data);
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Stack spacing="xl">
        <Group position="apart">
          <Title order={1}>Edit Session</Title>
          {/* Delete the session */}
          <Button
            variant="outline"
            color="red"
            onClick={async () => {
              const response = await fetch(`/api/sessions/${id}`, {
                method: 'DELETE',
              });

              if (!response.ok) {
                console.log(response);
                return;
              }

              router.push('/sessions');
            }}
          >
            Delete
          </Button>
        </Group>
        <Stack spacing="xl">
          <TextInput
            label="Name"
            type="text"
            id="name"
            placeholder="Name"
            value={session.name}
            onChange={(event) => {
              setSession({ ...session, name: event.currentTarget.value });
            }}
          />
          <TextInput
            label="Description"
            type="text"
            id="description"
            placeholder="Description"
            value={session.description}
            onChange={(event) => {
              setSession({ ...session, description: event.currentTarget.value });
            }}
          />
          <TextInput
            label="Type"
            type="text"
            id="type"
            placeholder="Type"
            value={session.type}
            onChange={(event) => {
              setSession({ ...session, type: event.currentTarget.value });
            }}
          />
          <TextInput
            label="Code"
            type="text"
            id="code"
            placeholder="Code"
            value={session.code}
            onChange={(event) => {
              setSession({ ...session, code: event.currentTarget.value });
            }}
          />
        </Stack>
        <Divider />
        <>
          {session?.modules?.map((module) => (
            <Stack key={module.id}>
              <Group position="apart">
                <Title order={3}>{module.name}</Title>
                {/* Delete module button */}
                <Button
                  variant="outline"
                  color="red"
                  onClick={async () => {
                    const response = await fetch(`/api/modules/${module.id}`, {
                      method: 'DELETE',
                    });

                    const data = await response.json();

                    console.log(response.status);

                    if (response.status !== 500 && response.status !== 200) {
                      throw new Error(data.message || 'Something went wrong!');
                    }

                    setSession({
                      ...session,
                      modules: session.modules.filter((m) => m.id !== module.id),
                    });
                  }}
                >
                  Delete
                </Button>
              </Group>
              <Stack>
                <TextInput
                  label="Name"
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={module.name}
                  onChange={(event) => {
                    setSession({
                      ...session,
                      modules: session.modules.map((m) => {
                        if (m.id === module.id) {
                          return { ...m, name: event.currentTarget.value };
                        }
                        return m;
                      }),
                    });
                  }}
                />
                <TextInput
                  label="Description"
                  type="text"
                  id="description"
                  placeholder="Description"
                  value={module.description}
                  onChange={(event) => {
                    setSession({
                      ...session,
                      modules: session.modules.map((m) => {
                        if (m.id === module.id) {
                          return { ...m, description: event.currentTarget.value };
                        }
                        return m;
                      }),
                    });
                  }}
                />
                <TextInput
                  label="Tab"
                  type="text"
                  id="tab"
                  placeholder="Tab"
                  value={module.tab}
                  onChange={(event) => {
                    setSession({
                      ...session,
                      modules: session.modules.map((m) => {
                        if (m.id === module.id) {
                          return { ...m, tab: event.currentTarget.value };
                        }
                        return m;
                      }),
                    });
                  }}
                />
                <TextInput
                  label="Video Url"
                  type="text"
                  id="video"
                  placeholder="Video url"
                  value={module.videoUrl}
                  onChange={(event) => {
                    setSession({
                      ...session,
                      modules: session.modules.map((m) => {
                        if (m.id === module.id) {
                          return { ...m, videoUrl: event.currentTarget.value };
                        }
                        return m;
                      }),
                    });
                  }}
                />
                <TextInput
                  label="Time"
                  type="text"
                  id="time"
                  placeholder="Time"
                  value={module.time}
                  onChange={(event) => {
                    setSession({
                      ...session,
                      modules: session.modules.map((m) => {
                        if (m.id === module.id) {
                          return { ...m, time: event.currentTarget.value };
                        }
                        return m;
                      }),
                    });
                  }}
                />
              </Stack>
            </Stack>
          ))}
          {/* Add new module */}
          <Button
            color="dark"
            variant="outline"
            onClick={() => {
              setSession({
                ...session,
                modules: [
                  ...session.modules,
                  {
                    id: session.modules.length + 1,
                    name: '',
                    description: '',
                    tab: '',
                    videoUrl: '',
                    sessionId: session.id,
                  },
                ],
              });
            }}
          >
            + Add New Module
          </Button>
          <Divider />
          <>
            {session?.documents?.map((document) => (
              <Stack key={document.id}>
                <Group position="apart">
                  <Title order={3}>{document.name}</Title>
                  {/* Delete document button */}
                  <Button
                    variant="outline"
                    color="red"
                    onClick={async () => {
                      const response = await fetch(`/api/documents/${document.id}`, {
                        method: 'DELETE',
                      });

                      const data = await response.json();

                      if (response.status !== 500 && response.status !== 200) {
                        throw new Error(data.message || 'Something went wrong!');
                      }

                      setSession({
                        ...session,
                        documents: session.documents.filter(
                          (d) => d.id !== document.id
                        ),
                      });
                    }}
                  >
                    Delete
                  </Button>
                </Group>
                <Stack>
                  <TextInput
                    label="Name"
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={document.name}
                    onChange={(event) => {
                      setSession({
                        ...session,
                        documents: session.documents.map((d) => {
                          if (d.id === document.id) {
                            return { ...d, name: event.currentTarget.value };
                          }
                          return d;
                        }),
                      });
                    }}
                  />
                  <TextInput
                    label="Type"
                    type="text"
                    id="type"
                    placeholder="Type"
                    value={document.type}
                    onChange={(event) => {
                      setSession({
                        ...session,
                        documents: session.documents.map((d) => {
                          if (d.id === document.id) {
                            return { ...d, type: event.currentTarget.value };
                          }
                          return d;
                        }),
                      });
                    }}
                  />
                  <TextInput
                    label="Url"
                    type="text"
                    id="url"
                    placeholder="Url"
                    value={document.path}
                    onChange={(event) => {
                      setSession({
                        ...session,
                        documents: session.documents.map((d) => {
                          if (d.id === document.id) {
                            return { ...d, path: event.currentTarget.value };
                          }
                          return d;
                        }),
                      });
                    }}
                  />
                </Stack>
              </Stack>
            ))}
            {/* Add new document */}
            <Button
              color="dark"
              variant="outline"
              onClick={() => {
                setSession({
                  ...session,
                  documents: [
                    ...session.documents,
                    {
                      id: session.documents.length + 1,
                      name: '',
                      type: '',
                      path: '',
                      sessionId: session.id,
                    },
                  ],
                });
              }}
            >
              + Add New Document
            </Button>
          </>
        </>
      </Stack>
      <Button
        onClick={() => handleUpdate(session)}
        sx={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          // shadow
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.25), 0 20px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        Save Changes
      </Button>
    </>
  );
};

export default SessionEdit;
