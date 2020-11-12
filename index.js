function solve(time) {
    function intToWord(n) {
        if (n < 0) throw new Error("Number must be positive or zero.");

        // [0 .. 12]
        const digits = [ "midnight", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve" ];
        if (n <= 12) {
            return digits[n];
        }

        // [13 .. 19]
        if (n <= 19) {
            let teenPrefix;
            switch (n % 10) {
                case 3:
                    teenPrefix = "thir";
                    break;
                case 5:
                    teenPrefix = "fif";
                    break;
                case 8:
                    teenPrefix = "eigh";
                    break;
                default:
                    teenPrefix = digits[n % 10];
            }
            return teenPrefix + "teen";
        }

        // [20 .. 99]
        const tens = ["twen", "thir", "for", "fif"];
        if (n <= 99) {
            let tensPrefix;
            const n1 = n % 10;
            const n10 = ~~(n / 10);

            if (n10 >= 2 && n10 <= 5) {
                tensPrefix = tens[n10 - 2];
            } else {
                tensPrefix = digits[n10];
            }

            let result = tensPrefix + "ty";
            if (n1) result += " " + digits[n1];
            return result;
        }
    }


    let [hh, m] = time.split(":").map(item => parseInt(item));
    let h = hh; // [0 .. 11]
    if (hh > 12) h = hh % 12;

    if (m === 0 && h === 0) return "midnight";
    if (m === 0) return `${intToWord(h)} o'clock`;
    if (m > 0 && m < 30 && m !== 15) return `${intToWord(m)} minute${m === 1 ? "": "s"} past ${intToWord(h)}`;
    if (m === 15) return `quarter past ${intToWord(h)}`;
    if (m === 30) return `half past ${intToWord(h)}`;
    let hour;
    switch (hh) {
        case 23: hour = "midnight"; break;
        case 12: hour = "one"; break;
        default: hour = intToWord(h + 1);
    }
    if (m > 30 && m < 60 && m !== 45) return `${intToWord(60 - m)} minute${m === 59 ? "": "s"} to ${hour}`;
    if (m === 45) return `quarter to ${hour}`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btnToText").addEventListener("click", function () {
        txtResult.value = solve(txtInput.value);
    });
});
