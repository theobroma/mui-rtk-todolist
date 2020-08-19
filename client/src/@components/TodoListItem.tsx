import React, { memo } from 'react';

import {
  List,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

interface Props {
  divider?: any;
  text: string;
}

export const TodoListItem: React.FC<Props> = memo(
  ({ divider = true, text }) => (
    <ListItem divider={divider}>
      {/* <Checkbox
      onClick={props.onCheckBoxToggle}
      checked={props.checked}
      disableRipple
    /> */}
      <ListItemText primary={text} />
      {/* <ListItemSecondaryAction>
      <IconButton aria-label="Delete Todo" onClick={props.onButtonClick}>
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction> */}
    </ListItem>
  ),
);
