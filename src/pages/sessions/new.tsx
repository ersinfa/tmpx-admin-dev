import { Button, Divider, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

const NewSession = () => {
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

  return (
    <>
      <Title order={1}>New Session</Title>
      <Divider my="lg" />
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
            value={form.values.description}
          />
          <TextInput
            label="Type"
            type="text"
            id="type"
            placeholder="Type"
            value={form.values.type}
          />
          <TextInput
            label="Code"
            type="text"
            id="code"
            placeholder="Code"
            value={form.values.code}
          />
          <TextInput
            label="Price"
            type="text"
            id="price"
            placeholder="Price"
            value={form.values.price}
          />
          <Button type="submit" variant="outline" color="blue" fullWidth>
            Create
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default NewSession;
