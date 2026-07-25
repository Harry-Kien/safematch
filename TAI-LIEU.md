# SafeMatch — Tài liệu mô tả

**Bản:** v1.0 · 26/07/2026
**Địa chỉ:** https://safematch-vn.vercel.app
**Mã nguồn:** https://github.com/Harry-Kien/safematch

> **Đây là đồ án học thuật, không phải một dịch vụ thật.** SafeMatch không liên
> kết với và không được bảo trợ bởi bất kỳ cơ quan nhà nước nào của Việt Nam.
> Website không xử lý giấy tờ tùy thân thật. Mọi họ tên, số căn cước, số hiệu vụ
> việc và số liệu trong phần demo đều là dữ liệu giả để minh họa.

---

## 1. Mục đích

### 1.1. Vấn đề

Các ứng dụng hẹn hò đang hoạt động tại Việt Nam có thể xác nhận rằng *một tài
khoản tồn tại*, nhưng không thể xác nhận rằng *một con người tồn tại* phía sau
tài khoản đó. Kẻ lừa đảo chỉ cần một tấm ảnh lấy trộm và một địa chỉ email là
tạo được hồ sơ.

Hệ quả là ba khoảng trống:

| Khoảng trống | Mô tả |
|---|---|
| **Không có danh tính** | Không có bước xác minh nào khi đăng ký, nên không truy được ai là ai |
| **Không có cảnh báo** | Nạn nhân chỉ nhận ra khi tiền đã chuyển đi; ứng dụng không nói gì trong lúc trò chuyện |
| **Không có đường báo cáo** | Nạn nhân phải kể lại câu chuyện ở ba nơi — ứng dụng, ngân hàng, công an — mỗi nơi một biểu mẫu |

### 1.2. Đề xuất

SafeMatch là một **lớp an toàn** gắn thêm vào ứng dụng hẹn hò sẵn có, không thay
thế ứng dụng đó. Nó giải quyết ba khoảng trống trên bằng bốn biện pháp kiểm soát,
đồng thời tự đặt ra giới hạn để không biến thành công cụ giám sát.

### 1.3. Đối tượng của website

Website này **không phải là sản phẩm** — nó là bản trình bày đề xuất. Nó nhắm tới
ba nhóm người xem:

- **Người chấm / hội đồng** — cần hiểu ý tưởng trong 3 phút
- **Người vận hành nền tảng** — cần biết lớp này gắn vào đâu, lấy dữ liệu gì
- **Người dùng cuối** — cần thấy quy trình thực tế trông như thế nào

---

## 2. Bốn biện pháp kiểm soát

Mã được đặt theo **thời điểm chạy**, không phải theo thứ tự quan trọng.

### A.1 — Đọc căn cước công dân *(lúc đăng ký)*

Người dùng chụp hai mặt thẻ căn cước, sau đó áp thẻ vào lưng điện thoại để đọc
chip qua NFC. Nếu máy không hỗ trợ NFC thì đọc mã QR in trên thẻ. Hệ thống đối
chiếu với cơ quan cấp thẻ để trả lời ba câu: thẻ có thật không, còn hạn không,
đã bị báo mất chưa.

> **Ràng buộc kỹ thuật:** Chỉ dữ liệu đọc từ chip mới có giá trị pháp lý. Ảnh
> chụp không thôi bị coi là *chưa xác minh* và chuyển sang duyệt thủ công.

### A.2 — Khớp khuôn mặt và nhận diện sự sống *(lúc đăng ký)*

Ảnh selfie được so với **ảnh chân dung lưu trong chip**, không phải ảnh do người
dùng tự tải lên. Ba thử thách ngẫu nhiên — nháy mắt, quay đầu chậm, đọc to một
dãy số — chứng minh có người thật đang ngồi trước camera, không phải ảnh in, video
quay sẵn, hay luồng video giả do AI tạo.

> **Ràng buộc kỹ thuật:** Ngưỡng khớp 0.82. Thử thách được chọn ngay tại thời
> điểm quay nên không thể chuẩn bị clip trước.

### B.1 — Phát hiện lừa đảo chạy ngầm *(trong lúc nhắn tin)*

Một mô hình nhỏ chạy **ngay trên máy điện thoại**, chấm điểm cuộc trò chuyện dựa
trên các mẫu lừa đảo đã biết:

- Rủ chuyển sang nền tảng khác (Telegram, Zalo…)
- Link đầu tư, tiền mã hóa, sàn giao dịch
- Đòi chuyển tiền gấp kèm deadline giả
- Ảnh đại diện trùng với nhiều tài khoản khác

Người dùng được cảnh báo **trước khi tiền chuyển đi**, không phải sau.

> **Ràng buộc kỹ thuật:** Suy luận diễn ra cục bộ. Chỉ *mã tín hiệu* rời khỏi
> máy — không bao giờ là nội dung tin nhắn, và chỉ khi người dùng chủ động báo cáo.

### C.1 — Chuyển hồ sơ lên cơ quan an ninh mạng *(sau khi đã xảy ra thiệt hại)*

Một thao tác duy nhất tạo hồ sơ vụ việc gửi tới đơn vị an ninh mạng. Hồ sơ đến
nơi đã kèm sẵn tin nhắn bị gắn cờ, tình trạng xác minh của đối phương, và thông
tin tài khoản nhận tiền — điều tra viên không phải bắt đầu từ tờ giấy trắng.
Nạn nhân nhận số hiệu vụ việc và theo dõi được tiến độ.

> **Ràng buộc kỹ thuật:** Bằng chứng chỉ được gửi đi khi người dùng bấm nút.
> Không có kênh nào tự động chuyển tiếp.

---

## 3. Quy trình người dùng

| Bước | Ai làm | Thời gian | Nội dung |
|---|---|---|---|
| 01 | Người dùng | ~25 giây | Chụp mặt trước, mặt sau, áp thẻ đọc chip. Xem lại dữ liệu trước khi gửi |
| 02 | Người dùng | ~30 giây | Chụp selfie, chạy 3 thử thách sự sống, so với ảnh trong chip |
| 03 | Nền tảng | tức thì | Hồ sơ hiện huy hiệu đã xác minh — **huy hiệu, không phải số căn cước** |
| 04 | Thiết bị | liên tục | Nếu cuộc trò chuyện khớp mẫu lừa đảo, ứng dụng cảnh báo ngay trong khung chat |
| 05 | Người dùng → Cơ quan | 1 thao tác | Biểu mẫu điền sẵn, người dùng chọn nội dung gửi, nhận số hiệu vụ việc |

Ba bước đầu chỉ làm **một lần** và mất dưới 90 giây. Hai bước cuối chỉ dùng đến
khi có chuyện — đúng lúc người ta ít kiên nhẫn với thủ tục nhất.

---

## 4. Kiến trúc — dữ liệu nằm ở đâu

Câu hỏi thiết kế không phải "hệ thống thu thập được gì" mà là "hệ thống có thể
được xây để **không bao giờ nắm giữ** cái gì".

### Vùng 1 — Điện thoại

| Thành phần | Vai trò |
|---|---|
| Ứng dụng hẹn hò | Ứng dụng gốc, giao diện không đổi |
| SafeMatch SDK | Chụp ảnh, đọc chip, chạy thử thách |
| **Bộ máy rủi ro** | Mô hình cục bộ — nội dung tin nhắn không bao giờ rời máy |

→ *Rời khỏi vùng này:* chứng thực căn cước đã ký, điểm khớp mặt, mã tín hiệu

### Vùng 2 — Dịch vụ xác minh

| Thành phần | Vai trò |
|---|---|
| Kiểm tra giấy tờ | Thẻ có thật, còn hạn, chưa bị báo mất |
| Cấp huy hiệu | Cấp *huy hiệu xác minh*, không cấp danh tính |
| Tác vụ xóa dữ liệu | Hủy mẫu sinh trắc học ngay sau khi khớp xong |

→ *Rời khỏi vùng này:* chỉ tình trạng huy hiệu — đúng/sai, kèm ngày hết hạn

### Vùng 3 — Bảng điều khiển cơ quan

| Thành phần | Vai trò |
|---|---|
| Tiếp nhận vụ việc | Chỉ mở khi có báo cáo do người dùng gửi |
| Không gian điều tra viên | Gói bằng chứng, dấu vết chuyển tiền, vụ việc liên quan |
| Kênh trạng thái | Ghi tiến độ ngược về cho người báo cáo |

→ *Quy tắc truy cập:* mọi lần mở hồ sơ đều được ghi log và truy được ai mở

---

## 5. Sáu ràng buộc bảo vệ quyền riêng tư

Một hệ thống đọc căn cước và quan sát hội thoại **bắt buộc** phải nói rõ nó sẽ
không làm gì. Sáu điều dưới đây được viết dưới dạng yêu cầu kỹ thuật kiểm chứng
được, không phải lời hứa.

| Điều | Nội dung |
|---|---|
| **§1** | Phân tích diễn ra trên thiết bị. Tắt mạng, bộ máy rủi ro vẫn chạy |
| **§2** | Huy hiệu tiết lộ *tình trạng*, không tiết lộ *danh tính*. Người khác không thấy số căn cước, ngày sinh, địa chỉ |
| **§3** | Sinh trắc học đối khớp xong là xóa. Không giữ lại để xây cơ sở dữ liệu khuôn mặt |
| **§4** | Bằng chứng chỉ di chuyển khi người dùng ra lệnh. Không có kênh ngầm từ app tới cơ quan |
| **§5** | Cờ đỏ là *cảnh báo*, không phải *phán quyết*. Điểm rủi ro không tự khóa được tài khoản; người bị tố có quyền xem và phản bác |
| **§6** | Mọi lượt truy cập đều có log chỉ-ghi-thêm. Bên giám sát độc lập hỏi được: ai mở, lúc nào, thuộc vụ nào |

---

## 6. Cấu trúc website

### 6.1. Hai trang

**`index.html` — Trang trình bày đề xuất**

| Mục | Nội dung |
|---|---|
| Hero | Luận điểm chính + thẻ xác minh mẫu |
| Section 01 | Bối cảnh vấn đề, kèm khối số liệu |
| Section 02 | Bốn biện pháp kiểm soát A.1 / A.2 / B.1 / C.1 |
| Section 03 | Quy trình 5 bước người dùng |
| Section 04 | Sơ đồ kiến trúc 3 vùng dữ liệu |
| Section 05 | Sáu ràng buộc §1–§6 |
| Section 06 | Hỏi đáp — 5 câu phản biện khó |

**`demo.html` — Nguyên mẫu bấm được, 6 bước**

| Bước | Người xem thấy gì |
|---|---|
| 01 | Khung camera quét thẻ, dữ liệu 6 trường hiện dần, có dòng MRZ |
| 02 | Khung oval khớp mặt, điểm 0.94 so với ngưỡng 0.82 |
| 03 | Ba thử thách sự sống chạy lần lượt |
| 04 | Thẻ xác minh được cấp, có con dấu và bảng "ai thấy được gì" |
| 05 | **Bảng giám sát AI** — hội thoại lừa đảo chạy dần, điểm rủi ro 12 → 90, 4 cờ đỏ |
| 06 | Biểu mẫu báo cáo điền sẵn → số hiệu vụ việc + tiến trình xử lý |

### 6.2. Tập tin mã nguồn

| Tập tin | Vai trò |
|---|---|
| `index.html` | Trang trình bày đề xuất |
| `demo.html` | Nguyên mẫu 6 bước |
| `404.html` | Trang báo lỗi khi gõ sai địa chỉ |
| `style.css` | Toàn bộ giao diện, dùng chung cho cả ba trang |
| `script.js` | Menu di động, đóng/mở hỏi đáp, hiệu ứng hiện dần khi cuộn |
| `demo.js` | Máy trạng thái 6 bước, kịch bản hội thoại, tính điểm rủi ro |
| `logo.png` | Logo và favicon |
| `og.png` | Ảnh xem trước khi chia sẻ link |

Không có bước build, không có thư viện phụ thuộc. Mở thẳng `index.html` bằng
trình duyệt là chạy.

### 6.3. Cách demo hoạt động về mặt kỹ thuật

Toàn bộ demo là **mô phỏng bằng JavaScript thuần**:

- Không truy cập camera thật, không đọc NFC thật, không chạy mô hình AI thật
- Thời gian chờ được hẹn giờ bằng `setTimeout` để mô phỏng độ trễ thực tế
- Kịch bản hội thoại và các mốc điểm rủi ro được viết cứng trong `demo.js`
- Trạng thái 6 bước quản lý bằng một máy trạng thái đơn giản; bấm vào thanh
  tiến trình bên trái quay lại được bước đã qua

---

## 7. Ngôn ngữ thiết kế

Chủ đích: trông như **giấy tờ hành chính**, không trông như trang landing page
công nghệ.

| Yếu tố | Lựa chọn | Lý do |
|---|---|---|
| Nền | `#EEF1F4` — trắng ngả xanh lạnh | Màu giấy công văn, không phải kem/be |
| Mực | `#0E2440` navy đậm | Nghiêm túc, dễ đọc |
| Nhấn | `#C8102E` đỏ | Chỉ dùng cho con dấu, gạch tiêu đề, cảnh báo |
| Tiêu đề | Source Serif 4 | Chữ có chân, tạo cảm giác văn bản chính thức |
| Nội dung | IBM Plex Sans | Trung tính, gốc từ hệ thống doanh nghiệp |
| Mã số | IBM Plex Mono | Số hiệu, nhãn trường, dấu thời gian, dòng MRZ |
| Đường kẻ | 1px mảnh | Thay cho đổ bóng |
| Bo góc | 3px | Thay cho bo tròn 20px |

**Điểm nhấn ghi nhớ:** tấm *thẻ xác minh* — có hoa văn bảo an mờ như giấy tờ
tùy thân, con dấu đỏ xoay nghiêng, và dải MRZ ở đáy như hộ chiếu. Dãy MRZ khớp
đúng với dữ liệu hiển thị: `9803144` là ngày sinh 14/03/1998, `2707250` là hạn
25/07/2027.

---

## 8. Chất lượng kỹ thuật đã kiểm chứng

| Hạng mục | Kết quả |
|---|---|
| Lỗi JavaScript | 0 trên cả ba trang, chạy hết luồng 6 bước |
| Tương phản màu WCAG AA | 0 lỗi (đo bằng cách hoà trộn đúng các lớp nền trong suốt) |
| Cấu trúc tiêu đề | Mỗi trang đúng 1 thẻ `h1` |
| Bàn phím | Có link bỏ qua, viền focus rõ, tiêu điểm chuyển đúng khi sang bước mới |
| Trình đọc màn hình | 9 vùng `aria-live` trong demo; cảnh báo lừa đảo dùng `role="alert"` |
| Màn hình | Không tràn ngang ở 390 / 768 / 1024 / 1280 / 1440px |
| `prefers-reduced-motion` | Rút ngắn mọi hoạt ảnh |
| In / xuất PDF | Có stylesheet riêng, hiện đủ nội dung và cả 6 bước demo |
| Chia sẻ link | Có thẻ Open Graph và ảnh xem trước 1200×630 |

---

## 9. Vận hành

### Chạy trên máy

```bash
# Cách 1 — mở thẳng
Nhấp đúp vào index.html

# Cách 2 — chạy qua server
python -m http.server 8080
# rồi mở http://127.0.0.1:8080
```

### Cập nhật bản đang chạy

Repo GitHub đã nối với Vercel. Mỗi lần đẩy code là tự động triển khai lại:

```bash
git add -A
git commit -m "Mô tả thay đổi"
git push
```

---

## 10. Việc còn lại

| Việc | Trạng thái |
|---|---|
| **Thay số liệu minh họa** | ⚠️ Hai con số ở Section 01 đang ghi *illustrative*. Cần thay bằng số có nguồn (Bộ Công an, VNCERT/CC, hoặc nghiên cứu đã công bố) trước khi dùng làm luận cứ |
| Logo | Logo hiện màu xanh ngọc, lệch với bảng màu navy–đỏ. Dùng được nhưng chưa đồng bộ |
| Tên miền | `safematch.vercel.app` đã bị tài khoản khác chiếm. Đang dùng `safematch-vn.vercel.app` |

---

## 11. Câu hỏi hay bị hỏi khi bảo vệ

**Deepfake có qua được nhận diện sự sống không?**
Không đáng tin cậy — và đó là câu trả lời trung thực. Không hệ thống nhận diện
sự sống nào an toàn vĩnh viễn trước video do AI tạo. Thiết kế giả định kẻ tấn
công sẽ giỏi lên: thử thách chọn ngẫu nhiên tại thời điểm quay nên không chuẩn
bị clip trước được; kết quả gắn với ảnh trong chip chứ không phải ảnh tự tải lên;
huy hiệu hết hạn sau 12 tháng nên phải xác minh lại theo công nghệ phát hiện của
thời điểm đó.

**Không xác minh thì sao?**
Vẫn dùng ứng dụng bình thường, chỉ là không có huy hiệu. Người khác có thể chọn
lọc chỉ xem hồ sơ đã xác minh. Đây là *tín hiệu để người dùng tự quyết*, không
phải rào chắn nhà nước dựng trước một dịch vụ tiêu dùng.

**SafeMatch có đọc tin nhắn của tôi không?**
Mô hình chấm điểm chạy trên máy bạn, nội dung nằm lại đó. Thứ có thể rời khỏi
máy là các *mã tín hiệu* — ví dụ "yêu cầu chuyển kênh" — và chỉ khi bạn bấm báo
cáo. Không ai ở nền tảng hay cơ quan mở được lịch sử chat của bạn chỉ vì bạn bị
gắn cờ.

**Đây có phải sản phẩm của nhà nước không?**
Không. Đây là đề xuất khung và nguyên mẫu của sinh viên, không liên kết với, không
được bảo trợ bởi, và không do Bộ Công an hay bất kỳ cơ quan nào vận hành.
