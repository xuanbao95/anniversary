# Không tự phát nhạc nền

Request dùng lại khi nhạc nền tự kêu lúc mở Cursor hoặc lúc tải trang.

## Yêu cầu

Nhạc nền không được tự phát. Chỉ phát khi bấm nút **PHÁT NHẠC**.

Không tự phát trong các trường hợp sau:

- Mở Cursor khi tab trang vẫn còn.
- Tải lại trang.
- Cuộn, bấm hoặc gõ phím ở chỗ khác trên trang.
- Tab bị ẩn rồi hiện lại.

## Cách làm

Sửa `components/audio-player.tsx`.

- Bỏ gọi phát ngay khi component gắn vào trang.
- Bỏ listener `pointerdown`, `keydown`, `scroll`.
- Bỏ phần phát lại khi `visibilitychange`.
- Giữ nút **PHÁT NHẠC** / **TẠM DỪNG**.
- Đặt `preload="none"` để trình duyệt không kéo file nhạc trước khi bấm.

File nhạc là `/audio/our-story-demo.mp3`. Nút nằm trên đầu trang, trong `components/anniversary-wheel-page.tsx`.

## Không đụng

Tiếng video chapter 3 vẫn tự bật khi khung video xuất hiện. Nút **TẮT TIẾNG** ở góc trên phải khung video, trong `components/story/memory-film-three.tsx`.
