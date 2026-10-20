(function () {
    const pk = document.getElementById('pk');
    const g = pk.querySelector('canvas').getContext('2d');
    const Y = '#ffe866';
    const P = (x, y, w, h, k) => { g.fillStyle = k; g.fillRect(x, y, w, h); };

    function draw(open) {
        g.clearRect(0, 0, 16, 16);
        // cabo
        P(7, 1, 2, 3, '#3f8f3a'); P(9, 1, 2, 1, '#3f8f3a'); P(8, 1, 1, 1, '#6ac05a');
        // corpo
        P(3, 4, 10, 11, '#e8761a'); P(1, 6, 14, 7, '#e8761a'); P(2, 5, 12, 9, '#e8761a');
        P(5, 4, 1, 11, '#b0510a'); P(10, 4, 1, 11, '#b0510a'); P(2, 14, 12, 1, '#b0510a');
        P(3, 15, 10, 1, '#8a3a08'); P(2, 7, 2, 4, '#ffa040');
        // rosto aceso (abóbora "aberta")
        if (open) {
            P(5, 7, 1, 1, Y); P(4, 8, 3, 2, Y); P(10, 7, 1, 1, Y); P(9, 8, 3, 2, Y);
            P(4, 11, 8, 1, Y); P(5, 12, 2, 1, Y); P(9, 12, 2, 1, Y); P(7, 13, 2, 1, Y);
        }
        pk.classList.toggle('lit', open);
    }

    draw(false);
    pk.addEventListener('mouseenter', () => draw(true));
    pk.addEventListener('mouseleave', () => draw(false));
    pk.addEventListener('focus', () => draw(true));
    pk.addEventListener('blur', () => draw(false));
})();