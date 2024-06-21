import { Invitation } from '@/types/types';

const URL = 'https://6672a7676ca902ae11b12eff.mockapi.io';

export const API = {
  async getInvitations() {
    const response = await fetch(`${URL}/invitations`);
    const invitations = await response.json();
    return invitations;
  },

  async addInvitation(invitation: Invitation) {
    const response = await fetch(`${URL}/invitations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invitation),
    });
    const createdInvitation = await response.json();
    return createdInvitation;
  },

  async editInvitation(invitationId: string, updatedInvitation: Invitation) {
    const response = await fetch(`${URL}/invitations/${invitationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedInvitation),
    });
    const newInvitation = await response.json();
    return newInvitation;
  },

  async deleteInvitation(invitationId: string) {
    const response = await fetch(`${URL}/invitations/${invitationId}`, {
      method: 'DELETE',
    });

    return response.ok;
  },
};
