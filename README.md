# Kết Đồng Tâm — Lê Tấn Phát & Dương Nguyệt Thảo

Thiệp cưới số dành cho màn hình di động, sử dụng sắc đỏ trầm vừa phải, giấy ngà, ánh vàng cổ, hoa mẫu đơn, trà mi đỏ và ngôn ngữ tiếng Việt xuyên suốt.

React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion

## Thông tin hôn lễ

- **Chú rể:** Lê Tấn Phát
- **Cô dâu:** Dương Nguyệt Thảo
- **Ngày:** Chủ Nhật, 14 tháng 02 năm 2027
- **Lễ thành hôn:** 09:00
- **Tiệc cưới:** 17:00
- **Địa điểm:** Goldland Plaza, 14–20 Lý Thường Kiệt, Thuận Hóa, Huế

Toàn bộ nội dung có thể thay đổi tại `src/content/wedding.ts`.

## Hệ chữ tiếng Việt

Các tệp phông thực tế đã được kiểm tra bằng `fontTools` với đầy đủ dấu trong tên và giao diện:

- **Great Vibes:** câu trang trí ngắn, với khoảng dòng riêng để dấu tiếng Việt không chạm nét lượn
- **Noto Serif Display:** họ tên đầy đủ, tiêu đề và ngày tháng ở độ đậm 300
- **Noto Serif:** nội dung dài, lời mời và lời nhắn
- **Be Vietnam Pro:** nhãn, nút và biểu mẫu

Không dùng chữ viết tay cho đoạn văn hoặc chức năng tương tác.

## Hệ màu và vật liệu

- Nền canvas Champagne Cream `#F5F2EB`
- Hai cánh bìa Crimson Maroon `#6B1D2F`
- Giấy thiệp Soft Ivory `#FAF8F5`
- Chữ chính Espresso `#2C2523`
- Vàng kim `#C5A059` đến `#E5C158`; chữ `P` và `T` dùng gradient `#D4AF37 → #FFF5C0 → #AA771C`
- Nền, giấy thiệp và hai cánh bìa đều phủ grain SVG nhẹ

## Kiểm định thiết kế

- Nhãn chức năng dùng Be Vietnam Pro 10px/500; nhãn nghi lễ dùng Noto Serif Display 10px/300, tracking `0.15em`
- Espresso trên giấy ngà đạt 14.19:1; crimson trên giấy ngà 10.76:1; vàng nhạt trên crimson 6.57:1
- Họ tên dùng Noto Serif Display 300: tên dài nhất chiếm 248.7/264px ở màn hình 320px và 324/358px trên canvas desktop; trên bìa là 158.2/205px
- Biểu tượng không chứa chữ, tên hoặc ký tự; họ tên đầy đủ xuất hiện riêng ở cấp thị giác chính
- Canvas mở đầu và tranh địa điểm đều dùng tỷ lệ dọc 4:5; không có khung ngang
- Hai cánh bìa xoay `rotateY` quanh mép ngoài nhưng luôn nằm trong canvas dọc, không dịch chuyển ngang
- Nền champagne, hai cánh đỏ thẫm, giấy ngà mềm và viền vàng theo cùng một hệ vật liệu
- Chỉ sử dụng một phong cách thực vật: hai bản tranh lưu trữ hoa mẫu đơn và trà mi, đặt ở các góc khung bằng `mix-blend-multiply`

## Biểu tượng Kết Đồng Tâm

`src/art/KetDongTamMark.tsx` là một thiết kế mới dựa trên ngôn ngữ tạo hình của nhóm nút cát tường/đồng tâm, không phải bản chép hay sơ đồ thắt dây lịch sử:

- Hai sợi dây đi vào từ phía trên
- Bốn vòng lớn và bốn vòng nhỏ tạo nhịp đối xứng rõ ràng
- Hai đường cong chữ S đan nhau ở tâm, chỉ dùng một điểm ngắt để thể hiện luồn trên – dưới
- Một vòng hồi phía dưới, hai sợi dây đi ra và hai dải tua song hành
- Không có tên, chữ hoặc ký tự bên trong biểu tượng
- Một nét dây đỏ mượt, viền ép chìm nhẹ và ánh vàng mảnh
- Hai phiên bản: huy hiệu trên giấy ngà và nét biểu tượng trên nền thiệp

Cấu trúc được nghiên cứu từ đặc điểm nút trang trí một sợi dây, đối xứng hai lớp và hai đầu dây vào/ra; tỷ lệ vòng tai tham khảo nhóm [Good Luck Knot](https://chineseknotting.org/luck/) và ảnh [Chinese Good Luck Knot](https://commons.wikimedia.org/wiki/File:Chinese_Good_Luck_Knot.jpg). Hình SVG trong dự án được vẽ mới hoàn toàn.

Biểu tượng xuất hiện trên bìa gập và trang thiệp chính.

## Trải nghiệm

1. Bìa dọc 4:5 gồm hai cánh đỏ khép sát tại tâm; dấu sáp vàng “Mở Thiệp Cưới” nằm đúng giao điểm và hai cánh xoay 3D ra ngoài để lộ thiệp ngà cùng tỷ lệ.
2. Trang báo hỷ trên nền giấy ngà, hiển thị đầy đủ hai họ tên.
3. Thông tin ngày giờ trên nền đỏ.
4. Địa điểm Goldland Plaza, bản đồ tương tác dọc 4:5 và liên kết chỉ đường.
5. Lịch trình ngày vui trên nền xanh xô thơm nhạt.
6. Biểu mẫu phản hồi gồm xác nhận tham dự, họ tên và số khách.
7. Chạm vào hoa mẫu đơn để mở lời nhắn cuối.

## Cấu trúc

```text
src/
  App.tsx
  animations/variants.ts
  content/
    wedding.ts
    rsvpDelivery.ts
  art/
    BotanicalArt.tsx
    BotanicalCorners.tsx
    GoldOrnament.tsx
    KetDongTamMark.tsx
    PaperGrain.tsx
  ui/
    Reveal.tsx
    SectionHeading.tsx
  components/
    PortraitCover.tsx
    InvitationCanvas.tsx
    Invitation.tsx
    Details.tsx
    Venue.tsx
    Timeline.tsx
    Rsvp.tsx
    Closing.tsx
```

## Tranh thực vật

- `peony-antique.webp` — [Jacques Le Moyne de Morgues, *Peony*](https://commons.wikimedia.org/wiki/File:Jacques_Le_Moyne_de_Morgues._Peony.jpg), phạm vi công cộng.
- `camellia-red.webp` — [Kawahara Keiga, *Camellia japonica*](https://commons.wikimedia.org/wiki/File:Camellia_japonica_%E3%83%84%E3%83%90%E3%82%AD.jpg), phạm vi công cộng.

Hai bản tranh đã được tách khỏi nền giấy quét, làm sạch và tối ưu cục bộ. Đây là hai tài sản thực vật duy nhất trong giao diện; cùng một `BotanicalCorners` neo chúng vào mép khung với chế độ hòa trộn `multiply`, không có nét vẽ hoa thứ hai.

## Phản hồi tham dự

Bản hiện tại đang ở chế độ xem thử. Trước khi gửi thiệp, đổi `wedding.rsvp.delivery` thành email, số điện thoại hoặc địa chỉ nhận dữ liệu thật.

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

Nhánh `main` được triển khai tự động qua `.github/workflows/deploy.yml`.
