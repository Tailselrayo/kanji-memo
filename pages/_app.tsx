import { AppShell, BackgroundImage,  MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <BackgroundImage src="/home_background.png">
        <AppShell style={{backdropFilter: "brightness(60%) blur(3px)"}}>
          <Component {...pageProps} />
        </AppShell>
      </BackgroundImage>
    </MantineProvider>
  )
}
