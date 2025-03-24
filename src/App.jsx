import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import Error from './pages/Error';
import Main, { mainLoader } from './layouts/Main';
import TransactionsPage, {transactionsAction, transactionsLoader} from './pages/TransactionsPage';
import BudgetPage, { budgetAction, budgetLoader } from './pages/BudgetPage';
import { deleteBudget } from './actions/deleteBudget';

// library imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// actions
import { logoutAction } from './actions/logout';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      loader: mainLoader,
      children: [
        {
          path: "/",
          element: <Dashboard />,
          action: dashboardAction,
          loader: dashboardLoader,
          errorElement: <Error />,
        },
        {
          path: "transactions",
          element: <TransactionsPage />,
          action: transactionsAction,
          loader: transactionsLoader,
          errorElement: <Error />,
        },
        {
          path: "budget/:id",
          element: <BudgetPage />,
          loader: budgetLoader,
          errorElement: <Error />,
          action:budgetAction,
          children: [
            {
              path: "delete",
              action: deleteBudget
            }
          ]
        },
        {
          path: "logout",
          action: logoutAction,
        },
        {
          path: "*",
          element: <Error />,
        },
      ]
    },
    {
      path: "about",
      element: <h1>About</h1>,
    },
    
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App