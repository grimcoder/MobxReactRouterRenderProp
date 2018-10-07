class App extends React.Component {
  
  constructor(props){
    super(props)
    
  }
  
  state = {loading: true, counter :0}
  
  componentDidMount(){
    setTimeout(()=>{
      this.setState({'loading': false})
    }, 5000)
    
        setInterval(()=>{
      this.setState({'counter': this.state.counter+1})
    }, 1000)
  }

  render() {
    return (
      
      <div>
        <HOC isLoading={this.state.loading}>
        {         (isLoading)=>isLoading ? <span>Loading</span> : <span>Ready</span>  }
        </HOC> 
        <div>{this.state.counter}</div>
      </div>
      
    );
  }
}

const HOC = (props) => {

  return(<div>{props.children(props.isLoading)}</div>)
}

ReactDOM.render(<App ></App>, document.getElementById("app"));