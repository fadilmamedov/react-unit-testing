import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const Application = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-50">
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </BrowserRouter>
        </QueryClientProvider>
      </RecoilRoot>
    </div>
  );
};
