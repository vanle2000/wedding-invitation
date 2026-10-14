# Kết Đồng Tâm — Lê Tấn Phát & Dương Nguyệt Thảo

Thiệp cưới số dọc 4:5 với bìa đôi đỏ thẫm, dấu sáp vàng, giấy ngà bán trong suốt và khu vườn mẫu đơn nhiếp ảnh nhiều lớp.

React 19 · TypeScript · Vite · Tailwind CSS · Framer Motion

## Thông tin hôn lễ

- **Chú rể:** Lê Tấn Phát
- **Cô dâu:** Dương Nguyệt Thảo
- **Ngày:** Chủ Nhật, 14 tháng 02 năm 2027
- **Lễ thành hôn:** 09:00
- **Tiệc cưới:** 17:00
- **Địa điểm:** Goldland Plaza, 14–20 Lý Thường Kiệt, Thuận Hóa, Huế

Nội dung có thể thay đổi tại `src/content/wedding.ts`.

## Bìa mở thiệp

- Canvas dọc 4:5, giới hạn bởi `82vw`, `64svh` và 320px
- Hai cánh Crimson Maroon khép sát nhau tại tâm
- Cánh trái/phải xoay `rotateY(+105° / -105°)` quanh mép ngoài, không dịch chuyển ngang
- Dấu sáp vàng “Mở Thiệp Cưới” nằm đúng giao điểm
- Thiệp ngà phía trong chuyển từ `y: 10`, `scale: .96` lên `y: -8`, `scale: 1.025`
- Nền, cánh bìa và giấy thiệp đều có grain SVG nhẹ

## Hệ màu và chữ

- Canvas Champagne Cream `#F5F2EB`
- Cánh bìa Deep Crimson Maroon `#6B1D2F`
- Cardstock Soft Ivory `#FAF8F5`
- Chữ Espresso `#2C2523`
- Vàng `#C5A059 → #E5C158`; P&T foil `#D4AF37 → #FFF5C0 → #AA771C`
- **Noto Serif Display 300:** họ tên, tiêu đề, ngày tháng
- **Noto Serif:** nội dung dài
- **Great Vibes:** câu lãng mạn ngắn, line-height `1.35`
- **Be Vietnam Pro:** nhãn và chức năng

## Khu vườn mẫu đơn nhiếp ảnh

Trang thiệp chính có bốn mặt phẳng chiều sâu:

1. Ảnh vườn mẫu đơn phía sau, di chuyển với tỷ lệ `scrollY × 0.2`
2. Hai cụm PNG nền trong suốt nằm sau mép thiệp
3. Cardstock `rgba(250, 248, 245, 0.88)` với `backdrop-filter: blur(10px)`
4. Ba mảnh hoa/lá tiền cảnh dùng `blur(4px)` để tạo độ sâu ống kính

`BotanicalCorners` dùng cùng hai PNG mẫu đơn trên mọi phần thiệp với vị trí neo góc và `mix-blend-multiply`; không còn minh họa hoa phẳng hoặc phong cách thứ hai.

`FallingPetals` tạo đúng 10 cánh hoa CSS xác định sẵn. Chế độ giảm chuyển động sẽ ẩn toàn bộ lớp cánh hoa.

## Một Đóa Hoa Cuối

`PeonyBloomMoment` đặt ảnh nụ thật trong vòng vàng mềm. Khi chạm:

- Ảnh nụ mờ và phóng nhẹ
- Ảnh mẫu đơn nở chuyển vào
- 10 hạt bụi vàng bung ra theo quỹ đạo cố định
- Lời nhắn cuối mở mượt bên dưới
- Chế độ giảm chuyển động bỏ qua hiệu ứng hạt

## Hệ chữ tiếng Việt và chất lượng

Tệp font chính thức đã được kiểm tra glyph bằng `fontTools`; không thiếu dấu trong họ tên và giao diện. Độ tương phản chính: Espresso/Ivory 14.19:1, Crimson/Ivory 10.76:1, Gold Light/Crimson 6.57:1.

Họ tên Noto Serif Display đã được đo: “Dương Nguyệt Thảo” chiếm 248.7/264px ở màn hình 320px và 324/358px trên canvas desktop.

## Biểu tượng Kết Đồng Tâm

Biểu tượng là nét dây đỏ mượt, không có tên, chữ hoặc ký tự bên trong: hai dây đi vào, bốn vòng lớn, bốn vòng nhỏ, hai đường cong đan nhau, một điểm luồn trên–dưới, hai dây đi ra và hai dải tua. Đây là thiết kế đương đại dựa trên ngôn ngữ nút cát tường/đồng tâm, không phải bản chép sơ đồ cổ.

Tham khảo cấu trúc: [Good Luck Knot](https://chineseknotting.org/luck/) và [Chinese Good Luck Knot](https://commons.wikimedia.org/wiki/File:Chinese_Good_Luck_Knot.jpg).

## Ảnh CC0 và tài sản sản xuất

- `peony-garden.webp` — [Dense pink peonies](https://commons.wikimedia.org/wiki/File:Dense_pink_peonies_%28Unsplash%29.jpg), Mira Bozhko, CC0
- `peony-open-isolated.png` / `peony-open-photo.webp` / `peony-petal.png` — [Pink Peony Flower](https://commons.wikimedia.org/wiki/File:Pink_Peony_Flower.jpg), Nathanieljoyce, CC0
- `peony-blush-pair.png` — [Supple pink peonies](https://commons.wikimedia.org/wiki/File:Supple_pink_peonies_%28Unsplash%29.jpg), Kristine Weilert, CC0
- `peony-bud-photo.webp` — [Bouton de fleur de pivoine](https://commons.wikimedia.org/wiki/File:Bouton_de_fleur_de_pivoine.JPG), Dinkum, CC0

Các ảnh PNG được tách nền cục bộ và tối ưu bảng màu mà không giảm kích thước pixel. Tổng sáu tài sản khoảng 708KB.

## Cấu trúc

```text
src/
  App.tsx
  animations/variants.ts
  content/{wedding,rsvpDelivery}.ts
  art/
    BotanicalCorners.tsx
    FallingPetals.tsx
    GoldOrnament.tsx
    KetDongTamMark.tsx
    PaperGrain.tsx
    PeonyBloomMoment.tsx
    PeonyGardenBackdrop.tsx
  ui/{Reveal,SectionHeading}.tsx
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

RSVP hiện ở chế độ xem thử. Nhánh `main` triển khai tự động qua `.github/workflows/deploy.yml`.
