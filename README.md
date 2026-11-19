# Website giới thiệu Smart Parking

Trang web tiếng Việt giới thiệu quy trình gửi xe, tính năng, các bộ phận trong hệ thống và bản mô phỏng làn vào/làn ra. Website dùng HTML, CSS và JavaScript, chạy trực tiếp trong trình duyệt với dữ liệu giả lập.

## Xem trên máy

Mở `public/index.html` trong trình duyệt. Ảnh, giao diện và bản mô phỏng nằm trong `public/`.

## Đưa riêng website lên GitHub

Tạo một repository trống trên GitHub, chẳng hạn `smart-parking-website`. Sao chép `.gitignore`, `README.md`, `vercel.json` và toàn bộ thư mục `public/` vào một thư mục mới **bên ngoài** kho Smart Parking. Mở PowerShell tại thư mục mới và chạy:

```powershell
git init -b main
git add -- .gitignore README.md vercel.json public/
git status --short
git commit -m "Add Smart Parking website"
$websiteRepoUrl = Read-Host 'Dán URL repository GitHub'
git remote add origin $websiteRepoUrl
git push -u origin main
```

Dán URL HTTPS hoặc SSH của repository vừa tạo khi PowerShell hỏi. Sau khi đẩy lên, kiểm tra `vercel.json` và `public/` nằm ngay ở thư mục gốc trên GitHub. [Hướng dẫn đưa mã nguồn có sẵn lên GitHub](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github?platform=windows)

Nếu muốn dùng kho Smart Parking hiện có, chạy `git add -- website/` ở thư mục gốc của kho và kiểm tra danh sách tệp đã stage trước khi commit.

## Deploy lên Vercel

1. Mở [Vercel New Project](https://vercel.com/new), chọn kho GitHub chứa website rồi bấm **Import**.
2. Với kho riêng chứa trực tiếp `vercel.json` và `public/`, giữ **Root Directory** mặc định. Với kho Smart Parking, đặt **Root Directory** thành `website`.
3. Bấm **Deploy**. Vercel phục vụ các tệp trong `public/` theo cấu hình đi kèm. Website chạy trực tiếp, không cần lệnh build hoặc biến môi trường.
4. Mở đường dẫn Vercel cấp và thử nút **Thử mô phỏng** ở cả làn vào và làn ra.

Tham chiếu [cấu hình build và thư mục gốc của Vercel](https://vercel.com/docs/builds/configure-a-build).

## Cập nhật nội dung

- `public/index.html` chứa nội dung giới thiệu và câu hỏi thường gặp.
- `public/styles.css` chứa bố cục và màu sắc.
- `public/demo.js` chứa các bước của hai kịch bản giả lập.
- `public/assets/cong-bai-xe.jpg` là ảnh minh họa cổng bãi xe, được tạo bằng ImageGen.

Nội dung được tổng hợp từ mã nguồn và tài liệu của ứng dụng máy trực Smart Parking cùng dịch vụ SmartParking.Maintenance. Phần website công khai gồm các tệp trong `public/`. Việc vận hành bãi xe sử dụng ứng dụng Windows và hạ tầng nội bộ riêng.
