
import React from 'react';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            id: this.props.params.id,
            title: null,
            description: null
        };
    this.apiUrl = 'http://127.0.0.1:3000/api/question/'+this.state.id;
  }

  loadArticle() {
    
        $.get(this.apiUrl, (article) => {
            
            this.setState({ title: article.title, description: article.description });
            console.log(this.state.article);
            
        });
    }

    componentDidMount() {
        this.loadArticle();
               
    }

  render() {
    return (
    			<div className="row" >
		            <div className="col-sm-12"><h2> {this.state.title} </h2></div>

		          
		            <div className="col-sm-12" dangerouslySetInnerHTML={{__html: this.state.description}}/>
		          
		            <hr/>
		        </div>
    		)


  }
}


export default Content;
