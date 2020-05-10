import React from "react";
import { Checkbox } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { updateCaughtOnly, selectCaughtOnly } from "../search/search-slice";

export const CaughtToggle = () => {
  const dispatch = useDispatch();
  const caughtOnly = useSelector(selectCaughtOnly);
  return (
    <Checkbox
      checked={caughtOnly}
      onClick={(event, data) => {
        dispatch(updateCaughtOnly({ caughtOnly: !!data.checked }));
      }}
      label="Only show caught Pokemon"
    />
  );
};
