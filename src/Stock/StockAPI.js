import _ from 'lodash';

    class StockAPI {

        constructor() {
            this.Stock = [
                {
                    'id': 0, 
                    'name': 'Widget # 1', 
                    'supplier': 'Widget Manufacture ltd.', 
                    'unitCost': 5.99,
                    'rrp':9.99,
                    'qtyInStock': 25,
                    'qtyPerCard': 3,
                    'redCard': 1,
                    'yellowCard':5,
                    'description': 'This handy little widget will do little to nothing!'
                }, 
                {
                    'id': 1, 
                    'name': 'Very big Widget', 
                    'supplier': 'Widget R Us', 
                    'unitCost': 15.99,
                    'rrp':29.99,
                    'qtyInStock': 75,
                    'qtyPerCard': 5,
                    'redCard': 2,
                    'yellowCard':8,
                    'description': 'This massive widget will take up a lot of space!'
                }, 
                {
                    'id': 2, 
                    'name': 'Broken Widget', 
                    'supplier': 'The last resort', 
                    'unitCost': 2.99,
                    'rrp':8.99,
                    'qtyInStock': 3,
                    'qtyPerCard': 2,
                    'redCard': 3,
                    'yellowCard':6,
                    'description': 'This widget is a must have for those people with too much time on their hands!'
                }, 
                {
                    'id': 3, 
                    'name': 'Fidget Spinner', 
                    'supplier': 'The last resort', 
                    'unitCost': 0.99,
                    'rrp':999.99,
                    'qtyInStock': 10,
                    'qtyPerCard': 2,
                    'redCard': 2,
                    'yellowCard':6,
                    'description': 'Not even trying to keep up with the times!'
                } 
            ] ; 
        }

        delete(k) {
            let elements = _.remove(this.Stock, 
                (stock) => stock.id === k
            );
            return elements; 
        }
        getAll() {
            return this.Stock ;
        }

        add(n,s,d) {
            let len = this.Stock.length ;
            let newID = Math.max.apply(this.Stock.id)+1;
            let newLen = this.Stock.push({
                id: newID, name: n, supplier : s, description: d }) ;
            return newLen > len ;
        }

        updateQty(key,q) {
            let index = _.findIndex(this.Stock, 
                (item) => item.ID === key
            );      
            if (index !== -1) {
                this.Stock.splice(index, 1, 
                    {orderQty: q});
                return true ;
            }
            return false ;
        }
    }

    export default (new StockAPI() );
