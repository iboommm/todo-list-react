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
} from '@fortawesome/free-solid-svg-icons';

library.add(faCheckSquare, faCoffee, faUser, faLock, faPlus, faSignOutAlt);

export const Icon = (props) => {
  const { icon } = props;
  return <FontAwesomeIcon icon={icon} />;
};
