import React, { memo } from 'react';
import { TextField, Paper, Button, Grid } from '@material-ui/core';

interface Props {
  inputValue: any;
  onInputChange: any;
  onButtonClick: any;
  onInputKeyPress: any;
}

export const TodoForm: React.FC<Props> = memo(
  ({ inputValue, onInputChange, onButtonClick, onInputKeyPress }) => (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add Todo here"
            value={inputValue}
            onChange={onInputChange}
            onKeyPress={onInputKeyPress}
            fullWidth
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={onButtonClick}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  ),
);
