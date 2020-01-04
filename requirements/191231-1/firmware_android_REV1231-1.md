# Dữ liệu giao tiếp giữa bo vending - android
## Thông tin chọn sản phẩm:
+ ### Android gửi xuống firmware slot được chọn (1)
>Android request
```json
{
  "topic":"slots",
  "type":"event",
  "content":{"value": "unsigned int number"}
}
```
Value: số thứ tự slot
>Firmware reponds
```json
{
  "topic":"slots",
  "type":"response",
  "content":{"value": int}
}
```
Trong đó giá trị value như sau:
+ 0: Slot hết sản phẩm -> hiển thị slot hết hàng
+ 1: Slot bị lỗi -> hiển thị slot lỗi
+ 2: Slot ok - none process (App không cần hiển thị)
+ n: Sẽ thêm nếu có
---

## Thông tin giao diện hiển thị
+ ### Firmware gửi lên app yêu cầu hiển thị giao diện
>Firmware request
```json
{
  "topic":"interface",
  "type":"request",
  "content": {"value":int}
}
```
Value:
+ 0: Màn hình đã chọn sản phẩm (2)
+ 1: Màn hình mời nhận sản phẩm (3)
+ 2: Màn hình cảm ơn quý khách (4)
+ 3: Màn hình chờ hiển thị qr code (5)
+ 4: Màn hình mời quét qr code (6)
+ 5: Màn hình thông báo giao dịch momo thất bại (7)
+ 6: Màn hình thông báo giao dịch momo thành công (8)
+ 7: Màn hình thông báo mất mạng, không thể mua momo (9)
+ 8: Màn hình mời nhận tiền thối (10)
+ 9: Màn hình chính chọn sản phẩm (10 - 1)
+ 10: Màn hình hiển thị không thể thối tiền thừa (10-2)
+ 11: Màn hình hiển thị tiền đưa vào lớn hơn 50k (14-2),
+ 12: Màn hình hiển thị không đủ tiền thối (14-1),
+ 13: Màn hình mời nhận lại tiền
+ n: Thêm sau nếu có

>Android reponds
```json
{
  "topic":"interface",
  "type":"response",
  "content":{"status":"ok"}
}
```
---
## Thông tin hình thức thanh toán
+ ### Firmware gửi lên app hiển thị hình thức thanh toán cho người dùng chọn (11)
>Firmware request
```json
{
  "topic":"paymentMethod",
  "type":"request",
  "content": "ok"
}
```
>Android reponds
```json
{
  "topic":"paymentMethod",
  "type":"response",
  "content":{"status":"ok"}
}
```
+ ### Android gửi xuống firmware thông tin người dùng đã chọn phương thức thanh toán (12)
>Android request
```json
{
  "topic":"paymentMethod",
  "type":"event",
  "content":{"value":int}
}
```
Value: 
+ 0: Người dùng hủy chọn phương thức thanh toán
+ 1: Người dùng chọn thanh toán tiền mặt
+ 2: Người dùng chọn thanh toán momo
+ n: Thêm sau nếu có
>Firmware reponds
```json
{
  "topic":"paymentMethod",
  "type":"response",
  "content":{"status":"ok"}
}
```
---
## Thông tin thanh toán tiền mặt
+ ### Cập nhật tiền nhận được (13)
>Firmware request
```json
{
  "topic":"cashMethod",
  "type":"updateMoney",
  "content":{"value":int}
}
```
Value: số tiền vnd
>Android reponds
```json
{
  "topic":"cashMethod",
  "type":"response",
  "content":{"status":"ok"}
}
```
+ ### Firmware truyền lên android cảnh báo lỗi đưa tiền vào, có timer để không cần firmware reset màn hình (14)
>Firmware request
```json
{
  "topic":"cashMethod",
  "type":"warning",
  "content":{"value":int}
}
```
Trong đó giá trị value như sau:
+ 0: Cảnh báo không đủ tiền thối (14-1)
+ 1: Cảnh báo tiền đã vượt quá hạn mức nhận (14-2)
+ n: Sẽ thêm nếu có
>Android reponds
```json
{
  "topic":"cashMethod",
  "type":"response",
  "content": "ok"
}
```

+ ### Firmware truyền xuống android hiển thị giao diện thông báo không thể thối tiền vừa đưa vào để người dùng chọn (15)
>Firmware request
```json
{
  "topic":"cashMethod",
  "type":"request",
  "content":{"status":"ok"}
}
```
>Android reponds
```json
{
  "topic":"cashMethod",
  "type":"response",
  "content":{"status":"ok"}
}
```
+ ### Android truyền xuống firmware thông báo người dùng đã chọn chấp nhận/không chấp nhận việc máy không thể thối tiền (16)
>Android request
```json
{
  "topic":"cashMethod",
  "type":"request",
  "content":{"value":int}
}
```
Value: 0: Không chấp nhận, 1: Chấp nhận
>Firmware reponds
```json
{
  "topic":"cashMethod",
  "type":"response",
  "content":{"status":"ok"}
}
```
---

## Thông tin thanh toán momo
+ ### Firmware gửi hình qr code lên app (17)
>Firmware request
```json
{
  "topic":"momoMethod",
  "type":"update",
  "content":{"base64": string}
}
```
Value: chuỗi dữ liệu hình qr code định dạng base64
>Android reponds
```json
{
  "topic":"momoMethod",
  "type":"response",
  "content":{"status":"ok"}
}
```




## Thông tin tiếp tục/hủy giao dịch
+ ### Android gửi xuống firmware tiếp tục hay hủy giao dịch (20)
>Android request
```json
{
  "topic":"purchase",
  "type":"event",
  "content":{"value":int}
}
```
Value: 
+ 0: Hủy giao dịch
+ 1: Tiếp tục giao dịch
+ 2: ..

>Firmware reponds
```json
{
  "topic":"purchase",
  "type":"response",
  "content":{"status":"ok"}
}
```

---
