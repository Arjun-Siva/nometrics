module.exports = (n) => {
    return (Math.abs(n) >= 1e-2 && Math.abs(n) < 1e6)
        ? n.toFixed(2)    // show 2 decimals normally
        : n.toExponential(2); // show scientific with 2 decimals
}