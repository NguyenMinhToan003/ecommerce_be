export const generateOrderEmailTemplate = (order, products, user) => `
  <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4;">
    <h2 style="color: #333;">Thông tin đơn hàng</h2>
    <p><strong>Số đơn hàng:</strong> ${order.id}</p>
    <p><strong>Người đặt hàng:</strong> ${user.name}</p>
    <p><strong>Địa chỉ nhận hàng:</strong> ${order.order_address}</p>
    <p><strong>Số điện thoại liên hệ:</strong> ${order.order_phone}</p>
    <p><strong>Tổng số tiền:</strong> ${order.amount}$</p>
    <h3>Chi tiết đơn hàng</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #ddd;">
      <thead style="background-color: #f2f2f2;">
        <tr>
          <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Sản phẩm</th>
          <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Số lượng</th>
          <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Giá</th>
          <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Màu sắc</th>
          <th style="padding: 8px; text-align: left; border: 1px solid #ddd;">Size</th>
        </tr>
      </thead>
      <tbody>
        ${products
					.map(
						(product) => `
          <tr>
            <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${product.id}</td>
            <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${product.quantity}</td>
            <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${product.price}</td>
            <td style="padding: 8px;color:white; background-color:${product.color};text-align: left; border: 1px solid #ddd;">${product.color}</td>
            <td style="padding: 8px; text-align: left; border: 1px solid #ddd;">${product.size}</td>
          </tr>
        `
					)
					.join('')}
      </tbody>
    </table>
  </body>
`;
