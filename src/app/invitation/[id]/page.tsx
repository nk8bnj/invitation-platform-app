'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import InvitationForm from '@/components/InvitationForm';

import { API } from '@/api/api';
import { useInvitationStore } from '@/store/invitationStore';
import { Invitation } from '@/types/types';

export default function InvitationPage() {
  const { id } = useParams();
  const router = useRouter();
  const { invitations, addInvitation, editInvitation } = useInvitationStore();

  const [contactType, setContactType] = useState('email');
  const [invitation, setInvitation] = useState<Invitation>({
    title: '',
    message: '',
    date: '',
    time: '',
    location: '',
    contactInfo: '',
    contactType: '',
  });

  useEffect(() => {
    if (id && id !== 'new') {
      const existingInvitation = invitations.find(invitation => invitation.id === id);
      if (existingInvitation) {
        setInvitation(existingInvitation);
      }
    }
  }, [id, invitations]);

  useEffect(() => {
    setContactType(invitation.contactType || 'email');
  }, [id, invitation]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setInvitation({ ...invitation, [name]: value });
  };

  const handleContactTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setContactType(event.target.value);
    setInvitation({
      ...invitation,
      contactType: event.target.value,
      contactInfo: '',
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newId = id === 'new' ? Date.now().toString() : id;
    const updatedInvitation = { ...invitation, id: newId as string };

    try {
      if (id === 'new') {
        await API.addInvitation(updatedInvitation);
        addInvitation(updatedInvitation);
      } else {
        await API.editInvitation(newId as string, updatedInvitation);
        editInvitation(newId as string, updatedInvitation);
      }

      router.push('/');
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          {id === 'new' ? 'Create Invitation' : 'Edit Invitation'}
        </h1>
        <InvitationForm
          id={id}
          invitation={invitation}
          contactType={contactType}
          router={router}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleContactTypeChange={handleContactTypeChange}
        />
      </main>
    </div>
  );
}
