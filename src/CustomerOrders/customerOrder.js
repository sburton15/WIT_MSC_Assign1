    import React from 'react';

    import OrdersAPI from  './CustomerOrdersAPI';
    import _ from 'lodash';

    const Cards = ({qtyInStock, qtyPerCard, redCard, yellowCard}) => {
      const cardClass = (index) => {
        console.log(index +" " + redCard + " " + yellowCard);
        if(index<=redCard) {
          console.log("red");
          return 'redCard';
        }
        if(index<=yellowCard) {
          console.log("orange");
          return 'orangeCard';
        }
        else{
          console.log({index} + " green");
          return 'greenCard';
        }
      }
      let cards = [];
      for(let i=1; i<(qtyInStock/qtyPerCard)+1; i++){
        cards.push(<span key={i} className={cardClass(i)}></span>)
      }
      return(
          <div>
            <p>{cards}</p>
          </div>
      )
    }
    


  class SelectBox extends React.Component {
    handleChange = (e, type, value) => {
        e.preventDefault();
        this.props.onUserInput( type,value);
    };

    handleTextChange = (e) => {
        this.handleChange( e, 'search', e.target.value);
    };

    handleSortChange = (e) => {
        this.handleChange(e, 'sort', e.target.value);
    };

    render() {
        return (
            <div className="col-md-12">
                <input type="text" placeholder="Search" 
                    value={this.props.filterText}
                    onChange={this.handleTextChange} />
                <span> Sort by: </span>
                <select id="sort" value={this.props.order } 
                    onChange={this.handleSortChange} >
                    <option value="customerName">Alphabetical</option>
                    <option value="dueDate">Due By</option>
                </select>
            </div>
        );
    }
  }


   class StockItem extends React.Component {
      deleteHandler = (e) => {
        console.log("clicked delete");
        this.props.handleDelete(this.props.item.id);
      }

      dispatchHandler = (e) => {
        //temp - only process delete portion
        console.log("clicked dispatch");
        this.props.handleDelete(this.props.item.id);
      }

      render() {
          let OrderStatus;
          let now = new Date();
          console.log(this.props.item.dueDate);
          if(now > Date.parse(this.props.item.dueDate)) {
            console.log("overdue");
            OrderStatus = 'Over-due';
          }
          else
          {
            OrderStatus ='';
          }        
          return (        
          <tr className='valign="middle"'>
            <td>
              <a href={'../customerOrder/' + this.props.item.id}> 
                {this.props.item.id} </a>
            </td>            
            <td>
                {this.props.item.customerName} 
            </td>
            <td>
              <a href={'../stock/' + this.props.item.itemID}> 
                {this.props.item.itemName} </a>
            </td>
            <td>
              {this.props.item.qtyOrdered}
            </td>
            <td>
              {this.props.item.rrp}
            </td>
            <td>
              {this.props.item.qtyOrdered * this.props.item.rrp}
            </td>
            <td className={OrderStatus}>
              {this.props.item.dueDate}
            </td>
            <td>
                <button data-toggle="tooltip" title="Dispatch Order" className="btn btn-sm btn-success" onClick={this.dispatchHandler}><i className="glyphicon glyphicon-send"></i></button>
                <button data-toggle="tooltip" title="Cancel Order" className="btn btn-sm btn-danger" onClick={this.deleteHandler}><i className="glyphicon glyphicon-trash"></i></button>
            </td>
          </tr>
        ) ;
      }
    }

    class FilteredOrderList extends React.Component {
      render() {
          let displayedOrders = this.props.orders.map(
                (c) => <StockItem key={c.id} item={c} 
                handleDelete={this.props.handleDelete}
                handleDispatch={this.props.handleDispatch}
                />
          );
          return (
            <div className="col-md-12">
              <table className="table table-striped table-hover">
                <thead className="thead-inverse">
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Item Ordered</th>
                  <th>Qty Ordered</th>
                  <th>Unit Cost</th>
                  <th>Total Cost</th>
                  <th>Due Date</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody >
                {displayedOrders}
                </tbody>
              </table>
            </div>
          ) ;
      }
    }

    class OrderListApp extends React.Component {
      state = { search: '', sort: 'name' };

      handleChange = (type, value) => {
        console.log({type,value});
        if ( type === 'search' ) {
            this.setState( { search: value } ) ;
        } else {
            this.setState( { sort: value } ) ;
        }
      };
      
      selectedOrder = () => {
        return this.state.selectedOrder;
      }

      render() {

        console.log( ` Criteria: Search=  ${this.state.search} ; Sort= ${this.state.sort}` );
        let list = this.props.orders.filter( 
           (p) =>
               p.itemName
                 .toLowerCase()
                 .search(this.state.search.toLowerCase()) !== -1 
        );
        let filteredList = _.sortBy(list, this.state.sort) ;
        return (
          <div className="view-container">
            <div className="view-frame">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-10">
                    <h1>Open Customer Orders</h1>
                  </div>
                  <SelectBox onUserInput={this.handleChange } 
                          filterText={this.state.search} 
                          sort={this.state.sort} />
                  <FilteredOrderList orders={filteredList} 
                                    handleDelete={this.props.handleDelete}
                                    handleDispatch={this.props.handleDispatch}
                  />
                </div> 
              </div>                   
            </div>
          </div>
          );
      }
    }

    class CustomerOrder extends React.Component {
      handleDelete = (orderID) => {
          OrdersAPI.delete(orderID);
          this.setState({})
      }

      handleDispatch = (orderID) => {
          OrdersAPI.delete(orderID);
          this.setState({})
      }

      render() {
        let AllOrders = OrdersAPI.getAll();
        return (
            <div>
              <OrderListApp orders={AllOrders}
                            handleDelete={this.handleDelete}
                            handleDispatch={this.handleDispatch}
              />
            </div>
           );
      }
    }


    export default CustomerOrder;
