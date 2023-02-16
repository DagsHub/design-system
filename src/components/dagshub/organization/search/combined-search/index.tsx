import React from 'react';
import { Input } from '../../../../forms';
import { SearchResultList } from '../search-results';
import { UserInfoProps } from '../../profiles/user-info';

import '../../../../styles/root.scss';
import './combined-search.scss';

export interface CombinedSearchProps {
  onInputChange: (e: { target: { value: React.SetStateAction<string> } }) => void;
  inputText: string;
  placeholder: string;
  resultUsers: UserInfoProps[];
  onInputClick?: () => void;
  onAdd?: (args: any) => void;
  onRemove?: (args: any) => void;
}

export function CombinedSearch({
  onInputChange,
  inputText,
  placeholder,
  resultUsers,
  onInputClick = () => {},
  onAdd = () => {},
  onRemove = () => {}
}: CombinedSearchProps) {
  return (
    <div className="combined-search">
      <Input
        type="text"
        value={inputText}
        onChange={onInputChange}
        onClick={onInputClick}
        rootMaxWidth={600}
        placeholder={placeholder}
        searchIcon
      />
      {!!resultUsers.length && <SearchResultList users={resultUsers} onAdd={onAdd} />}
    </div>
  );
}
