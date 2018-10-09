import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import { Router, Route } from 'react-router';

class AppState {

    @observable loading = true;
    @observable counter = 0;

    constructor() {
        setInterval(() => {
            this.counter += 1;
        }, 1000);
    }

    resetCounter() {
        this.counter = 0;
    }

    updateLoading(val){
        this.loading = val;
    }
}

// @inject('routing')
@observer
class App extends React.Component<{appState: AppState}, {}> {
    componentDidMount(){
        setTimeout(()=>{
          this.props.appState.updateLoading(false)
          this.forceUpdate();
        }, 5000)
        
      }

    render() {
        return (
            <div>
            
            <Route {...this.props} to='/' children={({...props})=>{
                console.log('drawn')
                return (                
                <div>
                <HOC isLoading={this.props.appState.loading}>
                    {
                        (isLoading)=>isLoading ? <span>Loading</span> : <span>Ready</span>  
                    }
                </HOC>
                <button onClick={this.onReset}>Reset counter</button>
                <div>Seconds passed:  {this.props.appState.counter}</div>
              </div>
             )}}></Route>

         }</div>
        );
     }

     onReset = () => {
         this.props.appState.resetCounter();
     }
};

const HOC = (props) => {

    return(<div>This is HOC container <br /> {props.children(props.isLoading)}</div>)
}

const appState = new AppState();
const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const stores = {
  // Key can be whatever you want
  routing: routingStore,
  // ...other stores
};

const history = syncHistoryWithStore(browserHistory, routingStore);
  
const WrappedApp = ((props)=>
    <Provider {...stores}>
        <Router history={history}>
            <App {...props} />
        </Router>
    </Provider>)

ReactDOM.render(<WrappedApp appState={appState} />, document.getElementById('root'));
