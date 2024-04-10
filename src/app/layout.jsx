"use client"
import CommonLayout from "@local/layouts/commonLayout"
import Providers from "@local/redux/Providers"
import ThemeProviders from "@local/themes/ThemeProviders"
import "../styles/globals.css"
import { CookiesProvider } from "react-cookie"
import { usePathname } from "next/navigation"

export default function RootLayout({ children }) {
  const path = usePathname()

  const Wrapper = CommonLayout
  return (
    <CookiesProvider>
      <Providers>
        <ThemeProviders>
          <html lang="en">
            <body className="bg-[#f5f6f8] !m-0">
              <Wrapper>{children}</Wrapper>
            </body>
          </html>
        </ThemeProviders>
      </Providers>
    </CookiesProvider>
  )
}
