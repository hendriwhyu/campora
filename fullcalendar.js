document.addEventListener('DOMContentLoaded', function() {
    // Data ketersediaan untuk September 2025
    // 0: tidak tersedia (bulan lain), 1: tersedia (hijau), 2: terbatas (kuning), 3: penuh (merah)
    const availabilityData = {
        '2025-08-24': 0, '2025-08-25': 0, '2025-08-26': 0, '2025-08-27': 0, '2025-08-28': 0, '2025-08-29': 0, '2025-08-30': 0, '2025-08-31': 0,
        '2025-09-01': 0, '2025-09-02': 0,
        '2025-09-03': 1, '2025-09-04': 1, '2025-09-05': 1, '2025-09-06': 1, '2025-09-07': 2, '2025-09-08': 1, '2025-09-09': 1,
        '2025-09-10': 1, '2025-09-11': 2, '2025-09-12': 1, '2025-09-13': 1, '2025-09-14': 3, '2025-09-15': 1, '2025-09-16': 1,
        '2025-09-17': 1, '2025-09-18': 1, '2025-09-19': 1, '2025-09-20': 1, '2025-09-21': 3, '2025-09-22': 1, '2025-09-23': 1,
        '2025-09-24': 1, '2025-09-25': 1, '2025-09-26': 1, '2025-09-27': 1, '2025-09-28': 1, '2025-09-29': 1, '2025-09-30': 1,
        '2025-10-01': 0, '2025-10-02': 0, '2025-10-03': 0, '2025-10-04': 0, '2025-10-05': 0, '2025-10-06': 0
    };

    // Fungsi untuk mendapatkan warna berdasarkan status ketersediaan
    function getAvailabilityColor(date) {
        const dateStr = date.toISOString().split('T')[0];
        const status = availabilityData[dateStr] || 0;
        
        switch(status) {
            case 1: return '#E8F4E6'; // Hijau - tersedia
            case 2: return '#FFF9DB'; // Kuning - terbatas
            case 3: return '#FFEBEB'; // Merah - penuh
            default: return '';
        }
    }

    // Fungsi untuk mendapatkan status ketersediaan sebagai teks
    function getAvailabilityStatus(date) {
        const dateStr = date.toISOString().split('T')[0];
        const status = availabilityData[dateStr] || 0;
        
        switch(status) {
            case 1: return 'Tersedia';
            case 2: return 'Terbatas';
            case 3: return 'Penuh';
            default: return '';
        }
    }

    // Fungsi untuk mendapatkan pesan ketersediaan
    function getAvailabilityMessage(date) {
        const dateStr = date.toISOString().split('T')[0];
        const status = availabilityData[dateStr] || 0;
        
        switch(status) {
            case 1: return 'Masih tersedia banyak slot untuk tanggal ini!';
            case 2: return 'Slot hampir penuh, segera booking!';
            case 3: return 'Maaf, slot untuk tanggal ini sudah penuh.';
            default: return '';
        }
    }

    // Inisialisasi FullCalendar
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            initialDate: '2025-09-01',
            headerToolbar: {
                left: 'prev,next',
                center: 'title',
                right: ''
            },
            locale: 'id', // Bahasa Indonesia
            firstDay: 0, // Minggu sebagai hari pertama
            height: 'auto',
            fixedWeekCount: false,
            showNonCurrentDates: true,
            dayMaxEvents: true,
            
            // Kustomisasi tampilan hari
            dayCellDidMount: function(info) {
                // Tambahkan kelas CSS berdasarkan ketersediaan
                const dateStr = info.date.toISOString().split('T')[0];
                const status = availabilityData[dateStr] || 0;
                
                if (status === 1) {
                    info.el.classList.add('fc-day-available');
                } else if (status === 2) {
                    info.el.classList.add('fc-day-limited');
                } else if (status === 3) {
                    info.el.classList.add('fc-day-full');
                }
            },
            
            // Handler untuk klik pada tanggal
            dateClick: function(info) {
                const status = getAvailabilityStatus(info.date);
                if (status) {
                    const message = getAvailabilityMessage(info.date);
                    const dateStr = info.date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                    alert(`Tanggal ${dateStr}\nStatus: ${status}\n${message}`);
                }
            },
            
            // Kustomisasi teks header
            datesSet: function(info) {
                // Ubah format judul bulan ke Bahasa Indonesia
                const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                const year = info.view.currentStart.getFullYear();
                const month = info.view.currentStart.getMonth();
                
                const titleEl = document.querySelector('.fc-toolbar-title');
                if (titleEl) {
                    titleEl.textContent = `${monthNames[month]} ${year}`;
                }
            }
        });
        
        calendar.render();
    }
});