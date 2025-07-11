# Campora

## Deskripsi Proyek

Campora adalah aplikasi web untuk booking dan eksplorasi destinasi alam Indonesia seperti curug dan gunung. Proyek ini menyediakan fitur booking online, kalender ketersediaan, testimoni, dan galeri foto, serta didukung oleh UI responsif berbasis Tailwind CSS dan Swiper.js.

## Fitur Utama

- **Booking Online:** Pengguna dapat memilih paket, tanggal, dan jumlah peserta, lalu melakukan booking via WhatsApp.
- **Filter Destinasi:** Filter destinasi berdasarkan kategori (Curug/Gunung) secara dinamis.
- **Kalender Ketersediaan:** Kalender interaktif dengan status slot (tersedia, terbatas, penuh) menggunakan FullCalendar.
- **Testimonial Carousel:** Carousel testimoni dinamis dengan Swiper.js.
- **Image Modal:** Galeri gambar dengan modal tampilan besar.
- **Autentikasi Sederhana:** Modal login/register (dummy, tanpa backend).
- **UI Responsif:** Desain mobile-first dengan Tailwind CSS.

## Struktur Kode

- `index.html` — Struktur utama halaman, termasuk section destinasi, kalender, testimoni, dan modals.
- `assets/js/` — Berisi modul JavaScript terpisah:
  - `utils.js` — Fungsi utilitas umum (class, scroll, dsb).
  - `swiper.js` — Inisialisasi Swiper untuk carousel destinasi & testimoni.
  - `destination-filter.js` — Filter destinasi berdasarkan kategori.
  - `booking-modal.js` — Logika modal booking dan integrasi WhatsApp.
  - `image-modal.js` — Modal gambar untuk galeri.
  - `testimonial-carousel.js` — Carousel testimoni (mobile).
  - `auth-manager.js` — Modal login/register dummy.
  - `main.js` — Inisialisasi aplikasi & event global.
  - `fullcalendar.js` — Kalender ketersediaan trip.
- `assets/css/` — Berisi style utama, testimonial, dan kalender.

## Cara Menjalankan

1. **Clone repo** dan buka folder di editor.
2. **Buka `index.html`** di browser modern.
3. Tidak perlu backend, semua berjalan client-side.

## Implementasi Kode

- **Swiper.js** digunakan untuk carousel destinasi & testimoni.
- **FullCalendar** untuk kalender booking.
- **Event Listener** pada tombol booking, filter, dan gambar.
- **Modularisasi**: Setiap fitur utama dipisah ke file JS sendiri untuk maintainability.
- **Integrasi WhatsApp**: Booking dikirim otomatis ke WhatsApp user.

## Kontribusi

Pull request dan issue sangat terbuka untuk pengembangan lebih lanjut.

## Lisensi

MIT License
