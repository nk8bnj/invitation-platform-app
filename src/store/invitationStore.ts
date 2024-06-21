import create from 'zustand';

import { InvitationState } from '@/types/types';

export const useInvitationStore = create<InvitationState>(set => ({
  invitations: [],

  addInvitation: invitation =>
    set(state => ({
      invitations: [...state.invitations, invitation],
    })),

  editInvitation: (id, updatedInvitation) =>
    set(state => ({
      invitations: state.invitations.map(invitation =>
        invitation.id === id ? updatedInvitation : invitation,
      ),
    })),

  deleteInvitation: (id) =>
    set(state => ({
      invitations: state.invitations.filter(invitation => invitation.id !== id),
    })),
}));
