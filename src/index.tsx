import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

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

@observer
class TimerView extends React.Component<{appState: AppState}, {}> {
    componentDidMount(){
        setTimeout(()=>{
          this.props.appState.updateLoading(false)
        }, 5000)
        
      }

    render() {
        return (

            <div>
            <HOC isLoading={this.props.appState.loading}>
            {         (isLoading)=>isLoading ? <span>Loading</span> : <span>Ready</span>  }
            </HOC> 
            <button onClick={this.onReset}>Reset counter</button>
            <div>Seconds passed:  {this.props.appState.counter}</div>
          </div>
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

ReactDOM.render(<TimerView appState={appState} />, document.getElementById('root'));
