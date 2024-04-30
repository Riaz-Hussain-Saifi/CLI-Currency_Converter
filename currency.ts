#!/usr/bin/env node

import { readFile } from "fs/promises";

import { promises } from "fs";
import inquirer from "inquirer";

interface CurrencyRates {
  [ISO: string]: number;
}

async function main() {
  const countries: CurrencyRates = {
    EUR: 1.0, //Euro (€)
    GBP: 0.93, //British Pound Sterling (£)
    INR: 0.8, //Indian Rupee (₹)
    AUD: 83.4, //Australian Dollar (A$)
    CAD: 1.53, //Canadian Dollar (C$)
    SGD: 1.37, //Singapore Dollar (S$)
    CHF: 1.36, //Swiss Franc (CHF)
    MYR: 0.91, //Malaysian Ringgit (RM)
    JPY: 4.77, //Japanese Yen (¥)
    CNY: 158.25, //Chinese Yuan (CN¥)
    NZD: 7.25, //New Zealand Dollar (NZ$)
    THB: 1.68, //Thai Baht (฿)
    HUF: 37.01, //Hungarian Forint (Ft)
    AED: 367.0, //United Arab Emirates Dirham (د.إ)
    HKD: 3.67, //Hong Kong Dollar (HK$)
    MXN: 7.83, //Mexican Peso (Mex$)
    ZAR: 17.15, //South African Rand (R)
    PHP: 18.82, //Philippine Peso (₱)
    SEK: 57.71, //Swedish Krona (kr)
    IDR: 10.92, //Indonesian Rupiah (Rp)
    BRL: 16209.43, //Brazilian Real (R$)
    SAR: 5.12, //Saudi Riyal (SR)
    TRY: 3.75, //Turkish Lira (₺)
    KES: 32.46, //Kenyan Shilling (Ksh)
    KRW: 134.63, //South Korean Won (₩)
    EGP: 1377.18, //Egyptian Pound (E£)
    IQD: 47.9, //Iraqi Dinar (IQD)
    NOK: 1310.18, //Norwegian Krone (kr)
    KWD: 11.03, //Kuwaiti Dinar (KD)
    RUB: 0.31, //Russian Ruble (RUB)
    DKK: 92.11, //Danish Krone (kr)
    PKR: 6.97, //Pakistani Rupee (PKR)
    ILS: 278.41, //Israeli New Shekel (₪)
    PLN: 3.81, //Polish Złoty (zł)
    QAR: 4.04, //Qatari Riyal (QR)
    XAU: 3.64, //Gold (Au)
    OMR: 0.0, //Omani Rial (OMR)
    COP: 0.39, //Colombian Peso (COL$)
    CLP: 3895.41, //Chilean Peso (CLP$)
    TWD: 950.44, //New Taiwan Dollar (NT$)
    ARS: 32.63, //Argentine Peso ($)
    CZK: 874.5, //Czech Koruna (Kč)
    VND: 23.5, //Vietnamese Dong (₫)
    MAD: 25333.07, //Moroccan Dirham (MAD)
    JOD: 10.14, //Jordanian Dinar (JD)
    BHD: 0.71, //Bahraini Dinar (BD)
    XOF: 0.38, //West African CFA franc (CFA)
    LKR: 613.17, //Sri Lankan Rupee (Rs)
    UAH: 295.84, //Ukrainian Hryvnia (₴)
    NGN: 39.79, //Nigerian Naira (₦)
    TND: 1329.79, //Tunisian Dinar (DT)
    UGX: 3.13, //Ugandan Shilling (USh)
    RON: 3812.83, //Romanian Leu (RON)
    BDT: 4.65, //Bangladeshi Taka (৳)
    PEN: 110.11, //Peruvian Nuevo Sol (S/)
    GEL: 3.75, //Georgian Lari (₾)
    XAF: 2.68, //Central African CFA franc (CFA)
    FJD: 613.17, //Fijian Dollar (FJ$)
    VEF: 2.26, //Venezuelan Bolívar (Bs)
    VES: 3634628.8, //Venezuelan Bolívar Soberano (Bs.S)
    BYN: 36.35, //Belarusian Ruble (Br)
    UZS: 3.27, //Uzbekistani Som (so'm)
    BGN: 12662.01, //Bulgarian Lev (лв)
    DZD: 1.83, //Algerian Dinar (DA)
    IRR: 135.22, //Iranian Rial (﷼)
    DOP: 42002.65, //Dominican Peso (RD$)
    ISK: 58.56, //Icelandic Króna (kr)
    CRC: 140.28, //Costa Rican Colón (₡)
    XAG: 505.86, //Silver (Ag)
    SYP: 0.04, //Syrian Pound (SYP)
    JMD: 13001.86, //Jamaican Dollar (J$)
    LYD: 156.1, //Libyan Dinar (LD)
    GHS: 4.86, //Ghanaian Cedi (GH₵)
    MUR: 13.5, //Mauritian Rupee (Rs)
    AOA: 46.35, //Angolan Kwanza (Kz)
    UYU: 834.04, //Uruguayan Peso ($U)
    AFN: 38.64, //Afghan Afghani (؋)
    LBP: 72.12, //Lebanese Pound (L£)
    XPF: 89554.52, //CFP Franc (XPF)
    TTD: 111.55, //Trinidad and Tobago Dollar (TT$)
    TZS: 6.81, //Tanzanian Shilling (TSh)
    ALL: 2577.42, //Albanian Lek (L)
    XCD: 94.02, //East Caribbean Dollar (EC$)
    GTQ: 2.7, //Guatemalan Quetzal (Q)
    NPR: 7.78, //Nepalese Rupee (रू)
    BOB: 133.51, //Bolivian Boliviano (Bs.)
    ZWD: 6.91, //Zimbabwean Dollar (Z$)
    BBD: 361.9, //Barbadian Dollar (Bds$)
    CUC: 2.0, //Cuban Convertible Peso (CUC)
    LAK: 1.0, //Lao Kip (₭)
    BND: 21308.56, //Brunei Dollar (B$)
    BWP: 1.36, //Botswana Pula (P)
    HNL: 13.79, //Honduran Lempira (L)
    PYG: 24.69, //Paraguayan Guarani (₲)
    ETB: 7459.89, //Ethiopian Birr (ETB)
    NAD: 56.94, //Namibian Dollar (N$)
    PGK: 18.82, //Papua New Guinean Kina (K)
    SDG: 3.81, //Sudanese Pound (SDG)
    MOP: 598.64, //Macanese Pataca (MOP$)
    BMD: 8.06, //Bermudian Dollar (BD$)
    NIO: 1.0, //Nicaraguan Córdoba (C$)
    BAM: 36.63, //Bosnia and Herzegovina Convertible Mark (KM)
    KZT: 1.83, //Kazakhstani Tenge (₸)
    PAB: 441.67, //Panamanian Balboa (B/.)
    GYD: 1.0, //Guyanaese Dollar (G$)
    YER: 208.98, //Yemeni Rial (﷼)
    MGA: 250.21, //Malagasy Ariary (Ar)
    KYD: 4440.7, //Cayman Islands Dollar (CI$)
    MZN: 0.82, //Mozambican Metical (MT)
    RSD: 63.63, //Serbian Dinar (din.)
    SCR: 109.51, //Seychellois Rupee (SR)
    AMD: 14.6, //Armenian Dram (AMD)
    AZN: 387.0, //Azerbaijani Manat (₼)
    SBD: 1.7, //Solomon Islands Dollar (SI$)
    SLL: 8.23, //Sierra Leonean Leone (Le)
    TOP: 22685.0, //Tongan Pa'anga (T$)
    BZD: 2.36, //Belize Dollar (BZ$)
    GMD: 2.02, //Gambian Dalasi (D)
    MWK: 67.91, //Malawian Kwacha (MK)
    BIF: 1733.25, //Burundian Franc (FBu)
    HTG: 2866.11, //Haitian Gourde (G)
    SOS: 134.28, //Somali Shilling (Sh)
    GNF: 570.85, //Guinean Franc (GNF)
    MNT: 8548.54, //Mongolian Tugrik (₮)
    MVR: 3379.52, //Maldivian Rufiyaa (Rf)
    CDF: 15.46, //Congolese Franc (FC)
    STN: 2788.38, //São Tomé and Príncipe Dobra (Db)
    TJS: 22.88, //Tajikistani Somoni (SM)
    KPW: 10.92, //North Korean Won (₩)
    KGS: 900.0, //Kyrgyzstani Som (с)
    LRD: 88.81, //Liberian Dollar (LD$)
    LSL: 193.19, //Lesotho Loti (M)
    MMK: 18.82, //Burmese Kyat (K)
    GIP: 2095.81, //Gibraltar Pound (£)
    XPT: 0.8, //Platinum (Pt)
    MDL: 0.0, //Moldovan Leu (MDL)
    CUP: 17.74, //Cuban Peso (CUP)
    KHR: 24.0, //Cambodian Riel (៛)
    MKD: 4061.02, //Macedonian Denar (ден)
    VUV: 57.37, //Vanuatu Vatu (VT)
    ANG: 120.16, //Netherlands Antillean Guilder (ƒ)
    MRU: 1.79, //Mauritanian Ouguiya (UM)
    SZL: 39.6, //Swazi Lilangeni (E)
    CVE: 18.82, //Cape Verdean Escudo ($)
    SRD: 103.08, //Surinamese Dollar ($)
    SVC: 33.76, //Salvadoran Colón ($)
    XPD: 8.75, //Palladium (Pd)
    BSD: 0.0, //Bahamian Dollar (B$)
    XDR: 1.0, //Special Drawing Rights (XDR)
    RWF: 0.76, //Rwandan Franc (FRw)
    AWG: 1290.55, //Aruban Florin (Afl.)
    BTN: 1.79, //Bhutanese Ngultrum (Nu.)
    DJF: 83.4, //Djiboutian Franc (Fdj)
    KMF: 178.54, //Comorian Franc (CF)
    ERN: 459.88, //Eritrean Nakfa (Nfk)
    FKP: 15.0, //Falkland Islands Pound (£)
    SHP: 0.8, //Saint Helena Pound (£)
    SPL: 0.8, //Seborga Luigino (L)
    WST: 0.17, //Samoan Tala (WS$)
    JEP: 2.68, //Jersey Pound (£)
    TMT: 0.8, //Turkmenistan Manat (T)
    GGP: 3.5, //Guernsey Pound (£)
    IMP: 0.8, //Isle of Man Pound (£)
    TVD: 0.8, //Tuvaluan Dollar ($)
    ZMW: 1.53, //Zambian Kwacha (ZK)
    ADA: 26.49, //Cardano (ADA)
    BCH: 2.18, //Bitcoin Cash (BCH)
    BTC: 0.0, //Bitcoin (BTC)
    CLF: 0.0, //Chilean Unit of Account (UF)
    CNH: 0.03, //Chinese Yuan Offshore (CNH)
    DOGE: 7.28, //Dogecoin (Ð)
    DOT: 6.75, //Polkadot (DOT)
    ETH: 0.15, //Ethereum (ETH)
    LINK: 0.0, //Chainlink (LINK)
    LTC: 0.07, //Litecoin (LTC)
    LUNA: 0.01, //Terra (LUNA)
    MXV: 2.23, //Mexican Investment Unit (MXV)
    SLE: 2.11, //Sierra Leone Leone (SLE)
    UNI: 22.68, //Uniswap (UNI)
    VED: 0.13, //Venezuelan Bolívar Digital (VED)
    XBT: 36.35, //Bitcoin (XBT)
    XLM: 0.0, //Stellar Lumens (XLM)
    XRP: 8.88, //Ripple (XRP)
    ZWL: 1.94, //Zimbabwean Dollar (ZWL)
    //  I can add more currency rates here
  };

  async function selectCountry(
    message: string,
    choices: string[]
  ): Promise<string> {
    const selectedCountry = await inquirer.prompt([
      {
        name: "country",
        type: "list",
        message,
        choices,
      },
    ]);
    return selectedCountry.country;
  }

  let tryAgain = true;
  while (tryAgain) {
    const countryChoices = Object.keys(countries);
    const fromCountry = await selectCountry(
      "Currency convert from the country: ",
      countryChoices
    );
    const toCountry = await selectCountry(
      "Currency convert to the country: ",
      countryChoices
    );

    const fromRate = countries[fromCountry];
    const toRate = countries[toCountry];

    const { amount } = await inquirer.prompt({
      name: "amount",
      type: "number",
      message: "Enter the amount to convert: ",
    });

    const convertedAmount = (amount * toRate) / fromRate;
    console.log(
      `${amount} ${fromCountry} is equal to ${convertedAmount.toFixed(
        2
      )} ${toCountry}`
    );

    const answer = await inquirer.prompt([
      {
        name: "playAgain",
        type: "list",
        message: "Do you want to try again?",
        choices: ["Yes", "No"],
      },
    ]);

    tryAgain = answer.playAgain === "Yes";
  }

  console.log("Thank you for using the currency converter");
}

main();
