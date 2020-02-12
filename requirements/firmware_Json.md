# Dữ liệu giao tiếp giữa bo vending - android

## 1. Android yêu cầu hiển thị màn hình cài đặt và màn hình login của app

***Khi người dùng mở cửa máy vending thì Firmware gửi yêu cầu hiển thị giao diện cài đặt cho Android***
>Firmware request
```json
{
  "topic":"openSetting",
  "type":"request",
  "content":{"status":"ok"}
}
```
***App phản hồi lại Firmware***
>Android reponds
```json
{
  "topic":"openSetting",
  "type":"response",
  "content":{"status":"ok"}
}
```
---------------------------------------------------------------
***Khi người dùng nhấn đăng nhập tài khoản thì Android gửi yêu cầu xuống Firmware thông tin tài khoản***
>Android request
```json
{
  "topic":"loginAppSetting",
  "type":"request",
  "content":{
    "userName":string,
    "password":string
  }  
}
```
***Firmware phản hồi nhận thông tin tài khoản lên app***
>Firmware reponds(status:ok -> chấp nhận đăng nhập, status: false -> không chấp nhận đăng nhập)
```json
{
  "topic":"loginAppSetting",
  "type":"response",
  "content":{"status":"ok"}
}
```
--------------------------------------------------------------
## 2. Android yêu cầu vào giao diện hiển thị danh sách sản phẩm product settings
***Khi người dùng chọn vào chức năng product setting thì android gửi yêu cầu xuống Firmware***
>Android request
```json
{
  "topic":"settingProducts",
  "type":"request",
  "content":{"status": "ok"}
}
```
***Firmware phản hồi lên app thông tin các sản phẩm đã có lên app***
>Firmware reponds
```json
{
  "topic":"settingProducts",
  "type":"response",
  "content":{
    "productId": string
  }
}
```
------------------------------------------------------
## 3.Android yêu cầu chức năng tạo sản phẩm mới
***Khi người dùng muốn lưu sản phẩm vừa tạo thì android gửi yêu cầu xuống Firmware***
>Android request
```json
{
  "topic":"settingCreateProducts",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên app các sản phẩm đã được tạo***
>Firmware reponds
```json
{
  "topic":"settingCreateProducts",
  "type":"response",
  "content":{
    "productName":string,
    "productPrices":int,
    "productId":string,
    "uId":string
  }
}
```
Lưu ý : uId là chuỗi 36 kí tự được tạo ngẫu nhiên

ví dụ:
af5f1fc9-19e1-4410-aa14-c0870811b1c7

---
## 4. Android yêu cầu chọn sản phẩm trong products setting
***Khi người dùng chọn sản phẩm đã tồn tại trong App thì android gửi yêu cầu xuống Firmware thông tin sản phẩm đã chọn***
>Android request
```json
{
  "topic":"settingProductsChosen",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên app sản phẩm đã chọn***
>Firmware reponds
```json
{
  "topic":"settingProductsChosen",
  "type":"response",
  "content":{
    "productId":string,
  }
}
```
---
## 4.1. Android yêu cầu chức năng xóa sản phẩm
***Khi người dùng muốn xóa sản phẩm vừa tạo thì android gửi yêu cầu xuống Firmware***
>Android request
```json
{
  "topic":"settingDeleteProducts",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên app xóa sản phẩm đã chọn***
>Firmware reponds
```json
{
  "topic":"settingDeleteProducts",
  "type":"response",
  "content":{"status":"ok"}
}
```
---
## 4.2. Android yêu cầu chức năng cập nhật sản phẩm
***Khi người dùng muốn cập nhật sản phẩm vừa tạo thì android gửi yêu cầu xuống Firmware***
>Android request
```json
{
  "topic":"settingUpdateProducts",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên app cập nhật sản phẩm đã chọn***
>Firmware reponds
```json
{
  "topic":"settingUpdateProducts",
  "type":"response",
  "content":{
    "productName":string,
    "productPrices":int,
    "productId":string,
    "uId":string
  }
}
```
---
## 5. Android yêu cầu hiển thị slot management
***Khi người dùng muốn hiển thị slot thì android gửi yêu cầu xuống Firmware***
>Android request
```json
{
  "topic":"settingSlots",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên app hiển thị tất cả các slot***
>Firmware reponds
```json
{
  "topic":"settingSlots",
  "type":"response",
  "content":{
    "productId":string,
    "uId":string,
  }
}
```
---
## 6. Android yêu cầu cập nhật slot info management
***Khi người dùng càn thay đổi các thông tin tại vị trí slot - số lượng sản phẩm - số lượng chứa tối đa của slot đó***

***App gửi yêu cầu cho Firmware cập nhật lại các thông tin vị trí slot***
>Android request
```json
{
  "topic":"settingSlotsInfo",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên App cập nhật lại thông tin vị trí slot***
>Firmware reponds
```json
{
  "topic":"settingSlotsInfo",
  "type":"response",
  "content":{
    "position":string,
    "productId":string,
    "uID":string,
    "slotQuanlity":string,
    "slotCapacity":string,
  }
}
```
---
## 7. Android yêu cầu hiển thị slot errors management
***Khi người dùng muốn xem slot bị lỗi***

***App gửi yêu cầu xuống Firmware hiển thị màn hình các slot bị lỗi***
>Android request
```json
{
  "topic":"settingSlotsError",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên App thông tin các slot bị lỗi***
>Firmware reponds
```json
{
  "topic":"settingSlotsError",
  "type":"response",
  "content":{
    "position":string,
    "productId":string,
    "motorStatus":boolean
  }
}
```
---
## 8. Android yêu cầu clear slot errors management
***App gửi yêu cầu xuống Firmware xóa các slot bị lỗi***
>Android request
```json
{
  "topic":"settingSlotsError",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên App thực hiện yêu cầu***
>Firmware reponds
```json
{
  "topic":"settingSlotsError",
  "type":"response",
  "content":{
    "position":string,
    "productId":string,
    "motorStatus":boolean
  }
}
```
---
## 9. Android yêu cầu cài đặt Get Data Server
***App gửi yêu cầu xuống Firmware lấy dữ liệu từ server***
>Android request
```json
{
  "topic":"settingGetDataServer",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên App thực hiện yêu cầu lấy dữ liệu***
>Firmware reponds
```json
{
  "topic":"settingGetDataServer",
  "type":"response",
  "content":{
    "slotInfo":string
  }
}
```
---
## 10. Android yêu cầu cài đặt thông số máy
***App gửi yêu cầu xuống Firmware cài đặt thông số máy***
>Android request
```json
{
  "topic":"settingVendingMachine",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên App các thông số máy***
>Firmware reponds
```json
{
  "topic":"settingVendingMachine",
  "type":"response",
  "content":{
    "idVending":string,
    "ipServerVending":string,
    "portServerVending":string,
    "versionVending":string,
    "totalSlotVending":int,
    "statusServer":boolean,
    "timeStartCooling":string,
    "timeStopCooling":string,
    "tempFromCoolingDay1":int,
    "tempToCoolingDay1":int,
    "tempFromCoolingDay2":int,
    "tempToCoolingDay2":int,
    "modeCooling":boolean,
    "modeTemp":boolean,
    "modeFan":boolean
  }
}
```
---
## 11. Android yêu cầu cài đặt chạy thử máy
***App gửi yêu cầu xuống Firmware chạy thử phần cứng máy***
>Android request
```json
{
  "topic":"settingTestMachine",
  "type":"request",
  "content":{
    "value":int
  }
}
```
Trong đó giá trị value như sau:
+ 0: Chạy thử đèn
+ 1: Chạy thử máy lạnh
+ 2: Chạy thử nhiệt
+ 3: Chạy thử quạt
+ 4: Chạy thử đèn QR code

***Firmware phản hồi lên App các thông số cần thay đổi***
>Firmware reponds
```json
{
  "topic":"settingTestMachine",
  "type":"response",
  "content":{"status":"ok"}
}
```
---
## 12. Android yêu cầu cài đặt chạy thử motor slot
***App gửi yêu cầu xuống Firmware chạy thử motor slot***
>Android request
```json
{
  "topic":"settingTestSlot",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên App chạy các vị trí motor của slot***
>Firmware reponds
```json
{
  "topic":"settingTestSlot",
  "type":"response",
  "content":{
    "slotStart":int,
    "slotStop":int
  }
}
```
---
## 13. Android yêu cầu cài đặt dừng chạy thử slots
***App gửi yêu cầu xuống Firmware dừng chạy thử motor slot***
>Android request
```json
{
  "topic":"settingStopTestSlot",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên App dừng chạy motor slot***
>Firmware reponds
```json
{
  "topic":"settingStopTestSlot",
  "type":"response",
  "content":{"status":"ok"}
}
```
---
## 14. Android yêu cầu cài đặt payment settings
***App gửi yêu cầu xuống Firmware chức năng thanh toán***
>Android request
```json
{
  "topic":"settingPayment",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên App thực hiện chức năng***
>Firmware reponds
```json
{
  "topic":"settingPayment",
  "type":"response",
  "content":{
    "statusPaymentOnline":boolean,
    "maximumCashAllows":int,
    "minimumCashAllows":int,
    "statusRefundmoney":boolean,
    "totalCashReceive":int,
    "maximumCashStacks":int
  }
}
```
---
## 15. Android yêu cầu cài đặt reset tiền
***App gửi yêu cầu xuống Firmware chức năng reset tiền***
>Android request
```json
{
  "topic":"settingStopTestSlot",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên App thực hiện chức năng reset tiền***
>Firmware reponds
```json
{
  "topic":"settingStopTestSlot",
  "type":"response",
  "content":{"status":"ok"}
}
```
---
## 16. Android yêu cầu cài đặt nạp tiền hoàn
***App gửi yêu cầu xuống Firmware chức năng nạp tiền vào ngăn thối***
>Android request
```json
{
  "topic":"settingDispenseStack",
  "type":"request",
  "content":{"status":"ok"}
}
```
***Firmware phản hồi lên App thực hiện chức năng nạp tiền vào ngăn thối***
>Firmware reponds
```json
{
  "topic":"settingDispenseStack",
  "type":"response",
  "content":{"status":"ok"}
}
```
---
## 17. Android yêu cầu cài đặt lấy tiền hoàn
***App gửi yêu cầu xuống Firmware chức năng lấy tiền ngăn thối***
>Android request
```json
{
  "topic":"settingDispenseReject",
  "type":"request",
  "content":{"value":int}
}
```
Trong đó giá trị value như sau:
+ 0: Lấy tiền ngăn thối
+ 1: Hủy lấy tiền ngăn thối

***Firmware phản hồi lên App thực hiện chức năng lấy tiền ngăn thối***
>Firmware reponds
```json
{
  "topic":"settingDispenseReject",
  "type":"response",
  "content":{"status":"ok"}
}
```
---
