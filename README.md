# 📲 Hệ thống kích hoạt phần mềm qua mã QR (chỉ dành cho iPhone)

Hệ thống này cho phép người dùng iPhone quét mã QR để kích hoạt bản quyền phần mềm một cách tự động, an toàn và tiện lợi.  
Nó bao gồm giao diện terminal mô phỏng, kiểm tra thiết bị, hiển thị thông tin người dùng, thực hiện gọi API kích hoạt và bảo vệ chống DevTools.

## 🚀 Tính năng chính

- ✅ Chỉ cho phép kích hoạt từ thiết bị **iPhone**
- 🎨 Giao diện terminal gọn gàng, chuyên nghiệp
- 🖥️ Hiển thị thông tin thiết bị (IP, trình duyệt, OS)
- 🔐 Ngăn chặn mở DevTools (F12, Ctrl+Shift+I, v.v.)
- 🔧 Gọi API `/activate` để thực hiện kích hoạt phần mềm
- 🔗 Liên kết đến Facebook, GitHub, Zalo của lập trình viên

---

## 📂 Cấu trúc thư mục



---

## ⚙️ Cài đặt

### 1. Yêu cầu

- Node.js >= 14
- Trình duyệt Safari hoặc Chrome trên iPhone

### 2. Cài đặt server

```bash
git clone https://github.com/yourname/your-repo.git
cd your-repo
npm install
node server.js
------------------------------------------------------
📱 Hướng dẫn sử dụng
Tạo mã QR trỏ đến dạng URL:

arduino
Copy
Edit
http://yourdomain.com/active.html?key=YOUR_ACTIVATION_KEY
Người dùng iPhone quét mã QR và mở liên kết.

Trang active.html sẽ:

Kiểm tra thiết bị có phải iPhone.

Hiển thị thông tin thiết bị (trình duyệt, IP, OS).

Gửi yêu cầu kích hoạt đến server.

Hiển thị kết quả theo dạng log terminal.

🔒 Bảo mật
❌ Chặn phím F12, Ctrl+Shift+I, Ctrl+U...

⛔ Phát hiện debugger mở và chuyển hướng về about:blank

📱 Chỉ chấp nhận thiết bị iPhone (iOS)

👨‍💻 Liên hệ nhà phát triển
🌐 Facebook: dev4matlab

💻 GitHub: quangpec

📱 Zalo: 0963559840

📄 Bản quyền
© 2025 | Hệ thống thuộc quyền sở hữu của nhà phát triển.
Nghiêm cấm sao chép, phân phối, hoặc chỉnh sửa nếu không có sự cho phép.
