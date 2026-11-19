# Website giới thiệu Smart Parking

Trang web tiếng Việt giới thiệu cách Smart Parking kiểm tra xe vào/ra, quản lý thẻ và vé tháng, lưu lịch sử và sao lưu dữ liệu. Website dùng HTML, CSS và JavaScript, chạy trực tiếp trong trình duyệt.

## Xem trên máy

Mở `public/index.html` trong trình duyệt. Chọn **Xe vào** hoặc **Xe ra** để đọc quy trình tương ứng. Mục **Hệ thống** có sơ đồ tương tác, mục **Hỏi đáp** có tìm kiếm tiếng Việt có dấu hoặc không dấu, và mục **GitHub** dẫn tới mã nguồn ứng dụng cùng trang Issues.

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
4. Mở đường dẫn Vercel cấp, kiểm tra ảnh, các tab quy trình và sơ đồ, ô tìm câu hỏi và liên kết GitHub.

Tham chiếu [cấu hình build và thư mục gốc của Vercel](https://vercel.com/docs/builds/configure-a-build).

## Cập nhật nội dung

- `public/index.html` chứa nội dung giới thiệu và câu hỏi thường gặp.
- `public/styles.css` chứa bố cục, màu sắc, hiệu ứng và quy tắc cho màn hình nhỏ.
- `public/site.js` xử lý menu, các tab quy trình và sơ đồ, tìm câu hỏi, sao chép liên kết GitHub và hiệu ứng khi cuộn.
- `public/assets/` chứa ảnh minh họa cổng bãi xe và thao tác quẹt thẻ được tạo bằng ImageGen.

Nội dung được tổng hợp từ mã nguồn và tài liệu của ứng dụng máy trực Smart Parking cùng dịch vụ SmartParking.Maintenance. Phần website công khai gồm các tệp trong `public/`. Việc vận hành bãi xe sử dụng ứng dụng Windows và hạ tầng nội bộ riêng.
