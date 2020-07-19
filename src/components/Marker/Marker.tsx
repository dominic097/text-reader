import './Marker.scss';
import React, { FunctionComponent, Ref } from 'react';

export interface MarkerProps {
  data: string;
  isSearchMatch?: boolean;
  ref?: React.RefObject<any>;
  id?: string;
}

export const Marker: FunctionComponent<MarkerProps> = (props) => {
  return (
    <pre
      {...(props.id ? { id: props.id } : {})}
      className={props.isSearchMatch ? "highlight-text" : ""}
    >
      {props.data}
    </pre>
  );
};
