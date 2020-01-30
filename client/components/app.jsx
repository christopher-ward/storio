import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Conversations from './Conversations';
import CreateAccount from './CreateAccount';
import ExploreList from './ExploreList';
import ExploreMap from './ExploreMap';
import HostListings from './HostListings';
import LandingPage from './LandingPage';
import ListingDetail from './ListingDetail';
import LogInPage from './LogInPage';
import Message from './Message';
import HostNewListing from './HostNewListing';
import NavigationBar from './NavigationBar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      currentUser: 'guest',
      searchResults: []

    };
    // this.postListing = this.postListing.bind(this);
    this.tryLogIn = this.tryLogIn.bind(this);
    // this.selectOneListing = this.selectOneListing.bind(this);
  }

  componentDidMount() {
    // fetch('/api/health-check')
    //   .then(res => res.json())
    //   .then(data => this.setState({ message: data.message || data.error }))
    //   .catch(err => this.setState({ message: err.message }))
    //   .finally(() => this.setState({ isLoading: false }));
    this.tryLogIn();
  }

  tryLogIn(userObject) {
    // will be passed into log-in page as 'props'
    // userObject will contain 'userName' and 'password'
    // will do fetch request with 'userName' and 'password'
    // upon success, will receive user data object

    fetch('/api/users/2')
      .then(response => response.json())
      .then(jsonData => {
        this.setState({ currentUser: jsonData });
      });
  }

  allLinks() {
    return (
      <div className='d-flex flex-column col-11 mx-2 align-items-center'>
        <Link to='/'>To Home Page</Link>
        <Link to='/create-account'>To CreateAccount</Link>
        <Link to='/host-listings'>To HostListings</Link>
        <Link to='/log-in'>To LogInPage</Link>
        <Link to='/host-new-listing'>Host New Listing</Link>
      </div>
    );
  }

  render() {
    const currentUser = this.state.currentUser;
    return (
      <Router>
        <Route exact={true} path='/'>
          <LandingPage listingSearch={this.listingSearch} />
          {this.allLinks()}
        </Route>
        <Route exact={true} path='/conversations/:loggedInUserId'>
          <Conversations />
          <NavigationBar user={currentUser}/>
        </Route>
        <Route exact={true} path='/create-account'>
          <CreateAccount />
          {this.allLinks()}
        </Route>
        <Route exact={true} path='/explore-list/:city/:state'>
          <ExploreList listings={this.state.searchResults} selectOneListing={this.selectOneListing} />
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/explore-map/:city/:state'>
          <ExploreMap />
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/host-listings'>
          <HostListings user={currentUser} />
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/listing-detail/:storageId'>
          <ListingDetail user={currentUser} />
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/log-in'>
          <LogInPage />
          {this.allLinks()}
        </Route>
        <Route exact={true} path='/message/:loggedInUserId/:hostId' >
          <Message user={currentUser}/>
          <NavigationBar user={currentUser} />
        </Route>
        <Route exact={true} path='/host-new-listing'>
          <HostNewListing postListing={this.postListing} user={currentUser} />
          <NavigationBar user={currentUser} />
        </Route>
      </Router>

    );
  }
}
