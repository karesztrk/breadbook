import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Share from './components/Share';
import { ProvideAuth } from './hooks/useAuth';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Router>
        <ProvideAuth>
          <Header />
          <section className="h-full text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto">
              <Switch>
                <ProtectedRoute path="/share">
                  <Share />
                </ProtectedRoute>
                <Route path="/" exact>
                  <Home />
                </Route>
              </Switch>
            </div>
          </section>
          <Footer />
        </ProvideAuth>
      </Router>
    </>
  );
}

export default App;
