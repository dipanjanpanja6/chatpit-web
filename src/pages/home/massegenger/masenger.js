/* eslint-disable no-use-before-define,react/no-array-index-key */
import Box from "@material-ui/core/Box"
import CssBaseline from "@material-ui/core/CssBaseline"
import Toolbar from "@material-ui/core/Toolbar"
import { createTheme, makeStyles, responsiveFontSizes } from "@material-ui/core/styles"
import { ConfigGenerator, Content, Footer, Header, InsetContainer, Root } from "@mui-treasury/layout"
import { ChatBar, ChatDialog, ConversationHead } from "@mui-treasury/mockup/brands/messenger"
import React from "react"

const useStyles = makeStyles(() => ({
  header: {
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, .10)",
    backgroundColor: "#ffffff",
  },
  insetBody: {
    borderLeft: "1px solid rgba(0, 0, 0, 0.08)",
    overflowY: "auto",
  },
  insetDrawerPaper: {
    width: "100%",
    maxWidth: 300,
  },
  contentContainer: {
    flex: 1,
    minHeight: 0,
  },
  content: {
    maxHeight: "100%",
    overflowY: "auto",
  },
  footer: {
    height: 52,
    display: "flex",
    alignItems: "center",
    border: "none",
    padding: "0 8px",
  },
  edit: {
    backgroundColor: "rgba(0,0,0,0.04)",
  },
}))

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "rgb(0, 153, 255)",
      },
    },
    typography: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      body1: {
        fontSize: `${15 / 16}rem`,
      },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "strong, b": {
            fontWeight: "bold",
          },
        },
      },
    },
  })
)

const config = ConfigGenerator({ addOnsIncluded: true })
config.addOns.setCollapsedBreakpoint("sm")
config.addOns.setSecondaryInsetHiddenBreakpoint("xs")
config.primarySidebar.setWidth("25%")
config.primarySidebar.setVariant("permanent")
config.primarySidebar.setCollapsible(true)
config.primarySidebar.setCollapsedWidth(80)
config.header.setPosition("relative")
config.header.setOffsetHeight(60)
config.header.setClipped(false)
config.header.setSecondaryClipped(false)

config.setSecondarySidebarToInset()
config.footer.setSecondaryInsetBehavior("fit")
config.secondarySidebar.setWidth("33%")
config.secondarySidebar.setInsetProps({ position: "absolute" })

const MessengerDemo = () => {
  const styles = useStyles()
  return (
    <Box height={"calc(100vh)"} display={"flex"} flexDirection={"column"} overflow={"hidden"}>
      <Root theme={theme} config={config.get()}>
        {({ collapsed }) => (
          <>
            <CssBaseline />
            <Header className={styles.header}>
              <Toolbar disableGutters className={styles.toolbar}>
                <ConversationHead />
              </Toolbar>
            </Header>
            {/* <Sidebar>
              {collapsed ? (
                <Box textAlign={'center'} my={1}>
                  <IconButton className={styles.edit}>
                    <Edit />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <ChatsHeader />
                  <Box>
                    <MessengerSearch />
                  </Box>
                </>
              )}
              <ChatList concise={collapsed} />
            </Sidebar> */}
            <InsetContainer className={styles.contentContainer}>
              <Content className={styles.content}>
                <ChatDialog />
              </Content>
              {/* <SecondaryInsetSidebar
                className={styles.insetSidebar}
                BodyProps={{ className: styles.insetBody }}
                PaperProps={{ classes: { root: styles.insetDrawerPaper } }}
              >
                <ChatSettings />
              </SecondaryInsetSidebar> */}
            </InsetContainer>
            <InsetContainer>
              <Footer className={styles.footer}>
                <ChatBar concise={collapsed} />
              </Footer>
            </InsetContainer>
          </>
        )}
      </Root>
    </Box>
  )
}

export default MessengerDemo
