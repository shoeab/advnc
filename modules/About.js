
import React from 'react';
import NavLink from './NavLink';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            id: null,
            title: null,
            description: null,
            category: null,
            status: null,
            categories: [],
            allCategories:[]
        };
    this.apiUrl = "http://127.0.0.1:3000/api/question-add";
    this.categoryApiUrl = "http://127.0.0.1:3000/api/category";
  }

  handleChange(e) {
        let change = {};
        change[e.target.name] = e.target.value;
        this.setState(change);
    }

  handleSubmit(e) {
        e.preventDefault();
        /*var categories = []
        $(".categoryCheckbox").attr("checked", "true").each(function(){
            categories.push($(this).val());
        });*/
        let allCategories = this.state.allCategories;
        let cat = []
        var checkedValues = $('input:checkbox#categoryCheckbox:checked').map(function () {
            let vm = this.value 
            var result = allCategories.filter(function(a){ 
              a.id = a._id; 
              return a._id == vm })[0]
            /*categories._id === this.value*/
            console.log(result);
              cat.push(result);
            
        }).get();

        if (document.getElementById('status').checked) {
          this.state.status = document.getElementById('status').value;
        }
        else
          this.state.status = "inactive";

        console.log(this.state.status);

        this.state.categories = cat;
        /*this.setState({
            categories: cat
        });*/

        var formData = this.state;
        delete formData.allCategories;
        delete formData.category;
        //console.log(formData);

      $.post( this.apiUrl, formData)
        .done(function( data ) {
          this.set = []
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

    loadArticle() {
    

        $.get(this.categoryApiUrl, (categories) => {
            
          this.setState({ allCategories: categories });
          
          return categories;   
        });
    }

    componentDidMount() {
        this.loadArticle();
               
    }

  render() {
    return (
    			
		            <form onSubmit={ this.handleSubmit.bind(this) } encType='multipart/form-data'>
                  <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input name="title" label="title" id="title" type="text" placeholder="Title" value={this.state.title} onChange={this.handleChange.bind(this)} />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" label="description" type="text" placeholder="description" defaultValue={this.state.description} onChange={this.handleChange.bind(this)} /> 
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <input name="status" label="status" id="status" type="radio" value="active" onChange={this.handleChange.bind(this)} />Active
                    <input name="status" label="status" id="status" type="radio" value="inactive" onChange={this.handleChange.bind(this)} />Inactive
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Categories:</label>
                    {this.state.allCategories.map((category, i) => <CategoriesCheckbox key = {i} data = {category} />)}
                  </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary" value="Save" >Save </button>
                  </div>

                </form>
		            
    		)


  }
}

class CategoriesCheckbox extends React.Component {
   render() {
      return (
          <div className="row" >
            <div className="col-sm-2"> 
              <input type="checkbox" className="categoryCheckbox" id="categoryCheckbox" name="category[]" value={this.props.data._id}  /> 
              {this.props.data.title} 
            </div>
          
            <hr/>
          </div>
         
      );
   }
}


export default About;
