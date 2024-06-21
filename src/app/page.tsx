'use client';
import { useInvitationStore } from '@/store/invitationStore';
import { useEffect, useState } from 'react';

import { API } from '@/api/api';
import Header from '@/components/Header';
import InvitationCard from '@/components/InvitationCard';
import Loader from '@/components/Loader/Loader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const invitations = useInvitationStore(state => state.invitations);

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        const data = await API.getInvitations();
        useInvitationStore.setState({ invitations: data });
      } catch (error) {
        console.error('Error fetching invitations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  const handleDelete = async (invitationId: string | undefined) => {
    if (invitationId) {
      try {
        await API.deleteInvitation(invitationId);
        useInvitationStore.getState().deleteInvitation(invitationId);
      } catch (error) {
        console.error('Error deleting invitation:', error);
      }
    }
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Invitations</h1>
        {isLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : invitations.length === 0 ? (
          <p className="text-center text-gray-500">
            You don&apos;t have any invitations.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {invitations.map(invitation => (
              <InvitationCard
                key={invitation.id}
                invitation={invitation}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
