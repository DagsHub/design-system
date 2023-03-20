import React, { ChangeEvent, useState } from 'react';
import { Icon } from '../../../../icons';
import { Input } from '../../../../forms';
import { SearchResultList } from '../search-results';
import { UserInfoProps } from '../../profiles/user-info';

import '../../../../styles/root.scss';
import './combined-search.scss';

export interface CombinedSearchProps {
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputText: string;
  placeholder: string;
  itemsList?: UserInfoProps[];
  resultUsers?: UserInfoProps[];
  onInputClick?: () => void;
  onAdd?: (args: any) => void;
  onRemove?: (args: any) => void;
}

export function CombinedSearch({
  onInputChange,
  inputText,
  placeholder,
  itemsList = [],
  resultUsers = [],
  onInputClick = () => {},
  onAdd = () => {},
  onRemove = () => {}
}: CombinedSearchProps) {
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  return (
    <div className="combined-search">
      <div className="input-items-wrapper">
        <div className="items-list">
          {itemsList.map((item: UserInfoProps) => (
            <div key={item.userName} className="single-item">
              <img src={item.imageSource} alt={item.userName} />
              <a
                href={item.homeLink ?? `/${item.userName}`}
                target="_blank"
                onClick={(e) => {
                  e.preventDefault();
                  if (item.homeLink) {
                    window.open(item.homeLink, '_blank')?.focus();
                  }
                }}
              >
                @{item.userName} {item.isLoggedUser && '(you)'}
              </a>
              <Icon
                icon="solid-x"
                fill="#172D32"
                onClick={() => {
                  setInputFocused(false);
                  setTimeout(() => {
                    onRemove(item.userName);
                    setInputFocused(true);
                  });
                }}
              />
            </div>
          ))}
        </div>
        <Input
          type="text"
          value={inputText}
          onChange={onInputChange}
          onClick={onInputClick}
          placeholder={placeholder}
          className="search-input"
          focusInput={inputFocused}
          rootWidth={!!itemsList?.length ? 'auto' : '100%'}
        />
      </div>
      {inputText && !!resultUsers.length && (
        <SearchResultList
          users={resultUsers}
          onAdd={(user) => {
            setInputFocused(false);
            setTimeout(() => {
              onAdd(user);
              setInputFocused(true);
            }, 0);
          }}
        />
      )}
    </div>
  );
}
