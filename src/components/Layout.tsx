import { AppShell, Image, Navbar, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AwsFiles } from './AwsFiles';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height="100%" p="xs" bg="dark">
          <Navbar.Section p="lg">
            <Image src="/logo-white.png" alt="TMPx Admin" width="125px" />
          </Navbar.Section>
          <Navbar.Section p="lg">
            <Stack>
              <NavigationLink href="/">Dashboard</NavigationLink>
              <NavigationLink href="/sessions">Sessions</NavigationLink>
            </Stack>
          </Navbar.Section>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
      <AwsFiles />
    </AppShell>
  );
};

const NavigationLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();

  return (
    <Link href={href ? href : '/'} legacyBehavior>
      <Text
        sx={{
          color: '#fff',
          textDecoration: 'none',
          cursor: 'pointer',
          fontWeight: router.pathname === href ? 'bold' : 'normal',
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        {children}
      </Text>
    </Link>
  );
};
