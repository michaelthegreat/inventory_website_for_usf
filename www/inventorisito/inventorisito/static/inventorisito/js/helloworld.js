/*
  

 The module tree
   UIBase
     -Searchbar
     -Item Table
       -Item Rows
         -Item Data    
*/
//Some dummy items. JsReact works really well 
//with JSON
var ITEMS = [ 
  {
  "name" : "Shark",
  "unit_price" : "40.00",
  "item_number" : "13243234",
  "weblink" : "weblink.com",
  "transaction_id" :"12341234",
  "quantity" : "22340021",
  "upc_code":"12341234",
  "image_source" :"http://tiwibzone.tiwib.netdna-cdn.com/images/baby-shark-costume.jpg",
  "date_of_purchase":"1/12/11",      
  },
  {
  "name" : "Otter",
  "unit_price" : "40.00",
  "item_number" : "13243234",
  "weblink" : "weblink.com",
  "transaction_id" :"12341234",
  "quantity" : "22340021",
  "upc_code":"12341234",
  "image_source" :"http://img2.wikia.nocookie.net/__cb20120205210745/disney/images/9/95/EttaOtto.jpg",
  "date_of_purchase":"2/12/11",      
  },
  {
  "name" : "Book",
  "unit_price" : "40.00",
  "item_number" : "13243234",
  "weblink" : "weblink.com",
  "transaction_id" :"12341234",
  "quantity" : "22340021",
  "upc_code":"12341234",
  "image_source" : "http://shutupandtakemymoney.com/wp-content/uploads/2013/04/how-to-be-black.jpg",
  "date_of_purchase":"1/12/14",      
  }
];

//The search bar and all the buttons attached to it
var SearchBar = React.createClass({
  //BUTTON HANDLERS
  //When the user changes the searchbar text
  //refresh the value 
  handleChange: function() {
    this.props.onUserInput(
      this.refs.SearchBarInput.getDOMNode().value
    );
  },
  handleAddItems: function(){
    this.props.onUserSubmit( (this.refs.addItems.getDOMNode().value));
  },
  handleDisplayItems: function(){
    this.props.onUserSubmit((this.refs.displayItems.getDOMNode().value));
  },
  render: function() {
    return(
      <div className="jumbotron row">
        <form className="container-fluid">
          <center>
          <h1> Sun Inventory</h1>
            <input
              type="text"
              placeholder="Type to search..."
              value = {this.props.input}
              ref = "SearchBarInput"
              onChange={this.handleChange}
            />
           </center>
        </form>
      </div>
    )
  } 
});//end searchbar

var ItemRow = React.createClass({
  //initially the item isnt selected
  //when the user selects the item by clicking
  //we reveal more information about it
  getInitialState:  function()
  {   
    var ret = { selected : false };
    return ret;
  },
  handleSelect: function()
  {
    this.setState({
      selected : !this.state.selected
    });
  },
  //these handlers need to be filled in
  handleRebuy: function()
  {
    alert("TODO: code Rebuy");
  },
  handleResell: function()
  {
    alert("TODO: code Resell");
  },
  handleCheckWarranty: function()
  {
    alert("TODO: code check warranty");
  },
  handleAddNotes: function()
  { 
    alert("TODO: Code add notes");
  },
  
  
  render: function() {
    var tableStyle = { margin : "4px", }; 
    var tableButtonStyle = { margin : "2px", };
    //if the user did not select the image display
    //only the name and image
    if(!this.state.selected)
    {
      return (
        <table
          className = "table table-striped table-bordered"
          onClick = {this.handleSelect}
          style = {tableStyle} 
        >
          <tbody>
            <th>
              <h4>{this.props.item.name} </h4>
            </th>
            <tr>
              <td>
                <img 
                  className = "img-rounded" 
                  src = {this.props.item.image_source}
                > 
                </img>
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
    //if the user selected the item than return 
    //extra information
    else
    {
      return(
        <table
          className = "table table-striped table-bordered"
          onClick = {this.handleSelect}
          style = {tableStyle} 
        >
          <th>
            <h4>{this.props.item.name}</h4> 
          </th>
          <tbody>
            <tr>
              <td>
                <img 
                  className = "img-rounded" 
                  src = {this.props.item.image_source}
                >
                </img>
              </td>
            </tr>
	    <tr>
	      <td>
                <button 
		  style = {tableButtonStyle}
                  type="button"
                  className=" btn btn-danger"
                  ref="rebuy"
                  value ="rebuy"
                  onClick = {this.handleRebuy}
                  >Rebuy
                </button>
	        <button
                  style = {tableButtonStyle}
                  type="button"
                  className=" btn btn-danger"
                  ref="resell"
                  value ="resell"
                  onClick = {this.handleResell}
                  >Resell
                </button>
	        <button 
	          style = {tableButtonStyle}
                  type="button"
                  className=" btn btn-danger"
                  ref="checkWarranty"
                  value ="checkWarranty"
                  onClick = {this.handleCheckWarranty}
                  >Check Warranty
                </button>
                <button 
                  style = {tableButtonStyle}
                  type="button"
                  className=" btn btn-danger"
                  ref="addNotes"
                  value ="addNotes"
                  onClick = {this.handleAddNotes}
                  >Add Notes
                </button>
	      </td>
	    </tr>
	    <tr>
              <td>
                Date of Purchase
	      </td>
              <td>
                {this.props.item.date_of_purchase}
              </td>
            </tr>
            <tr>
              <td>
                Unit Price
              </td>
              <td>
                {this.props.item.unit_price}
              </td>
            </tr>
	    <tr>
              <td>
                Item Source
              </td>
              <td>
                 VENDOR
              </td>
            </tr>
	    <tr>
              <td>
                Item Link
              </td>
              <td>
                {this.props.item.weblink}
              </td>
            </tr>
            <tr>
              <td>
                Quantity
              </td>
              <td>
                {this.props.item.quantity}
              </td>
            </tr>    
          </tbody>
        </table> 
      );
    }
  }
});//end ItemRow


var ItemTable = React.createClass({
  render: function()
  {
    var searched_items = [];
    items = this.props.items;
    //the items displayed in the item table 
    //are only the ones who match the search results
   
    items.forEach(
      function(item) 
      {  
        var upperCaseName = item.name.toUpperCase();
        var upperCaseInput = this.props.input.toUpperCase();
        if( upperCaseName.indexOf(upperCaseInput) == -1 )
        {
          return;
        }
        searched_items.push(<ItemRow item = {item} key = {item.name} />);
      }.bind(this)
    );    
    return(
      <div >
        {searched_items}
      </div>
    );
  }
});//end itemTable
var UIBase = React.createClass({
  getInitialState: function() 
  {
    //ret = the initial state values for the UI
    var ret = 
    {
      input : '',
    };
    return ret;
  },
  handleUserInput: function(newInput)
  {
    this.setState({
      input: newInput
    });
  },

  handleSubmit : function(button)
  {

  },
  
  render:  function()
  {
      
      return(
        <div>
          <SearchBar
            input = {this.state.input}
            onUserInput = {this.handleUserInput}
            onUserSubmit = {this.handleSubmit} 
          />
          <ItemTable 
            items = {this.props.items}
            input = {this.state.input}
          />
        </div>
      );  
  }
});

//Render the UIBase and add some padding on the searchbar
$(document).ready(function()
{
  React.render
  (
    <UIBase items = {ITEMS}/>,
    document.getElementById('content')
  );
  $(document.body).css('padding-top', $('#topnavbar').height() + 10);
  $(window).resize(
    function()
    {
      $(document.body).css('padding-top', $('#topnavbar').height() + 10);
    }
  );
});
