
import React from 'react';
import NavLink from './NavLink';

class Repos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            title: null,
            description: null,
            articles: [],
            limit: 10,
            skip: 0
        };

    this.baseApiUrl = 'http://127.0.0.1:3001/admin/questions';
  }

  loadArticle() {
        

        $.get(this.baseApiUrl+"?filter[limit]="+this.state.limit+"&filter[skip]="+this.state.skip+"", (articles) => {
            
            this.setState({ articles: articles });
            console.log(this.state.articles);
            return articles;
                        
        });
    }

    componentDidMount() {
        var articles = this.loadArticle();
        console.log(articles);
        
    }

  handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

  handleSubmit(e) {
        e.preventDefault();
        var formData = this.state;
        var url = "http://127.0.0.1:3000/api/question-add"
        
    console.log(formData)

    $.post( url, formData)
      .done(function( data ) {

        this.setState({ title: null, description: null })

        console.log( data );
      })
      .fail(function() {
      alert( "error" );
      })
      .always(function() {
      alert( "finished" );
      });

        console.log(formData);
    }



  render() {
    return (
            
        <div>
        
        {this.state.articles.map((article, i) => <DivRow key = {i} data = {article} />)} 
               
        </div> 
            )


  }
}

class DivRow extends React.Component {
   render() {
      return (
          <div className="row" >
            <div className="col-sm-12"><h2> <NavLink to={'/content/'+this.props.data.id}> {this.props.data.title} </NavLink> </h2></div>

          
            <div className="col-sm-12" dangerouslySetInnerHTML={{__html: this.props.data.description}}/>
          
            <hr/>
          </div>
         
      );
   }
}

export default Repos;
