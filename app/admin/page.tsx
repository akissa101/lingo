import { isAdmin } from '@/db/admin';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
import daynamic from 'next/dynamic';

const App = dynamic(() => import('./app'), { ssr: false });

const AdminPage = async () => {
  if (!isAdmin) {
    redirect('/');
  }

  console.log(isAdmin);

  return (
    <div>
      <App />
    </div>
  );
};

export default AdminPage;
