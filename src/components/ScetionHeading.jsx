import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.s4};
  border-radius: ${({ theme }) => theme.borderRadius.badge};
  align-items: center;
  justify-content: ${({ left, center, right }) =>
    left ? "left" : center ? "center" : right ? "right" : "left"};
  width: ${({ width }) => width || "auto"};
  background-color: ${({ background }) => background || "transparent"};
`;

const StyledSpan = styled.span`
  color: ${({ color }) => color || "black"};
  font-weight: inherit;
  font-size: ${({ fontSize }) => fontSize || "inherit"};
`;

function SectionHeading({
  text,
  style,
  left,
  center,
  right,
  width,
  color,
  background,
  fontSize,
}) {
  return (
    <Wrapper
      left={left}
      center={center}
      right={right}
      width={width}
      style={style}
      background={background}
    >
      <StyledSpan color={color} fontSize={fontSize}>
        {text}
      </StyledSpan>
    </Wrapper>
  );
}

export default SectionHeading;
