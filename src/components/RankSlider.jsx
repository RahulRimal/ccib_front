import React, { useState } from "react";
import styled, { useTheme } from "styled-components";

const SliderContainer = styled.div`
  display: flex;
  width: 100%;
  height: ${({ theme }) => theme.sizing.s30};
  margin-top: ${({ theme }) => theme.spacing.s0};
  /* display: "flex",
            width: "100%",
            height: theme.spacing.s32,
            marginTop: theme.spacing.s32, */
  & > div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
`;
const MainSlider = styled.div`
  height: ${({ theme }) => theme.sizing.s30};
  position: relative;
`;
const ScaleWrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.sizing.s30};
  margin-top: ${({ theme }) => theme.spacing.s32};
  display: flex;
`;
const Scale = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  position: relative;
  & > span {
    position: absolute;
    top: -${({ theme }) => theme.spacing.s20};
    left: -${({ theme }) => theme.spacing.s8};
    &:last-child {
      left: 95%;
      right: ${({ theme }) => theme.spacing.s0};
    }
  }
  &:first-child {
    & > span {
      &:first-child {
        left: -${({ theme }) => theme.spacing.s2};
      }
    }
  }
  &:last-child {
    border-right: 3px solid black;
  }
`;
const SubScale = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-left: 3px solid black;
  span {
    position: absolute;
    left: ${({ theme }) => theme.spacing.s0};
    right: ${({ theme }) => theme.spacing.s0};
    top: 50%;
    transform: translateY(-50%);
  }
  small {
    height: ${({ theme }) => theme.sizing.s20};
  }
`;
const InputSlider = styled.input`
  width: 100%;
  display: block;
  -webkit-appearance: none;
  appearance: none;
  height: ${({ theme }) => theme.sizing.s10};
  background: transparent;
  outline: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1;
  display: none !important;

  &::-moz-range-thumb {
    width: ${({ theme }) => theme.sizing.s0};
    height: ${({ theme }) => theme.sizing.s0};
    cursor: pointer;
    border-radius: 50%;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0;
    height: 0;
    cursor: pointer;
    border-radius: 50%;
  }
`;
const Selector = styled.div`
  width: ${({ theme }) => theme.sizing.s52};
  position: absolute;
  bottom: -${({ theme }) => theme.spacing.s12};
  div {
    height: ${({ theme }) => theme.spacing.s48};
    width: ${({ theme }) => theme.spacing.s48};
    background-color: #d6c6c6;
    position: absolute;
    bottom: -${({ theme }) => theme.spacing.s32};
    text-align: center;
    line-height: ${({ theme }) => theme.spacing.s48};
    transform: rotate(45deg);
    border-bottom-right-radius: 50%;
    border-bottom-left-radius: 50%;
    border-top-right-radius: 50%;
  }
  span {
    display: inline-block;
    transform: rotate(-45deg); /* Reset the rotation */
    color: black;
  }
`;
function RankSlider() {
  const theme = useTheme();
  const [value, setValue] = useState(35);
  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };
  // useEffect(() => {
  //   const progressBar = document.getElementById("progressBar");
  //   progressBar.style.width = `${value}%`;
  // }, [value]);
  return (
    <>
      <div
        className="main"
        style={{
          position: "relative",
          padding: theme.spacing.s16,
          minHeight: theme.sizing.s192,
        }}
      >
        <SliderContainer>
          <div style={{ backgroundColor: theme.palette.common.red }}>Risk</div>
          <div style={{ backgroundColor: theme.palette.common.yellow }}>
            Good
          </div>
          <div style={{ backgroundColor: theme.palette.common.green }}>
            Ultimate
          </div>
          <div style={{ backgroundColor: theme.palette.common.purple }}>
            Elite
          </div>
        </SliderContainer>
        <MainSlider className="main-slider">
          <ScaleWrapper className="">
            <Scale>
              <span>0</span>
              <SubScale>
                <span style={{ borderTop: `2px solid black` }}></span>
                <small style={{ borderLeft: `2px solid black` }}></small>
              </SubScale>
              <span></span>
            </Scale>
            <Scale>
              <span>25</span>
              <SubScale>
                <span style={{ borderTop: `2px solid blue` }}></span>
                <small style={{ borderLeft: `2px solid blue` }}></small>
              </SubScale>
              <span></span>
            </Scale>
            <Scale>
              <span>50</span>
              <SubScale>
                <span style={{ borderTop: `2px solid green` }}></span>
                <small style={{ borderLeft: `2px solid green` }}></small>
              </SubScale>
              <span></span>
            </Scale>
            <Scale>
              <span>75</span>
              <SubScale>
                <span style={{ borderTop: `2px solid purple` }}></span>
                <small style={{ borderLeft: `2px solid purple` }}></small>
              </SubScale>
              <span>100</span>
            </Scale>
          </ScaleWrapper>
          <InputSlider
            type="range"
            min={0}
            max={100}
            value={value}
            className="slider"
            onChange={handleSliderChange}
          />
          <Selector
            id="selector"
            style={{ left: `${value}%`, transform: `translate(-50%)` }}
          >
            <div id="selectValue">
              <span>{value}</span>
            </div>
          </Selector>
        </MainSlider>
        <div id="progressBar" style={{ width: `${value}%` }}></div>
      </div>
    </>
  );
}
export default RankSlider;
