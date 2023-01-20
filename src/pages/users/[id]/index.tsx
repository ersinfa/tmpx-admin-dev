import { useRouter } from 'next/router';
import useSWR from 'swr';
import { UserForm } from '../../../components/User';
import { fetcher } from '../../../lib/constants';

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(id !== undefined ? `/api/users/${id}` : null, fetcher);
  return (
    <>
      <UserForm user={data} />
    </>
  );
};

export default EditUser;
