# Cuan
PairProject_Cuan
Konsep Project Cuan :
User dapat membeli atau melakukan subscribe terhadap investasi yang tersedia pada beranda,user juga dapat melihat berapa user yang sudah membeli investasi tersebut.
Admin dapat memposting investasi dan company.
Admin dapat mendelete investasi dari beranda.
User harus melakukan resgistrasi terlebh dahulu untuk Login.
Setelah Login User masuk ke beranda,dimana user dapat melihat semua daftar investasi yang ada.
User juga dapat melengkapi userProfile pada halaman userProfile.
User dapat melihat daftar investasi yang mereka beli pada userProfile.
User dapat melakukan top up untuk mengisi account balance mereka.
User melakukan scan barcode untuk topup transaksi.
Validasi pada Controller akan berjalan ketika user melakukan pembelian investasi
akan mengurangi accountBalance dari user,ketika account balance kurang dari amount transaksi pembelian maka validasi akan berjalan.
ketika klik buy maka akan muncul qr code dan notifikasi email ketika sukses melakukan pembelian investasi.

catatan untuk ditambah:
1.update schema / erd.
2.seeding data(User,Company,Investment)
3.set validation & constraint.