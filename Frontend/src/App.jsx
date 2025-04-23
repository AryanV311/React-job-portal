
import './App.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { AppLayout } from "./layouts/AppLayout"
import { Onboarding } from './pages/Onboarding'
import { Job } from './pages/job'
import { LandingPage } from './pages/landingPage'
import { JobListing } from './pages/jobListing'
import { PostJob } from './pages/postJob'
import { SavedJob } from './pages/SavedJob'
import { MyJob } from './pages/myJob'
import { ThemeProvider } from './components/theme-provider'

function App() {

  const router = createBrowserRouter([
    {
      element:<AppLayout />,
      children:[
        {
          path:'/',
          element:<LandingPage />
        },
        {
          path:'/onboarding',
          element:<Onboarding />
        },
        {
          path:'/jobs',
          element:<JobListing />
        },
        {
          path:'/job/:id',
          element:<Job />
        },
        {
          path:'/post-job',
          element:<PostJob />
        },
        {
          path:'/saved-job',
          element:<SavedJob />
        },
        {
          path:'/my-job',
          element:<MyJob />
        },
      ]
    }
  ])

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
    </>
  )
}

export default App
