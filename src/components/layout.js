import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from "gatsby"
import { HelmetDatoCms } from 'gatsby-source-datocms'
import BackgroundImage from 'gatsby-background-image'
import Img from "gatsby-image"
import BurgerMenu from "../components/BurgerMenu/BurgerMenu"
import Contact from "../components/Contact/Contact"
import useTheme from './useTheme';
import ToggleMode from './ToggleMode'
import '../styles/index.sass'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import style from 'styled-theming';
import './misc.css'

const getBackground = style('mode', {
  light: '#EEE',
  dark: '#212C4F'
});

const getCaption = style('mode', {
  light: '#EFF3F5',
  dark: '#0A0F2D'
});

const getContact = style('mode', {
  light: 'rgb(122, 65, 246)',
  dark: '#EEE'
});

const getForeground = style('mode', {
  light: 'rgba(0,0,0,.84)',
  dark: '#EEE'
});

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${getBackground};
    color: ${getForeground};
  }

  a[href^="tel"] {
      color: ${getContact};
      text-decoration: none; /* Remove underline. */
  }

  .card__caption, .card__caption a{
    background-color: ${getCaption};
    color: ${getForeground};
  }

  .slick-border{
    border: 5px solid ${getBackground};
  }

  .ContactGroup{
    color: ${getContact};
  }

  .project__header{
    color: ${getContact};
  }
`;

const Layout = ({ children, data }) => {
  const theme = useTheme();
  const darkImg = data.img1.childImageSharp.fluid
  const lightImg = data.img2.childImageSharp.fluid
  // const placeHolderImg = data.img3.childImageSharp.fluid
  const profPic = data.profilepic.childImageSharp.fluid
  let themeImg = theme.mode === 'light' ? lightImg : darkImg
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <div className="container">
          <HelmetDatoCms
            favicon={data.datoCmsSite.faviconMetaTags}
            seo={data.datoCmsHome.seoMetaTags}
          />
          <BackgroundImage
            className="container__sidebar"
            fluid={ themeImg }
            // fluid={ theme.mode === 'light' ? darkImg : lightImg }
          >
          {/* {
            theme.mode === 'light' 
            ? <Img
                fluid={lightImg}
                className="container__sidebar"
                style={{
                  position: "absolute",
                  zIndex: -99
                }}
              /> 
            : <Img
                fluid={darkImg}
                className="container__sidebar"
                style={{
                  position: "absolute",
                  zIndex: -99
                }}
              />
          } */}
            <div className="sidebar">
              <div className="sidebar__header">
                <BurgerMenu />
                <div className="name__header">
                  <h6 className="sidebar__title">
                    <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                  </h6>
                  <ToggleMode />
                </div>
                <div>
                  <Img fluid = {profPic} className="profPic" />
                </div>
                <div
                  className="sidebar__intro"
                  dangerouslySetInnerHTML={{
                    __html: data.datoCmsHome.introTextNode.childMarkdownRemark.html,
                  }}
                />
                <ul className="sidebar__menu">
                  <li>
                    <Link to="/">Projects</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </div>
              <div className="sidebar__footer">
                <p className="sidebar__social">
                  {data.allDatoCmsSocialProfile.edges.map(({ node: profile }) => (
                    <a
                      key={profile.profileType}
                      href={profile.url}
                      target="blank"
                      className={`social social--${profile.profileType.toLowerCase()}`}
                    > </a>
                  ))}
                </p>
                <div className="sidebar__copyright">{data.datoCmsHome.copyright}</div>
              </div>
            </div>
          </BackgroundImage>
          <div className="container__body">
            {children}
            <Contact />
          </div>
        </div>
      </>
    </ThemeProvider>
  )
}

export default props => (
  <StaticQuery query={graphql`
    query LayoutQuery
    {
      img1: file(relativePath: {eq: "DarkMode.png"}) {
        childImageSharp{
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
      }
      img2: file(relativePath: {eq: "LightMode.png"}) {
        childImageSharp{
          fluid (quality: 100){
            ...GatsbyImageSharpFluid
          }
        }
      }
      img3: file(relativePath: {eq: "LightMode.png"}) {
        childImageSharp{
          fluid (quality: 1){
            ...GatsbyImageSharpFluid
          }
        }
      }
      profilepic: file(relativePath: {eq: "Colin_Editorial.jpg"}) {
        childImageSharp{
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      datoCmsSite {
        globalSeo {
          siteName
        }
        faviconMetaTags {
          ...GatsbyDatoCmsFaviconMetaTags
        }
      }
      datoCmsHome {
        seoMetaTags {
          ...GatsbyDatoCmsSeoMetaTags
        }
        introTextNode {
          childMarkdownRemark {
            html
          }
        }
        copyright
      }
      allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
        edges {
          node {
            profileType
            url
          }
        }
      }
    }
  `}
  render={data => <Layout data={data} {...props} />}
  />
)

