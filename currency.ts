#!/usr/bin/env node

import { readFile } from "fs/promises";
import { promises } from "fs";

import inquirer from "inquirer";
import Chalk from "chalk"; // Import Chalk for colorizing the output

interface CurrencyRates {
  [ISO: string]: number;
}

async function main() {
  console.log(Chalk.cyan.bold("\n\t Welcome to the CLI Currency Converter! \n")); // Welcome message

  const countries: CurrencyRates = {
    // All these exchange rates are compared to the US Dollar, and they are as of May 01, 2024.
    // Define currency rates
    Argentine_Peso: 881.27, // Argentine Peso (ARS)
    Australian_Dollar: 1.54, // Australian Dollar (AUD)
    Bahraini_Dinar: 0.38, // Bahraini Dinar (BHD)
    Botswana_Pula: 13.79, // Botswana Pula (BWP)
    Brazilian_Real: 5.2, // Brazilian Real (BRL)
    British_Pound: 0.8, // British Pound (GBP)
    Bruneian_Dollar: 1.37, // Bruneian Dollar (BND)
    Bulgarian_Lev: 1.84, // Bulgarian Lev (BGN)
    Canadian_Dollar: 1.38, // Canadian Dollar (CAD)
    Chilean_Peso: 948.53, // Chilean Peso (CLP)
    Chinese_Yuan_Renminbi: 7.24, // Chinese Yuan Renminbi (CNY)
    Colombian_Peso: 3914.02, // Colombian Peso (COP)
    Czech_Koruna: 23.62, // Czech Koruna (CZK)
    Danish_Krone: 7.0, // Danish Krone (DKK)
    Emirati_Dirham: 3.67, // Emirati Dirham (AED)
    Euro: 0.94, // Euro (EUR)
    Hong_Kong_Dollar: 7.82, // Hong Kong Dollar (HKD)
    Hungarian_Forint: 367.39, // Hungarian Forint (HUF)
    Icelandic_Krona: 140.74, // Icelandic Krona (ISK)
    Indian_Rupee: 83.51, // Indian Rupee (INR)
    Indonesian_Rupiah: 16263.43, // Indonesian Rupiah (IDR)
    Iranian_Rial: 42051.01, // Iranian Rial (IRR)
    Israeli_Shekel: 3.73, // Israeli Shekel (ILS)
    Japanese_Yen: 157.98, // Japanese Yen (JPY)
    Kazakhstani_Tenge: 441.99, // Kazakhstani Tenge (KZT)
    Kuwaiti_Dinar: 0.31, // Kuwaiti Dinar (KWD)
    Libyan_Dinar: 4.9, // Libyan Dinar (LYD)
    Malaysian_Ringgit: 4.77, // Malaysian Ringgit (MYR)
    Mauritian_Rupee: 46.46, // Mauritian Rupee (MUR)
    Mexican_Peso: 17.14, // Mexican Peso (MXN)
    Nepalese_Rupee: 133.68, // Nepalese Rupee (NPR)
    New_Zealand_Dollar: 1.7, // New Zealand Dollar (NZD)
    Norwegian_Krone: 11.13, // Norwegian Krone (NOK)
    Omani_Rial: 0.39, // Omani Rial (OMR)
    Pakistani_Rupee: 278.39, // Pakistani Rupee (PKR)
    Philippine_Peso: 57.87, // Philippine Peso (PHP)
    Polish_Zloty: 4.07, // Polish Zloty (PLN)
    Qatari_Riyal: 3.64, // Qatari Riyal (QAR)
    Romanian_New_Leu: 4.67, // Romanian New Leu (RON)
    Russian_Ruble: 91.78, // Russian Ruble (RUB)
    Saudi_Arabian_Riyal: 3.75, // Saudi Arabian Riyal (SAR)
    Singapore_Dollar: 1.37, // Singapore Dollar (SGD)
    South_African_Rand: 18.79, // South African Rand (ZAR)
    South_Korean_Won: 1387.83, // South Korean Won (KRW)
    Sri_Lankan_Rupee: 296.65, // Sri Lankan Rupee (LKR)
    Swedish_Krona: 11.05, // Swedish Krona (SEK)
    Swiss_Franc: 0.92, // Swiss Franc (CHF)
    Taiwan_New_Dollar: 32.61, // Taiwan New Dollar (TWD)
    Thai_Baht: 37.22, // Thai Baht (THB)
    Trinidadian_Dollar: 6.82, // Trinidadian Dollar (TTD)
    Turkish_Lira: 32.42, // Turkish Lira (TRY)
    Venezuelan_Bolivar: 3640457.66, // Venezuelan Bolivar (VEF)
    // I can add more currency rates here
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
      "Currency convert from: \t",
      countryChoices
    );
    const toCountry = await selectCountry(
      "Currency convert to: \t",
      countryChoices
    );

    const fromRate = countries[fromCountry];
    const toRate = countries[toCountry];

    const { amount } = await inquirer.prompt({
      name: "amount",
      type: "number",
      message: "Enter the amount to convert: \t",
    });

    const convertedAmount = (amount * toRate) / fromRate;
    console.log(
      Chalk.green(
        // Colorize the output in green
        `\t\n ${amount} ${Chalk.blue(fromCountry)} is equal to ${Chalk.blue(
          convertedAmount.toFixed(2)
        )} ${toCountry} \n`
      )
    );

    const answer = await inquirer.prompt([
      {
        name: "continue",
        type: "list",
        message: "What else would you like to do?",
        choices: ["Convert again", "Exit"],
      },
    ]);

    tryAgain = answer.continue === "Convert again";
  }

  console.log(Chalk.yellow("\n\t Thank you for using the currency converter"));
}

main();
