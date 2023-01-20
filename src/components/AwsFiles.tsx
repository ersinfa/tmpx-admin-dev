import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  FileInput,
  Group,
  List,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import Link from 'next/link';
import { useState } from 'react';
import { Copy, FileUpload } from 'tabler-icons-react';
import { listFiles, uploadFile } from '../lib/aws';

export const AwsFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [successfullyUploaded, setSuccessfullyUploaded] = useState([]);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const clipboard = useClipboard({ timeout: 2000 });

  const handleFileUpload = async () => {
    if (!files) return;

    const responses = await Promise.all(
      files.map(async (file) => {
        const response = await uploadFile(file);

        return response;
      })
    );

    if (responses.every((response) => response.status === 204)) {
      setFiles([]);
      setSuccessfullyUploaded(responses);
    }
  };

  return (
    <>
      <Drawer
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        position="right"
        padding="lg"
      >
        <Stack>
          <FileInput
            multiple
            value={files}
            onChange={setFiles}
            label="Select files for upload"
            icon={<FileUpload size={16} />}
          />
          <Button onClick={handleFileUpload} disabled={!files.length}>
            Upload
          </Button>
          {successfullyUploaded.length > 0 && (
            <Text>Successfully uploaded {successfullyUploaded.length} files</Text>
          )}
          {successfullyUploaded.length > 0 &&
            successfullyUploaded.map((response) => (
              <Group key={response.key}>
                <Link target="_blank" href={response.location}>
                  {response.key}
                </Link>
                <ActionIcon
                  onClick={() => {
                    clipboard.copy(response.location);
                  }}
                >
                  <Copy size={16} />
                </ActionIcon>
              </Group>
            ))}
        </Stack>
        <Divider my="xl" />
        <FilesList />
      </Drawer>
      <ActionIcon
        onClick={() => setDrawerOpened(true)}
        variant="gradient"
        sx={{
          position: 'fixed',
          bottom: '1rem',
          left: '1rem',
          zIndex: 1000,
        }}
      >
        <FileUpload size={16} />
      </ActionIcon>
    </>
  );
};

const FilesList = () => {
  const [files, setFiles] = useState([]);
  const clipboard = useClipboard({ timeout: 2000 });
  const [search, setSearch] = useState('');
  const loadFiles = async () => {
    const filesList = await listFiles();
    setFiles(filesList);
  };

  return (
    <Stack mb={100}>
      <TextInput
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
        placeholder="Search"
      />
      <Button onClick={loadFiles}>Load files</Button>
      <ScrollArea style={{ height: '500px' }}>
        <List spacing="xl">
          {files
            .filter(
              (file) => file.Key.toLowerCase().indexOf(search.toLowerCase()) !== -1
            )
            .map((file) => (
              <List.Item key={file.Key}>
                <Stack>
                  <Text>{file.Key}</Text>
                  <Group>
                    <Link target="_blank" href={file.publicUrl}>
                      {file.publicUrl}
                    </Link>
                    <ActionIcon
                      onClick={() => clipboard.copy(file.publicUrl)}
                      color="blue"
                      variant="filled"
                    >
                      <Copy size={16} />
                    </ActionIcon>
                  </Group>
                </Stack>
              </List.Item>
            ))}
        </List>
      </ScrollArea>
    </Stack>
  );
};
