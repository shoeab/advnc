
import React from 'react';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            id: this.props.params.id,
            title: null,
            description: null,
            categories:[]
        };
    this.apiUrl = 'http://127.0.0.1:3001/admin/questions/'+this.state.id;
  }

  loadArticle() {
    
        $.get(this.apiUrl, (article) => {
            
            this.setState({ title: article.title, description: article.description, categories: article.categories });
            console.log(article);

            
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
                <br/>
                <div className="col-sm-12"> বিভাগ: </div>
		            <div className="col-sm-12" >
                    {this.state.categories.map((category, i) => <CategoriesList key = {i} data = {category} />)}
                </div>
		            
		        </div>
    		)


  }
}

class CategoriesList extends React.Component {
   render() {
      return (
          
            <div className="col-sm-1"> 
              {this.props.data.title},
            </div>
          
         
      );
   }
}


export default Content;
