import '../styles/dagshub.css'
import '../styles/modal.scss'
import '../styles/repo.scss'
import '../styles/table.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
