export type InstitutionType = "bank" | "e-wallet"

export type FinancialInstitution = {
  id: string
  name: string
  shortName?: string
  type: InstitutionType
  logo: string
  keywords?: readonly string[]
}

export const banks = [
  { id: "vietcombank", name: "Ngân hàng TMCP Ngoại thương Việt Nam", shortName: "Vietcombank", type: "bank", logo: "/logos/banks/vietcombank.svg", keywords: ["vcb", "ngoai thuong"] },
  { id: "techcombank", name: "Ngân hàng TMCP Kỹ thương Việt Nam", shortName: "Techcombank", type: "bank", logo: "/logos/banks/techcombank.svg", keywords: ["tcb", "ky thuong"] },
  { id: "mb-bank", name: "Ngân hàng TMCP Quân đội", shortName: "MB Bank", type: "bank", logo: "/logos/banks/mb-bank.svg", keywords: ["mbbank", "quan doi"] },
  { id: "bidv", name: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam", shortName: "BIDV", type: "bank", logo: "/logos/banks/bidv.svg", keywords: ["dau tu phat trien"] },
  { id: "vietinbank", name: "Ngân hàng TMCP Công Thương Việt Nam", shortName: "VietinBank", type: "bank", logo: "/logos/banks/vietinbank.svg", keywords: ["ctg", "cong thuong"] },
  { id: "agribank", name: "Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam", shortName: "Agribank", type: "bank", logo: "/logos/banks/argibank.svg", keywords: ["argibank", "nong nghiep"] },
  { id: "acb", name: "Ngân hàng TMCP Á Châu", shortName: "ACB", type: "bank", logo: "/logos/banks/acb.svg", keywords: ["a chau"] },
  { id: "vpbank", name: "Ngân hàng TMCP Việt Nam Thịnh Vượng", shortName: "VPBank", type: "bank", logo: "/logos/banks/vpbank.svg", keywords: ["vpb", "viet nam thinh vuong"] },
  { id: "tpbank", name: "Ngân hàng TMCP Tiên Phong", shortName: "TPBank", type: "bank", logo: "/logos/banks/tpbank.svg", keywords: ["tpb", "tien phong"] },
  { id: "vib", name: "Ngân hàng TMCP Quốc tế Việt Nam", shortName: "VIB", type: "bank", logo: "/logos/banks/vib.svg", keywords: ["quoc te"] },
  { id: "hdbank", name: "Ngân hàng TMCP Phát triển Thành phố Hồ Chí Minh", shortName: "HDBank", type: "bank", logo: "/logos/banks/hdbank.svg", keywords: ["hdb", "phat trien tphcm"] },
  { id: "msb", name: "Ngân hàng TMCP Hàng Hải Việt Nam", shortName: "MSB", type: "bank", logo: "/logos/banks/msb.svg", keywords: ["maritime bank", "hang hai"] },
  { id: "ocb", name: "Ngân hàng TMCP Phương Đông", shortName: "OCB", type: "bank", logo: "/logos/banks/ocb.svg", keywords: ["phuong dong"] },
  { id: "shb", name: "Ngân hàng TMCP Sài Gòn - Hà Nội", shortName: "SHB", type: "bank", logo: "/logos/banks/shb.svg", keywords: ["sai gon ha noi"] },
  { id: "eximbank", name: "Ngân hàng TMCP Xuất Nhập khẩu Việt Nam", shortName: "Eximbank", type: "bank", logo: "/logos/banks/eximbank.svg", keywords: ["eib", "xuat nhap khau"] },
  { id: "scb", name: "Ngân hàng TMCP Sài Gòn", shortName: "SCB", type: "bank", logo: "/logos/banks/scb.svg", keywords: ["sai gon"] },
  { id: "seabank", name: "Ngân hàng TMCP Đông Nam Á", shortName: "SeABank", type: "bank", logo: "/logos/banks/sea-bank.svg", keywords: ["sea bank", "dong nam a"] },
  { id: "lpbank", name: "Ngân hàng TMCP Lộc Phát Việt Nam", shortName: "LPBank", type: "bank", logo: "/logos/banks/lienviet-postbank.svg", keywords: ["lienvietpostbank", "lien viet", "loc phat"] },
  { id: "pvcombank", name: "Ngân hàng TMCP Đại Chúng Việt Nam", shortName: "PVcomBank", type: "bank", logo: "/logos/banks/pvcom-bank.svg", keywords: ["pvcom", "dai chung"] },
  { id: "nam-a-bank", name: "Ngân hàng TMCP Nam Á", shortName: "Nam A Bank", type: "bank", logo: "/logos/banks/nam-a-bank.svg", keywords: ["namabank", "nam a"] },
  { id: "ncb", name: "Ngân hàng TMCP Quốc Dân", shortName: "NCB", type: "bank", logo: "/logos/banks/ncb.svg", keywords: ["quoc dan"] },
  { id: "abbank", name: "Ngân hàng TMCP An Bình", shortName: "ABBank", type: "bank", logo: "/logos/banks/abbank.svg", keywords: ["an binh"] },
  { id: "bac-a-bank", name: "Ngân hàng TMCP Bắc Á", shortName: "Bac A Bank", type: "bank", logo: "/logos/banks/bac-a-bank.svg", keywords: ["baca", "bac a"] },
  { id: "bao-viet-bank", name: "Ngân hàng TMCP Bảo Việt", shortName: "BaoViet Bank", type: "bank", logo: "/logos/banks/baoviet-bank.svg", keywords: ["bao viet"] },
  { id: "viet-a-bank", name: "Ngân hàng TMCP Việt Á", shortName: "VietABank", type: "bank", logo: "/logos/banks/viet-a-bank.svg", keywords: ["viet a"] },
  { id: "viet-capital-bank", name: "Ngân hàng TMCP Bản Việt", shortName: "BVBank", type: "bank", logo: "/logos/banks/viet-capital-bank.svg", keywords: ["viet capital bank", "ban viet"] },
  { id: "kienlong-bank", name: "Ngân hàng TMCP Kiên Long", shortName: "KienlongBank", type: "bank", logo: "/logos/banks/kienlong-bank.svg", keywords: ["kien long"] },
  { id: "pg-bank", name: "Ngân hàng TMCP Thịnh vượng và Phát triển", shortName: "PGBank", type: "bank", logo: "/logos/banks/pg-bank.svg", keywords: ["pdbank", "petrolimex"] },
  { id: "gpbank", name: "Ngân hàng TNHH MTV Dầu khí Toàn cầu", shortName: "GPBank", type: "bank", logo: "/logos/banks/gpbank.svg", keywords: ["dau khi toan cau"] },
  { id: "ocean-bank", name: "Ngân hàng TNHH MTV Đại Dương", shortName: "OceanBank", type: "bank", logo: "/logos/banks/ocean-bank.svg", keywords: ["dai duong"] },
  { id: "cb", name: "Ngân hàng Thương mại TNHH MTV Xây dựng Việt Nam", shortName: "CB", type: "bank", logo: "/logos/banks/cb.svg", keywords: ["construction bank", "xay dung"] },
  { id: "donga-bank", name: "Ngân hàng TMCP Đông Á", shortName: "DongA Bank", type: "bank", logo: "/logos/banks/donga-bank.svg", keywords: ["dong a"] },
  { id: "cake-by-vpbank", name: "Ngân hàng số Cake by VPBank", shortName: "Cake", type: "bank", logo: "/logos/banks/cake-by-vpbank.svg", keywords: ["cake vpbank", "digital bank"] },
  { id: "timo", name: "Ngân hàng số Timo", shortName: "Timo", type: "bank", logo: "/logos/banks/timo.svg", keywords: ["digital bank"] },
  { id: "tyme", name: "Ngân hàng số Tyme", shortName: "Tyme", type: "bank", logo: "/logos/banks/tyme.svg", keywords: ["digital bank"] },
  { id: "tymebank", name: "TymeBank", shortName: "TymeBank", type: "bank", logo: "/logos/banks/tymebank.svg" },
  { id: "hsbc", name: "Ngân hàng HSBC", shortName: "HSBC", type: "bank", logo: "/logos/banks/hsbc.svg" },
  { id: "standard-chartered", name: "Ngân hàng Standard Chartered", shortName: "Standard Chartered", type: "bank", logo: "/logos/banks/standard-chartered.svg", keywords: ["scb international"] },
  { id: "shinhan-bank", name: "Ngân hàng Shinhan", shortName: "Shinhan Bank", type: "bank", logo: "/logos/banks/shinhan-bank.svg" },
  { id: "woori-bank", name: "Ngân hàng Woori", shortName: "Woori Bank", type: "bank", logo: "/logos/banks/woori-bank.svg" },
  { id: "cimb", name: "Ngân hàng CIMB", shortName: "CIMB", type: "bank", logo: "/logos/banks/cimb.svg" },
  { id: "public-bank", name: "Ngân hàng Public Bank Việt Nam", shortName: "Public Bank", type: "bank", logo: "/logos/banks/public-bank.svg" },
  { id: "hong-leong-bank", name: "Ngân hàng Hong Leong Việt Nam", shortName: "Hong Leong Bank", type: "bank", logo: "/logos/banks/hong-leong-bank.svg" },
  { id: "maybank", name: "Ngân hàng Maybank", shortName: "Maybank", type: "bank", logo: "/logos/banks/maybank.svg" },
  { id: "anz", name: "Ngân hàng ANZ", shortName: "ANZ", type: "bank", logo: "/logos/banks/anz.svg" },
  { id: "citibank", name: "Ngân hàng Citibank", shortName: "Citibank", type: "bank", logo: "/logos/banks/citibank.svg", keywords: ["citi"] },
  { id: "commonwealth-bank", name: "Ngân hàng Commonwealth", shortName: "Commonwealth Bank", type: "bank", logo: "/logos/banks/commonwealth-bank.svg" },
  { id: "deutsche-bank", name: "Ngân hàng Deutsche Bank", shortName: "Deutsche Bank", type: "bank", logo: "/logos/banks/deutsche-bank.svg" },
  { id: "bank-of-china", name: "Ngân hàng Bank of China", shortName: "Bank of China", type: "bank", logo: "/logos/banks/bank-of-china.svg", keywords: ["boc"] },
  { id: "bangkok-bank", name: "Ngân hàng Bangkok Bank", shortName: "Bangkok Bank", type: "bank", logo: "/logos/banks/bangkok-bank.svg" },
  { id: "cathay-bank", name: "Ngân hàng Cathay United", shortName: "Cathay Bank", type: "bank", logo: "/logos/banks/cathay-bank.svg" },
  { id: "chase-bank", name: "Ngân hàng JPMorgan Chase", shortName: "Chase", type: "bank", logo: "/logos/banks/chase-bank.svg", keywords: ["jpmorgan"] },
  { id: "industrial-bank-of-korea", name: "Ngân hàng Công nghiệp Hàn Quốc", shortName: "IBK", type: "bank", logo: "/logos/banks/industrial-bank-of-korea.svg", keywords: ["industrial bank of korea"] },
  { id: "keb-hana-bank", name: "Ngân hàng KEB Hana", shortName: "KEB Hana Bank", type: "bank", logo: "/logos/banks/keb-hana-bank.svg" },
  { id: "kb", name: "Ngân hàng KB Kookmin", shortName: "KB Kookmin", type: "bank", logo: "/logos/banks/kb.svg" },
  { id: "ivb", name: "Ngân hàng Indovina", shortName: "IVB", type: "bank", logo: "/logos/banks/ivb.svg", keywords: ["indovina bank"] },
  { id: "bidc", name: "Ngân hàng Đầu tư và Phát triển Campuchia", shortName: "BIDC", type: "bank", logo: "/logos/banks/bidc.svg" },
  { id: "mega-international-commercial-bank", name: "Mega International Commercial Bank", shortName: "Mega ICBC", type: "bank", logo: "/logos/banks/mega-international-commercial-bank.svg" },
  { id: "mizuho", name: "Ngân hàng Mizuho", shortName: "Mizuho", type: "bank", logo: "/logos/banks/mizuho.svg" },
  { id: "smfg", name: "Sumitomo Mitsui Financial Group", shortName: "SMFG", type: "bank", logo: "/logos/banks/smfg.svg", keywords: ["smbc"] },
  { id: "scotiabank", name: "Ngân hàng Scotiabank", shortName: "Scotiabank", type: "bank", logo: "/logos/banks/scotiabank.svg" },
  { id: "ubs", name: "Ngân hàng UBS", shortName: "UBS", type: "bank", logo: "/logos/banks/ubsp.svg", keywords: ["ubsp"] },
  { id: "dsb", name: "Ngân hàng DSB", shortName: "DSB", type: "bank", logo: "/logos/banks/dsb.svg" },
  { id: "napas", name: "Công ty Cổ phần Thanh toán Quốc gia Việt Nam", shortName: "NAPAS", type: "bank", logo: "/logos/banks/napas.svg", keywords: ["thanh toan quoc gia"] },
] satisfies readonly FinancialInstitution[]

export const eWallets = [
  { id: "momo", name: "Ví điện tử MoMo", shortName: "MoMo", type: "e-wallet", logo: "/logos/wallets/momo.svg" },
  { id: "zalopay", name: "Ví điện tử ZaloPay", shortName: "ZaloPay", type: "e-wallet", logo: "/logos/wallets/zalopay.svg", keywords: ["zalo pay"] },
  { id: "vnpay", name: "Ví điện tử VNPAY", shortName: "VNPAY", type: "e-wallet", logo: "/logos/wallets/vnpay.svg" },
  { id: "vnpay-money", name: "Ví điện tử VNPAY Money", shortName: "VNPAY Money", type: "e-wallet", logo: "/logos/wallets/vnpay-money.svg" },
  { id: "shopeepay", name: "Ví điện tử ShopeePay", shortName: "ShopeePay", type: "e-wallet", logo: "/logos/wallets/shopeepay.svg", keywords: ["airpay", "shopee pay"] },
  { id: "viettel-money", name: "Ví điện tử Viettel Money", shortName: "Viettel Money", type: "e-wallet", logo: "/logos/wallets/viettel-money.svg" },
  { id: "moca", name: "Ví điện tử Moca", shortName: "Moca", type: "e-wallet", logo: "/logos/wallets/moca.svg" },
  { id: "grabpay-by-moca", name: "GrabPay by Moca", shortName: "GrabPay", type: "e-wallet", logo: "/logos/wallets/grabpay-by-moca.svg", keywords: ["grab pay", "moca"] },
  { id: "payoo", name: "Ví điện tử Payoo", shortName: "Payoo", type: "e-wallet", logo: "/logos/wallets/payoo.svg" },
  { id: "payme", name: "Ví điện tử PayME", shortName: "PayME", type: "e-wallet", logo: "/logos/wallets/payme.svg" },
  { id: "vtcpay", name: "Ví điện tử VTC Pay", shortName: "VTC Pay", type: "e-wallet", logo: "/logos/wallets/vtcpay.svg" },
  { id: "ngan-luong", name: "Ví điện tử Ngân Lượng", shortName: "Ngân Lượng", type: "e-wallet", logo: "/logos/wallets/ngan-luong.svg", keywords: ["nganluong"] },
  { id: "baokim", name: "Ví điện tử Bảo Kim", shortName: "Bảo Kim", type: "e-wallet", logo: "/logos/wallets/baokim.svg" },
  { id: "truemoney", name: "Ví điện tử TrueMoney", shortName: "TrueMoney", type: "e-wallet", logo: "/logos/wallets/truemoney.svg" },
  { id: "nextpay", name: "Ví điện tử NextPay", shortName: "NextPay", type: "e-wallet", logo: "/logos/wallets/nextpay.svg" },
  { id: "ecpay", name: "Ví điện tử ECPay", shortName: "ECPay", type: "e-wallet", logo: "/logos/wallets/ecpay.svg" },
  { id: "vimo", name: "Ví điện tử Vimo", shortName: "Vimo", type: "e-wallet", logo: "/logos/wallets/vimo.svg" },
  { id: "vinid", name: "Ví điện tử VinID Pay", shortName: "VinID Pay", type: "e-wallet", logo: "/logos/wallets/vinid.svg", keywords: ["vin id"] },
  { id: "apota", name: "Ví điện tử AppotaPay", shortName: "AppotaPay", type: "e-wallet", logo: "/logos/wallets/apota.svg", keywords: ["appota", "apota"] },
] satisfies readonly FinancialInstitution[]

export const financialInstitutions: readonly FinancialInstitution[] = [
  ...banks,
  ...eWallets,
]

export function getInstitutionsByType(type: InstitutionType) {
  return type === "bank" ? banks : eWallets
}

export function getInstitution(type: InstitutionType, id: string) {
  return getInstitutionsByType(type).find((institution) => institution.id === id)
}
