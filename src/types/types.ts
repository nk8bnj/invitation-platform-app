export type Invitation = {
  id?: string;
  title: string;
  message: string;
  date: string;
  time: string;
  location: string;
  contactType: string;
  contactInfo: string;
};

export type InvitationState = {
  invitations: Invitation[];
  addInvitation: (invitation: Invitation) => void;
  editInvitation: (id: string, updatedInvitaton: Invitation) => void;
  deleteInvitation: (id: string) => void;
};
