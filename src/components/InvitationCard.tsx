import { Invitation } from '@/types/types';
import Link from 'next/link';

interface Props {
  invitation: Invitation;
  handleDelete: (id: string | undefined) => void;
}

const InvitationCard: React.FC<Props> = ({ invitation, handleDelete }) => (
  <div className="border p-4 rounded flex flex-col justify-between h-full">
    <div>
      <h2 className="text-xl font-bold">{invitation.title}</h2>

      <p>{invitation.message}</p>

      <p>
        {invitation.date} at {invitation.time}
      </p>

      <p>{invitation.location}</p>
    </div>
    <div className="flex justify-between mt-4">
      <Link href={`/invitation/${invitation.id}`}>
        <p className="text-blue-500">Edit</p>
      </Link>

      <button className="text-red-500" onClick={() => handleDelete(invitation.id)}>
        Delete
      </button>
    </div>
  </div>
);

export default InvitationCard;
