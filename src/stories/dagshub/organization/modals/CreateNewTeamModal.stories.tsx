import React, { useEffect, useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  CreateTeamModalProps,
  CreateNewTeamModal
} from '../../../../components/dagshub/organization/modals/create-team-modal';

const meta: Meta<CreateTeamModalProps> = {
  title: 'DagsHub/Org/Modals/CreateNewTeamModal',
  component: CreateNewTeamModal
};

export default meta;

const imageLink =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU';

const users = [
  { id: 1, userName: 'user1', homeLink: 'https://dagshub.com/guypeer8', imageSource: imageLink },
  { id: 2, userName: 'user2', homeLink: '', imageSource: imageLink },
  { id: 3, userName: 'user3', homeLink: '', imageSource: imageLink },
  { id: 4, userName: 'user4', homeLink: '', imageSource: imageLink },
  { id: 5, userName: 'user5', homeLink: '', imageSource: imageLink },
  { id: 6, userName: 'user6', homeLink: '', imageSource: imageLink },
  { id: 7, userName: 'user7', homeLink: '', imageSource: imageLink },
  { id: 8, userName: 'user8', homeLink: '', imageSource: imageLink },
  { id: 9, userName: 'user9', homeLink: '', imageSource: imageLink }
];

export const Primary = () => {
  const [opened, setOpened] = useState<boolean>(true);
  const [memberInput, setMemberInput] = useState<string>('');
  const [userOptions, setUserOptions] = useState<any[]>([]);

  useEffect(
    function onMemberInput() {
      setUserOptions(users.filter((u) => u.userName.includes(memberInput)));
    },
    [memberInput]
  );

  if (!opened) {
    return null;
  }

  return (
    <CreateNewTeamModal
      existingTeamNames={["team-a", "team-b"]}
      orgName="demo org"
      memberInputText={memberInput}
      onMemberInputChange={(e) => setMemberInput(e.target.value)}
      onClose={() => setOpened(false)}
      resultUsers={userOptions}
      createTeam={console.info}
    />
  );
};
