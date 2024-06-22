"use client";
import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { MdOutlineLock } from "react-icons/md";
import Button from "@/app/components/Button";
import { ClipLoader } from "react-spinners";
import InputField from "@/app/components/Forms/Fields/InputField";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, updateAuthentiaction } from "@/features/authSlice";
import Backdrop from "@/app/components/Backdrop";
import PasswordField from "@/app/components/Forms/Fields/PasswordField";
// import CheckboxField from "../components/Forms/Fields/CheckboxField";
import { tokensAvailable } from "@/helpers";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { enqueueSnackbar } from "notistack";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 778px) {
    grid-template-columns: 1fr;
    & > div:first-child {
      display: none;
    }
  }
`;

const ImageContainer = styled.div`
  height: 100vh;
  width: 100%;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  padding: ${({ theme }) => theme.spacing.s24};
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const SignUp = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.fontSize.f14};
`;

const Icon = styled.div`
  text-align: center;
  svg {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.text.white};
    height: 30px;
    width: 30px;
    padding: 0.3em;
    box-sizing: border-box;
    border-radius: 50%;
  }
`;

function SignIn() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  // const { loading } = useSelector((store) => store.auth);
  const loading = false;

  // const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (tokensAvailable()) {
      dispatch(updateAuthentiaction({ name: "isLoggedIn", value: true }));
      router.push("/");
    }
  }, [dispatch, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    try {
      await dispatch(loginUser({ username, password })).unwrap();
      enqueueSnackbar("Login successful", {
        variant: "success",
        autoHideDuration: 2000,
      });
      router.push("/");
    } catch (error) {
      try {
        const errs = JSON.parse(error.message);
        errs.forEach((element, index) => {
          setTimeout(() => {
            enqueueSnackbar(element, {
              variant: "error",
              autoHideDuration: 3000,
            });
          }, index * 500);
        });
      } catch (parseError) {
        enqueueSnackbar("An unexpected error occurredddd", {
          variant: "error",
          autoHideDuration: 3000,
        });
        console.error("Error parsing JSON response:", error.message);
      }
    }
  };

  return (
    <>
      <Grid>
        <ImageContainer>
          <img
            src="https://source.unsplash.com/random?wallpapers"
            alt="login-img"
          />
        </ImageContainer>
        <LoginContainer>
          <Icon>
            <MdOutlineLock />
          </Icon>
          <p
            style={{
              textAlign: "center",
              fontSize: theme.typography.fontSize.f20,
              margin: theme.spacing.s8,
            }}
          >
            Sign In
          </p>

          <form onSubmit={handleSubmit}>
            <InputField
              label="Username"
              name="username"
              type="text"
              placeholder="Username"
            />
            <PasswordField
              label="Password"
              name="password"
              placeholder="Password"
            />
            {/* <div style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: theme.spacing.s4 }}>
              <CheckboxField name="Remember me" options={[{ value: true, label: "yes" }, { value: false, label: "no" }]} />
              <span>Remember me</span>
            </div> */}
            <Button
              style={{ width: "100%" }}
              type="submit"
              text={"SIGN IN"}
              bg={"red"}
              textColor={"white"}
            />
            <SignUp style={{ marginTop: "20px" }}>
              <a href="">Forget Password?</a>
              <span href="">
                Don't have an account? <a href="">Sign Up</a>
              </span>
            </SignUp>
          </form>
        </LoginContainer>
      </Grid>
      <Backdrop open={loading}>
        <ClipLoader color="#fff" />
      </Backdrop>
    </>
  );
}

export default SignIn;
