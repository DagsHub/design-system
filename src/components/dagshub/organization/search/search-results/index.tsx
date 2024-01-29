import React from 'react';
import { Icon } from '../../../../icons';
import { Row, GenericTable } from '../../tables/generic-table';
import { UserInfo, UserInfoProps } from '../../profiles/user-info';
import { Button, ButtonStretch, ButtonVariant } from '../../../../elements';

import '../../../../styles/root.scss';
import './search-results.scss';

export interface SearchResultListProps {
  users: UserInfoProps[];
  onAdd?: (user: UserInfoProps) => void;
}

export function SearchResultList({ users, onAdd = () => {} }: SearchResultListProps) {
  let rows: Row[] = [];
  for (let user of users) {
    let row: Row = {
      rowClasses: 'search-result-list__row',
      columns: [
        <UserInfo imageSource={user.imageSource} userName={user.userName} />,
        <Button
          width={142}
          label="Add member"
          stretch={ButtonStretch.Slim}
          variant={ButtonVariant.Secondary}
          onClick={() => onAdd(user)}
          iconLeft={<Icon width={12} height={12} fill="#172D32" icon="outline-plus" />}
        />,
      ],
    };
    rows.push(row);
  }
  return <GenericTable classnames={'search-result-list'} rows={rows} />;
}
