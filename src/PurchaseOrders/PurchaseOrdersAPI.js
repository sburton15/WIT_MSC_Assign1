import _ from 'lodash';

    class PurchaseOrdersAPI {

        constructor() {
            this.purchaseOrders = [
                {
                    'orderID': 0,
                    'supplierName': 'Widget Manufacture ltd.',
                    'itemID':'0',
                    'itemName':'Widget # 1',
                    'orderDate': '28-Feb-2018',
                    'unitCost': 5.99,
                    'orderQty': 15
                },
                {
                    'orderID': 1,
                    'supplierName': 'Widget Manufacture ltd.',
                    'itemID':'0',
                    'itemName':'Widget # 1',
                    'orderDate': '2-Mar-2018',
                    'unitCost': 5.99,
                    'orderQty': 6
                },
                {
                    'orderID': 2,
                    'supplierName': 'Widget Manufacture ltd.',
                    'itemID':'0',
                    'itemName':'Widget # 1',
                    'orderDate': '8-Mar-2018',
                    'unitCost': 5.99,
                    'orderQty': 9
                },
                {
                    'orderID': 3,
                    'supplierName': 'Widget R Us',
                    'itemID':'2',
                    'itemName':'Very big Widget',
                    'orderDate': '8-Mar-2018',
                    'unitCost': 15.99,
                    'orderQty': 10
                },
                {
                    'orderID': 4,
                    'supplierName': 'The last resort',
                    'itemID':'2',
                    'itemName':'Broken Widget',
                    'orderDate': '8-Mar-2018',
                    'unitCost': 2.99,
                    'orderQty': 2
                }

            ] ; 
        }

        delete(k) {
            let elements = _.remove(this.purchaseOrders, 
                (Order) => Order.orderID === k
            );
            return elements; 
        }
        getAll() {
            return this.purchaseOrders ;
        }

        add(n,a,p) {
            let len = this.contacts.length ;
            let newLen = this.contacts.push({
                name: n, address : a, phone_number: p }) ;
            return newLen > len ;
        }

        updateQty(key,q) {
            let index = _.findIndex(this.purchaseOrders, 
                (Order) => Order.orderID === key
            );      
            if (index !== -1) {
                this.purchaseOrders.splice(index, 1, 
                    {
                        orderID: this.purchaseOrders[index].orderID,
                        supplierName: this.purchaseOrders[index].supplierName,
                        itemID: this.purchaseOrders[index].itemID,
                        itemName: this.purchaseOrders[index].itemName,
                        orderDate: this.purchaseOrders[index].orderDate,
                        unitCost: this.purchaseOrders[index].unitCost,
                        orderQty: q});
                return true ;
            }
            return false ;
        }
    }

    export default (new PurchaseOrdersAPI() );
