import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { Invitation } from '@/types/types';

interface Props {
  id: string | string[];
  invitation: Invitation;
  contactType: string;
  router: AppRouterInstance;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleContactTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InvitationForm: React.FC<Props> = ({
  invitation,
  contactType,
  router,
  handleSubmit,
  handleChange,
  handleContactTypeChange,
}) => {
  const { title, message, date, time, location, contactInfo } = invitation;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border"
        required
      />
      <textarea
        name="message"
        value={message}
        onChange={handleChange}
        placeholder="Message"
        className="w-full p-2 border"
        required
      ></textarea>
      <input
        type="date"
        name="date"
        value={date}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />
      <input
        type="time"
        name="time"
        value={time}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />
      <input
        type="text"
        name="location"
        value={location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full p-2 border"
        required
      />
      <div>
        <label className="mr-4">
          <input
            type="radio"
            name="contactType"
            value="email"
            checked={contactType === 'email'}
            onChange={handleContactTypeChange}
            className="mr-1"
          />
          Email
        </label>
        <label>
          <input
            type="radio"
            name="contactType"
            value="phone"
            checked={contactType === 'phone'}
            onChange={handleContactTypeChange}
            className="mr-1"
          />
          Phone
        </label>
      </div>
      {contactType === 'email' ? (
        <input
          type="email"
          name="contactInfo"
          value={contactInfo}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border"
          required
        />
      ) : (
        <input
          type="tel"
          name="contactInfo"
          value={contactInfo}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border"
          required
        />
      )}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="bg-gray-500 text-white p-2 rounded"
        >
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create
        </button>
      </div>
    </form>
  );
};

export default InvitationForm;
