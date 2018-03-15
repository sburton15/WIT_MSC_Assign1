# WIT_MSC_Assign1

This represents a KanBan based stock control system as would be used by a warehouse. The main idea of a kanban board is to create a very visual representation of the current stock levels present. The idea is that it should be clear to someone that just walked in off the street what the current status of the stock levels are. To achieve this main kanban view uses a simple trafic light bar to show current stock levels.

Green: all good plenty in stock
Yellow: time to pay attention to this stock as it is starting to get low.
Red: if you havn't already ordered more then now is the time. 

The app consists of a header with nav bar, a central view for the main content and a bottom footer will additonal nav.

Views:

Home:
Just a landing page - should hold important summary data to be reviewed - to do

Restricted Area:
An example of a secured page. Only someone that is logged in can access it. otherwise redirected to the login page

Current Stock:
The main kanban screen uses a stubAPI with just the delete option implemented. this displays the current stock of each item. Clicking on the item name uses a parameterised url to display additional info on that stock item. 

Customer Orders:
a list of current open customer orders from a stubAPI. links in the item column lead back to the stock view. search and sort features are implemented on the item names.

Purchase Orders:
This is a list of the current purchase orders placed with suppliers. The view uses a stubAPI to control the orders and clicking the delete order will call the delete method.
The edit button allows you to edit the quantity on any order.(will add all fields if i get time - otherwise just a proof of concept)


Log In/Out
An example of a simple form. Enter an username and click login. No password needed the only validation is that the field is required. After login you can now access the restricted area view.

I didn't implement cross view updates. e.g. dispatching a customer order should remove the order and reduce the stock levels. This will have to wait until there is a back end.