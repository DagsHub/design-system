import React from 'react';
import { Icon } from '../../../../icons';
import { Input } from '../../../../forms';
import { GenericSettingsTab } from '../generic-setting-tab';
import { Button, ButtonVariant } from '../../../../elements';

import './delete-organization-tab.scss';
import '../../../../styles/root.scss';

export interface DeleteOrganizationSettingsTabProps {}

export function DeleteOrganizationSettingsTab(props: DeleteOrganizationSettingsTabProps) {
  let elements: JSX.Element[] = [];
  elements.push(
    <div className="delete-organization-setting-tab">
      <p className="delete-organization-setting-tab__text">
        The organization will be permanently removed, and this CANNOT be undone!
      </p>
      <Input rootMaxWidth={260} label='Password' helperText='Required' placeholder='Input' />
      <Button
        className="delete-organization-setting-tab__button"
        variant={ButtonVariant.Error}
        label={'Confirm deletion'}
        width={166}
        iconLeft={<Icon icon={'outline-trash'} width={13.33} height={15} fill={'#DC2626'} />}
      />
    </div>
  );
  return <GenericSettingsTab title={'Delete Organization'} elements={elements} />;
}
