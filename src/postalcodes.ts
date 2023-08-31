import { readFileSync } from 'fs';
import path from 'path';

function main() {
    const args = process.argv.slice(2); 
    const input = args[0];

    if (!input) {
        console.log('Syötä postinumero tai nimi.');
        return;
    }
    
    const data: Map<string, string[]> = new Map();
    const csvFile: string = path.join(__dirname, '..', 'postalcodes.csv');
    const fileContents: string = readFileSync(csvFile, 'utf-8');
    const lines: string[] = fileContents.trim().split('\n');
    for (const line of lines) {
        const [numero, toimipaikka] = line.split(',');
        const paikka = trimmedString(toimipaikka);
       
        if (data.has(paikka)) {
            data.get(paikka)?.push(numero);
        } else {
            data.set(paikka, [numero]);
        }
    }
    
    const result = etsiTiedot(input, data);
    result?.sort()

    if (result) {
        console.log(result.join(', '));
    } else {
        console.log('Tietoja ei löytynyt.');
    }
}

function etsiTiedot(input: string, data: Map<string, string[]>): string[] | undefined {
    const syote = trimmedString(input);
    return data.get(syote);
}

function trimmedString(str: string): string {
    return str.toLowerCase().trim();
}

main();

