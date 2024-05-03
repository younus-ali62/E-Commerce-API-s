import { OrderRepository } from "../OrderRepository/order_repository.js";
export class OrderController {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  //method to place the order
  async placeOrder(req, res, next) {
    try {
      const userId = req.userId;

      const result = await this.orderRepository.placeOrder(userId);

      return res.status(200).send("Order is created");
    } catch (err) {
      console.log(err);

      return res.status(400).send("something went wrong!");
    }
  }
}
