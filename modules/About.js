
import React from 'react';
import NavLink from './NavLink';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            title: null,
            titleInEnglish: null,
            summary: null,
            description: null,
            category: null,
            status: null,
            image: {},
            tags: [],
            people:[],
            businesses:[],
            locations:[],
            categories: [],
            allCategories:[]
        };
    this.apiUrl = "http://127.0.0.1:3001/admin/questions";
    this.categoryApiUrl = "http://127.0.0.1:3001/admin/categories";
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
        //console.log(this.state.allCategories);
        let allCategories = this.state.allCategories;
        var cat = []
        /*cat.push ({ 
                    "id" : "5819ae58feb7191432d4cf52", 
                    "title" : "উত্তর", 
                    "titleInEnglish" : "answer", 
                    "description" : "প্রিয় উত্তর", 
                    "slug" : "answer", 
                    "parentId" : null, 
                    "weight" : 0, 
                    "status" : "active", 
                    "isDeleted" : false, 
                    "deletedAt" : null, 
                    "oldId" : "answer"
                  });*/
        var checkedValues = $('input:checkbox.categoryCheckbox:checked').map(function () {
            let vm = this.value
            console.log(vm);
            var result = allCategories.filter(function(cat){ 
              // a.id = a._id; 
              return cat.id == vm })[0]
            /*categories._id === this.value*/
            console.log(result);
              cat.push(result);
            
        }).get();

        if (document.getElementById('status').checked) {
          this.state.status = document.getElementById('status').value;
        }
        else
          this.state.status = "inactive";

        console.log(cat);

        this.state.categories = cat;
        /*this.setState({
            categories: cat
        });*/
        //console.log(JSON.stringify(cat));

        this.state.slug = this.convertToSlug(this.state.title);
        this.state.titleInEnglish = this.state.title;
        this.state.summary = this.state.description;

        var formData = this.state;
        delete formData.allCategories;
        delete formData.category;
        console.log(formData);
   
      $.post( "http://127.0.0.1:3001/admin/questions", formData)
        .done(function( data, error ) {
          this.state = []
          console.log( error.responseText );
        })
        .fail(function(error) {
          console.log( error.responseJSON.error.message );
          document.getElementById("msg").innerHTML = error.responseJSON.error.message;
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

    convertToSlug(Text)
    {
      return Text
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-')
        ;
    }

  render() {
    return (
              <div>    			   
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
                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" label="summary" type="text" placeholder="summary" defaultValue={this.state.summary} onChange={this.handleChange.bind(this)} /> 
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <input name="status" label="status" id="status" type="radio" value="active" onChange={this.handleChange.bind(this)} />Active
                    <input name="status" label="status" id="status" type="radio" value="inactive" onChange={this.handleChange.bind(this)} />Inactive
                  </div>

                  <div className="form-group">

                    <label htmlFor="email">Categories:</label>
                    <div className="row" >
                      {this.state.allCategories.map((category, i) => <CategoriesCheckbox key = {i} data = {category} />)}
                    </div>
                  <hr/>
                </div>

                  <div className="form-group">
                    <button type="submit" className="btn btn-primary" value="Save" >Save </button>
                  </div>

                </form>
                <span id="msg"></span>
              </div>
		            
    		)


  }
}

class CategoriesCheckbox extends React.Component {
   render() {
      return (
          
            <div className="col-sm-2" id={this.props.data.id}> 
              <input type="checkbox" className="categoryCheckbox" id={this.props.data.title} name="category[]" value={this.props.data.id}  /> 
               <label htmlFor={this.props.data.title}>{this.props.data.title}</label>
            </div>
          
         
      );
   }
}


export default About;
