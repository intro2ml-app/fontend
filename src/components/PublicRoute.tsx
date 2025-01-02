import { API } from '@/lib/constant';
import { useEffect, useState } from 'react';

export default function PublicRoute({ children, ...rest }) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      const resp = await fetch(`${API}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      try {
        const data = await resp.json();
        console.log(data);

        if (data) {
          localStorage.setItem('user', JSON.stringify(data));
          window.location.href = '/chat';
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return isLoading ? <div>Loading...</div> : children;
}
