export const csvToData = (csv: string) => {
    const regex = /^(\-?\d+\.\d+),(\-?\d+\.\d+)$/gm;
    const data: { wavelength: number; intensity: number }[] = [];
    let match;
    while ((match = regex.exec(csv)) !== null) {
        const wavelength = parseFloat(match[1]);
        const intensity = parseFloat(match[2]);
        if (!isNaN(wavelength) && !isNaN(intensity)) {
            data.push({ wavelength, intensity });
        }
    }
    return data;
}