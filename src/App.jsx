import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimateSharedLayout } from 'framer-motion';
import { ProvideAuth } from './hooks/useAuth';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Share from './pages/Share';
import Home from './pages/Home';
import Footer from './components/Footer';

const App = () => (
  <Router>
    <ProvideAuth>
      <Header />
      <section className="h-full text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto">
          <AnimateSharedLayout type="crossfade">
            <Switch>
              <ProtectedRoute path="/share">
                <Share />
              </ProtectedRoute>
              <Route path="/" exact>
                <Home />
              </Route>
            </Switch>
          </AnimateSharedLayout>
        </div>
      </section>
      <Footer />
    </ProvideAuth>
  </Router>
);

export default App;
