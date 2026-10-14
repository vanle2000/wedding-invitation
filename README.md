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

- **Great Vibes:** tên cô dâu, chú rể và câu trang trí ngắn
- **Noto Serif Display:** tiêu đề và ngày tháng
- **Noto Serif:** nội dung dài, lời mời và lời nhắn
- **Be Vietnam Pro:** nhãn, nút và biểu mẫu

Không dùng chữ viết tay cho đoạn văn hoặc chức năng tương tác.

## Biểu tượng Kết Đồng Tâm

`src/art/KetDongTamMark.tsx` là một thiết kế mới, không tự nhận là bản sao cổ:

- Hai vòng dây liên tục đối xứng, cùng đan vào một nút trung tâm
- Dấu `P•T` ở tâm
- Hai dải tua song hành phía dưới
- Ba cánh hoa phía trên
- Họ tên đầy đủ chạy theo cung trên
- Dòng chữ `KẾT ĐỒNG TÂM` chạy theo cung dưới
- Hai phiên bản: huy hiệu vàng trên nền đỏ và nét đỏ trên giấy ngà

Biểu tượng xuất hiện trên bìa gập và trang thiệp chính.

## Trải nghiệm

1. Bìa gập đỏ với hoa mẫu đơn, trà mi, dây lá và biểu tượng Kết Đồng Tâm.
2. Trang báo hỷ trên nền giấy ngà, hiển thị đầy đủ hai họ tên.
3. Thông tin ngày giờ trên nền đỏ.
4. Địa điểm Goldland Plaza và liên kết chỉ đường.
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
    GoldOrnament.tsx
    KetDongTamMark.tsx
    PaperGrain.tsx
    SpringBotanical.tsx
  ui/
    Reveal.tsx
    SectionHeading.tsx
  components/
    GatefoldCover.tsx
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

Hai bản tranh đã được tách khỏi nền giấy quét, làm sạch và tối ưu cục bộ.

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
