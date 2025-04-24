
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
import { ProtectedRoute } from './components/ProtectedRoute'

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
          
          element:(
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          )
        },
        {
          path:'/jobs',
          element:(
            <ProtectedRoute>
              <JobListing />
            </ProtectedRoute>
          )
        },
        {
          path:'/job/:id',
          element:(
            <ProtectedRoute>
              <Job />
            </ProtectedRoute>
          )
        },
        {
          path:'/post-job',
          element:(
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          )
        },
        {
          path:'/saved-jobs',
          element:(
            <ProtectedRoute>
              <SavedJob />
            </ProtectedRoute>
          )
        },
        {
          path:'/my-jobs',
          element:(
            <ProtectedRoute>
              <MyJob />
            </ProtectedRoute>
          )
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
