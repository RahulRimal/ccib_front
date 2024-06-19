import React from "react";
import styled, { useTheme } from "styled-components";
import { IoChevronDownSharp } from "react-icons/io5";

const Wrapper = styled.header`
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.primary};
`;
const HeaderWrapper = styled.div`
  display: flex;
  height: ${({ theme }) => theme.sizing.s74};
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: auto;
`;

const LinkWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: ${({ theme }) => theme.spacing.s20};
  margin: 0;
  padding: 0;
  li {
    position: relative;
    .link {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.spacing.s4};
    }
    &:hover {
      ul {
        display: block;
      }
    }
  }
  .link {
    color: ${({ theme }) => theme.palette.text.primary};
    text-decoration: none;
    font-size: ${({ theme }) => theme.typography.fontSize.f16};
    &.active {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

const SubLinkWrapper = styled.ul`
  padding: ${({ theme }) => theme.spacing.s8};
  position: absolute;
  background-color: ${({ theme }) => theme.palette.background.default};
  border: 1px solid ${({ theme }) => theme.palette.border.primary};
  min-width: ${({ theme }) => theme.sizing.s192};
  display: none;
  li {
    min-height: ${({ theme }) => theme.sizing.s44};
    display: flex;
    padding: ${({ theme }) => `${theme.spacing.s0} ${theme.spacing.s8}`};
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.primary};
  }
`;

const navigationLinks = [
  {
    link: "Home",
    title: "Home Page",
    sublinks: [],
  },
  {
    link: "About",
    title: "About Us",
    sublinks: [
      { link: "Our Team", title: "Meet Our Team" },
      { link: "Our Story", title: "Our Story" },
      { link: "Careers", title: "Careers at Our Company" },
    ],
  },
  {
    link: "Contact",
    title: "Contact Us",
    sublinks: [
      { link: "Customer Support", title: "Customer Support" },
      { link: "Sales", title: "Sales Inquiries" },
      { link: "Locations", title: "Our Locations" },
    ],
  },
  {
    link: "Blog",
    title: "Our Blog",
    sublinks: [
      { link: "Latest Posts", title: "Latest Blog Posts" },
      { link: "Categories", title: "Blog Categories" },
      { link: "Archives", title: "Blog Archives" },
    ],
  },
  {
    link: "Services",
    title: "Our Services",
    sublinks: [
      { link: "Consulting", title: "Consulting Services" },
      { link: "Development", title: "Development Services" },
      { link: "Design", title: "Design Services" },
    ],
  },
  {
    link: "Support",
    title: "Support",
    sublinks: [
      { link: "Help Center", title: "Help Center" },
      { link: "Contact Support", title: "Contact Support" },
      { link: "Status", title: "Service Status" },
    ],
  },
  {
    link: "Privacy",
    title: "Privacy Policy",
    sublinks: [],
  },
  {
    link: "Terms",
    title: "Terms and Conditions",
    sublinks: [],
  },
  {
    link: "Help",
    title: "Help",
    sublinks: [
      { link: "How to Use", title: "How to Use Our Service" },
      { link: "FAQ", title: "Frequently Asked Questions" },
      { link: "Contact Us", title: "Contact Us for Help" },
    ],
  },
  {
    link: "FAQ",
    title: "FAQ",
    sublinks: [],
  },
];

function Navbar() {
  const theme = useTheme();
  return (
    <Wrapper>
      <HeaderWrapper>
        <div>
          <span
            style={{
              fontWeight: theme.typography.fontWeight.semiBold,
              fontSize: theme.typography.fontSize.f30,
            }}
          >
            CCIC
          </span>
        </div>
        <LinkWrapper>
          {navigationLinks.map((item, i) => (
            <li key={i}>
              <Link to={item.link} className="link">
                {item.title}
                {item.sublinks.length > 0 && (
                  <IoChevronDownSharp className="icon" />
                )}
              </Link>
              {item.sublinks.length > 0 && (
                <SubLinkWrapper>
                  <ul>
                    {item.sublinks.map((sublink, i) => (
                      <li key={i}>
                        <Link to={sublink.link} className="link">
                          {sublink.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </SubLinkWrapper>
              )}
            </li>
          ))}
        </LinkWrapper>
      </HeaderWrapper>
    </Wrapper>
  );
}

export default Navbar;
