import React, { ComponentProps, FC } from "react";
import styled from "styled-components";
import { lightGrayBackgroundColor, mainBorderColor } from "~/design/color";
import { HoleBase } from "./HoleBase";

const BlankHoleInner = styled(HoleBase)<{
  focused?: boolean;
  short?: boolean;
}>`
  width: ${props => (props.short ? "2.5ex" : "8ex")};
  background-color: ${lightGrayBackgroundColor};
  border-color: ${props => (props.focused ? mainBorderColor : "transparent")};
`;
const Invisible = styled.span`
  visibility: hidden;
`;

type Props = ComponentProps<typeof BlankHoleInner> & {
  holeId: string;
};
/**
 * Render a blank hole.
 */
export const BlankHole: FC<Props> = ({ holeId, ...props }) => (
  <BlankHoleInner data-holeid={holeId} {...props}>
    <Invisible aria-hidden="true">x</Invisible>
  </BlankHoleInner>
);
