import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';
import MainNav from './components/MainNav/MainNav';
import './App.css';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

import { CartProvider } from './utils/_useCart';

const App = () => {
  return (
    <div className='App'>
      <CartProvider>
        <MainNav />
        <Switch>
          <Route exact path='/signin'>
            <Signin />
          </Route>

          <Route exact path='/signup'>
            <Signup />
          </Route>

          <PrivateRoute exact path='/'>
            <ProductList />
          </PrivateRoute>

          <PrivateRoute exact path='/products/:id'>
            <ProductDetail />
          </PrivateRoute>

          <PrivateRoute exact path='/checkout'>
            <ShoppingCart />
          </PrivateRoute>
        </Switch>
      </CartProvider>
    </div>
  );
};

export default App;
