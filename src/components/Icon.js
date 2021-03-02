import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUser,
  faLock,
  faPlus,
  faSignOutAlt,
  faTrash,
  faFilter,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faLock, faPlus, faSignOutAlt, faTrash, faFilter, faCheck);

export const Icon = (props) => {
  const { icon } = props;
  return <FontAwesomeIcon icon={icon} />;
};
