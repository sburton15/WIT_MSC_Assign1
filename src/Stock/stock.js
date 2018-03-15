    import React from 'react';
    import AllStocks from  './StockData';
    import StockAPI from  './StockAPI';
    import { withRouter} from 'react-router-dom';


    const SelectedItem = (props) => {
      let details= [];
      
      console.log(props.selected);
      console.log(props.item.id);
      if (props.selected == props.item.id){
        details.push(
       <div className="col-md-12">

           <p>{props.item.description}</p>
           <table className="table-inverse table table-striped table-hover table-inverse">
          <thead  className="thead-inverse">
            <tr>
              <td>Suppier</td>
              <td>Unit Cost</td>
              <td>RRP</td>
              <td>Order batch size</td>
              <td>In Stock</td>
              <td>Action</td>  
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.item.supplier}</td>
              <td>{props.item.unitCost}</td>
              <td>{props.item.rrp}</td>
              <td>{props.item.qtyPerCard}</td>
              <td>{props.item.qtyInStock}</td>
              <td><button className="btn btn-sm">Place Order</button></td>
            </tr>
          </tbody>
        </table>
        </div>
        );

      }

      return (
        <div>{details}</div>
      );
    }

    const Cards = ({qtyInStock, qtyPerCard, redCard, yellowCard}) => {
        let card_d=0;
        let card_w=0;
        let card_g=0;
        let maxCards=0;

        maxCards = qtyPerCard * 10;

        if(qtyInStock>maxCards )
        {
          maxCards = qtyInStock;
        }

        if (qtyInStock <= redCard)
        {
            card_d = (qtyInStock/maxCards)*100;
        }

        if (qtyInStock <= yellowCard)
        {
            card_d = (redCard/maxCards)*100;
            card_w = ((qtyInStock/maxCards)*100) - card_d;
        }

        if (qtyInStock > yellowCard)
        {
            card_d = (redCard/maxCards)*100;
            card_w = (((yellowCard-redCard)/maxCards)*100);
            card_g = (((qtyInStock-yellowCard)/maxCards)*100);
        }

      return(
          <div className="progress">
            <div className="progress-bar progress-bar-danger" role="progressbar" style={{width: card_d+'%'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
            <div className="progress-bar progress-bar-warning" role="progressbar" style={{width: card_w+'%'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>      
            <div className="progress-bar progress-bar-success" role="progressbar" style={{width: card_g+'%'}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      );
    }



    class SelectBox extends React.Component {
      render() {
         return (
           <div className="col-md-12">
              <input type="text" placeholder="Search" />
              <span> Sort by: </span>
              <select>
                <option value="name">Alphabetical</option>
                <option value="age">Newest</option>
              </select>
           </div>
          );
        }
    }

   class StockItem extends React.Component {

      render() {
        console.log(this.props.selected);
           return (        
                <div className="panel-title">
                  <a href={'../stock/' + this.props.item.id}> {this.props.item.name} (RRP: {this.props.item.rrp} In Stock: {this.props.item.qtyInStock})</a>
                  <div> 
                    <Cards qtyInStock = {this.props.item.qtyInStock}  
                      qtyPerCard = {this.props.item.qtyPerCard} 
                      redCard = {this.props.item.redCard} 
                      yellowCard = {this.props.item.yellowCard}/>
                  </div>
                  <SelectedItem item={this.props.item} selected={this.props.selected}/>
                </div>
        ) ;
      }
    }

    class FilteredStockList extends React.Component {
      render() {
          let displayedItems = this.props.items.map(
                (c) => <StockItem key={c.id} item={c} selected={this.props.selected}/>
          );
          return (
                <div>
                  {displayedItems}
                </div>
          ) ;
      }
    }

    class StockListApp extends React.Component {
      state ={
        selectedStock: null,
      };


      render() {

        return (
          <div className="view-container">
            <div className="view-frame">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <h1>KanBan Stock List</h1>
                  </div>
                  <SelectBox />

                    <FilteredStockList items={this.props.items} selected={this.props.selected}/>
                </div> 
              </div>                   
            </div>
          </div>
          );
      }
    }

    const Stock = (props) => {
        console.log(props.match.params.id);
        let AllOrders = StockAPI.getAll();
        return (
            <div>
              <StockListApp items={AllOrders} selected={props.match.params.id}/>
            </div>
           );
    }


    export default withRouter(Stock);
