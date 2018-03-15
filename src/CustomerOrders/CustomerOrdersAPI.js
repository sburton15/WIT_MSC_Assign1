import _ from 'lodash';

    class CustomerOrdersAPI {

        constructor() {
            this.customerOrders = [
            {
                    'id': 0, 
                    'itemID': 0,
                    'itemName': 'Widget # 1', 
                    'rrp':9.99,
                    'qtyOrdered': 3,
                    'dueDate': 'Feb 8 2018',
                    'customerID':1,
                    'customerName':'Micky Joe'
                }, 
                {
                    'id': 1, 
                    'itemID': 0,
                    'itemName': 'Widget # 1', 
                    'rrp':9.99,
                    'qtyOrdered': 7,
                    'dueDate': 'Mar 18 2018',
                    'customerID':1,
                    'customerName':'Micky Joe'
                }, 
                {
                    'id': 2, 
                    'itemID': 1,
                    'itemName': 'Very big Widget', 
                    'rrp':29.99,
                    'qtyOrdered': 3,
                    'dueDate': 'Aug 8 2018',
                    'customerID':1,
                    'customerName':'Micky Joe'
                }, 
                {
                    'id': 3, 
                    'itemID': 1,
                    'itemName': 'Very big Widget', 
                    'rrp':29.99,
                    'qtyOrdered': 3,
                    'dueDate': 'Mar 8 2018',
                    'customerID':2,
                    'customerName':'Simon'
                }, 
                {
                    'id': 4, 
                    'itemID': 2,
                    'itemName': 'Broken Widget', 
                    'rrp':8.99,
                    'qtyOrdered': 1,
                    'dueDate': 'Mar 8 2018',
                    'customerID':2,
                    'customerName':'Simon'
                }

            ] ; 
        }

        delete(k) {
            let elements = _.remove(this.customerOrders, 
                (Order) => Order.id === k
            );
            return elements; 
        }
        getAll() {
            return this.customerOrders ;
        }


    }

    export default (new CustomerOrdersAPI() );
