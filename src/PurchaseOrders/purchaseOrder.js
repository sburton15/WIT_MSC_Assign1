    import React from 'react';
    import { withRouter, Route} from 'react-router-dom';
    import _ from 'lodash';
    import purchaseAPI from './PurchaseOrdersAPI'
    import { Redirect } from 'react-router'



  const searchOrderID = (id) => {
      let orders = purchaseAPI.getAll();
      console.log('searching for ',id );
      for (var i=0; i < orders.length; i++) {
          console.log('at index',orders[i].orderID);
          if (orders[i].orderID == id) {
            console.log('matched at index', i);
              return orders[i];
          }
      }
  }

  class EditOrderForm extends React.Component {
    state={
      id: this.props.orderDetails.orderID,
      supplier: this.props.orderDetails.supplierName,
      item: this.props.orderDetails.itemName,
      qty: this.props.orderDetails.orderQty,
    }

    handleQtyChange = (event) => {
      this.setState({qty: event.target.value});
    }

    handleUpdate = (event) => {
      if (this.state.qty !== null & this.state.qty > 0){
        this.props.updateHandler(this.state.id, this.state.qty);
      }

    }

    render () {
      console.log('edit item', this.props.orderDetails);
      return (
        <div>
          <form>
            <div className="form-group">
              <label >Supplier</label>
              <input type="text" className="form-control" id="supplierName" aria-describedby="supplierName" placeholder="Enter Supplier Name" value={this.state.supplier} readonly></input>
            </div>
            <div className="form-group">
              <label >Item</label>
              <input type="text" className="form-control" id="supplierName" aria-describedby="itemName" placeholder="Enter Item Name"  value={this.state.item} readonly></input>
            </div>
            <div className="form-group">
              <label >Quantity required</label>
              <input type="text" className="form-control" id="supplierName" aria-describedby="orderQty" placeholder="Enter quantity Required"  value={this.state.qty} onChange={this.handleQtyChange}></input>
            </div>

            <button type="submit" className="btn btn-primary" onClick={this.handleUpdate}>Update</button>
          </form>
        </div>
      );
    }
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
        this.props.handleDelete(this.props.item.orderID);
      }

      editHandler =(event) => {
        let id = this.props.item.orderID;
        this.props.handleEdit(id);

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
              <a href={'../purchaseOrder/' + this.props.item.orderID}> 
                {this.props.item.orderID} </a>
            </td>
            <td>
              {this.props.item.supplierName}
            </td>
            <td>
              <a href={'../stock/' + this.props.item.itemID}> 
                {this.props.item.itemName} </a>
            </td>
            <td>
              {this.props.item.orderQty}
            </td>
            <td>
              {this.props.item.unitCost}
            </td>
            <td>
              {(this.props.item.orderQty * this.props.item.unitCost).toFixed(2)}
            </td>
            <td className={OrderStatus}>
              {this.props.item.orderDate}
            </td>
            <td>
                <button data-toggle="tooltip" title="Edit Order Quantity" className="btn btn-success" onClick={() => this.editHandler()} disabled ={this.props.editOrder} ><i class="glyphicon glyphicon-pencil"></i></button>
                <button data-toggle="tooltip" title="Cancel Order" className="btn btn-danger" onClick={() => this.deleteHandler()}  disabled ={this.props.editOrder}><i class="glyphicon glyphicon-trash"></i></button>
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
                handleEdit={this.props.handleEdit}
                editOrder={this.props.editOrder}
                />
          );
          return (
            <div className="col-md-12">
              <table className="table table-striped table-hover">
                <thead className="thead-inverse">
                <tr>
                  <th>Order #</th>
                  <th>Supplier</th>
                  <th>Item Ordered</th>
                  <th>Qty Ordered</th>
                  <th>Unit Cost</th>
                  <th>Total Cost</th>
                  <th>Order Date</th>
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
                    <h1>Open Purchase Orders</h1>
                  </div>
                  <SelectBox onUserInput={this.handleChange } 
                          filterText={this.state.search} 
                          sort={this.state.sort} />
                  <FilteredOrderList orders={filteredList} 
                                     handleDelete={this.props.handleDelete} 
                                     handleEdit={this.props.handleEdit}
                                     editOrder={this.props.editOrder}
                  />
                </div> 
              </div>                   
            </div>
          </div>
          );
      }
    }

    class PurchaseOrder extends React.Component {

      handleDelete = (orderID) => {
          purchaseAPI.delete(orderID);
          this.setState({})
      }

      handleQtyUpdate = (id,qty) => {
          purchaseAPI.updateQty(id,qty);
          this.setState({})  
          this.props.history.push('/PurchaseOrder')
      }

      handleEdit = (id) => {
        let path = `/PurchaseOrder/${id}/edit`;
        this.props.history.push(path);
        console.log(`/PurchaseOrder/${id}/edit`);
      }

      render() {
        let AllOrders = purchaseAPI.getAll();
        let editid = this.props.match.params.id;
        console.log('id to search for ',editid);
        let order = searchOrderID(editid);
        console.log('returned item', order);
        return (
            <div>
              <div>
                <Route path={`/purchaseOrder/:id/edit`} render={props => <EditOrderForm editOrder={this.props.match.params.id} orderDetails={order} updateHandler={this.handleQtyUpdate}/>}  />
              </div>
              <OrderListApp orders={AllOrders}
                            handleDelete={this.handleDelete}
                            handleEdit={this.handleEdit}
                            editOrder={this.props.match.params.id}
              />
            </div>
           );
      }
    }


    export default withRouter(PurchaseOrder);
