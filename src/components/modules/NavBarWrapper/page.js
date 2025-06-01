'use client'
import { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import HomeNavBar from '../HomeNavBar/HomeNavBar';

export default function NavBarWrapper() {
  const [user, setUser] = useState(false);

  async function fetchUser() {
    const res = await fetch('/api/auth/me');
    if (res.status === 404) {
      return;
    }
    const data = await res.json();
    setUser(data.user);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar isLogin={!!user} userId={user?._id} role={user?.role} />
      <HomeNavBar role={user?.role} isLogin={!!user} />
    </>
  );
}
