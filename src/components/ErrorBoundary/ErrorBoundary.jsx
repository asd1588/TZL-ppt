import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null, stack: "" }; }
  componentDidCatch(error, info) { this.setState({ error: error.toString(), stack: info.componentStack }); }
  render() {
    if (this.state.error) {
      return (
        <div style={{padding:40,color:"#2d3445",background:"#fff9ea",fontFamily:"monospace",fontSize:14,whiteSpace:"pre-wrap"}}>
          <h2 style={{color:"#ff8a3d",marginBottom:16}}>React Error</h2>
          <p style={{fontSize:16,fontWeight:"bold"}}>{this.state.error}</p>
          <pre style={{marginTop:16,fontSize:12,color:"#666"}}>{this.state.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}