import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckSquare,
  faCoffee,
  faUser,
  faLock,
  faPlus,
  faSignOutAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faCheckSquare,
  faCoffee,
  faUser,
  faLock,
  faPlus,
  faSignOutAlt,
  faTrash
);

export const Icon = (props) => {
  const { icon } = props;
  return <FontAwesomeIcon icon={icon} />;
};
