import { Button, Divider, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

const NewSession = () => {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      type: '',
      code: '',
      price: '',
    },
    validate: {
      name: (value) => {
        if (!value) return 'Name is required';
      },
      description: (value) => {
        if (!value) return 'Description is required';
      },
      type: (value) => {
        if (!value) return 'Type is required';
      },
      code: (value) => {
        if (!value) return 'Code is required';
      },
      price: (value) => {
        if (!value) return 'Price is required';
      },
    },
  });

  const handleSubmit = async (values) => {
    const body = {
      name: values.name,
      description: values.description,
      type: values.type,
      code: values.code,
      price: values.price,
    };

    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log(response);
      return;
    }

    router.push('/sessions');
  };

  return (
    <>
      <Title order={1}>New Session</Title>
      <Divider my="lg" />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <TextInput
            label="Name"
            type="text"
            id="name"
            placeholder="Name"
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Description"
            type="text"
            id="description"
            placeholder="Description"
            {...form.getInputProps('description')}
          />
          <TextInput
            label="Type"
            type="text"
            id="type"
            placeholder="Type"
            {...form.getInputProps('type')}
          />
          <TextInput
            label="Code"
            type="text"
            id="code"
            placeholder="Code"
            {...form.getInputProps('code')}
          />
          <Stack spacing={2}>
            <TextInput
              label="Price"
              type="text"
              id="price"
              placeholder="Price"
              {...form.getInputProps('price')}
            />
            <Text size="xs" color="dimmed">
              Provide any value. This is just a placeholder for future payment
              functionality.
            </Text>
          </Stack>
          <Button type="submit" variant="outline" color="blue" fullWidth>
            Create
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default NewSession;
