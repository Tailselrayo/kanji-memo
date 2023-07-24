import { AppShell, BackgroundImage, Footer, MantineProvider, Overlay } from '@mantine/core'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <BackgroundImage src="/home_background.png">
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </BackgroundImage>
    </MantineProvider>
  )
}
