/*
    this function will render mathematical formula in blogs or questions.
*/

export default function renderMath() {
    if (window.MathJax) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub])
    }
}