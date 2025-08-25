import React from 'react';
import { useParams } from 'react-router-dom';
import Details from './Details';

const EditPage = () => {
  const { meetingId } = useParams();

  return (
    <div>
      <h2>Edit Meeting</h2>
      <Details func="edit" meetingId={meetingId} />
    </div>
  );
};

export default EditPage;
