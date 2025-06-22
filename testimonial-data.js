// Data testimonial berdasarkan referensi gambar
const testimonialsData = [
    {
        id: 1,
        name: "Etan Adulta",
        location: "Instagram",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Pengalaman mendaki bareng Anak Alam bener-bener luar biasa! Guide-nya profesional dan sangat memperhatikan keselamatan. Pemandangan di puncak gunung bikin semua capek hilang seketika. Recommended banget!",
        trip: "Gunung Gede Pangrango",
        date: "2 minggu yang lalu"
    },
    {
        id: 2,
        name: "Riky Graya",
        location: "Instagram",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Trip ke curug bareng Anak Alam adalah pengalaman yang tak terlupakan. Air terjunnya jernih banget, suasananya tenang, dan tim guide-nya sangat ramah. Pasti bakal ikut trip lagi!",
        trip: "Curug Cilember",
        date: "1 bulan yang lalu"
    },
    {
        id: 3,
        name: "Zenjaro Al Legal",
        location: "Facebook",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Sebagai pemula dalam hiking, Anak Alam memberikan pengalaman yang sangat menyenangkan. Tim mereka sabar mengajari teknik dasar dan selalu memastikan semua peserta aman. Terima kasih!",
        trip: "Gunung Salak",
        date: "3 minggu yang lalu"
    },
    {
        id: 4,
        name: "Baby Family",
        location: "WhatsApp",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Trip keluarga ke alam terbuka jadi lebih seru dengan Anak Alam. Anak-anak senang banget bisa belajar tentang alam sambil bermain. Aktivitasnya cocok untuk semua umur!",
        trip: "Curug Bidadari",
        date: "2 minggu yang lalu"
    },
    {
        id: 5,
        name: "Sumter Angin",
        location: "Facebook",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Pendakian sunrise di gunung bersama Anak Alam benar-benar magical! Persiapannya matang, equipment lengkap, dan momen sunrise-nya spektakuler. Worth it banget!",
        trip: "Gunung Batur",
        date: "1 bulan yang lalu"
    },
    {
        id: 6,
        name: "Johny Evans",
        location: "Instagram",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Camping di alam terbuka bareng Anak Alam jadi pengalaman yang tak terlupakan. Suasana malam di tengah hutan, api unggun, dan cerita-cerita seru bikin betah!",
        trip: "Camping Ranca Upas",
        date: "3 minggu yang lalu"
    },
    {
        id: 7,
        name: "Mini Pero",
        location: "Facebook",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Rafting bareng Anak Alam seru banget! Adrenalin terpacu tapi tetap aman karena guide-nya berpengalaman. Recommended untuk yang suka tantangan!",
        trip: "Rafting Sungai Citarik",
        date: "2 minggu yang lalu"
    },
    {
        id: 8,
        name: "Salman",
        location: "WhatsApp",
        avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Photography tour dengan Anak Alam memberikan spot-spot foto yang amazing. Guide-nya juga bisa kasih tips fotografi yang bagus. Hasilnya memuaskan!",
        trip: "Photo Tour Kawah Putih",
        date: "1 bulan yang lalu"
    },
    {
        id: 9,
        name: "Antony",
        location: "Instagram",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        text: "Team building company kami jadi lebih seru dengan outdoor activity dari Anak Alam. Karyawan jadi lebih kompak dan semangat kerja meningkat!",
        trip: "Team Building Outbound",
        date: "2 minggu yang lalu"
    }
];

// Export data untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = testimonialsData;
}