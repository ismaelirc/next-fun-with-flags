export const formatNumber = (number: number) => {
    const units = ["", "k", "M", "B", "T"];

    if (!number) return "0";

    const digits = Math.abs(number).toString().length;
    const tier = Math.floor((digits - 1) / 3);

    if (tier === 0) return number.toString();

    const scale = Math.pow(10, tier * 3);
    const scaledNumber = number / scale;

    return scaledNumber.toFixed(1) + units[tier];
};